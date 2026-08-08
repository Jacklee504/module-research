# MA4102 - Exam Flashcards

Use these cards after attempting the matching paper questions in `most_asked.html`. The back of each card is written as an exam-safe answer: it includes the condition, formula, proof step, or construction needed to score marks without relying on an unstated inference.

## 1. Algorithms: Grover, QFT, Deutsch-Jozsa, And Search

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>State the Grover success-probability formula for one marked item in a list of size N.</td><td>Let sin(theta)=1/sqrt(N). After k Grover iterations, the success probability is P_k=sin^2((2k+1)theta). The formula assumes exactly one marked item and the standard initial uniform superposition.</td><td>2023 Q5; 2024 Q5; 2025 Q3</td></tr>
<tr><td>How do you choose the best integer number of Grover iterations?</td><td>Compute theta=arcsin(1/sqrt(N)), then k_star=pi/(4theta)-1/2. Test the nearest integers to k_star using P_k=sin^2((2k+1)theta), and choose the integer with the larger success probability.</td><td>2024 Q5</td></tr>
<tr><td>For Grover search with N=32 and one marked item, what are the theoretical and best integer iteration counts?</td><td>theta=arcsin(1/sqrt(32)); k_star=pi/(4theta)-1/2=3.919... . The best integer is k=4 with success probability about 0.99918. The second-best nearby integer is k=3 with probability about 0.89694.</td><td>2024 Q5; 2021 Q5</td></tr>
<tr><td>For Grover search with N=8 and one marked item, what are the success probabilities after one and two operations?</td><td>theta=arcsin(1/sqrt(8)). P_1=sin^2(3theta)=25/32=0.78125. P_2=sin^2(5theta)=121/128=0.9453125. Two operations give the higher success probability.</td><td>2023 Q5</td></tr>
<tr><td>In the Grover 2D basis, define |phi> and the uniform state |psi> for one marked basis state |a>.</td><td>|phi>=(1/sqrt(2^n-1)) sum over x not equal to a of |x>. The uniform state is |psi>=(1/sqrt(2^n))|a>+sqrt((2^n-1)/2^n)|phi>. For N=4 this is (1/2)|a>+(sqrt(3)/2)|phi>.</td><td>2025 Q3(a); 2022 Q3(a)</td></tr>
<tr><td>For N=4, what Grover matrix sends the uniform state to the marked state in the {|a>, |phi>} basis?</td><td>With theta=pi/6, G=[[1/2, sqrt(3)/2],[-sqrt(3)/2, 1/2]]. Since |psi>=[1/2, sqrt(3)/2]^T, G|psi>=[1,0]^T=|a>.</td><td>2025 Q3(a); 2022 Q3(a)</td></tr>
<tr><td>State the finite-dimensional QFT formula.</td><td>For dimension d, let omega=e^(2 pi i/d). The QFT is F_d|x>=(1/sqrt(d)) sum from y=0 to d-1 of omega^(xy)|y>. Extend linearly to a vector sum alpha_x|x>.</td><td>2024 Q4(ii); 2025 Q3(b); 2022 Q3(b)</td></tr>
<tr><td>Compute F_4|2>.</td><td>With omega=i, F_4|2>=(1/2)(|0>+omega^2|1>+omega^4|2>+omega^6|3>)=(1/2)(|0>-|1>+|2>-|3>). Each computational-basis probability is 1/4.</td><td>QFT template; 2025 Q3(b)</td></tr>
<tr><td>What is the Deutsch-Jozsa oracle action and how do you build its permutation matrix?</td><td>U_f|x,y>=|x,y xor f(x)>. Choose a basis order, apply this rule to every basis vector, put a 1 in the output row and input column for each mapped state, and put 0 elsewhere.</td><td>2023 Q4(ii)</td></tr>
<tr><td>For an unordered classical search list of length 8 with target at position 6, what are best, worst, and average comparisons?</td><td>Best case is 1 comparison. Worst case is 8 comparisons. If the target is equally likely to be in any position, average comparisons are (1+2+...+8)/8=36/8=4.5. For the displayed target y in position 6, a single actual left-to-right run takes 6 comparisons.</td><td>2023 Q5(i)</td></tr>
</tbody>
</table>

