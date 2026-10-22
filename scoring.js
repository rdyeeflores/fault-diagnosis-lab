import { SCENARIOS, TESTS } from './scenarios.js';
import { runTest } from './simulation.js';

// Count how many candidate faults still match the collected voltage readings.
export function compatibleFaults(observations) {
  return SCENARIOS.filter((scenario) => observations.every((obs) =>
    runTest(scenario.id, obs.testId).value === obs.value
  )).map((scenario) => scenario.fault);
}

export function evaluate({ scenarioId, diagnosis, observations, elapsedSeconds }) {
  const scenario = SCENARIOS.find((entry) => entry.id === scenarioId);
  if (!scenario) throw new Error('Unknown scenario');
  const accurate = diagnosis === scenario.fault;
  const uniqueTests = new Set(observations.map((obs) => obs.testId)).size;
  const repetitions = observations.length - uniqueTests;
  const remaining = compatibleFaults(observations);
  const evidenceSufficient = remaining.length === 1 && remaining[0] === diagnosis;
  // Demonstration only: NOT a validated operational assessment score.
  const score = (accurate ? 60 : 0) + (accurate && evidenceSufficient ? 30 : 0) +
    (accurate && uniqueTests > 0 ? Math.max(0, 10 - repetitions * 5) : 0);
  return {
    accurate, score, uniqueTests, totalTests: observations.length, repetitions,
    evidenceSufficient, remainingFaults: remaining, elapsedSeconds,
    correctFault: scenario.fault,
    scoringNote: 'Illustrative score only. Weights and interpretation have not been psychometrically validated.',
  };
}
