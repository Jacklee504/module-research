---
code: MA4102
title: Algebraic Foundations of Quantum Computing - Most Asked Exam Questions
source_papers:
  - 2021_2022
  - 2022_2023
  - 2023_2024
  - 2024_2025
  - 2025_2026
same_lecturer_focus: Michael Mc Gettrick starred on 2021_2022, 2023_2024, 2024_2025
cross_lecturer_check: Mark Howard starred on 2022_2023 and 2025_2026
---

# MA4102 - Most Asked Exam Questions

## How to Use This Document

Use this as the first pass before making flashcards.

1. Pick one question family below.
2. Attempt the relevant paper questions without notes.
3. Mark the attempt against the repeated structure: definitions, setup, calculation steps, final probability/state/proof conclusion.
4. After answering the same family correctly a few times, convert only the reusable pieces into flashcards.

Do not make flashcards too early. For MA4102, the marks usually come from being able to execute a calculation or proof template, not from recognising a topic name.

## Lecturer Weighting

The current module page lists Michael Mc Gettrick, so the first weighting should be:

- Highest confidence same-lecturer pattern: 2023/24 and 2024/25.
- Supporting same-lecturer pattern: 2021/22.
- Cross-lecturer stability check: 2022/23 and 2025/26, both Mark Howard.

The important finding is that the main exam families survive the lecturer change. Mark Howard papers use different wording and sometimes more theorem/projective-measurement framing, but the same core operations keep appearing.

## Should Mark Howard Papers Count?

Yes, but use them as the second pass.

The Michael Mc Gettrick papers are the best first drill set because they match the current-page lecturer pattern. The Mark Howard papers should still count because they test the same families with different presentation:

- Mc Gettrick papers lean more toward direct calculations: qutrit states, density matrices, Bloch sphere angles, Kraus/POVM calculations, circuits, QFT and Grover probabilities.
- Mark Howard papers lean more toward structural versions: truth tables, projective-measurement requirements, no-cloning/no-deleting proofs, Bell-state identities, parity measurement and Grover in the `|a>`, `|phi>` basis.

Practical rule: learn the Mc Gettrick calculation template first, then use the Mark Howard papers to check that you can still recognise the same family when the wording changes.

## Priority 1 - Grover Search And QFT

Frequency: 5/5 papers if Grover and QFT are counted as the recurring algorithm block.

Appears as:

- 2021/22 - Q5 - Michael Mc Gettrick - Grover search on list length 32: theoretical iterates, best integer iterations, success probability, second-best probability.
- 2022/23 - Q3(a), Q3(b) - Mark Howard - Grover 2D matrix for list length 4, then QFT of qudit states.
- 2023/24 - Q5 - Michael Mc Gettrick - Grover search on list length 8: classical best/worst/average comparisons, Grover success after one and two operations.
- 2024/25 - Q5, Q4(ii) - Michael Mc Gettrick - Grover list length 32, plus QFT of qudit states.
- 2025/26 - Q3(a), Q3(b) - Mark Howard - Same Grover 2D matrix family as 2022/23, plus QFT of qudit states.

Consolidated most-asked question:

> Given a Grover search setup, calculate the iterate count or success probability, or express the Grover iterate in the two-dimensional `|a>`, `|phi>` basis. Also be able to calculate the QFT of small qudit vectors.

What to practise before flashcards:

- Formula for the optimal Grover angle/iterate count.
- How to round to the best integer number of iterations.
- How to compare neighbouring iteration probabilities.
- How to represent the uniform state in the `|a>`, `|phi>` basis.
- QFT calculation for dimension 3 or 4 vectors with roots of unity.

Good flashcards after practice:

- "What is the Grover success probability after k iterations?"
- "How do you choose the integer number of Grover iterations?"
- "What is `|phi>` in the Grover 2D basis?"
- "What is the QFT matrix/action on a d-dimensional qudit?"

## Priority 2 - Qutrit Measurement, Density Matrix, And Unitary Update

Frequency: 5/5 papers.

Appears as:

- 2021/22 - Q1(i) - Michael Mc Gettrick - Qutrit state, measurement probability, density matrix, apply unitary, new measurement probability.
- 2022/23 - Q2(a)-(d) - Mark Howard - Qutrit measurement and post-measurement state, density matrix, eigenvalues, entropy, comparison state, unitary update.
- 2023/24 - Q1(i) - Michael Mc Gettrick - Same qutrit measurement/density/unitary structure with different state and Fourier-style unitary.
- 2024/25 - Q1(i) - Michael Mc Gettrick - Same qutrit measurement/density/unitary structure.
- 2025/26 - Q2(a)-(c) - Mark Howard - Qutrit measurement and post-measurement state, density matrix, unitary update.

Consolidated most-asked question:

> Given a qutrit state, calculate a computational-basis measurement probability, write the density matrix, apply a unitary, and calculate the new measurement probability.

Same question family, even when wording changes:

- "probability of measuring `|1>` or `|2>`"
- "probability of seeing outcome 2"
- "post-measurement state"
- "density matrix `rho = |psi><psi|`"
- "subsequent probability after applying U"