## 2. State Measurement, Density Matrices, Bloch Sphere, And Basis Change

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>Given a qutrit |psi>=a|0>+b|1>+c|2>, how do you calculate a computational-basis outcome probability?</td><td>The probability of outcome j is the squared modulus of the amplitude of |j>. Thus P(0)=|a|^2, P(1)=|b|^2, and P(2)=|c|^2. The state must be normalised so |a|^2+|b|^2+|c|^2=1.</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(a)</td></tr>
<tr><td>What is the post-measurement state after measuring qutrit outcome j in the computational basis?</td><td>For a projective computational-basis measurement, if outcome j is obtained, the post-measurement state is |j> after normalisation. In the MA4102 qutrit questions, outcome "2" gives post-measurement state |2>.</td><td>2025 Q2(a); 2022 Q2(a)</td></tr>
<tr><td>How do you write the density matrix of |psi>=a|0>+b|1>+c|2>?</td><td>rho is ket psi times bra psi. As a matrix, rho has entries rho_ij = amplitude_i times conjugate(amplitude_j), so rho=[[a conj(a), a conj(b), a conj(c)],[b conj(a), b conj(b), b conj(c)],[c conj(a), c conj(b), c conj(c)]].</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(b)</td></tr>
<tr><td>For |psi>=(1/3)(-2|0>-i|1>+2i|2>), what is rho?</td><td>rho=(1/9)[[4,-2i,4i],[2i,1,-2],[-4i,-2,4]]. This follows from v=(-2,-i,2i)^T/3 and rho=vv^dagger.</td><td>2024 Q1(i)</td></tr>
<tr><td>How do you answer a qutrit "apply U then measure" question?</td><td>First compute |psi'>=U|psi>. Then read the requested basis-state amplitude from |psi'> and square its modulus. Do not square before applying U, because interference between amplitudes can change the final probability.</td><td>2023 Q1(i); 2024 Q1(i); 2025 Q2(c)</td></tr>
<tr><td>Convert |psi>=alpha|0>+beta|1> into the plus/minus basis.</td><td>Use |+>=(|0>+|1>)/sqrt(2) and |->=(|0>-|1>)/sqrt(2). Then |psi>=gamma|+>+delta|-> where gamma=(alpha+beta)/sqrt(2) and delta=(alpha-beta)/sqrt(2).</td><td>2025 Q1(a); 2023 Q1(ii); 2024 Q1(ii)</td></tr>
<tr><td>What are the probabilities of + and - when measuring alpha|0>+beta|1> in the plus/minus basis?</td><td>P(+)=|alpha+beta|^2/2 and P(-)=|alpha-beta|^2/2. These are |&lt;+|psi&gt;|^2 and |&lt;-|psi&gt;|^2 respectively.</td><td>2025 Q1(a)-(b); 2023 Q1(ii); 2024 Q1(ii)</td></tr>
<tr><td>How do you match a qubit to Bloch sphere angles?</td><td>Remove global phase so the |0> coefficient is real and nonnegative. Match |psi>=cos(theta/2)|0>+e^(i phi) sin(theta/2)|1>. Then theta=2 arccos(|alpha|) and phi=arg(beta)-arg(alpha), after global phase is removed.</td><td>2023 Q1(ii); 2024 Q1(ii)</td></tr>
<tr><td>What are the eigenvalues and von Neumann entropy of a pure-state density matrix ket psi times bra psi?</td><td>A rank-1 pure-state density matrix has eigenvalues 1,0,...,0. Its von Neumann entropy is -sum lambda log_2(lambda)=0. This distinguishes it from a mixed state with more than one nonzero eigenvalue.</td><td>2022 Q2(c); backup for density matrices</td></tr>
</tbody>
</table>

