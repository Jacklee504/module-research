---
code: MA4102
title: Algebraic Foundations of Quantum Computing - Most Asked Exam Questions
source_papers:
  - 2021_2022
  - 2022_2023
  - 2023_2024
  - 2024_2025
  - 2025_2026
primary_current_papers:
  - 2023_2024
  - 2024_2025
  - 2025_2026
---

# MA4102 - Most Asked Exam Questions

## How to Use This Document

<div class="source-scope">
<p><strong>Source scope:</strong> all five supplied MA4102 papers were checked: <a href="2021_2022.pdf" target="_blank" rel="noopener noreferrer">2021/22</a>, <a href="2022_2023.pdf" target="_blank" rel="noopener noreferrer">2022/23</a>, <a href="2023_2024.pdf" target="_blank" rel="noopener noreferrer">2023/24</a>, <a href="2024_2025.pdf" target="_blank" rel="noopener noreferrer">2024/25</a>, and <a href="2025_2026.pdf" target="_blank" rel="noopener noreferrer">2025/26</a>.</p>
<p><strong>Primary evidence:</strong> the latest three papers, 2023/24, 2024/25, and 2025/26, are treated as the current-format papers. The 2021/22 and 2022/23 papers are used as backup and cross-lecturer evidence.</p>
<p><strong>Rendered-page check:</strong> the PDFs were rendered with Poppler and checked visually against extracted text so notation, subparts, and mark allocations were not taken only from OCR/text extraction.</p>
</div>

1. Revise by question family, not by broad topic alone.
2. Use the "appears as" bullets to find the original paper questions.
3. Attempt the original question first.
4. Then read the answer frame and convert only missing reusable pieces into flashcards.

## Lecturer and Evidence Weighting

The primary current-format papers split by lecturer:

- 2023/24 - Michael Mc Gettrick starred.
- 2024/25 - Michael Mc Gettrick starred.
- 2025/26 - Mark Howard starred.

The current module page lists Michael Mc Gettrick, so the 2023/24 and 2024/25 papers are the best first drill set. The 2025/26 Mark Howard paper must still be taken seriously because it is the latest paper and keeps the same core families while changing the style: more basis changes, projective-measurement checks, Bell-state algebra, and proof/construction tasks.

Practical rule: learn the Mc Gettrick calculation templates first, then use the Howard paper to prevent overfitting to one setter's wording.

## Ranked Current Question Families

The ranking combines recurrence across the latest three current-format papers and approximate current-paper mark weight. Some marks overlap because a subpart can belong to more than one skill family, for example projective measurement belongs to both basis measurement and measurement theory.

## Priority 1 - Algorithms: Grover, QFT, Deutsch-Jozsa, And Search

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers. <strong>Approximate current mark weight:</strong> about 95 marks across 2023/24-2025/26 when Grover, QFT, Deutsch-Jozsa, and classical search are counted together.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q4(ii) - Michael Mc Gettrick - "Calculate the permutation matrix U_f used in the Deutsch-Jozsa algorithm" for a specified Boolean function. [10 marks]</li>
  <li>2023/24 - Q5(i) - Michael Mc Gettrick - simple classical search in list L = [s,t,b,u,a,y,o,p]: best, worst, and average comparisons. [9 marks]</li>
  <li>2023/24 - Q5(ii) - Michael Mc Gettrick - Grover probability of success after one and two operations for list length 8. [16 marks]</li>
  <li>2024/25 - Q4(ii) - Michael Mc Gettrick - "Calculate the Quantum Fourier Transform" of two qudit states. [10 marks]</li>
  <li>2024/25 - Q5(i)-(iii) - Michael Mc Gettrick - Grover search on list length 32: theoretical real iterate count, best integer count and probability, second-best count and probability. [6 + 11 + 8 marks]</li>
  <li>2025/26 - Q3(a) - Mark Howard - Grover iterate as a 2 x 2 matrix in the {|a>, |phi>} basis for list length 4, then compute |psi> and G|psi>. [13 marks]</li>
  <li>2025/26 - Q3(b) - Mark Howard - calculate QFT of two qudit states. [12 marks]</li>