What to practise before flashcards:

- Squared modulus of amplitudes.
- Correct normalisation checks.
- Outer product for a 3-component complex vector.
- Matrix-vector multiplication with complex entries.
- Final probability from the updated state.
- For Mark Howard-style variants: eigenvalues and von Neumann entropy of pure-state density matrices.

Good flashcards after practice:

- "How do you compute a density matrix from `|psi>`?"
- "What is the post-measurement state after outcome j?"
- "What are the eigenvalues and entropy of a pure density matrix?"
- "What is the workflow for apply-U-then-measure?"

## Priority 3 - Entanglement, Reduced Density Matrices, Purity, And Entropy

Frequency: 5/5 papers if calculation and proof variants are consolidated.

Appears as:

- 2021/22 - Q2 - Michael Mc Gettrick - Four 2-qubit column vectors; calculate purity and entanglement using reduced density matrix entropy.
- 2022/23 - Q4(a), Q5(a) - Mark Howard - Prove Bell state is entangled; show Bell state identity under rotated basis.
- 2023/24 - Q2 - Michael Mc Gettrick - Same four-state purity and entanglement calculation family as 2021/22.
- 2024/25 - Q2(i), Q2(ii) - Michael Mc Gettrick - Three 2-qubit states for purity/entanglement, plus proof that unitaries preserve purity.
- 2025/26 - Q2(d), Q5(a) - Mark Howard - Prove whether two 2-qubit states are entangled; Bell state identity under rotated basis.

Consolidated most-asked question:

> Given a 2-qubit state, determine whether it is entangled by calculating the reduced density matrix, purity, and/or von Neumann entropy. Also be ready to prove standard Bell-state entanglement identities.

Same question family, even when wording changes:

- "calculate purity"
- "calculate entanglement using Von Neumann entropy"
- "prove whether these 2-qubit states are entangled"
- "prove the Bell state is entangled"
- "show Bell state expression in a rotated basis"

What to practise before flashcards:

- Convert a 4-vector into a 2-qubit amplitude table.
- Trace out the first or second qubit.
- Compute reduced density matrix entries.
- Compute purity using `Tr(rho^2)`.
- Decide product vs entangled state.
- Identify entropy 0 for product/pure reduced state and nonzero entropy for entanglement.

Good flashcards after practice:

- "How do you form the reduced density matrix of the second qubit?"
- "What purity value indicates a pure reduced state?"
- "How does reduced-state entropy detect entanglement for a pure bipartite state?"
- "How do you prove `|beta_00>` is entangled?"

## Priority 4 - Gates, Circuits, Truth Tables, And Circuit Outputs

Frequency: 5/5 papers.

Appears as:

- 2021/22 - Q4(i) - Michael Mc Gettrick - Draw circuits from gate expressions: H, CNOT, SWAP, controlled rotation, X, Y.
- 2022/23 - Q1(a)-(c) - Mark Howard - CNOT truth tables, Hadamard-conjugated CNOT identity, output state for a circuit.
- 2023/24 - Q4(i), Q4(ii) - Michael Mc Gettrick - Draw circuits from gate expressions; Deutsch-Jozsa permutation matrix.
- 2024/25 - Q4(iii) - Michael Mc Gettrick - Draw teleportation circuit.
- 2025/26 - Q1(c)-(d), Q4(c) - Mark Howard - Controlled-Hadamard truth table, circuit output, simplify a projection/operator expression.

Consolidated most-asked question:

> Translate between gate notation, truth tables, circuit diagrams, and output states for small qubit systems.

Same question family, even when wording changes:

- "draw the circuit corresponding to operations"
- "write out the truth table"
- "what is the output state"
- "show Hadamards switch CNOT control and target"
- "calculate the permutation matrix used in Deutsch-Jozsa"
- "draw the teleportation circuit"

What to practise before flashcards:

- CNOT control/target conventions.
- Controlled-Hadamard truth table.
- SWAP and controlled rotation placement.
- Reading gate products in the correct order.
- Tensor product gate notation.
- Small output-state calculations.
- Deutsch-Jozsa `U_f` as a permutation on input/output basis states.

Good flashcards after practice:

- "What is the truth table for CNOT(1,2) vs CNOT(2,1)?"
- "What does surrounding CNOT by H on both qubits do?"
- "How do you read a gate product into a circuit?"
- "What are the steps in the teleportation circuit?"

## Priority 5 - Kraus Operators, POVMs, CPTP Maps, And Projective Measurements

Frequency: 5/5 papers if POVM, Kraus, CPTP and projective-measurement variants are consolidated.

Appears as:

- 2021/22 - Q3(i), Q3(ii) - Michael Mc Gettrick - Kraus operators for phase damping in a given basis; POVM outcome probabilities.
- 2022/23 - Q5(c) - Mark Howard - Parity measurement: show projective measurement requirements and calculate even probability.
- 2023/24 - Q3(i) - Michael Mc Gettrick - Phase damping CPTP map: write 4x4 matrix and calculate Kraus operators.
- 2024/25 - Q3(i), Q3(ii) - Michael Mc Gettrick - Kraus operators for amplitude damping; POVM outcome probabilities.
- 2025/26 - Q1(b), Q4(d), Q5(c) - Mark Howard - Projective measurement in `|+>`, `|->`; depolarising-channel trace preservation; parity measurement.

