import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENARIOS, TESTS, getState, runTest, testSignature } from '../simulation.js';
import { compatibleFaults, evaluate } from '../scoring.js';

test('all three faults have the same observable lamp-off symptom', () => {
  for (const scenario of SCENARIOS) assert.equal(getState(scenario.id).lampLit, false);
});
test('each fault has a unique diagnostic signature', () => {
  assert.equal(new Set(SCENARIOS.map((s) => testSignature(s.id))).size, SCENARIOS.length);
});
test('correct circuit signal propagation under each fault', () => {
  assert.deepEqual(TESTS.map((t) => runTest('case-1', t.id).value), ['0 V','0 V','0 V','0 V']);
  assert.deepEqual(TESTS.map((t) => runTest('case-2', t.id).value), ['24 V','24 V','0 V','0 V']);
  assert.deepEqual(TESTS.map((t) => runTest('case-3', t.id).value), ['24 V','24 V','24 V','24 V']);
});
test('diagnostic measurements identify the correct case', () => {
  for (const scenario of SCENARIOS) {
    const observations = TESTS.map((t) => runTest(scenario.id, t.id));
    assert.deepEqual(compatibleFaults(observations), [scenario.fault]);
    assert.equal(evaluate({ scenarioId: scenario.id, diagnosis: scenario.fault, observations, elapsedSeconds: 30 }).evidenceSufficient, true);
  }
});
test('correct diagnosis without testing is not credited as evidence-based', () => {
  const result = evaluate({ scenarioId: 'case-1', diagnosis: 'input', observations: [], elapsedSeconds: 1 });
  assert.equal(result.accurate, true);
  assert.equal(result.evidenceSufficient, false);
  assert.equal(result.score, 60);
});
test('incorrect diagnosis does not receive positive score', () => {
  const result = evaluate({ scenarioId: 'case-1', diagnosis: 'relay', observations: [], elapsedSeconds: 1 });
  assert.equal(result.score, 0);
});
