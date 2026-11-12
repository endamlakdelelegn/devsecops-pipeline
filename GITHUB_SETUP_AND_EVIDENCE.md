# GitHub setup and evidence

The local implementation is complete. Produce the remaining Actions evidence in your own GitHub repository; never invent URLs, logs, or screenshots.

## Publish and configure

1. Create a private GitHub repository named `devsecops-pipeline` and copy the contents of `devsecops-pipeline/` into its root.
2. Add the instructor as a collaborator. If that is impossible, make the repository public and say so in `assignment6-answers.txt`.
3. Push the `main` branch. CI, Gitleaks, and CodeQL will run.
4. In **Settings → Code security and analysis**, enable CodeQL code scanning if the repository plan does not enable it automatically.
5. In **Settings → Branches → Add branch protection rule**, select `main`, require a pull request before merging, require branches to be up to date, and require these checks: `Build, Lint & Test`, `Dependency Scan`, `Scan for secrets (Gitleaks)`, and `Analyze (JavaScript)`.

## Evidence to capture

### Task 2: CI failure and recovery

On a short-lived branch, temporarily change one test assertion to an incorrect value. Push it and record the red Actions run URL and failed test output. Restore the assertion, push again, and record the green run URL.

### Task 3: Gitleaks

On a disposable branch, add an invented credential matching a documented detector format, run the workflow, capture the failed Gitleaks log, then delete the branch. Never use or paste a real credential. If GitHub push protection is enabled instead, capture its blocked-push message.

### Task 4: dependency audit and CodeQL

Use separate disposable branches. Add an intentionally old vulnerable package version, capture the `npm audit` failure, then update or remove it and capture the passing scan. For CodeQL, introduce a scanner-detectable insecure pattern only on a disposable branch, capture the alert, correct the underlying unsafe code, and capture the clean analysis. Do not merge insecure demonstration code into `main`.

### Task 5: gate

Open a pull request containing a deliberately failing test. With branch protection enabled, capture the failed required check and disabled merge control. Restore the test on the same pull request and capture green checks plus the enabled merge control.