Consolidated most-asked question:

> Given a channel or measurement, verify the required measurement/channel conditions and calculate the resulting Kraus operators or outcome probabilities.

Same question family, even when wording changes:

- "calculate associated Kraus operators"
- "write down a 4x4 representation"
- "positive operator-valued measure probabilities"
- "show projective measurement requirements"
- "confirm Kraus operators are trace preserving"
- "describe the channel effect on arbitrary `rho`"

What to practise before flashcards:

- Extracting Kraus operators as environment matrix elements.
- Checking `sum E_k^dagger E_k = I`.
- Calculating POVM probabilities using `<psi|E_i|psi>`.
- Showing projectors are Hermitian, idempotent, orthogonal and sum to identity.
- Recognising phase damping, amplitude damping and depolarising-channel forms.

Good flashcards after practice:

- "What condition makes Kraus operators trace preserving?"
- "How do you calculate a POVM outcome probability?"
- "What must be checked for a projective measurement?"
- "How are Kraus operators extracted from a system-environment unitary?"

## Priority 6 - No-Cloning, No-Deleting, And Unitary-Impossibility Proofs

Frequency: 4/5 papers directly for no-cloning; 5/5 if broader unitary/proof constraints are included.

Appears as:

- 2022/23 - Q4(b), Q4(c) - Mark Howard - Prove no-cloning; prove unitaries cannot delete information.
- 2023/24 - Q3(ii) - Michael Mc Gettrick - Prove no-cloning theorem.
- 2024/25 - Q4(i), Q2(ii) - Michael Mc Gettrick - Prove no-cloning; prove unitaries preserve purity.
- 2025/26 - Q4(a), Q4(b) - Mark Howard - Construct orthogonal state/unitary; prove no-cloning.

Consolidated most-asked question:

> Prove that a proposed universal quantum operation cannot exist because it would contradict linearity, preservation of inner products, unitarity, or purity.

Same question family, even when wording changes:

- "prove no-cloning"
- "impossible to copy a quantum state"
- "unitaries cannot delete information"
- "unitaries preserve state purity"
- "find the unitary mapping computational basis to `|psi>`, `|psi_perp>`"

What to practise before flashcards:

- No-cloning proof using two arbitrary states and inner products.
- No-cloning proof using linearity on `|0>`, `|1>`, and superpositions.
- No-deleting/no-information deletion proof.
- `rho -> U rho U^dagger` and purity preservation.
- Constructing `|psi_perp>` and the unitary with columns `|psi>`, `|psi_perp>`.

Good flashcards after practice:

- "What is the shortest no-cloning proof?"
- "Where does linearity break universal cloning?"
- "Why do unitaries preserve inner products?"
- "Why does `Tr((U rho U^dagger)^2) = Tr(rho^2)`?"

## Priority 7 - `|+>`, `|->`, Bloch Sphere, And Basis Changes

Frequency: 4/5 papers directly; also supports measurement and gate questions.

Appears as:

- 2021/22 - Q1(ii) - Michael Mc Gettrick - Bloch sphere angles and probability of `|+>` measurement.
- 2023/24 - Q1(ii) - Michael Mc Gettrick - Same Bloch sphere plus `|+>` probability family.
- 2024/25 - Q1(ii) - Michael Mc Gettrick - Same Bloch sphere plus `|+>` probability family.
- 2025/26 - Q1(a), Q1(b) - Mark Howard - Express arbitrary qubit in `|+>`, `|->` basis; derive probabilities using projective measurement.

Consolidated most-asked question:

> Given a qubit state, convert between computational and `|+>`, `|->` basis, calculate measurement probabilities, and identify Bloch sphere angles.

Same question family, even when wording changes:

- "calculate angles theta and phi"
- "measure using `|+>` and `|->`"
- "determine probability as a function of alpha, beta"
- "derive the same result using a projective measurement"

What to practise before flashcards:

- `|+> = (|0> + |1>)/sqrt(2)` and `|-> = (|0> - |1>)/sqrt(2)`.
- Solving for coefficients in the plus/minus basis.
- Probability as squared modulus of the basis coefficient.
- Matching a qubit state to Bloch sphere parameters.
- Handling complex phase correctly.

Good flashcards after practice:

- "How do alpha and beta convert to plus/minus amplitudes?"
- "What are the Bloch sphere parameters for a general qubit?"
- "How do you compute measurement probability in a changed basis?"

## Priority 8 - Bell States, Teleportation, And Parity Measurement

Frequency: 3/5 as a distinct block, but high value because it appears as a full Mark Howard Q5 twice and overlaps with entanglement/projective measurement.

Appears as:

