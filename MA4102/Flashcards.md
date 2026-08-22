# MA4102 - Core Exam Flashcards

Use these after attempting questions from [most_asked.html](most_asked.html). Each card is a short refresher for a distinct, recurring, or high-mark current-paper question shape. Detailed walkthroughs and legacy-only variants remain in the Most Asked page.

## 1. Grover Search

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>What is Grover's success-probability formula for one marked item?</td><td>Set <code>sin θ = 1/√N</code>. After <code>k</code> iterations, <code>P<sub>k</sub> = sin²((2k + 1)θ)</code>.</td><td>2023 Q5; 2024 Q5</td></tr>
<tr><td>How do you choose the best integer Grover iteration count?</td><td>Compute <code>k* = π/(4θ) − 1/2</code>. Test the nearest non-negative integers in <code>P<sub>k</sub></code>; take the larger as best and the other nearby one for a second-best question.</td><td>2024 Q5</td></tr>
<tr><td>What is the compact Grover 2D setup for the <code>N = 4</code> question?</td><td>For marked <code>|a⟩</code>, set <code>|φ⟩ = (1/√(N − 1)) Σ<sub>x ≠ a</sub>|x⟩</code>. For <code>N = 4</code>, <code>|ψ⟩ = (1/2)|a⟩ + (√3/2)|φ⟩</code>.</td><td>2025 Q3(a); 2022 Q3(a)</td></tr>
<tr><td>What is the <code>N = 4</code> Grover matrix in the ordered basis <code>(|a⟩, |φ⟩)</code>?</td><td><code>G = [[1/2, √3/2], [−√3/2, 1/2]]</code>. Therefore <code>G|ψ⟩ = |a⟩</code>.</td><td>2025 Q3(a); 2022 Q3(a)</td></tr>
</tbody>
</table>

## 2. QFT And Search Variants

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you calculate a small <code>d</code>-dimensional QFT?</td><td>State <code>ω = e<sup>2πi/d</sup></code> and <code>F<sub>d</sub>|x⟩ = (1/√d) Σ<sub>y</sub> ω<sup>xy</sup>|y⟩</code>. Expand the input, transform each basis ket, simplify powers of <code>ω</code>, and collect amplitudes.</td><td>2024 Q4(ii); 2025 Q3(b); 2022 Q3(b)</td></tr>
<tr><td>What QFT shortcut applies to a Fourier-phase state?</td><td>With the stated convention, <code>F<sub>d</sub>[(1/√d) Σ<sub>x</sub> ω<sup>rx</sup>|x⟩] = |−r mod d⟩</code>.</td><td>2025 Q3(b); 2022 Q3(b)</td></tr>
<tr><td>How do you build a Deutsch-Jozsa oracle permutation matrix?</td><td>Use <code>U<sub>f</sub>|x, y⟩ = |x, y ⊕ f(x)⟩</code>. Apply it to every input in the paper's basis order and place one <code>1</code> in the row of each output and the column of its input.</td><td>2023 Q4(ii)</td></tr>
<tr><td>What comparison counts apply to simple left-to-right classical search?</td><td>For a present target in a list of length <code>N</code>: best <code>1</code>, worst <code>N</code>, average <code>(N + 1)/2</code>, and target at position <code>j</code> takes <code>j</code> comparisons.</td><td>2023 Q5(i)</td></tr>
</tbody>
</table>

## 3. State Measurement And Representation

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you answer a computational-basis measurement question?</td><td>Square the modulus of the requested amplitude. If outcome <code>j</code> is obtained, the post-measurement state is <code>|j⟩</code>.</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(a)</td></tr>
<tr><td>What are the probability and post-measurement-state rules for projectors?</td><td>For projector <code>Π<sub>i</sub></code>, <code>P(i) = ⟨ψ|Π<sub>i</sub>|ψ⟩</code>. If <code>P(i) &gt; 0</code>, the new state is <code>Π<sub>i</sub>|ψ⟩/√P(i)</code>.</td><td>2025 Q1(b); 2025 Q2(a)</td></tr>
<tr><td>How do you write the density matrix of a pure qutrit state?</td><td>Use <code>ρ = |ψ⟩⟨ψ|</code>. If the amplitudes are <code>a, b, c</code>, entry <code>ρ<sub>ij</sub></code> is amplitude <code>i</code> times the conjugate of amplitude <code>j</code>.</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(b)</td></tr>
<tr><td>How do you answer "apply <code>U</code>, then measure"?</td><td>First calculate <code>|ψ′⟩ = U|ψ⟩</code>. Then square the modulus of the requested amplitude in <code>|ψ′⟩</code>; do not take probabilities before applying <code>U</code>.</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(c)</td></tr>
<tr><td>How do you measure <code>|ψ⟩ = α|0⟩ + β|1⟩</code> in the plus/minus basis?</td><td><code>|ψ⟩ = ((α + β)/√2)|+⟩ + ((α − β)/√2)|−⟩</code>. Hence <code>P(+) = |α + β|²/2</code> and <code>P(−) = |α − β|²/2</code>.</td><td>2023 Q1(ii); 2024 Q1(ii); 2025 Q1(a)</td></tr>
<tr><td>How do you obtain Bloch-sphere angles from a normalised qubit?</td><td>Remove global phase and match <code>|ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup>sin(θ/2)|1⟩</code>. Then <code>θ = 2 arccos(|α|)</code> and <code>φ = arg(β) − arg(α)</code> modulo <code>2π</code>.</td><td>2023 Q1(ii); 2024 Q1(ii)</td></tr>
</tbody>
</table>

