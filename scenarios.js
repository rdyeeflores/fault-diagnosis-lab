// Fault scenarios are deliberately deterministic and share one system model.
// Each fault changes exactly one component's behavior.
// Three suspects: switch, relay, or lamp.
export const COMPONENTS = [
  { id: 'input', name: 'Input switch', short: 'SW1' },
  { id: 'relay', name: 'Control relay', short: 'K1' },
  { id: 'lamp', name: 'Output lamp', short: 'L1' },
];

// Different culprits, same outward symptom: one dark lamp.
export const SCENARIOS = [
  { id: 'case-1', title: 'Case 1 · Silent start', ticket: 'The operator presses START, but the status lamp stays dark. Diagnose the failed component.', fault: 'input' },
  { id: 'case-2', title: 'Case 2 · No relay response', ticket: 'The control panel reports that START has no visible effect. Isolate the fault.', fault: 'relay' },
  { id: 'case-3', title: 'Case 3 · Dark indicator', ticket: 'The machine is reported as unresponsive because its status lamp does not illuminate. Locate the failure.', fault: 'lamp' },
];

// Each measurement checks one stop along the voltage path.
export const TESTS = [
  { id: 'inputVoltage', title: 'Measure input-switch output', location: 'SW1', description: 'Check for voltage immediately after the START switch.' },
  { id: 'relayCoil', title: 'Measure relay-coil voltage', location: 'K1', description: 'Check whether the relay receives power at its coil.' },
  { id: 'relayContact', title: 'Measure relay contact output', location: 'K1', description: 'Check whether the relay passes power downstream.' },
  { id: 'lampTerminal', title: 'Measure lamp-terminal voltage', location: 'L1', description: 'Check whether voltage reaches the indicator lamp.' },
];