- 2022/23 - Q5(a)-(c) - Mark Howard - Bell state in rotated basis, Alice measurement after inverse unitary, parity measurement validity and probability.
- 2024/25 - Q4(iii) - Michael Mc Gettrick - Draw the teleportation circuit.
- 2025/26 - Q5(a)-(c) - Mark Howard - Same Bell/rotated-basis/parity-measurement family as 2022/23.

Consolidated most-asked question:

> Work fluently with the Bell state `|beta_00>`, rotated bases, teleportation-style measurement logic, and parity projectors.

Same question family, even when wording changes:

- "show Bell state in rotated basis"
- "Alice applies inverse unitary and measures"
- "what state does Bob have"
- "parity measurement projectors"
- "draw teleportation circuit"

What to practise before flashcards:

- Expand rotated-basis expressions carefully.
- Use Alice's measurement outcome to identify Bob's collapsed state.
- Verify parity projectors are a projective measurement.
- Know teleportation circuit order: entangled pair, CNOT, H, measurement, classical corrections.

Good flashcards after practice:

- "What is `|beta_00>`?"
- "How does `|beta_00>` transform under a shared rotated basis?"
- "What are the teleportation circuit steps?"
- "What are even and odd parity projectors?"

## Priority 9 - Deutsch-Jozsa And Lower-Frequency Algorithm Material

Frequency: 1/5 directly in the available papers, but still worth keeping because it sits in the official learning outcomes and appears in the same circuit/algorithm area.

Appears as:

- 2023/24 - Q4(ii) - Michael Mc Gettrick - Calculate the Deutsch-Jozsa permutation matrix `U_f` for a given Boolean function.

Consolidated most-asked question:

> Given a Boolean function, build the corresponding Deutsch-Jozsa oracle/permutation matrix.

What to practise before flashcards:

- How `U_f` maps `|x, y>` to `|x, y xor f(x)>`.
- How to turn the mapping into a permutation matrix.
- How this relates to circuit truth tables.

Good flashcards after practice:

- "What is the Deutsch-Jozsa oracle action?"
- "How do you build a permutation matrix from a basis-state map?"

## Same-Lecturer Core Set

If prioritising only Michael Mc Gettrick papers first, drill these in this order:

1. Qutrit measurement/density/unitary: 2021 Q1(i), 2023 Q1(i), 2024 Q1(i).
2. Bloch sphere and `|+>` measurement: 2021 Q1(ii), 2023 Q1(ii), 2024 Q1(ii).
3. Reduced density matrix/purity/entropy: 2021 Q2, 2023 Q2, 2024 Q2.
4. Kraus/POVM/channel: 2021 Q3, 2023 Q3(i), 2024 Q3.
5. Circuits and QFT/teleportation: 2021 Q4, 2023 Q4, 2024 Q4.
6. Grover: 2021 Q5, 2023 Q5, 2024 Q5.

This is the best initial study loop because it follows the current-page lecturer pattern while still covering almost all high-frequency exam families.

## Cross-Lecturer Stability Set

After the same-lecturer loop, use the Mark Howard papers to catch equivalent questions that appear in a different style:

1. 2022 Q2 and 2025 Q2 for qutrit/density/unitary variants.
2. 2022 Q3 and 2025 Q3 for Grover matrix plus QFT.
3. 2022 Q4 and 2025 Q4 for no-cloning and unitary proof variants.
4. 2022 Q5 and 2025 Q5 for Bell/rotated-basis/parity-measurement variants.
5. 2022 Q1 and 2025 Q1 for truth tables, basis measurement, and circuit outputs.

The goal here is not to study a second course. It is to make sure a wording change does not make a familiar family look unfamiliar.

## Recommended Study Order

1. Grover and QFT.
2. Qutrit measurement, density matrix and unitary update.
3. Entanglement, reduced density matrices, purity and entropy.
4. Gates, circuits, truth tables and circuit outputs.
5. Kraus operators, POVMs, CPTP maps and projective measurements.
6. No-cloning, no-deleting and unitary-impossibility proofs.
7. Plus/minus basis, Bloch sphere and basis changes.
8. Bell states, teleportation and parity measurement.
9. Deutsch-Jozsa oracle/permutation matrix.

## Consolidated Worked Answers

These are not year-by-year paper solutions. They are the reusable worked answers for the consolidated families above. Use them after attempting a question family yourself.

### Worked 1 - Grover Search And QFT

Core Grover setup for one marked item in a list of size `N`:

- Let `sin(theta) = 1/sqrt(N)`.
- After `k` Grover iterations, the success probability is
  `P_k = sin^2((2k + 1)theta)`.
- The ideal real-valued number of iterations is
  `k* = pi/(4theta) - 1/2`.
- In an exam, test the nearest integers to `k*` and choose the one with the larger `P_k`.

Worked answer for the repeated `N = 32` family:

1. `theta = arcsin(1/sqrt(32))`.
2. `k* = pi/(4theta) - 1/2 = 3.918...`, so the integer candidates are `k = 4` and `k = 3`.
3. For `k = 4`, `P_4 = sin^2(9theta) = 0.99918...`.
4. For `k = 3`, `P_3 = sin^2(7theta) = 0.89694...`.
5. For `k = 5`, `P_5 = sin^2(11theta) = 0.85964...`.