## 4. Entanglement And Purity

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you find the reduced state of the second qubit?</td><td>For <code>|ψ⟩ = a|00⟩ + b|01⟩ + c|10⟩ + d|11⟩</code>, <code>ρ<sub>B</sub> = [[|a|² + |c|², ab* + cd*], [a*b + c*d, |b|² + |d|²]]</code>.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>How do you calculate the purity of a <code>2 × 2</code> density matrix?</td><td>For <code>ρ = [[p, q], [q*, r]]</code>, <code>Tr(ρ²) = p² + r² + 2|q|²</code>. For a reduced state of an overall pure bipartite state, purity <code>1</code> means product and purity below <code>1</code> means entangled.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>What is the fast product-state test for a pure <code>2</code>-qubit vector?</td><td>For coefficients <code>a, b, c, d</code>, form <code>[[a, b], [c, d]]</code>. The state is product exactly when <code>ad − bc = 0</code>; otherwise it is entangled.</td><td>2025 Q2(d)</td></tr>
<tr><td>How does entropy decide entanglement for a pure bipartite state?</td><td>With reduced-state eigenvalues <code>λ<sub>j</sub></code>, <code>S(ρ) = −Σ<sub>j</sub> λ<sub>j</sub> log<sub>2</sub>(λ<sub>j</sub>)</code>. For a globally pure bipartite state, <code>S = 0</code> iff product and <code>S &gt; 0</code> iff entangled.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>Why does a unitary preserve purity?</td><td>With <code>ρ′ = UρU†</code>, <code>Tr((ρ′)²) = Tr(Uρ²U†) = Tr(ρ²)</code>, using cyclicity of trace and <code>U†U = I</code>.</td><td>2024 Q2(ii)</td></tr>
</tbody>
</table>

## 5. Bell States And Projective Measurements

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you show <code>|β<sub>00</sub>⟩ = (|00⟩ + |11⟩)/√2</code> is entangled?</td><td>Tracing out either qubit gives <code>I/2</code>, which has purity <code>1/2</code> and entropy <code>1</code>. Since the global Bell state is pure, it is maximally entangled.</td><td>2025 Q5; 2022 Q4(a)</td></tr>
<tr><td>What is the rotated Bell-state identity?</td><td>For <code>|ψ⟩ = U<sub>θ</sub>|0⟩</code> and <code>|ψ<sub>⊥</sub>⟩ = U<sub>θ</sub>|1⟩</code>, <code>|β<sub>00</sub>⟩ = (|ψ, ψ⟩ + |ψ<sub>⊥</sub>, ψ<sub>⊥</sub>⟩)/√2</code>. Expand both products; the cross terms cancel.</td><td>2025 Q5(a); 2022 Q5(a)</td></tr>
<tr><td>After Alice applies <code>U<sub>θ</sub><sup>−1</sup></code> and measures, what state does Bob have?</td><td>The state becomes <code>(|0⟩|ψ⟩ + |1⟩|ψ<sub>⊥</sub>⟩)/√2</code>. Alice's outcome <code>0</code> leaves Bob in <code>|ψ⟩</code>; outcome <code>1</code> leaves him in <code>|ψ<sub>⊥</sub>⟩</code>.</td><td>2025 Q5(b); 2022 Q5(b)</td></tr>
<tr><td>How do you verify the Bell parity measurement and calculate <code>P(even)</code>?</td><td>Use <code>Π<sub>even</sub> = |00⟩⟨00| + |11⟩⟨11|</code> and <code>Π<sub>odd</sub> = |01⟩⟨01| + |10⟩⟨10|</code>. Check Hermitian, idempotent, orthogonal, and complete. As <code>Π<sub>even</sub>|β<sub>00</sub>⟩ = |β<sub>00</sub>⟩</code>, <code>P(even) = 1</code>.</td><td>2025 Q5(c); 2022 Q5(c)</td></tr>
</tbody>
</table>

