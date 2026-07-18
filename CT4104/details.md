---
code: CT4104
title: Computer and Network Security
status: Required
semester: Semester 2
credits: 5
exam_weight: 60%
ca_weight: 40%
assessment: 60% exam / 40% CA
predictability: Unknown
lecturer: Michael Schukat / Priyanka Verma
lecturer_risk: Unknown
priority: Required, strong CA opportunity
module_url: https://www.universityofgalway.ie/course-information/module/CT4104
---

# CT4104 - Computer and Network Security

## High-Level View

- Status: Required on the current GY350 Year 4 course page.
- Assessment: 60% written assessment, 40% continuous assessment.
- Credits: 5
- Semester: Semester 2
- Current module page validity: Valid from 2026 onwards.
- Current teachers/administrators: Michael Schukat, Deirdre King, Geraldine Healy, Priyanka Verma.
- Predictability: Unknown from past-paper evidence. There are no local CT4104 past papers in this project, so treat the exam as less forecastable than CT417/CT4101 unless papers are found later.

## Recommendation

This is strategically important because it is required and has a 40% CA component. It should be treated as one of the main places to bank coursework marks among the mandatory exam modules.

Because there are no past papers, do not rely on repetition for this module. The safer approach is to use the official learning outcomes as the revision map and prioritise CA early.

The module also overlaps strongly with CS402, MA3491, CT420 and CT4108 through cryptography, security protocols, network security, secure communication and systems/security thinking.

## Official Module Information

Source: https://www.universityofgalway.ie/course-information/module/CT4104

- Title: Computer and Network Security
- Description: Introduction to cybersecurity topics including symmetric/asymmetric cryptography, OpenSSL, X.509, TLS, IPSec, threat analysis, pen-testing and ethical hacking.
- Learning outcomes include:
  - Distinguish between modern cryptographic algorithms and applications.
  - Analyse cryptographic network protocols.
  - Apply cryptographic concepts for integrity, authentication and encryption.
  - Conduct security assessments using ethical hacking / pen-testing strategies.
  - Use and evaluate cryptographic libraries such as OpenSSL.

## Workload Notes

- Best mandatory exam-module CA split found so far: 40% CA.
- Likely practical/security-tooling component because the page mentions OpenSSL and pen-testing.
- Strong candidate for early CA planning.
- Exam predictability is weaker than modules with local paper archives. Current evidence comes from the module page only, not repeated exam questions.

## Linked Module Notes

### CS402 Cryptography: useful foundation, not a substitute

CS402 is the best linked source for the cryptography CT4104 assumes, but the modules assess different things. CS402 is largely concerned with the construction and security of cryptographic schemes. CT4104 uses those schemes inside network protocols and security assessments.

Use CS402 to become comfortable with:

- symmetric encryption, hashing, MACs and the difference between confidentiality and integrity
- public-key encryption, signatures, authentication and certificates
- key exchange, especially the idea behind Diffie-Hellman
- security assumptions and the limits of a cryptographic guarantee

For CT4104, always take the extra step: identify the security property required, the protocol component that provides it, and the attack or configuration mistake that could undermine it.

### CT4104 material that CS402 will not cover sufficiently

The official CT4104 outcomes add a substantial practical and systems-focused layer:

- TLS, IPSec and X.509: message flow, certificates, trust, key establishment and the purpose of each component
- OpenSSL: using cryptographic tools and evaluating whether a configuration achieves the intended protection
- threat analysis: assets, attackers, attack surfaces, threats, mitigations and residual risk
- ethical hacking and pen-testing: scoping, reconnaissance, testing safely, documenting findings and recommending fixes

Do not assume that knowing the maths behind RSA or Diffie-Hellman means you can explain how TLS or a certificate chain works in practice.

### What to de-prioritise from CS402

Use detailed number theory, primality testing, pseudoprimes, Carmichael numbers and classical-cipher calculations only as supporting background. They are less directly supported by the CT4104 learning outcomes than applied cryptography, network protocols and practical security assessment.

### Study sequence when past papers are unavailable

1. Learn the crypto concepts needed for confidentiality, integrity, authentication and key exchange.
2. Map each concept into TLS, IPSec, X.509 and OpenSSL. Be able to explain what it protects and why it is needed.
3. Practise analysing a simple system: define its assets and threats, select mitigations, then explain how you would test them ethically.
4. Use the official learning outcomes as a checklist. For each outcome, prepare at least one protocol example and one failure or attack scenario.

This gives CT4104 a usable revision structure without pretending that CS402 papers predict its exam.

## Illustrative Practice Questions

These questions are derived from the published learning outcomes and module description. They are not past-paper questions or predictions of the assessment format.

### Easy