Answer: the theoretical number is about `3.918`; the best integer number is `4`, with success probability about `0.999`. The second-best nearby integer is `3`, with success probability about `0.897`.

Worked answer for the `N = 8`, one-marked-item family:

1. `theta = arcsin(1/sqrt(8))`.
2. After one Grover operation:
   `P_1 = sin^2(3theta) = 25/32 = 0.78125`.
3. After two Grover operations:
   `P_2 = sin^2(5theta) = 121/128 = 0.9453125`.

Answer: for the 2023-style list of length 8, two Grover operations give the higher success probability.

Worked answer for the Mark Howard `|a>`, `|phi>` version when `N = 4`:

- `|a>` is the marked state.
- `|phi> = (1/sqrt(3)) sum_{x != a} |x>`.
- The uniform superposition is
  `|psi> = (1/2)|a> + (sqrt(3)/2)|phi>`.
- Here `theta = arcsin(1/2) = pi/6`.
- In the basis `{|a>, |phi>}`, the Grover iterate is

```text
G = [ 1/2        sqrt(3)/2 ]
    [ -sqrt(3)/2 1/2       ].
```

Then

```text
G|psi>
= [ 1/2        sqrt(3)/2 ][ 1/2       ]
  [ -sqrt(3)/2 1/2       ][ sqrt(3)/2 ]
= [ 1 ]
  [ 0 ].
```

Answer: after one Grover iterate for `N = 4`, the state is exactly `|a>`, so the success probability is `1`.

QFT answer template:

- For dimension `d`, let `omega = exp(2 pi i / d)`.
- The QFT is
  `F_d |x> = (1/sqrt(d)) sum_{y=0}^{d-1} omega^(xy) |y>`.
- For a general vector `sum_x alpha_x |x>`, apply the formula linearly.

Example:

```text
F_4 |2>
= (1/2)(|0> + omega^2 |1> + omega^4 |2> + omega^6 |3>)
= (1/2)(|0> - |1> + |2> - |3>),
```

because `omega = i`. Each measurement probability is therefore `1/4`.

### Worked 2 - Qutrit Measurement, Density Matrix, And Unitary Update

General qutrit state:

```text
|psi> = a|0> + b|1> + c|2>
```

with `|a|^2 + |b|^2 + |c|^2 = 1`.

Measurement answer:

- Probability of outcome `0` is `|a|^2`.
- Probability of outcome `1` is `|b|^2`.
- Probability of outcome `2` is `|c|^2`.
- If the measured outcome is `j`, the post-measurement state is `|j>`.

Density matrix answer:

```text
rho = |psi><psi|
    = [ a ] [ conjugate(a) conjugate(b) conjugate(c) ]
      [ b ]
      [ c ]

    = [ a conjugate(a)  a conjugate(b)  a conjugate(c) ]
      [ b conjugate(a)  b conjugate(b)  b conjugate(c) ]
      [ c conjugate(a)  c conjugate(b)  c conjugate(c) ].
```

Unitary-update answer:

1. Calculate `|psi'> = U|psi>`.
2. Read off the new amplitude of the requested basis state.
3. Square its modulus.

Worked example using the 2024/25 qutrit:

```text
|psi> = (1/3)(-2|0> - i|1> + 2i|2>)
```

Initial probability of `|2>`:

```text
P(2) = |2i/3|^2 = 4/9.
```

Density matrix:

```text
v = (1/3)[ -2, -i, 2i ]^T
v^dagger = (1/3)[ -2, i, -2i ]

rho = vv^dagger
    = (1/9)[ 4    -2i   4i  ]
            [ 2i    1    -2  ]
            [ -4i  -2     4  ].
```

Apply

```text
U = [ 1  0   0  ]
    [ 0  0  -i  ]
    [ 0  i   0  ].
```

Then

```text
U|psi>
= (1/3)[ -2, 2, 1 ]^T.
```

Final probability of `|2>`:

```text
P(2 after U) = |1/3|^2 = 1/9.
```

Mark Howard entropy variant:

- If `rho = |psi><psi|` is a pure-state density matrix, then its eigenvalues are `1, 0, 0`.
- Its von Neumann entropy is
  `S(rho) = - sum lambda log_2(lambda) = 0`.

### Worked 3 - Entanglement, Reduced Density Matrix, Purity, And Entropy

Write a two-qubit state in the standard order:

```text
|psi> = a|00> + b|01> + c|10> + d|11>.
```

To test entanglement by reducing to the second qubit:

```text
rho_B =
[ |a|^2 + |c|^2        a conjugate(b) + c conjugate(d) ]
[ conjugate(a)b + conjugate(c)d    |b|^2 + |d|^2       ].
```

Purity:

```text
purity = Tr(rho_B^2).
```

For a `2 x 2` reduced state

```text
rho_B = [ p  q ]
        [ q* r ],
```

use