</ul>

Distinct variants to retain:

- Grover probability after a fixed number of operations, as in 2023/24.
- Grover optimal iteration count and neighbouring probabilities, as in 2024/25.
- Grover 2D-basis matrix construction, as in 2025/26 and 2022/23.
- QFT of explicit small vectors.
- Deutsch-Jozsa oracle/permutation matrix for `U_f |x,y> = |x,y xor f(x)>`.
- Classical search comparison counts as a one-current-paper variant attached to Grover/search.

<blockquote><p>Consolidated question: Given a small quantum algorithm setup, compute the required state transformation, probability, matrix, or iterate count without losing basis order, normalisation, phase, or measurement convention.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> the basis order, the defining formula, the substituted numbers, exact amplitudes before probabilities, and a final probability/count/matrix. For Grover, state <code>sin(theta)=1/sqrt(N)</code> and <code>P_k=sin^2((2k+1)theta)</code>. For QFT, state <code>F_d|x&gt;=d^{-1/2} sum_y omega^{xy}|y&gt;</code>, with <code>omega=e^{2 pi i/d}</code>. For Deutsch-Jozsa, list the basis-state mapping and then place one <code>1</code> per column in the corresponding output row.</p>
</div>

Standard worked facts:

- For 2024/25 `N=32`, `theta=arcsin(1/sqrt(32))`, `k* = pi/(4theta)-1/2 = 3.919...`; best integer is `4`, with success probability about `0.99918`; second-best neighbouring integer is `3`, about `0.89694`.
- For 2023/24 `N=8`, one Grover operation gives `25/32`; two operations give `121/128`, so two operations is better.
- For the Mark Howard `N=4` Grover basis version, `|psi>=(1/2)|a>+(sqrt(3)/2)|phi>` and

```text
G = [ 1/2         sqrt(3)/2 ]
    [ -sqrt(3)/2 1/2        ],
G|psi> = |a>.
```

## Priority 2 - State Measurement, Density Matrices, Bloch Sphere, And Basis Change

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers. <strong>Approximate current mark weight:</strong> about 80 marks across qutrit, qubit, density, and basis-measurement tasks.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q1(i)(a)-(c) - Michael Mc Gettrick - qutrit state; probability of measuring |1>; density matrix; apply Fourier-style unitary and calculate subsequent probability of |1>. [14 marks]</li>
  <li>2023/24 - Q1(ii)(a)-(b) - Michael Mc Gettrick - qubit state; Bloch sphere angles theta and phi; probability of obtaining |+> in the {|+>, |->} basis. [11 marks]</li>
  <li>2024/25 - Q1(i)(a)-(c) - Michael Mc Gettrick - qutrit state; probability of measuring |2>; density matrix; apply unitary and calculate subsequent probability of |2>. [14 marks]</li>
  <li>2024/25 - Q1(ii)(a)-(b) - Michael Mc Gettrick - qubit state; Bloch sphere angles theta and phi; |+> probability. [11 marks]</li>
  <li>2025/26 - Q1(a) - Mark Howard - write arbitrary qubit `|psi>=alpha|0>+beta|1>` as `gamma|+>+delta|->` and give probabilities of + and -. [7 marks]</li>
  <li>2025/26 - Q1(b) - Mark Howard - derive the same plus/minus probabilities using a projective measurement and check the definition. [6 marks]</li>
  <li>2025/26 - Q2(a)-(c) - Mark Howard - qutrit computational-basis measurement and post-measurement state; density matrix; apply unitary and calculate subsequent outcome-2 probability. [7 + 4 + 6 marks]</li>
</ul>

Distinct variants to retain:

- Computational-basis measurement probability and post-measurement state.
- Density matrix `rho=|psi><psi|` for a qutrit.
- Applying a supplied unitary before measuring again.
- Bloch sphere parameters for a qubit.
- Plus/minus basis conversion and projective-measurement derivation.
- Legacy backup: pure-state density-matrix eigenvalues and entropy in 2022/23 Q2(c).

<blockquote><p>Consolidated question: Given a qubit or qutrit state, calculate measurement probabilities, density matrices, basis-change probabilities, and unitary-updated probabilities with correct complex conjugation and normalisation.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> amplitude moduli squared for probabilities, explicit post-measurement state when requested, the full outer-product density matrix, the matrix-vector product for any unitary update, and the final squared-modulus probability. For plus/minus measurements, <code>gamma=(alpha+beta)/sqrt(2)</code>, <code>delta=(alpha-beta)/sqrt(2)</code>, so <code>P(+)=|alpha+beta|^2/2</code> and <code>P(-)=|alpha-beta|^2/2</code>. For Bloch sphere form, remove global phase and match <code>|psi&gt;=cos(theta/2)|0&gt;+e^{i phi} sin(theta/2)|1&gt;</code>.</p>
</div>

Standard worked fact:

For the 2024/25 qutrit `|psi>=(1/3)(-2|0>-i|1>+2i|2>)`, the initial probability of `|2>` is `4/9`,

```text
rho = (1/9)[ 4   -2i   4i ]
            [ 2i   1   -2 ]
            [ -4i -2    4 ],
```

and after the supplied unitary `U|psi>=(1/3)(-2,2,1)^T`, so the final probability of `|2>` is `1/9`.

## Priority 3 - Entanglement, Reduced Density Matrices, Purity, Bell States, And Entropy

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers. <strong>Approximate current mark weight:</strong> about 83 marks, including Bell-state variants.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q2 - Michael Mc Gettrick - four 2-qubit column vectors; calculate purity and entanglement using von Neumann entropy of the reduced density matrix for the second qubit. [25 marks]</li>
  <li>2024/25 - Q2(i) - Michael Mc Gettrick - three 2-qubit states; calculate purity and entanglement using the reduced density matrix. [18 marks]</li>
  <li>2024/25 - Q2(ii) - Michael Mc Gettrick - prove unitary transformations preserve state purity. [7 marks]</li>
  <li>2025/26 - Q2(d) - Mark Howard - prove whether two supplied 2-qubit states are entangled. [8 marks]</li>
  <li>2025/26 - Q5(a) - Mark Howard - show Bell state `|beta_00>` equals `(1/sqrt(2))(|psi,psi>+|psi_perp,psi_perp>)` in a rotated basis. [8 marks]</li>
  <li>2025/26 - Q5(b) - Mark Howard - after Alice applies `U_theta^-1` and measures, state Bob's pure state for outcome zero or one. [9 marks]</li>
  <li>2025/26 - Q5(c) - Mark Howard - parity measurement projectors and probability of "even" for `|beta_00>`. [8 marks]</li>
</ul>

Distinct variants to retain:

- Reduced density matrix, purity, and entropy calculations for explicit 4-vectors.
- Entanglement decision/proof for supplied 2-qubit vectors.
- Unit purity preservation proof.
- Bell-state entanglement and rotated-basis identity.
- Alice/Bob collapse after measurement.
- Parity measurement validity and probability.

<blockquote><p>Consolidated question: Given a 2-qubit state, decide whether it is entangled by reduced states, purity, entropy, or Bell-state algebra, and prove any stated unitary or projective-measurement property.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> the basis order, the reduced density matrix, the purity <code>Tr(rho^2)</code>, entropy/eigenvalue reasoning when required, and the entanglement conclusion. For <code>|psi&gt;=a|00&gt;+b|01&gt;+c|10&gt;+d|11&gt;</code>, reducing to the second qubit gives <code>[[|a|^2+|c|^2, a b* + c d*], [a* b + c* d, |b|^2+|d|^2]]</code>. A pure reduced state means no entanglement; a mixed reduced state means entanglement for an overall pure bipartite state.</p>
</div>

