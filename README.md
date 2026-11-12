# Assignment 6 – Building a Secure CI/CD Pipeline with GitHub Actions
Module: Module Six – CI/CD Security with GitHub Actions | 100 marks

## Deliverables
1. Link to GitHub repository named `devsecops-pipeline` (private, add instructor as collaborator)
   - Must contain a small Node.js + Express API with ≥2 endpoints and a few tests
2. `assignment6-answers.txt` – written answers in task order

> No real passwords, keys, tokens, or connection strings anywhere. All secrets via GitHub Actions secrets.

---

### Task 1 – CI/CD Concepts (15 marks)
1. Explain (2–3 sentences each) the difference between Continuous Integration, Continuous Delivery, and Continuous Deployment. Make the Delivery-vs-Deployment distinction explicit.
2. List 4 specific problems caused by merging with no automated checks; name the CI/CD benefit that fixes each.
3. Explain (3–4 sentences) why security checks should run on a PR before merge, not on push to main after merge. Use the words "shift left".
4. Define in one sentence each: workflow, job, step, runner, action.
5. Answer "I run npm audit on my laptop before I push" (3–4 sentences: why this is not the same as a pipeline stage).

### Task 2 – Build the CI Pipeline (20 marks) ← PRACTICAL
Create `.github/workflows/ci.yml` that triggers on push and pull_request.

Workflow must (in order):
- Check out the code
- Set up Node.js (state the version)
- Install dependencies with `npm ci` (not `npm install`)
- Run the tests
- Run the linter
- Build the application (or substitute a sensible check if no build step)

Explain in one sentence each:
- Why `npm ci` rather than `npm install`
- Why the workflow location must be `.github/workflows/`

Push the workflow, confirm it runs. Paste the URL of the successful run + describe what each step did.

Break it on purpose: introduce a controlled test failure, push, observe the pipeline fail. Paste evidence. Then fix it.

Explain (2–3 sentences) why a failing step stops the whole job and why that's the foundation of a security gate.

### Task 3 – Secret Detection (15 marks)
1. Explain (2–3 sentences) why a committed secret is compromised even if deleted in a later commit. Use the word "history".
2. Enable automated secret detection (GitHub secret scanning with push protection, or gitleaks in workflow). State which and why.
3. Demonstrate it working: attempt to introduce a fake but realistic-looking secret (invented API key, never real). Show what happens (push blocked or workflow fails). Paste evidence.
4. Write the correct response process for a real exposed secret as an ordered list; explain why the first step is first.
5. Explain (2–3 sentences) where the app's actual secrets (JWT secret, database URL) should live: locally and in the pipeline.

### Task 4 – Dependency Scanning & SAST (25 marks) ← PRACTICAL
**Part A – Dependency scanning (13 marks)**
1. Add a dependency-scanning stage to your workflow (npm audit, Dependabot, or Snyk). State which you chose.
2. Introduce a known-vulnerable dependency (old version of a common package). Run the pipeline, show the finding: paste output, identify package, severity, direct or transitive.
3. Remediate it. Explain what you changed and why. Run tests, run scan again, show finding is resolved.
4. Explain (2–3 sentences) why the goal is not simply to make the vulnerability count zero, using something from your own output.

**Part B – SAST (12 marks)**
5. Enable SAST/code-scanning workflow (GitHub Code Scanning / CodeQL recommended). State what you enabled.
6. Introduce a controlled insecure code pattern (e.g. string concatenation query, hardcoded credential). Run the scan, show the finding, explain what the scanner is warning about.
7. Fix the underlying pattern (not by suppressing). Re-run the scan, show the finding is gone.
8. Explain (2–3 sentences) one kind of vulnerability SAST will NOT find and why, connecting to the difference between a pattern and a logic flaw.

### Task 5 – The Security Gate (15 marks) ← PRACTICAL
1. Define the conditions your security gate enforces as an explicit rule, e.g.:
   `tests PASS AND no critical vulnerabilities AND SAST checks PASS AND build PASS`
2. Implement the gate: make checks required via branch protection rule on main. Describe exactly what you configured.
3. Demonstrate the gate stopping a bad change: open a PR that fails one condition, show it's blocked from merging. Paste evidence.
4. Fix the change on the same PR, show checks turn green, show merging is now allowed.
5. Explain (3–4 sentences) the difference between a check that reports and a gate that enforces; why a gate that blocks on every trivial finding is a bad design.

### Task 6 – Pipeline Design, Secrets & Review (10 marks)
1. Draw or describe your complete pipeline (developer push → build). Label which course module each security stage comes from.
2. Explain how to provide a pipeline secret (e.g. scanning service token) to the workflow without writing it into the YAML. Name the GitHub feature.
3. Explain (2–3 sentences) why dev/testing/staging/production should each have their own secrets, connecting to a principle from Module 2.
4. Complete the final module checklist from Module 6, Section 50 (can do it / with evidence). Honesty scores better.
5. Reflect (2–3 sentences): name one security check in your pipeline you first learned to do by hand in an earlier module; say which module and how the automated version differs.

## Files to Create (in `devsecops-pipeline` repo)
```
.github/
└── workflows/
    ├── ci.yml
    └── codeql.yml (or similar)
src/
├── app.js
└── ...
tests/
└── ...
package.json
assignment6-answers.txt
```
