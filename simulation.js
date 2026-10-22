import { COMPONENTS, SCENARIOS, TESTS } from './scenarios.js';

const findScenario = (id) => SCENARIOS.find((scenario) => scenario.id === id);

// The START command is held on while measurements are taken.
// Normal signal path: START -> switch output -> relay coil -> relay contact -> lamp.
export function getState(scenarioId, startPressed = true) {
  const scenario = findScenario(scenarioId);
  if (!scenario) throw new Error(`Unknown scenario: ${scenarioId}`);
  const inputOutput = startPressed && scenario.fault !== 'input';
  const relayCoil = inputOutput;
  const relayContact = relayCoil && scenario.fault !== 'relay';
  const lampTerminal = relayContact;
  const lampLit = lampTerminal && scenario.fault !== 'lamp';
  return { inputOutput, relayCoil, relayContact, lampTerminal, lampLit };
}

const readingNames = {
  inputVoltage: 'inputOutput',
  relayCoil: 'relayCoil',
  relayContact: 'relayContact',
  lampTerminal: 'lampTerminal',
};

export function runTest(scenarioId, testId) {
  const test = TESTS.find((entry) => entry.id === testId);
  if (!test) throw new Error(`Unknown test: ${testId}`);
  const state = getState(scenarioId, true);
  const energized = state[readingNames[testId]];
  return {
    testId,
    testName: test.title,
    location: test.location,
    value: energized ? '24 V' : '0 V',
    energized,
    explanation: energized ? 'Voltage is present at this measurement point.' : 'No voltage is present at this measurement point.',
  };
}

// A fault is uniquely identifiable when its complete vector of readings differs
// from every other scenario. This is asserted in the automated tests.
export function testSignature(scenarioId) {
  return TESTS.map((test) => runTest(scenarioId, test.id).value).join('|');
}

export { COMPONENTS, SCENARIOS, TESTS };
