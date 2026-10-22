# SHL Senior Scientist Work Sample — Fault Diagnosis Lab

<!-- The big idea: observe troubleshooting, not just a final answer. -->
## Concept

**Fault Diagnosis Lab** reframes traditional static fault-finding items as a small, interactive troubleshooting experience. A candidate encounters a simple 24 V control circuit whose output lamp does not respond, selects diagnostic measurement points, interprets the readings, and identifies a failed component. The prototype targets **fault diagnosis**: isolating a malfunction's cause from symptoms and diagnostic-test results. Its intended occupational context is technical maintenance and field service; it is not proposed as a ready-to-use selection instrument.

<!-- What the demo does today—and what still needs testing. -->
## 1. Key features and benefits

The prototype combines (a) an accessible, browser-delivered schematic, (b) three distinct fault conditions sharing a common visible symptom, (c) candidate-selected voltage tests with deterministic outputs, (d) time-stamped action records and an evidence log, and (e) immediate diagnostic feedback with JSON export. Reviewers can run it on GitHub Pages without credentials, services, or special installation.

The design shifts the observable behavior from selecting one answer on a static diagram to **actively selecting diagnostic evidence**. This could improve task relevance, enable study of troubleshooting strategies, and offer interpretable response-process information. Greater engagement, fidelity, predictive validity, or fairness are **potential benefits to test**, not demonstrated properties.

<!-- The score is intentionally provisional; the evidence trail is the star. -->
## 2. Proposed response scoring and evaluation

The correct diagnosis is defined by the simulated component failure. The prototype reports a deliberately **illustrative 100-point score**: 60 points for a correct fault, 30 for evidence sufficient to distinguish the selected correct fault from the alternatives, and up to 10 for conducting at least one test without repeatedly performing the same test. No process points are awarded for an incorrect diagnosis; a correct answer with zero tests receives 60, avoiding unsupported claims that guessing demonstrates reasoning. Elapsed time, number/order of tests, repetition, and the full evidence sequence are retained separately for research rather than incorporated into a presumed-valid ability score.

An important nuance is that this *small* fault universe permits one highly discriminating test; collecting more measurements is not inherently better. A validated future scoring rubric would need expert-defined or empirically calibrated evidence of test informativeness, stopping decisions, diagnostic accuracy, and potentially inappropriate test choices. Differential test costs could encourage information-efficient decisions, but any weights would require empirical support. Process indicators should be examined for reliability and incremental prediction rather than simply summed because they are easy to log.

<!-- Design exploration, not a psychometric validation study. -->
## 3. Elements of the proposition experimented with

The implemented prototype explores **interactive investigation**, **shared symptoms with different fault mechanisms**, **deterministic evidence**, **logging of the diagnostic trajectory**, **results feedback**, and **data export**. Automated assertions check that all cases present an unlit indicator and that complete diagnostic signatures uniquely identify each failure. Tests also check that diagnosis without investigation cannot earn evidence-based points. There are no empirical candidate trials, comparisons to a static item, or adaptive algorithms in this version. These are design experiments, not psychometric experiments.

<!-- Describes where AI helped, without claiming full autonomy. -->
## 4. AI-enabled / agentic engineering approach

An AI coding assistant was used to decompose the brief into a bounded product concept, generate the browser user interface and pure simulation/scoring modules, construct scenario logic and automated checks, and draft documentation. The implementation keeps scenario truth, readings, and scoring inspectable instead of generating consequential assessment outcomes with a nondeterministic language model. The human developer chooses scope, reviews/test-runs the product, and remains accountable for the scientific assumptions. This is **AI-assisted engineering**, not a claim that a fully autonomous software-development agent was deployed. GitHub is the delivery platform; GitHub Pages is the intended hosted demonstration surface. Update this paragraph if your actual final development workflow differs.

<!-- The research and testing needed before real-world assessment use. -->
## 5. Further development

**Design.** Conduct a job analysis and SME workshops to define relevant systems, failures, and decisions. Expand the bank across difficulty, system types, noise, and diagnostic costs while keeping transparent answer keys. Use iterative candidate usability studies, cognitive interviews, device/browser checks, and accessibility reviews (keyboard, screen reader, contrast) before larger pilots. Consider a tutorial to minimize unfamiliarity with the interface and tools; monitor whether prior domain knowledge is a construct-relevant requirement or a source of construct-irrelevant variance.

**Psychometrics.** First establish content relevance and a defensible construct map; then pilot item difficulty, discrimination, response times, and process-feature quality. Study reliability across scenarios and occasions, dimensionality and local dependence among action features, potential speed–accuracy tradeoffs, and the robustness of scoring to multiple effective strategies. Evaluate fairness and differential functioning across relevant groups and accessibility needs. Examine criterion-related validity and whether process metrics predict job outcomes above conventional accuracy-based scores. Calibration, standardized administration, security, and cross-validation would precede any hiring use.

## Delivery

The repository includes a runnable static web demo, reviewer instructions in `README.md`, deterministic simulation and scoring modules, and dependency-free automated tests. The deliberately small scope supports inspection and a defensible follow-up discussion within the work sample's time constraints.