```text
Tr(rho_B^2) = p^2 + r^2 + 2|q|^2.
```

Entropy:

1. Find the eigenvalues of `rho_B`.
2. Use `S(rho_B) = - sum lambda log_2(lambda)`.
3. If the reduced state is pure, entropy is `0`, so the original two-qubit pure state is not entangled.
4. If the reduced state is mixed, entropy is positive, so the original state is entangled.

Fast product-state test:

```text
|psi> is separable iff ad = bc.
```

Worked Bell-state answer:

```text
|beta_00> = (1/sqrt(2))(|00> + |11>).
```

Here `a = 1/sqrt(2)`, `b = 0`, `c = 0`, `d = 1/sqrt(2)`.

```text
rho_B = [ |a|^2 + |c|^2   a conjugate(b) + c conjugate(d) ]
        [ conjugate(a)b + conjugate(c)d   |b|^2 + |d|^2  ]

      = [ 1/2  0   ]
        [ 0    1/2 ].
```

Purity:

```text
Tr(rho_B^2) = (1/2)^2 + (1/2)^2 = 1/2.
```

Entropy:

```text
S(rho_B) = -1/2 log_2(1/2) - 1/2 log_2(1/2) = 1.
```

Answer: the Bell state is maximally entangled. Its reduced density matrix is mixed, with purity `1/2` and entropy `1`.

Unitary-preserves-purity proof:

```text
rho' = U rho U^dagger

Tr((rho')^2)
= Tr(U rho U^dagger U rho U^dagger)
= Tr(U rho^2 U^dagger)
= Tr(rho^2 U^dagger U)
= Tr(rho^2).
```

Answer: unitary transformations preserve purity.

### Worked 4 - Gates, Circuits, Truth Tables, And Circuit Outputs

CNOT truth tables:

```text
CNOT(1,2): |a,b> -> |a, b xor a>

|00> -> |00>
|01> -> |01>
|10> -> |11>
|11> -> |10>
```

```text
CNOT(2,1): |a,b> -> |a xor b, b>

|00> -> |00>
|01> -> |11>
|10> -> |10>
|11> -> |01>
```

Controlled-Hadamard truth table:

```text
C_H |00> = |00>
C_H |01> = |01>
C_H |10> = |1>|+> = (1/sqrt(2))(|10> + |11>)
C_H |11> = |1>|-> = (1/sqrt(2))(|10> - |11>)
```

Hadamards switch CNOT control and target:

```text
(H tensor H) CNOT(1,2) (H tensor H) = CNOT(2,1).
```

Reason:

- Hadamard swaps the `X` and `Z` bases.
- CNOT copies computational-basis information from control to target.
- Conjugating both qubits by `H` swaps the control/target action.

Circuit-output workflow:

1. Read products right-to-left.
2. Apply one gate at a time.
3. Keep tensor order fixed.
4. Do not convert amplitudes into probabilities until the question asks for measurement.

Deutsch-Jozsa oracle matrix workflow:

For a Boolean function `f`, the oracle is

```text
U_f |x,y> = |x, y xor f(x)>.
```

For the 2023/24 function with

```text
f(0)=f(4)=f(6)=f(7)=0
f(1)=f(2)=f(3)=f(5)=1,
```

the answer is the permutation matrix that leaves the `y` bit unchanged for `x = 0,4,6,7` and swaps `|x,0>` with `|x,1>` for `x = 1,2,3,5`.

Explicit basis-state answer:

```text
|0,0> -> |0,0>    |0,1> -> |0,1>
|1,0> -> |1,1>    |1,1> -> |1,0>
|2,0> -> |2,1>    |2,1> -> |2,0>
|3,0> -> |3,1>    |3,1> -> |3,0>
|4,0> -> |4,0>    |4,1> -> |4,1>
|5,0> -> |5,1>    |5,1> -> |5,0>
|6,0> -> |6,0>    |6,1> -> |6,1>
|7,0> -> |7,0>    |7,1> -> |7,1>
```

Answer: the matrix has one `1` in each column at the row named by the mapped output state above, and zeros elsewhere.

### Worked 5 - Kraus Operators, POVMs, CPTP Maps, And Projective Measurements

Kraus extraction template:

If the environment starts in `|0>` and the joint system-environment unitary is `U`, then the Kraus operator for environment outcome `e` is

```text
M_e = <e| U |0>,
```

where the bra and ket are applied only to the environment register.

Phase-damping template from the repeated family:

```text
U|00> = sqrt(1-p)|00> + i sqrt(p)|01>
U|10> = |10>.
```

With environment initially `|0>`:

```text
M_0|0> = sqrt(1-p)|0>,   M_0|1> = |1>
M_1|0> = i sqrt(p)|0>,   M_1|1> = 0.
```

So

```text
M_0 = [ sqrt(1-p)  0 ]
      [ 0          1 ]

M_1 = [ i sqrt(p)  0 ]
      [ 0          0 ].
```

Trace-preserving check:

```text
M_0^dagger M_0 + M_1^dagger M_1
= [ 1-p 0 ] + [ p 0 ]
   [ 0   1 ]   [ 0 0 ]
= I.
```

