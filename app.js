import { COMPONENTS, SCENARIOS, TESTS, runTest, getState } from './simulation.js';
import { evaluate } from './scoring.js';

const $ = (id) => document.getElementById(id);
const casePicker = $('case-picker');
let observations = [];
let actions = [];
let startedAt = Date.now();
let submitted = false;
let lastExport = null;

function logAction(kind, details) {
  actions.push({ atSeconds: Math.round((Date.now() - startedAt) / 1000), kind, ...details });
}
function resetCase() {
  observations = []; actions = []; submitted = false; lastExport = null; startedAt = Date.now();
  const scenario = SCENARIOS.find((s) => s.id === casePicker.value);
  $('ticket').textContent = scenario.ticket;
  $('evidence-log').innerHTML = '<p class="empty">No measurements yet. Select a diagnostic test above.</p>';
  $('results').classList.add('hidden');
  $('diagnosis-options').disabled = false;
  document.querySelectorAll('input[name="diagnosis"]').forEach((input) => { input.checked = false; });
  $('test-count').textContent = '0 tests';
  $('submit-diagnosis').disabled = false;
  document.querySelectorAll('.test-button').forEach((button) => { button.disabled = false; });
  const state = getState(scenario.id);
  $('lamp-dot').classList.toggle('on', state.lampLit);
  $('lamp-state').textContent = state.lampLit ? 'ON' : 'OFF';
  $('observable').textContent = `The output lamp is ${state.lampLit ? 'ON' : 'OFF'}`;
  $('status-label').textContent = 'FAULT REPORTED';
  logAction('scenario_started', { scenarioId: scenario.id });
}
function takeTest(testId) {
  if (submitted) return;
  const reading = runTest(casePicker.value, testId);
  observations.push(reading);
  logAction('measurement', { testId, reading: reading.value });
  if (observations.length === 1) $('evidence-log').innerHTML = '';
  const item = document.createElement('div'); item.className = 'log-item';
  const label = document.createElement('span'); label.textContent = `${observations.length}. ${reading.testName}`;
  const value = document.createElement('span'); value.className = 'log-value'; value.textContent = reading.value;
  item.append(label, value); $('evidence-log').append(item);
  $('test-count').textContent = `${observations.length} test${observations.length === 1 ? '' : 's'}`;
}
function submitDiagnosis() {
  if (submitted) return;
  const selection = document.querySelector('input[name="diagnosis"]:checked');
  if (!selection) { window.alert('Select the component you believe has failed.'); return; }
  const elapsedSeconds = Math.round((Date.now() - startedAt) / 1000);
  logAction('diagnosis_submitted', { selectedFault: selection.value });
  const outcome = evaluate({ scenarioId: casePicker.value, diagnosis: selection.value, observations, elapsedSeconds });
  submitted = true;
  $('diagnosis-options').disabled = true;
  $('submit-diagnosis').disabled = true;
  document.querySelectorAll('.test-button').forEach((button) => { button.disabled = true; });
  $('status-label').textContent = 'CASE COMPLETE';
  $('result-label').textContent = outcome.accurate ? 'CORRECT' : 'INCORRECT';
  $('result-score').textContent = `${outcome.score}/100`;
  $('result-count').textContent = outcome.totalTests;
  $('result-time').textContent = `${elapsedSeconds}s`;
  const truth = COMPONENTS.find((part) => part.id === outcome.correctFault).name;
  let message = outcome.accurate ? `Correct: the failed component is the ${truth}. ` : `The simulated failure was the ${truth}. `;
  message += outcome.evidenceSufficient ? 'Your collected measurements uniquely distinguish this fault from the other two cases.' :
    `Your recorded measurements do not uniquely support your chosen diagnosis. ${outcome.remainingFaults.length} candidate fault(s) remain compatible with your evidence.`;
  $('result-explanation').textContent = message;
  lastExport = { prototype: 'Fault Diagnosis Lab', version: '1.0', scenarioId: casePicker.value, diagnosis: selection.value, observations, actions, outcome };
  $('results').classList.remove('hidden');
  $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function exportJson() {
  if (!lastExport) return;
  const blob = new Blob([JSON.stringify(lastExport, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${casePicker.value}-diagnostic-response.json`;
  anchor.click(); URL.revokeObjectURL(url);
}
function nextCase() {
  const i = SCENARIOS.findIndex((item) => item.id === casePicker.value);
  casePicker.value = SCENARIOS[(i + 1) % SCENARIOS.length].id;
  resetCase(); window.scrollTo({ top: 0, behavior: 'smooth' });
}
function initialize() {
  SCENARIOS.forEach(({ id, title }) => { const option = document.createElement('option'); option.value = id; option.textContent = title; casePicker.append(option); });
  TESTS.forEach((test) => { const button = document.createElement('button'); button.type = 'button'; button.className = 'test-button'; button.title = test.description; button.innerHTML = `<span class="test-name"></span><span aria-hidden="true">MEASURE →</span>`; button.querySelector('.test-name').textContent = test.title; button.addEventListener('click', () => takeTest(test.id)); $('test-buttons').append(button); });
  COMPONENTS.forEach((part) => { const label = document.createElement('label'); label.className = 'choice'; const input = document.createElement('input'); input.type = 'radio'; input.name = 'diagnosis'; input.value = part.id; const text = document.createElement('span'); text.textContent = `${part.short} · ${part.name}`; label.append(input, text); $('diagnosis-options').append(label); });
  casePicker.addEventListener('change', resetCase);
  $('reset-case').addEventListener('click', resetCase);
  $('submit-diagnosis').addEventListener('click', submitDiagnosis);
  $('download-json').addEventListener('click', exportJson);
  $('next-case').addEventListener('click', nextCase);
  resetCase();
}
initialize();
