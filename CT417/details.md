---
code: CT417
title: Software Engineering III
status: Required
semester: Semester 1
credits: 5
exam_weight: 70%
ca_weight: 30%
assessment: 70% exam / 30% CA
predictability: Medium
lecturer: Effirul Ramlan
lecturer_risk: Low-medium
priority: Required; recent pattern with material-drift risk
module_url: https://www.universityofgalway.ie/course-information/module/CT417
---

# CT417 - Software Engineering III

## High-Level View

- Status: Required on the current GY350 Year 4 course page.
- Assessment: 70% written assessment, 30% continuous assessment.
- Credits: 5
- Semester: Semester 1
- Current module page validity: Valid from 2026 onwards.
- Current teachers/administrators: Deirdre King, Geraldine Healy, Effirul Ramlan.
- Past papers reviewed: 2019/20, 2021/22, 2023/24, 2024/25, 2025/26.
- Predictability: Medium.
- Recent DevSecOps/security/design-pattern pattern: useful, but not a guaranteed paper style.

## Recommendation

This is required and exam-heavy, so it should be planned around rather than chosen around. The newer papers are much more useful than the older ones. The strongest current pattern is scenario-based questions about CI/CD, GitHub Actions, SAST/DAST, OWASP ZAP, SonarQube, code coverage, vulnerability management, buffer overflow, refactoring and design patterns.

It can be useful to align CT413 project work with CT417 themes, especially if the project involves architecture, testing, CI/CD, secure development, maintainable backend design, Docker, GitHub Actions or automated quality gates.

## Official Module Information

Source: https://www.universityofgalway.ie/course-information/module/CT417

- Title: Software Engineering III
- Description: Advanced software engineering topics including secure software engineering, DevSecOps, software architecture, testing, quality assurance and design patterns.
- Learning outcomes include:
  - Identify phases and challenges of secure development processes.
  - Use tools to implement DevSecOps processes and reusable CI/CD pipelines.
  - Demonstrate ethical and security responsibilities in software deployment.
  - Evaluate software quality assurance and reliability issues.
  - Recognise architectural styles such as microservices, serverless and API-first.
  - Implement design patterns and refactoring operations.

## Lecturer / Staff Change Note

- Current page lists Deirdre King, Geraldine Healy and Effirul Ramlan.
- Starred internal examiners, treated as the module lecturer on each paper:
  - 2025/26, 2024/25 and 2023/24: Effirul Ramlan.
  - 2021/22: Matthias Nickles and Michael Schukat.
  - 2019/20: Stephen Bradshaw.
- Lecturer/staff change risk: Low-medium for the recent DevSecOps/security/testing/design-pattern style, because Effirul Ramlan is both the recent starred lecturer and listed on the current page.
- Main implication: 2019/20 and 2021/22 are useful for background topics, but 2023/24 onwards is much more predictive of the current exam style.

## Predictability Rating

Medium overall. The 2023/24-2025/26 DevSecOps/security/testing/design-pattern pattern is useful recent evidence, but the older archive shows material drift.

The module is not repetitive in the older CT421 sense of exact topic slots over many years, because the paper has clearly evolved. But the newest two papers are extremely similar in structure and skills tested, and 2023/24 already points toward the same DevSecOps/security/testing/design-pattern direction.

## Topic Guides

- [CI/CD and Git Workflows](cicd_git_workflows_revision_sheet.html)
- [Automated Testing and Security Tooling](automated_testing_security_tooling_revision_sheet.html)
- [Vulnerabilities, Countermeasures and Metrics](vulnerabilities_countermeasures_metrics_revision_sheet.html)
- [Refactoring and Design Patterns](refactoring_design_patterns_revision_sheet.html)
- [Software Architecture](software_architecture_revision_sheet.html)
- [Secure Software Engineering and DevSecOps](secure_software_engineering_devsecops_revision_sheet.html)
- [Legacy and Background Topics](legacy_background_topics_revision_sheet.html)

## Evidence From Past Papers

### Paper Format

