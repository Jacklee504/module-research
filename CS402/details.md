---
code: CS402
title: Cryptography
status: Optional
semester: Semester 2
credits: 5
exam_weight: 70%
ca_weight: 30%
assessment: 70% exam / 30% CA
predictability: High
lecturer: Collette McLoughlin / Tobias Rossmann
lecturer_risk: Meaningful
priority: Predictable but lecturer-change risk
module_url: https://www.universityofgalway.ie/course-information/module/CS402
---

# CS402 - Cryptography

## Source Material Checked

- Past papers reviewed: 2017/18, 2018/19, 2021/22, 2022/23, 2023/24, 2024/25.
- Module page checked: https://www.universityofgalway.ie/course-information/module/CS402
- Date checked: 2026-06-11.

## Module Page Summary

- Semester: Semester 2.
- Credits: 5.
- Assessment weighting:
  - Written assessment / exam: 70%.
  - Continuous assessment: 30%.
- Module description: private and public key cryptosystems, algorithmic number theory, and elliptic curves in cryptography.
- Stated learning outcomes:
  - Apply substitution ciphers and understand their weaknesses.
  - Encrypt and decrypt messages using RSA.
  - Describe and apply algorithms for primality testing and integer factorisation and explain their relevance to RSA.
  - Understand the discrete logarithm problem and apply Diffie-Hellman and ElGamal.
  - Define elliptic curves, compute groups of points, and explain their use in public key cryptography.
- Listed teachers/administrators: Collette McLoughlin, Tobias Rossmann.
- Reading list:
  - A Course in Number Theory and Cryptography by Neal Koblitz.
  - Understanding Cryptography by C. Paar and J. Pelzl.
  - Cryptography: An Introduction by N. Smart.
  - Cryptography: Theory and Practice by D. R. Stinson and M. Paterson.
- Module page says the information is valid from 2025 onwards.

## Lecturer / Personal Note

- Lecturer fit: not recorded yet.
- Current page lists Collette McLoughlin and Tobias Rossmann.
- Starred internal examiners, treated as the module lecturer on each paper:
  - 2024/25: Koushik Paul.
  - 2023/24 and 2022/23: K. Jennings.
  - 2021/22 and 2018/19: Tobias Rossmann.
  - 2017/18: Graham Ellis.
- Tobias Rossmann is the only current-page name with starred past-paper evidence. Collette McLoughlin looks more like an administrator/current staff listing than a past-paper lecturer based on the papers reviewed.
- Lecturer/staff change risk: meaningful. The current page has a historical link through Tobias Rossmann, but the most recent starred lecturers were Koushik Paul and K. Jennings, neither of whom is listed on the current page.

## Predictability Rating

High, with a lecturer-change warning. CS402 is one of the more predictable modules in structure and topic order. The exact numbers change, but the question types recur strongly. However, because the most recent starred paper lecturers differ from the current module page, do not assume the 2024/25 paper style will be copied exactly.

## Evidence From Past Papers

- Stable format from 2018/19 onward: answer all 4 questions, 25 marks each, workings required.
- Q1: classical ciphers. Drill Caesar/shift, Hill over Z27, affine key counting, Kerckhoff's principle and occasional Vigenere.
- Q2: symmetric crypto and security theory. Drill perfect security/Shannon, block vs stream ciphers, LFSRs, LFSR period and connection polynomials.
- Q3: RSA and public-key crypto. Drill RSA key generation, encryption/decryption, valid-key checks, public-key comparison and primality/security reasoning.
- Q4: number theory and public-key protocols. Drill fast exponentiation, Diffie-Hellman, ElGamal, Fermat/pseudoprime/Carmichael questions and elliptic-curve point calculations.
- Weight the 2018/19 onward structure more heavily than 2017/18, which used an older ten-question format.

## Assessment Strategy

- This is 70% exam and 30% CA.
- The module is not CA-heavy, but the exam is predictable enough that it may be a good target if the maths style suits you.
- Because of the starred-lecturer uncertainty, use past papers for topic coverage and practice, but also prioritise current lecture notes, tutorial sheets, assignment topics and any lecturer-provided sample questions.
- Highest-value preparation areas:
  - Shift/Caesar cipher decoding with known plaintext-symbol mapping.
  - Hill cipher over Z27, including matrix inverse/modular arithmetic.
  - Affine cipher key-space counting over Zn.
  - Kerckhoff's principle.
  - Symmetric cryptosystem definitions, perfect security, Shannon's theorem.
  - Block vs stream ciphers.
  - LFSRs: definition, connection polynomial, keystream recovery, least period.
  - RSA: key generation, encryption, decryption, valid key checks.
  - Euler's theorem, Fermat test, pseudoprimes, Carmichael numbers.
  - Fast modular exponentiation.
  - Diffie-Hellman and ElGamal.
  - Elliptic curves over finite fields: list points, find order-2 points.
- Expect calculation marks. Practice with numbers matters more than only memorising descriptions.

## Overall Judgement

CS402 is highly predictable at syllabus/topic level but has lecturer-change risk. It is a good choice if you are comfortable with modular arithmetic, number theory and calculation-heavy exams, but current teaching materials should be weighted above exact past-paper formatting. The 30% CA is useful, but the 70% exam means the main decision should be whether the maths style and current lecturer approach suit you.

## Predictability Audit (2026-07-17)

- **Status: High for core topics and calculation forms; not a promise of lecturer-specific wording.** Local evidence is `2017_2018.pdf`, `2018_2019.pdf`, `2021_2022.pdf`, `2022_2023.pdf`, `2023_2024.pdf`, and `2024_2025.pdf`; the four-question format is stable from 2018/19 onward, unlike the older ten-question paper.
- **Applicability:** the current [official module page](https://www.universityofgalway.ie/course-information/module/CS402) retains substitution ciphers, RSA, primality/factorisation, Diffie-Hellman/ElGamal and elliptic curves. It supports the core calculations, while the listed current staff do not establish that the latest past-paper setter continues.
- **Decision:** retain High only at syllabus/topic level and prioritise current teaching materials for exact emphasis.

## Short Learning Material

Use Degreed/Percipio-style catalogues for short tutorials, guided projects, or video chapters. Prefer material under 3 hours per topic.

- Modular arithmetic for cryptography: modular inverse, Euler/Fermat theorem and fast exponentiation.
- Classical ciphers: Caesar/shift, affine, Vigenere and Hill cipher worked examples.
- RSA from scratch: key generation, encryption/decryption, valid key checks and small-number examples.
- LFSRs and stream ciphers: period, connection polynomial and keystream generation.
- Diffie-Hellman and ElGamal: numerical shared-key/encryption examples over finite fields.
- Elliptic curve cryptography basics: point addition over finite fields and why ECC is used.

## Topic Guides

- [Classical ciphers](classical_ciphers_revision_sheet.html): shifts, affine/Hill ciphers and Kerckhoffs's principle.
- [Symmetric crypto and perfect security](symmetric_perfect_security_revision_sheet.html): Shannon/OTP, stream/block ciphers and LFSRs.
- [RSA](rsa_revision_sheet.html): key construction, modular exponentiation and correctness.
- [Number theory and primality](number_theory_primality_revision_sheet.html): inverses, fast powers and cautious primality testing.
- [Public-key protocols](public_key_protocols_revision_sheet.html): Diffie–Hellman and ElGamal.
- [Elliptic-curve cryptography](elliptic_curve_cryptography_revision_sheet.html): finite-field points and group arithmetic.