POVM probability template:

For POVM effects `E_i`,

```text
P(i) = <psi|E_i|psi>.
```

Worked POVM answer using the 2024/25-style numbers:

```text
E_1 = (1/2)|1><1|
E_2 = (1/3)|+><+|
E_3 = I - E_1 - E_2

|psi> = ((2 - i sqrt(5))/5)|0> + (4/5)|1>.
```

Outcome 1:

```text
P(1) = (1/2)|4/5|^2 = 8/25.
```

Outcome 2:

```text
<+|psi> = (1/sqrt(2))((2 - i sqrt(5))/5 + 4/5)
        = (1/sqrt(2))((6 - i sqrt(5))/5).

|<+|psi>|^2 = (1/2)((36 + 5)/25) = 41/50.

P(2) = (1/3)(41/50) = 41/150.
```

Outcome 3:

```text
P(3) = 1 - 8/25 - 41/150
     = 61/150.
```

Answer: the three probabilities are `8/25`, `41/150`, and `61/150`.

Projective-measurement checklist:

A set of projectors `{Pi_i}` is a projective measurement if:

```text
Pi_i^dagger = Pi_i              Hermitian
Pi_i^2 = Pi_i                   idempotent
Pi_i Pi_j = 0 for i != j        orthogonal
sum_i Pi_i = I                  complete
```

Depolarising-channel Mark Howard variant:

Given

```text
E_0 = (1/2)sqrt(4 - 3lambda) I
E_1 = (1/2)sqrt(lambda) X
E_2 = (1/2)sqrt(lambda) Y
E_3 = (1/2)sqrt(lambda) Z,
```

then

```text
sum_k E_k^dagger E_k
= ((4 - 3lambda)/4)I + 3(lambda/4)I
= I.
```

Answer: the channel is trace preserving. Its action is

```text
rho -> ((4 - 3lambda)/4)rho
       + (lambda/4)(X rho X + Y rho Y + Z rho Z).
```

On the Bloch vector, it shrinks the vector by a factor of `1 - lambda`, so it moves the state toward the maximally mixed state `I/2`.

### Worked 6 - No-Cloning, No-Deleting, And Unitary-Impossibility Proofs

No-cloning theorem, inner-product proof:

Assume a universal cloner exists:

```text
U|psi>|0> = |psi>|psi>
U|phi>|0> = |phi>|phi>
```

Because `U` is unitary, it preserves inner products.

Input inner product:

```text
<psi|phi><0|0> = <psi|phi>.
```

Output inner product:

```text
(<psi|<psi|)(|phi>|phi>) = <psi|phi>^2.
```

Therefore

```text
<psi|phi> = <psi|phi>^2.
```

This only holds for `<psi|phi> = 0` or `<psi|phi> = 1`, not for arbitrary qubit states.

Answer: no universal unitary can clone every quantum state.

No-deleting / cannot-map-everything-to-zero proof:

Assume a unitary maps every state to `|0>`:

```text
U|psi> = |0>
U|phi> = |0>.
```

Unitary preservation of inner products gives

```text
<psi|phi> = <0|0> = 1.
```

This is false for arbitrary distinct states.

Answer: no single unitary can delete arbitrary quantum information by mapping every input state to `|0>`.

Constructing the orthogonal state and unitary:

For

```text
|psi> = alpha|0> + beta|1>,
```

a valid orthogonal state is

```text
|psi_perp> = -conjugate(beta)|0> + conjugate(alpha)|1>.
```

Check:

```text
<psi|psi_perp>
= conjugate(alpha)(-conjugate(beta)) + conjugate(beta)conjugate(alpha)
= 0.
```

The unitary mapping `{|0>, |1>}` to `{|psi>, |psi_perp>}` has these states as columns:

```text
U = [ alpha              -conjugate(beta) ]
    [ beta                conjugate(alpha) ].
```

Answer: `U U^dagger = I` because the columns are orthonormal.

### Worked 7 - `|+>`, `|->`, Bloch Sphere, And Basis Changes

Basis definitions:

```text
|+> = (1/sqrt(2))(|0> + |1>)
|-> = (1/sqrt(2))(|0> - |1>).
```

For

```text
|psi> = alpha|0> + beta|1>,
```

write

```text
|psi> = gamma|+> + delta|->.
```

Using inner products:

```text
gamma = <+|psi> = (alpha + beta)/sqrt(2)
delta = <-|psi> = (alpha - beta)/sqrt(2).
```

Answer:

```text
P(+) = |alpha + beta|^2 / 2
P(-) = |alpha - beta|^2 / 2.
```

Projective-measurement version:

```text
P_+ = |+><+|
P_- = |-><-|
```

Then

```text
P(+) = <psi|P_+|psi> = |<+|psi>|^2
P(-) = <psi|P_-|psi> = |<-|psi>|^2.
```

Bloch sphere answer:

Every normalised qubit can be written, up to global phase, as

```text
|psi> = cos(theta/2)|0> + exp(i phi) sin(theta/2)|1>.
```