Standard worked facts:

- For `|beta_00>=(|00>+|11>)/sqrt(2)`, the reduced state is `I/2`, purity is `1/2`, and entropy is `1`, so it is maximally entangled.
- Unitary purity proof:

```text
rho' = U rho U^dagger
Tr((rho')^2) = Tr(U rho U^dagger U rho U^dagger)
             = Tr(U rho^2 U^dagger)
             = Tr(rho^2).
```

## Priority 4 - Channels, Kraus Operators, POVMs, And Projective Measurements

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers. <strong>Approximate current mark weight:</strong> about 59 marks, with some overlap with basis/Bell questions.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q3(i)(a)-(b) - Michael Mc Gettrick - phase damping CPTP map; write 4 x 4 matrix; calculate Kraus operators `M_0=<0|U|0>` and `M_1=<1|U|0>`. [14 marks]</li>
  <li>2024/25 - Q3(i) - Michael Mc Gettrick - given orthonormal basis |g>, |h>, calculate associated Kraus operators for amplitude damping channel. [13 marks]</li>
  <li>2024/25 - Q3(ii) - Michael Mc Gettrick - POVM effects `E_1`, `E_2`, `E_3=I-E_1-E_2`; calculate all three outcome probabilities. [12 marks]</li>
  <li>2025/26 - Q1(b) - Mark Howard - plus/minus projective measurement and projective-measurement definition. [6 marks]</li>
  <li>2025/26 - Q4(d) - Mark Howard - Pauli Kraus operators; confirm trace-preserving channel and describe effect on arbitrary state `rho`. [6 marks]</li>
  <li>2025/26 - Q5(c) - Mark Howard - parity measurement projectors; show projective-measurement requirements and calculate even probability. [8 marks]</li>
</ul>

Distinct variants to retain:

- Kraus extraction from a system-environment unitary.
- Channel matrix representation.
- Trace-preservation check.
- POVM probabilities.
- Projective measurement checklist.
- Depolarising channel effect on `rho`.

<blockquote><p>Consolidated question: Given a channel or measurement, write the operator representation, verify the required conditions, and calculate the requested outcome probabilities or transformed state.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> the operator definitions, where the system and environment sit in the tensor order, the actual matrix/operator entries, and the condition being checked. For Kraus operators, use <code>M_e=&lt;e|U|0&gt;</code> when the environment starts in <code>|0&gt;</code>. For POVMs, use <code>P(i)=&lt;psi|E_i|psi&gt;</code>. For projective measurements, check Hermitian, idempotent, orthogonal, and complete: <code>Pi_i^dagger=Pi_i</code>, <code>Pi_i^2=Pi_i</code>, <code>Pi_i Pi_j=0</code>, and <code>sum_i Pi_i=I</code>.</p>
</div>

Standard worked facts:

- Phase damping with `U|00>=sqrt(1-p)|00>+i sqrt(p)|01>` and `U|10>=|10>` gives

```text
M_0 = [ sqrt(1-p) 0 ],   M_1 = [ i sqrt(p) 0 ],
      [ 0         1 ]           [ 0          0 ].
```

- The 2025/26 Pauli Kraus set is trace preserving because

```text
((4-3lambda)/4)I + 3(lambda/4)I = I.
```

Its action is

```text
rho -> ((4-3lambda)/4)rho
       + (lambda/4)(X rho X + Y rho Y + Z rho Z),
```

which shrinks the Bloch vector toward `I/2`.