- Format has moved around, but the latest pattern is answer any 3 from 4, 20 marks each.
- Weight 2024/25 and 2025/26 most heavily because the module has shifted away from the older formal-specification-heavy style.

### Recurring Recent Pattern

- Q1 recent focus: CI/CD, Git workflows, GitHub Actions, Docker/build/deploy problems, branches, merge conflicts and safe deployment.
- Q2 recent focus: testing and security automation, especially SAST vs DAST, SonarQube, OWASP ZAP, unit testing, JUnit/code coverage and pipeline feedback.
- Q3 recent focus: vulnerability foundations, countermeasures, zero-days, buffer overflow and newer operational metrics such as MTTD, MTTR and MTBF.
- Q4 recent focus: refactoring and design patterns, especially Factory Pattern, user-role abstraction, maintainability and reducing conditional role logic.

### Older / Background Pattern

- Older papers include architecture, cloud/virtualisation, Docker, plugins, kernels, CAP, ACID/BASE, Z notation and secure-by-design web security.
- Treat older formal specification material as lower priority unless current lectures bring it back.

## Exam Strategy

- Treat 2024/25 and 2025/26 as the highest-value papers.
- Prepare reusable answer templates for:
  - CI/CD improvements: automated tests, staging parity, security scans, deployment gates, rollback, artefact/image versioning.
  - Git/GitHub workflows: status, add, commit, push, pull/rebase/merge, resolving conflicts, pull requests.
  - GitHub Actions YAML: triggers, jobs, runners, checkout, setup runtime, build, test, coverage, Docker build/push, deployment.
  - SAST versus DAST: timing, source-code access, vulnerability type, tool examples, pipeline trade-offs.
  - SonarQube and OWASP ZAP troubleshooting.
  - Code coverage: identifying untested areas and raising coverage without slowing feedback loops.
  - Vulnerability, countermeasure, zero-day lifecycle, buffer overflow and mitigations.
  - Refactoring with abstract classes/interfaces, subclasses and Factory Pattern.
- Do not over-invest in 2019/20 architecture/virtualisation unless lecture emphasis suggests it has returned.
- Keep Formal Specification/Z notation on the radar because it appeared in 2021/22 and 2023/24, but it is less visible in the two newest papers.

## CA / Workload Notes

- Exam-heavy at 70% written assessment.
- CA is only 30%, so it is not a major mark-banking module compared with CT413 or CT4104.
- The practical content overlaps strongly with project execution quality: CI, tests, secure coding, deployment and maintainable design.

## Bottom Line

CT417 has a useful recent pattern, but its overall predictability is Medium. Prioritise the recent DevSecOps/security/testing/design-pattern material, especially 2024/25 and 2025/26, while covering the full current outcome set because older papers contain formal specification, architecture and virtualisation material.

## Predictability Audit (2026-07-17)

- **Status: Medium.** Local evidence is `2019_2020.pdf`, `2021_2022.pdf`, `2023_2024.pdf`, `2024_2025.pdf`, and `2025_2026.pdf`. The 2024/25-2025/26 DevSecOps/testing/design-pattern papers are useful recent evidence, but the archive shows material drift from formal specification and earlier architecture content.
- **Applicability:** the current [official module page](https://www.universityofgalway.ie/course-information/module/CT417) supports DevSecOps, CI/CD, testing/quality, architecture and design patterns. It does not establish the recent four-question layout or exclude older official themes.
- **Decision:** prioritise the two most recent papers by recency, but cover every current outcome; call only the recent topic cluster a pattern, not a guaranteed paper template.

## Short Learning Material

Use Degreed/Percipio-style catalogues for short tutorials, guided projects, or video chapters. Prefer material under 3 hours per topic.

- DevSecOps fundamentals: shifting security left, secure pipelines and feedback loops.
- CI/CD crash course: build, test, deploy stages and deployment strategies.
- Software testing strategy: unit, integration, system, acceptance and regression testing.
- Secure software engineering: threat modelling, security requirements and abuse cases.
- Design patterns refresher: factory, singleton, observer, strategy, adapter and MVC.
- Agile/software process review: Scrum, Kanban, estimation and requirements traceability.
