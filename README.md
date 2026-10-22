# Fault Diagnosis Lab

**Interactive fault-finding assessment prototype for technical maintenance and field service roles.** Created for the SHL Senior Scientist technical work sample (September 2026). A demonstrator, **not** a validated employment assessment.

<!-- Two ways in: publish the static site or serve it locally. -->
## Run the demo

**Option A — GitHub Pages:** In your GitHub repository, open **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save**. Once GitHub displays the published URL, open it. No server, database, API keys, or installation required for visitors.

**Option B — Local computer:** Download/clone the repository, then from the project folder run:

```bash
python3 -m http.server 8000
```

Open **http://localhost:8000** in your browser. On Windows, `py -m http.server 8000` may be available instead. ES modules mean that opening `index.html` via `file://` is **not** the supported way to run locally; serve it over HTTP as shown above.

<!-- Quick tour for someone trying the prototype for the first time. -->
## Candidate walkthrough (2 minutes)

1. Choose a case from **Service Case**. Each has the same surface symptom: the output lamp remains off.
2. In **Diagnostic workbench**, measure voltage at switch output, relay coil, relay contact output, or lamp terminal. You may test any point more than once.
3. Review the evidence log, select which part failed (SW1, K1, or L1), and **Submit diagnosis**.
4. Review the outcome and illustrative process score. Export the complete response as JSON, or try another case.

<!-- Spoiler territory: the three voltage signatures reveal the culprit. -->
### Facilitator answer key (spoilers)

| Case | Failed part | Readings: switch output / coil / contact / lamp terminal |
|---|---|---|
| 1 | SW1 input switch stuck open | 0 / 0 / 0 / 0 V |
| 2 | K1 relay fails to close its contact | 24 / 24 / 0 / 0 V |
| 3 | L1 lamp fails despite voltage | 24 / 24 / 24 / 24 V |

The START command is held while diagnostic tests run. The physical design is intentionally simplified into logical stages. This is **not** a physically complete electrical schematic. All three faults have identical visible symptoms but distinguishable voltage signatures. Candidates can compare measurements to the proposed fault location; the simulator never randomizes responses.

<!-- This is a demonstration rubric, not a hiring score. -->
## Scoring (illustrative)

- **Diagnostic accuracy (0 or 60 points):** Did the candidate identify the scenario's faulty part?
- **Evidence sufficiency (0 or 30):** Did recorded test readings uniquely support the selected fault relative to the three available fault hypotheses? Awarded only if diagnosis is correct.
- **Measurement-process indicator (0–10):** Awarded only for a correct diagnosis with at least one measurement; each repeated measurement costs 5 points. This is an **exploratory convention**, not a supported measure of diagnostic efficiency.
- No penalty for time; it is recorded solely as potential research data.

A correct guess without measurements receives 60/100 and is **not** credited with demonstrating evidence-based reasoning. Scores are for demonstration only: no calibrated ability estimates, validity claims, cutoff scores, or hiring recommendations.

## Structure

```text
index.html                  Application markup
styles.css                  Responsive visualization
app.js                      UI state, event log, results, JSON export
scenarios.js                Scenario and diagnostic-test definitions
simulation.js               Deterministic component state and voltage readings
scoring.js                  Provisional measurement and score logic
package.json                Optional Node test command (no dependencies)
tests/simulation.test.mjs   Logic and scoring assertions
WRITEUP.md                  SHL work sample response
```

## Verify behavior

With Node.js 18+ available, run:

```bash
npm test
```

This runs `node:test` without installing dependencies. Node is **not required** to use the browser demo.

<!-- The honest boundary: useful prototype, not validated assessment. -->
## Limitations and future work

This single-system task is not an actual assessment of ability. The circuit and diagnostic information are intentionally simplified. Fault hypotheses are restricted to three known component failures; observation vectors are deterministic. Scoring is heuristic and unvalidated. Future work should incorporate SME-reviewed job-relevant scenarios, usability/accessibility research, cognitive interviews, psychometric calibration, fairness analyses, and criterion-related validation. See [WRITEUP.md](./WRITEUP.md).