## 3. Entanglement, Reduced Density Matrices, Purity, Bell States, And Entropy

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>For |psi>=a|00>+b|01>+c|10>+d|11>, what is the reduced density matrix of the second qubit?</td><td>rho_B=[[|a|^2+|c|^2, a conj(b) + c conj(d)],[conj(a)b + conj(c)d, |b|^2+|d|^2]]. This traces out the first qubit while preserving the second-qubit basis order |0>, |1>.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>How do you compute purity for a 2 x 2 density matrix [[p,q],[conj(q),r]]?</td><td>Purity is Tr(rho^2)=p^2+r^2+2|q|^2. For a reduced state of a pure bipartite state, purity 1 means product/no entanglement; purity below 1 means entanglement.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>How does von Neumann entropy detect entanglement for a pure 2-qubit state?</td><td>Compute a reduced density matrix rho_A or rho_B. If its eigenvalues give S=-sum lambda log_2(lambda)=0, the original state is product. If S>0, the original pure bipartite state is entangled.</td><td>2023 Q2; 2024 Q2(i)</td></tr>
<tr><td>What fast determinant test checks whether a 2-qubit vector is product?</td><td>For |psi>=a|00>+b|01>+c|10>+d|11>, the state is separable iff ad=bc. If ad != bc, it is entangled. This is a fast proof method for 2025-style "prove whether entangled" questions.</td><td>2025 Q2(d)</td></tr>
<tr><td>Show that |beta_00>=(|00>+|11>)/sqrt(2) is entangled.</td><td>Tracing out either qubit gives rho=I/2. Purity is Tr((I/2)^2)=1/2 and entropy is 1, so the reduced state is mixed. Therefore the overall pure Bell state is entangled.</td><td>2025 Q5; 2022 Q4(a)</td></tr>
<tr><td>Prove that unitaries preserve state purity.</td><td>If rho'=U rho U^dagger, then Tr((rho')^2)=Tr(U rho U^dagger U rho U^dagger)=Tr(U rho^2 U^dagger)=Tr(rho^2 U^dagger U)=Tr(rho^2). Thus purity is invariant under unitary transformations.</td><td>2024 Q2(ii)</td></tr>
<tr><td>State and prove the rotated Bell-basis identity used in the Howard papers.</td><td>If |psi>=U_theta|0> and |psi_perp>=U_theta|1> for a real rotation, then |beta_00>=(|psi,psi>+|psi_perp,psi_perp>)/sqrt(2). Expanding both tensor products cancels the |01> and |10> terms and leaves (|00>+|11>)/sqrt(2).</td><td>2025 Q5(a); 2022 Q5(a)</td></tr>
<tr><td>In the Bell measurement setup, what state does Bob have after Alice applies U_theta^-1 and measures?</td><td>Using |beta_00>=(|psi,psi>+|psi_perp,psi_perp>)/sqrt(2), Alice's inverse rotation gives (|0>|psi>+|1>|psi_perp>)/sqrt(2). If Alice measures 0, Bob has |psi>. If Alice measures 1, Bob has |psi_perp>.</td><td>2025 Q5(b); 2022 Q5(b)</td></tr>
<tr><td>For the parity measurement on |beta_00>, what is P(even)?</td><td>Pi_even=|00><00|+|11><11| and Pi_odd=|01><01|+|10><10|. Since |beta_00> lies entirely in span{|00>,|11>}, Pi_even|beta_00>=|beta_00>. Therefore P(even)=1 and P(odd)=0.</td><td>2025 Q5(c); 2022 Q5(c)</td></tr>
</tbody>
</table>