If `|psi> = alpha|0> + beta|1>`, remove global phase so `alpha` is real and nonnegative. Then

```text
theta = 2 arccos(|alpha|)
phi = arg(beta) - arg(alpha).
```

Answer: use `theta` to encode the relative size of the amplitudes and `phi` to encode the relative complex phase.

### Worked 8 - Bell States, Teleportation, And Parity Measurement

Bell state:

```text
|beta_00> = (1/sqrt(2))(|00> + |11>).
```

Rotated-basis identity:

Let `{|psi>, |psi_perp>}` be an orthonormal basis produced from `{|0>, |1>}` by a real rotation `U_theta`. Then

```text
|beta_00> = (1/sqrt(2))(|psi,psi> + |psi_perp,psi_perp>).
```

Worked proof idea:

Expand the right-hand side using

```text
|psi> = cos(theta)|0> + sin(theta)|1>
|psi_perp> = -sin(theta)|0> + cos(theta)|1>.
```

Then

```text
|psi,psi> + |psi_perp,psi_perp>
= (cos^2(theta) + sin^2(theta))|00>
  + (cos(theta)sin(theta) - sin(theta)cos(theta))|01>
  + (sin(theta)cos(theta) - cos(theta)sin(theta))|10>
  + (sin^2(theta) + cos^2(theta))|11>
= |00> + |11>.
```

Therefore the identity holds after multiplying by `1/sqrt(2)`.

Alice/Bob measurement answer:

Starting with

```text
|beta_00> = (1/sqrt(2))(|psi,psi> + |psi_perp,psi_perp>),
```

Alice applies `U_theta^-1` to her qubit:

```text
(U_theta^-1 tensor I)|beta_00>
= (1/sqrt(2))(|0>|psi> + |1>|psi_perp>).
```

If Alice measures `0`, Bob has `|psi>`.

If Alice measures `1`, Bob has `|psi_perp>`.

Parity measurement:

```text
Pi_even = |00><00| + |11><11|
Pi_odd  = |01><01| + |10><10|.
```

Checks:

- `Pi_even^2 = Pi_even` and `Pi_odd^2 = Pi_odd`.
- Both are Hermitian.
- `Pi_even Pi_odd = 0`.
- `Pi_even + Pi_odd = I`.

For `|beta_00>`, all amplitude is in the even subspace:

```text
Pi_even |beta_00> = |beta_00>.
```

Answer: `P(even) = 1`, `P(odd) = 0`.

Teleportation circuit answer:

1. Alice has unknown state `|psi>`.
2. Alice and Bob share a Bell pair.
3. Alice applies CNOT from `|psi>` to her Bell-pair qubit.
4. Alice applies `H` to the original `|psi>` qubit.
5. Alice measures her two qubits.
6. Alice sends the two classical bits to Bob.
7. Bob applies the correction:
   - `00`: do nothing
   - `01`: apply `X`
   - `10`: apply `Z`
   - `11`: apply `XZ` up to the convention used

Answer: after correction, Bob's qubit is the original unknown state `|psi>`.

### Worked 9 - Deutsch-Jozsa Oracle / Permutation Matrix

For a Boolean function `f`, the Deutsch-Jozsa oracle is

```text
U_f |x,y> = |x, y xor f(x)>.
```

To build the matrix:

1. Choose a basis order.
2. Apply the rule to every basis state.
3. Put a `1` in the output row and input column for each mapping.
4. Fill all other entries with `0`.

Worked answer for the 2023/24 function:

```text
f(0)=f(4)=f(6)=f(7)=0
f(1)=f(2)=f(3)=f(5)=1.
```

If `f(x)=0`, the pair `|x,0>`, `|x,1>` is unchanged.

If `f(x)=1`, the pair is swapped:

```text
|x,0> -> |x,1>
|x,1> -> |x,0>.
```

So the full permutation is:

```text
|0,0> -> |0,0>    |0,1> -> |0,1>
|1,0> -> |1,1>    |1,1> -> |1,0>
|2,0> -> |2,1>    |2,1> -> |2,0>
|3,0> -> |3,1>    |3,1> -> |3,0>
|4,0> -> |4,0>    |4,1> -> |4,1>
|5,0> -> |5,1>    |5,1> -> |5,0>
|6,0> -> |6,0>    |6,1> -> |6,1>
|7,0> -> |7,0>    |7,1> -> |7,1>
```

Answer: the matrix is a `16 x 16` permutation matrix implementing exactly those swaps.

## Flashcard Rule

Only make a flashcard when the same fact or step has blocked you more than once.

Good flashcards:

- a formula you keep forgetting
- a proof step you keep missing
- a condition checklist, such as projective measurement or trace preservation
- a recurring workflow, such as density matrix -> reduced density matrix -> purity

Bad early flashcards:

- entire worked solutions
- broad topic cards like "What is Grover?"
- cards that hide the calculation you actually need to practise

For this module, the main notes should stay as worked paper attempts. Flashcards should be the small reusable pieces extracted from those attempts.