1. Define confidentiality, integrity and authentication. Name one mechanism that provides each property in a TLS-style secure connection. Watch: [Computerphile: What is TLS?](https://www.youtube.com/watch?v=0TLDTodL7Lc)
2. Compare symmetric and public-key encryption. Why do secure network protocols normally use both rather than choosing only one? Watch: [Computerphile: Public Key Cryptography](https://www.youtube.com/watch?v=GSIDS_lvRv4)
3. Explain what a cryptographic hash detects when a downloaded file has been changed. Why is a hash value alone insufficient to prove who supplied the file? Watch: [Computerphile: Hashing Algorithms](https://www.youtube.com/watch?v=b4b8ktEV4Bg)
4. Explain the difference between a threat, a vulnerability and a mitigation. Apply STRIDE to identify one threat against a student web application. Watch: [Netsec Explained: STRIDE Threat Modeling for Beginners](https://www.youtube.com/watch?v=rEnJYNkUde0)

### Medium

1. A company signs a software update before publishing it. Describe how a client uses the signer’s public key and the update hash to verify integrity and origin. State one security property this does not provide. Watch: [Computerphile: Digital Signatures](https://www.youtube.com/watch?v=s22eJ1eVLTU)
2. Two internal services already share a secret key. Explain why a MAC is appropriate for checking whether a message was altered, and contrast it with a digital signature. Watch: [Computerphile: Message Authentication Codes](https://www.youtube.com/watch?v=wlSG3pEiQdc) and [Computerphile: Digital Signatures](https://www.youtube.com/watch?v=s22eJ1eVLTU)
3. An organisation needs to connect two offices over the public internet. Explain how IPsec tunnel mode, ESP and IKE contribute to a secure VPN. Watch: [Professor Messer: IPsec and VPNs](https://www.youtube.com/watch?v=5BahWbszVAY)
4. Build a small STRIDE threat model for an account-login system. Identify one spoofing or information-disclosure threat, its likely impact, and a suitable mitigation. Watch: [Netsec Explained: STRIDE Threat Modeling for Beginners](https://www.youtube.com/watch?v=rEnJYNkUde0)

### Hard

1. A browser accepts a certificate for the wrong hostname. Analyse how this can enable a man-in-the-middle attack, and explain how certificate validation and trust anchors should stop it. Watch: [Computerphile: Man-in-the-Middle Attacks and Superfish](https://www.youtube.com/watch?v=-enHfpHMBo4)
2. Design a secure API channel using standard TLS components. Explain how key exchange, symmetric encryption, authentication and integrity protections work together, and why custom cryptography should be avoided. Watch: [Computerphile: Diffie-Hellman Key Exchange](https://www.youtube.com/watch?v=NmM9HA2MQGI), [Computerphile: Message Authentication Codes](https://www.youtube.com/watch?v=wlSG3pEiQdc) and [Computerphile: What is TLS?](https://www.youtube.com/watch?v=0TLDTodL7Lc)
3. You are authorised to assess a web application. Explain what safe reconnaissance should establish before testing, and why discovering domains or services outside the agreed scope must not expand the assessment automatically. Watch: [The Cyber Mentor: Ethical Hacking in 15 Hours, Part 2](https://www.youtube.com/watch?v=sH4JCwjybGs)
4. An exposed administrative interface relies on one reusable password. Analyse the risk and recommend layered controls that reduce both credential-guessing risk and the damage from a compromised password. Watch: [Computerphile: Diceware and Passwords](https://www.youtube.com/watch?v=Pe_3cFuSw1E)

## Predictability Audit (2026-07-17)

- **Status: Unknown / low confidence.** No local `CT4104/*.pdf` past-paper files are present, so there is no evidence for repeated topics, form, or lecturer continuity.
- **Applicability:** the current [official module page](https://www.universityofgalway.ie/course-information/module/CT4104) is the revision-scope source: applied cryptography, TLS/IPSec/X.509, OpenSSL, threat analysis and authorised pen-testing.
- **Decision:** do not make exam predictions. Use official outcomes and current teaching/CA material only until local papers become available.

## Topic Guides

Official-page-derived revision frameworks only: no local CT4104 papers are stored, so these question plans are lower-confidence study support, not predictions of assessment format.

- [Security foundations](security_foundations_revision_sheet.html)
- [Cryptography, hashes, MACs and signatures](cryptography_hashes_macs_signatures_revision_sheet.html)
- [X.509](x509_revision_sheet.html)
- [TLS](tls_revision_sheet.html)
- [IPSec](ipsec_revision_sheet.html)
- [OpenSSL](openssl_revision_sheet.html)
- [Threat analysis](threat_analysis_revision_sheet.html)
- [Ethical hacking and pen-testing](ethical_hacking_pentesting_revision_sheet.html)

## Short Learning Material

Use Degreed/Percipio-style catalogues for short tutorials, guided projects, or video chapters. Prefer material under 3 hours per topic.

- Computer security fundamentals: CIA triad, threat models, authentication and access control.
- Network security basics: firewalls, TLS, VPNs, secure routing and common attack paths.
- Web security crash course: OWASP Top 10, XSS, SQL injection, CSRF and secure session handling.
- Cryptography for security engineers: hashing, symmetric encryption, public-key crypto and certificates.
- Secure software development: secure coding, dependency risk, secrets handling and logging.
- Vulnerability assessment basics: CVSS, scanning concepts, patch prioritisation and risk reporting.