## Priority 5 - Gates, Circuits, Truth Tables, Teleportation, And Operator Algebra

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers. <strong>Approximate current mark weight:</strong> about 41 marks outside algorithm-specific matrices.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q4(i)(a)-(c) - Michael Mc Gettrick - draw circuits for gate expressions using H, X, Y, CNOT, SWAP, and controlled rotation. [15 marks]</li>
  <li>2024/25 - Q4(iii) - Michael Mc Gettrick - draw the quantum teleportation circuit where Alice transmits an unknown qubit to Bob using a maximally entangled pair. [8 marks]</li>
  <li>2025/26 - Q1(c) - Mark Howard - truth table for controlled-Hadamard gate `C_H`. [6 marks]</li>
  <li>2025/26 - Q1(d) - Mark Howard - output state for a drawn circuit. [6 marks]</li>
  <li>2025/26 - Q4(c) - Mark Howard - simplify `( <0| tensor I )(alpha_00|00> + alpha_01|01> + alpha_10|10> + alpha_11|11>)`. [6 marks]</li>
</ul>

Distinct variants to retain:

- Draw a circuit from symbolic gate notation.
- Truth table for a controlled gate.
- Calculate circuit output state.
- Teleportation circuit construction.
- Bra/tensor operator simplification.
- Legacy backup: CNOT(1,2)/CNOT(2,1) truth tables and the Hadamard-conjugated CNOT identity in 2022/23.

<blockquote><p>Consolidated question: Translate between symbolic gates, circuit diagrams, truth tables, and output states while preserving qubit order and gate order.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> the input basis order, which qubit is control/target, the right-to-left order of symbolic products, and the final state or diagram. For <code>C_H</code>, the control-0 inputs are unchanged; <code>|10&gt;</code> maps to <code>(|10&gt;+|11&gt;)/sqrt(2)</code>, and <code>|11&gt;</code> maps to <code>(|10&gt;-|11&gt;)/sqrt(2)</code>. For the projection-style simplification, the answer is <code>alpha_00|0&gt;+alpha_01|1&gt;</code> because only first-qubit-zero terms survive.</p>
</div>

Teleportation circuit answer:

1. Alice has unknown state `|psi>`.
2. Alice and Bob share a Bell pair.
3. Alice applies CNOT from the unknown qubit to her Bell-pair qubit.
4. Alice applies H to the unknown-qubit wire.
5. Alice measures her two qubits and sends two classical bits to Bob.
6. Bob applies the corresponding Pauli correction, giving `|psi>`.

## Priority 6 - No-Cloning, Orthogonal-State Construction, And Unitary-Impossibility Proofs

<p class="priority-note"><strong>Current recurrence:</strong> 3/3 current papers if unitary proof/construction variants are counted together. <strong>Approximate current mark weight:</strong> about 31 marks.</p>

Appears as:

<ul class="paper-list">
  <li>2023/24 - Q3(ii) - Michael Mc Gettrick - prove the no-cloning theorem: no unitary map sends `|psi>|phi>` to `|psi>|psi>`. [11 marks]</li>
  <li>2024/25 - Q4(i) - Michael Mc Gettrick - prove the no-cloning theorem, "it is impossible to copy a quantum state." [7 marks]</li>
  <li>2024/25 - Q2(ii) - Michael Mc Gettrick - prove unitary transformations preserve state purity. [7 marks]</li>
  <li>2025/26 - Q4(a) - Mark Howard - derive `|psi_perp>` orthogonal to `|psi>=alpha|0>+beta|1>`, find unitary mapping computational basis to `{|psi>,|psi_perp>}`, and confirm `UU^dagger=I`. [7 marks]</li>
  <li>2025/26 - Q4(b) - Mark Howard - prove no-cloning theorem for a 2-qubit unitary mapping `|psi>|0>` to `|psi>|psi>`. [6 marks]</li>
</ul>

Distinct variants to retain:

- No-cloning using inner-product preservation.
- No-cloning using linearity on a superposition.
- Orthogonal-state and unitary construction.
- Unitary purity preservation.
- Legacy backup: no-deleting/no-information-deletion proof from 2022/23.

<blockquote><p>Consolidated question: Prove a proposed universal quantum operation cannot exist, or construct a valid unitary, using linearity, inner-product preservation, purity, and orthonormal columns.</p></blockquote>