## 4. Channels, Kraus Operators, POVMs, And Projective Measurements

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How do you extract Kraus operators from a system-environment unitary when the environment starts in |0>?</td><td>The Kraus operator for environment outcome e is M_e=&lt;e|U|0&gt;, where the bra and ket act only on the environment register. Apply M_e to system basis states to fill the operator columns.</td><td>2023 Q3(i); 2024 Q3(i)</td></tr>
<tr><td>For phase damping with U|00>=sqrt(1-p)|00>+i sqrt(p)|01> and U|10>=|10>, what are M_0 and M_1?</td><td>M_0=diag(sqrt(1-p),1) and M_1=[[i sqrt(p),0],[0,0]]. They satisfy M_0^dagger M_0+M_1^dagger M_1=I.</td><td>2023 Q3(i)</td></tr>
<tr><td>What condition makes a Kraus representation trace preserving?</td><td>A set of Kraus operators {E_k} is trace preserving iff sum_k E_k^dagger E_k=I. In an exam, compute each E_k^dagger E_k and show the sum is exactly the identity.</td><td>2025 Q4(d); 2023 Q3(i)</td></tr>
<tr><td>How do you calculate a POVM outcome probability?</td><td>For state |psi> and POVM effect E_i, P(i)=&lt;psi|E_i|psi&gt;. For E_3=I-E_1-E_2, either calculate &lt;psi|E_3|psi&gt; directly or use P(3)=1-P(1)-P(2).</td><td>2024 Q3(ii); 2021 Q3(ii)</td></tr>
<tr><td>What must be checked to show a set of projectors is a projective measurement?</td><td>For projectors Pi_i, check Pi_i^dagger=Pi_i, Pi_i^2=Pi_i, Pi_i Pi_j=0 for i != j, and sum_i Pi_i=I. Then probabilities are &lt;psi|Pi_i|psi&gt;.</td><td>2025 Q1(b); 2025 Q5(c); 2022 Q5(c)</td></tr>
<tr><td>Why is the plus/minus measurement a projective measurement?</td><td>P_plus=|+&gt;&lt;+| and P_minus=|-&gt;&lt;-| are Hermitian, idempotent, orthogonal, and complete because |+> and |-> are an orthonormal basis and P_plus + P_minus = I.</td><td>2025 Q1(b)</td></tr>
<tr><td>Show the 2025 Pauli Kraus channel is trace preserving.</td><td>With E_0=(1/2)sqrt(4-3lambda)I and E_1,E_2,E_3=(1/2)sqrt(lambda)X,Y,Z, the sum of E_k^dagger E_k is ((4-3lambda)/4)I + 3(lambda/4)I = I.</td><td>2025 Q4(d)</td></tr>
<tr><td>Describe the effect of the 2025 Pauli/depolarising channel on an arbitrary state rho.</td><td>rho maps to ((4-3lambda)/4)rho + (lambda/4)(X rho X + Y rho Y + Z rho Z). On the Bloch sphere this shrinks the Bloch vector by factor 1-lambda, moving the state toward the maximally mixed state I/2.</td><td>2025 Q4(d)</td></tr>
</tbody>
</table>

## 5. Gates, Circuits, Truth Tables, Teleportation, And Operator Algebra

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>How should you read a symbolic gate product when drawing a circuit?</td><td>Apply the rightmost operation first to the input state, then move left. Keep qubit order fixed, label controls and targets, and draw one wire per qubit in the same order as the tensor product.</td><td>2023 Q4(i); 2021 Q4(i)</td></tr>
<tr><td>Write the CNOT(1,2) truth table.</td><td>CNOT(1,2) maps |a,b> to |a,b xor a>. Thus |00>->|00>, |01>->|01>, |10>->|11>, and |11>->|10>.</td><td>2022 Q1(a); backup</td></tr>
<tr><td>Write the controlled-H truth table.</td><td>C_H|00>=|00>, C_H|01>=|01>, C_H|10>=(|10>+|11>)/sqrt(2), and C_H|11>=(|10>-|11>)/sqrt(2). Control 0 leaves the target unchanged; control 1 applies H to the target.</td><td>2025 Q1(c)</td></tr>
<tr><td>What is the effect of surrounding a CNOT by H on both qubits?</td><td>(H tensor H) CNOT(1,2) (H tensor H)=CNOT(2,1). The Hadamards swap X and Z bases, reversing the apparent control/target action.</td><td>2022 Q1(b); backup</td></tr>
<tr><td>Simplify (&lt;0| tensor I)(alpha_00|00>+alpha_01|01>+alpha_10|10>+alpha_11|11>).</td><td>The bra &lt;0| kills first-qubit-one terms and removes the first qubit from first-qubit-zero terms. The result is alpha_00|0> + alpha_01|1>.</td><td>2025 Q4(c)</td></tr>
<tr><td>What steps must a teleportation circuit show?</td><td>Unknown qubit |psi>, shared Bell pair, CNOT from unknown qubit to Alice's Bell qubit, H on the unknown qubit, measurement of Alice's two qubits, two classical bits sent to Bob, and Bob's Pauli correction to recover |psi>.</td><td>2024 Q4(iii)</td></tr>
<tr><td>What should a circuit-output answer contain?</td><td>State the input basis order, apply each gate in sequence, keep superposition amplitudes and phases exact, and give the final ket. Do not turn amplitudes into probabilities unless the question asks for measurement.</td><td>2025 Q1(d); 2022 Q1(c)</td></tr>
</tbody>
</table>