## 6. Channels And Kraus Operators

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you extract Kraus operators from a system-environment unitary?</td><td>If the environment begins in <code>|0⟩</code>, use <code>M<sub>e</sub> = ⟨e|U|0⟩</code> for each environment-basis ket <code>|e⟩</code>. Apply it to system basis kets; those outputs are the columns of <code>M<sub>e</sub></code>.</td><td>2023 Q3(i); 2024 Q3(i)</td></tr>
<tr><td>How do you write a unitary from its images of the ordered basis?</td><td>Each column is the coordinate vector of the image of the matching input basis ket. Preserve the paper's stated basis order.</td><td>2023 Q3(i)(a)</td></tr>
<tr><td>How do you verify that a Kraus representation is trace preserving?</td><td>For <code>ρ → Σ<sub>k</sub> E<sub>k</sub>ρE<sub>k</sub>†</code>, calculate every <code>E<sub>k</sub>†E<sub>k</sub></code> and show <code>Σ<sub>k</sub> E<sub>k</sub>†E<sub>k</sub> = I</code>.</td><td>2023 Q3(i); 2025 Q4(d)</td></tr>
<tr><td>What does the current Pauli channel do to a Bloch vector?</td><td>For the supplied Pauli Kraus set, <code>r → (1 − λ)r</code>. The channel shrinks the Bloch vector toward the maximally mixed state <code>I/2</code>.</td><td>2025 Q4(d)</td></tr>
<tr><td>How do you calculate a POVM outcome probability?</td><td>For effect <code>E<sub>i</sub></code>, use <code>P(i) = ⟨ψ|E<sub>i</sub>|ψ⟩</code>. If <code>E<sub>3</sub> = I − E<sub>1</sub> − E<sub>2</sub></code>, calculate it directly or use <code>P(3) = 1 − P(1) − P(2)</code>.</td><td>2024 Q3(ii); 2021 Q3(ii)</td></tr>
</tbody>
</table>

## 7. Circuits And Teleportation

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you translate a symbolic gate product into a circuit?</td><td>Apply the rightmost operation first, so draw it nearest the input. Keep tensor-factor wire order fixed, and place the named controls, targets, SWAPs, and rotations correctly.</td><td>2023 Q4(i)</td></tr>
<tr><td>What is the controlled-Hadamard truth table?</td><td><code>|00⟩ → |00⟩</code>, <code>|01⟩ → |01⟩</code>, <code>|10⟩ → (|10⟩ + |11⟩)/√2</code>, and <code>|11⟩ → (|10⟩ − |11⟩)/√2</code>.</td><td>2025 Q1(c)</td></tr>
<tr><td>What does the three-CNOT circuit <code>CNOT(1, 2), CNOT(2, 1), CNOT(1, 2)</code> do?</td><td>It is SWAP. In particular, <code>|01⟩ → |10⟩</code>.</td><td>2025 Q1(d); 2022 Q1(c)</td></tr>
<tr><td>What must a teleportation answer show?</td><td>Start with unknown <code>|ψ⟩</code> and a shared Bell pair. Alice applies CNOT, then <code>H</code>, measures two qubits, and sends <code>m<sub>0</sub>, m<sub>1</sub></code>. Bob applies <code>Z<sup>m₀</sup>X<sup>m₁</sup></code>: <code>I, X, Z, ZX</code> for <code>00, 01, 10, 11</code>.</td><td>2024 Q4(iii)</td></tr>
<tr><td>How do you simplify <code>(⟨0| ⊗ I)|Ψ⟩</code>?</td><td>Keep only first-qubit-<code>0</code> terms and remove that first ket. Thus <code>(⟨0| ⊗ I) Σ<sub>ab</sub> α<sub>ab</sub>|ab⟩ = α<sub>00</sub>|0⟩ + α<sub>01</sub>|1⟩</code>.</td><td>2025 Q4(c)</td></tr>
</tbody>
</table>

## 8. Proofs And Constructions

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>What is the standard no-cloning proof using inner products?</td><td>Assume one unitary and fixed blank state clone every qubit. Inner-product preservation gives <code>⟨ψ|φ⟩ = ⟨ψ|φ⟩²</code>, impossible for distinct non-orthogonal states. Hence no universal cloner exists.</td><td>2023 Q3(ii); 2024 Q4(i); 2025 Q4(b)</td></tr>
<tr><td>What quantifier is essential in the no-cloning theorem?</td><td>The claim rules out one fixed unitary that clones every arbitrary unknown state using a fixed blank register. Known orthogonal basis states can be copied, so those quantifiers matter.</td><td>2023 Q3(ii); 2025 Q4(b)</td></tr>
<tr><td>How do you construct <code>|ψ<sub>⊥</sub>⟩</code> and its unitary?</td><td>For <code>|ψ⟩ = α|0⟩ + β|1⟩</code>, take <code>|ψ<sub>⊥</sub>⟩ = −β*|0⟩ + α*|1⟩</code>. Use columns <code>U = [[α, −β*], [β, α*]]</code>; they are orthonormal, so <code>UU† = I</code>.</td><td>2025 Q4(a)</td></tr>
</tbody>
</table>