<div class="answer-frame">
<p><strong>Complete answer must contain:</strong> the assumed unitary action, the invariant being preserved, the contradiction or verification, and the quantifier "for every qubit state" where relevant. For no-cloning, assume <code>U|psi&gt;|0&gt;=|psi&gt;|psi&gt;</code> and <code>U|phi&gt;|0&gt;=|phi&gt;|phi&gt;</code>. Inner products give <code>&lt;psi|phi&gt;=&lt;psi|phi&gt;^2</code>, impossible for arbitrary non-identical, non-orthogonal states.</p>
</div>

Orthogonal-state construction:

```text
|psi> = alpha|0> + beta|1>,
|psi_perp> = -conjugate(beta)|0> + conjugate(alpha)|1>,
U = [ alpha  -conjugate(beta) ]
    [ beta    conjugate(alpha) ].
```

The columns are orthonormal, so `U U^dagger = I`.

## Coverage Map For Current-Format Papers

This map checks every current-format subpart against a family above. No current-paper subpart is intentionally excluded.

| Paper | Subpart | Marks | Covered by family |
|---|---:|---:|---|
| 2023/24 | Q1(i)(a) qutrit measurement probability | part of 14 | Priority 2 |
| 2023/24 | Q1(i)(b) density matrix | part of 14 | Priority 2 |
| 2023/24 | Q1(i)(c) unitary then probability | part of 14 | Priority 2 |
| 2023/24 | Q1(ii)(a) Bloch sphere angles | part of 11 | Priority 2 |
| 2023/24 | Q1(ii)(b) plus/minus measurement | part of 11 | Priority 2 |
| 2023/24 | Q2(a) purity for four 2-qubit states | part of 25 | Priority 3 |
| 2023/24 | Q2(b) entanglement via reduced entropy | part of 25 | Priority 3 |
| 2023/24 | Q3(i)(a) 4 x 4 channel matrix | part of 14 | Priority 4 |
| 2023/24 | Q3(i)(b) Kraus operators | part of 14 | Priority 4 |
| 2023/24 | Q3(ii) no-cloning proof | 11 | Priority 6 |
| 2023/24 | Q4(i)(a)-(c) draw circuits | 15 | Priority 5 |
| 2023/24 | Q4(ii) Deutsch-Jozsa permutation matrix | 10 | Priority 1 |
| 2023/24 | Q5(i)(a)-(c) classical search comparisons | 9 | Priority 1 |
| 2023/24 | Q5(ii)(a)-(b) Grover probabilities | 16 | Priority 1 |
| 2024/25 | Q1(i)(a) qutrit measurement probability | part of 14 | Priority 2 |
| 2024/25 | Q1(i)(b) density matrix | part of 14 | Priority 2 |
| 2024/25 | Q1(i)(c) unitary then probability | part of 14 | Priority 2 |
| 2024/25 | Q1(ii)(a) Bloch sphere angles | part of 11 | Priority 2 |
| 2024/25 | Q1(ii)(b) plus/minus measurement | part of 11 | Priority 2 |
| 2024/25 | Q2(i)(a) purity for three 2-qubit states | part of 18 | Priority 3 |
| 2024/25 | Q2(i)(b) entanglement via reduced entropy | part of 18 | Priority 3 |
| 2024/25 | Q2(ii) unitary preserves purity | 7 | Priority 3 / Priority 6 |
| 2024/25 | Q3(i) Kraus operators for amplitude damping | 13 | Priority 4 |
| 2024/25 | Q3(ii) POVM probabilities | 12 | Priority 4 |
| 2024/25 | Q4(i) no-cloning proof | 7 | Priority 6 |
| 2024/25 | Q4(ii) QFT of qudit states | 10 | Priority 1 |
| 2024/25 | Q4(iii) teleportation circuit | 8 | Priority 5 / Priority 3 |
| 2024/25 | Q5(i) theoretical Grover iterates | 6 | Priority 1 |
| 2024/25 | Q5(ii) best integer Grover count/probability | 11 | Priority 1 |
| 2024/25 | Q5(iii) second-best Grover count/probability | 8 | Priority 1 |
| 2025/26 | Q1(a) plus/minus basis probabilities | 7 | Priority 2 |
| 2025/26 | Q1(b) projective-measurement derivation | 6 | Priority 2 / Priority 4 |
| 2025/26 | Q1(c) controlled-H truth table | 6 | Priority 5 |
| 2025/26 | Q1(d) circuit output state | 6 | Priority 5 |
| 2025/26 | Q2(a) qutrit measurement and post-measurement state | 7 | Priority 2 |
| 2025/26 | Q2(b) qutrit density matrix | 4 | Priority 2 |
| 2025/26 | Q2(c) unitary then probability | 6 | Priority 2 |
| 2025/26 | Q2(d) entanglement of two 2-qubit states | 8 | Priority 3 |
| 2025/26 | Q3(a) Grover 2D matrix, |psi>, and G|psi> | 13 | Priority 1 |
| 2025/26 | Q3(b) QFT of qudit states | 12 | Priority 1 |
| 2025/26 | Q4(a) orthogonal state and unitary construction | 7 | Priority 6 |
| 2025/26 | Q4(b) no-cloning proof | 6 | Priority 6 |
| 2025/26 | Q4(c) projection/tensor simplification | 6 | Priority 5 |
| 2025/26 | Q4(d) Kraus trace-preserving depolarising channel | 6 | Priority 4 |
| 2025/26 | Q5(a) Bell state in rotated basis | 8 | Priority 3 |
| 2025/26 | Q5(b) Alice measurement and Bob state | 9 | Priority 3 |
| 2025/26 | Q5(c) parity projective measurement | 8 | Priority 3 / Priority 4 |