## 6. No-Cloning, Orthogonal-State Construction, And Unitary Proofs

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>Prove the no-cloning theorem using inner products.</td><td>Assume U|psi>|0>=|psi>|psi> and U|phi>|0>=|phi>|phi> for all states. Since U is unitary, inner products are preserved: &lt;psi|phi&gt;=&lt;psi|phi&gt;^2. This fails for arbitrary non-identical, non-orthogonal states, so no universal cloner exists.</td><td>2023 Q3(ii); 2024 Q4(i); 2025 Q4(b)</td></tr>
<tr><td>What quantifier is essential in the no-cloning theorem?</td><td>The impossibility is for a single unitary that clones every arbitrary unknown quantum state. Orthogonal known basis states can be copied by operations such as CNOT, so omitting "arbitrary" or "for every state" changes the claim.</td><td>2023 Q3(ii); 2025 Q4(b)</td></tr>
<tr><td>Give a valid |psi_perp> for |psi>=alpha|0>+beta|1>.</td><td>One valid choice is |psi_perp>=-conjugate(beta)|0>+conjugate(alpha)|1>. It is orthogonal because &lt;psi|psi_perp&gt;=conjugate(alpha)(-conjugate(beta))+conjugate(beta)conjugate(alpha)=0.</td><td>2025 Q4(a)</td></tr>
<tr><td>Find the unitary mapping |0>, |1> to |psi>, |psi_perp>.</td><td>Use the target states as columns: U=[[alpha,-conjugate(beta)],[beta,conjugate(alpha)]]. The columns are orthonormal, so U^dagger U=I and U maps |0> to |psi>, |1> to |psi_perp>.</td><td>2025 Q4(a)</td></tr>
<tr><td>Why do columns being orthonormal prove a 2 x 2 matrix is unitary?</td><td>A matrix is unitary iff U^dagger U=I. The entries of U^dagger U are inner products of columns. If columns are unit length and mutually orthogonal, those inner products form the identity matrix.</td><td>2025 Q4(a)</td></tr>
<tr><td>Prove no-deleting/no-information deletion for a single-qubit unitary.</td><td>If a unitary sent every |psi> to |0>, then for arbitrary |psi>, |phi>, inner-product preservation would give &lt;psi|phi&gt;=&lt;0|0&gt;=1, which is false for distinct states. Therefore no unitary can delete all quantum information in that way.</td><td>2022 Q4(c); legacy backup</td></tr>
<tr><td>What invariant usually drives MA4102 impossibility proofs?</td><td>Use an invariant preserved by unitaries: linearity, inner products, norm, orthogonality, or purity. Show the proposed operation would change that invariant for some allowed input, creating a contradiction.</td><td>2023 Q3(ii); 2024 Q2(ii); 2025 Q4</td></tr>
</tbody>
</table>

## 7. Priority and Legacy Control

<table>
<thead><tr><th>Front</th><th>Back</th><th>Evidence</th></tr></thead>
<tbody>
<tr><td>Should Mark Howard papers count when studying MA4102?</td><td>Yes. Treat 2025/26 as primary because it is the latest current-format paper, and use 2022/23 as backup. Howard papers keep the same core families but use more structural proof, basis, projective-measurement, and Bell-state wording.</td><td>2025/26; 2022/23</td></tr>
<tr><td>Which papers are the first drill set if the current page lists Michael Mc Gettrick?</td><td>Use 2023/24 and 2024/25 first because they are current-format Mc Gettrick papers. Use 2021/22 as older Mc Gettrick backup, then use 2025/26 and 2022/23 to catch Howard-style variants.</td><td>Paper headers; details page</td></tr>
<tr><td>Which current-paper families are highest priority?</td><td>Algorithms; state/density/basis measurement; entanglement/purity/Bell states; channels/Kraus/POVM/projective measurements; gates/circuits/teleportation; no-cloning/unitary proofs.</td><td>Coverage map</td></tr>
<tr><td>Which topics are legacy-only or lower priority?</td><td>No-deleting proof, CNOT-H conjugation, CNOT(1,2)/CNOT(2,1) truth tables, and qutrit pure-state entropy/eigenvalue comparison are useful backup but not stronger than recurring current-format families.</td><td>2021/22; 2022/23</td></tr>
</tbody>
</table>