## Legacy And Backup Material

These are not discarded, but they should not outrank the current-format papers.

<ul class="paper-list">
  <li>2021/22 - Mc Gettrick - backup for qutrit measurement/density/unitary, Bloch sphere, reduced-state purity/entropy, Kraus/POVM, circuit drawing, QFT, and Grover list length 32.</li>
  <li>2022/23 - Mark Howard - backup for CNOT truth tables, Hadamard-conjugated CNOT, qutrit density/eigenvalues/entropy, Grover 2D matrix, QFT, Bell entanglement, no-cloning, no-deleting, rotated Bell basis, Alice/Bob measurement, and parity projectors.</li>
</ul>

Legacy-only or lower-priority variants:

- No-deleting/no-information-deletion proof: explicit in 2022/23 only.
- CNOT(1,2)/CNOT(2,1) truth tables and Hadamard-conjugated CNOT identity: explicit in 2022/23 only, though controlled-gate truth tables remain current through controlled-H in 2025/26.
- Pure qutrit density-matrix eigenvalues and "state with different von Neumann entropy": explicit in 2022/23 only; still useful as backup for density-matrix concepts.

## Recommended Study Order

1. Algorithms: Grover, QFT, Deutsch-Jozsa, and search.
2. State measurement, density matrices, Bloch sphere, and basis change.
3. Entanglement, reduced density matrices, purity, Bell states, and entropy.
4. Channels, Kraus operators, POVMs, and projective measurements.
5. Gates, circuits, truth tables, teleportation, and operator algebra.
6. No-cloning, orthogonal-state construction, and unitary proof constraints.
7. Legacy-only backup: no-deleting, CNOT-H conjugation, and pure-state entropy/eigenvalue variants.

## Flashcard Rule

Only make a flashcard when the answer is a reusable exam-safe fact, proof chain, construction, or calculation template. Do not make separate cards merely because the same question changed numbers. Do make separate cards when the answer structure differs, for example Grover optimal iterations versus Grover 2D matrix construction.
