# MA3491 / MA539 — Exam Flashcards

Use one heading as one card. The answers are deliberately self-contained: practise saying or writing the whole back before checking it. Cards 1–33 cover the current-format papers; Cards 34–36 are legacy backup only.

## 1. Sphere-packing bound — statement

**Front:** State the sphere-packing bound for a q-ary code.

**Back:** If C ⊆ F_q^n has minimum distance d and t = floor((d − 1)/2), then

|C| Σ_(i=0)^t binom(n,i)(q − 1)^i ≤ q^n.

The summation is the number of words in a Hamming ball of radius t. The bound follows because radius-t balls about distinct codewords are disjoint.

**Evidence:** Q1(a), every 2022/23–2025/26 paper.

## 2. Sphere-packing bound — application

**Front:** How do you apply the sphere-packing bound, and what does “corrects one error” mean?

**Back:** Calculate t = floor((d − 1)/2), evaluate S = Σ_(i=0)^t binom(n,i)(q − 1)^i, then conclude |C| ≤ floor(q^n/S). A code corrects every single error when t ≥ 1, equivalently d ≥ 3. Show the substitution and the final integer bound.

**Evidence:** Q1(a), every current-format paper.

## 3. Singleton bound — statement

**Front:** State the Singleton bound for a q-ary code.

**Back:** If C ⊆ F_q^n has minimum distance d, then |C| ≤ q^(n − d + 1). For a linear [n,k,d] code, this is k ≤ n − d + 1.

**Evidence:** Q1(b), every 2022/23–2025/26 paper.

## 4. Singleton bound — proof

**Front:** Give the standard proof of the Singleton bound.

**Back:** Delete any d − 1 coordinates from every codeword. If two distinct codewords have the same shortened word, they differed only in the deleted d − 1 positions, contradicting d_min = d. Thus deletion is injective from C into F_q^(n − d + 1), which has q^(n − d + 1) words. Hence |C| ≤ q^(n − d + 1).

**Evidence:** Q1(b)(ii), 2024/25 and 2025/26.

## 5. Described-code parameters — general method

**Front:** How do you find the parameters of a code defined by a condition on its words?

**Back:** Count the permitted words to obtain |C|. For distance, first prove every pair differs in at least a claimed number of positions, then exhibit two legal words attaining it. If C is linear and |C| = q^k, write [n,k,d]; otherwise state length n, size |C|, and minimum distance d. Do not infer linearity from a counting condition.

**Evidence:** Q1(c), every current-format paper.

## 6. Palindromes and balanced-word examples

**Front:** State the size and minimum distance of q-ary palindromes, and the binary balanced length-8 code.

**Back:** For even-length palindromes P_(2k,q), choose the first k entries freely: |P| = q^k and d_min = 2, since a change is mirrored. For odd P_(2k+1,q), the middle entry may change alone: |P| = q^(k+1) and d_min = 1. Binary length-8 words with four 0s and four 1s have size binom(8,4) = 70 and minimum distance 2: unequal equal-weight words differ in equally many 0→1 and 1→0 positions.

**Evidence:** 2022/23 Q1(c); 2023/24 Q1(c).

## 7. Repetition codes — parameters, MDS, and perfectness

**Front:** Give the parameters of a q-ary repetition code and test MDS/perfectness.

**Back:** The length-n q-ary repetition code consists of (a,…,a), a ∈ F_q, so it has [n,1,n]. It is MDS because it meets Singleton: 1 = n − n + 1. It is perfect only when |C| times the radius-floor((n−1)/2) ball size equals q^n. For the ternary 7-ply code, the radius-3 ball has 1 + 7·2 + binom(7,2)·2² + binom(7,3)·2³ = 379 words, and 3·379 ≠ 3⁷, so it is not perfect.

**Evidence:** 2024/25 Q1(c).

## 8. Irreducibility in degrees 2 and 3

**Front:** How do you test a degree-2 or degree-3 polynomial over F_q for irreducibility?

**Back:** A polynomial of degree 2 or 3 over a field is irreducible exactly when it has no root in that field. Evaluate it at every element of F_q. A root a gives a linear factor x − a; divide and continue factorising the quotient if required.

**Evidence:** Q2(a), 2022/23 and 2024/25.

## 9. A degree-5 irreducibility proof over F₂

**Front:** How do you prove a degree-5 polynomial over F₂ is irreducible?

**Back:** Rule out all irreducible factors of degree 1 or 2. Test x = 0 and x = 1 to rule out linear factors, then divide by the only irreducible quadratic x² + x + 1 to rule out a quadratic factor. Any nontrivial factorisation of degree 5 has a factor of degree 1 or 2, so this proves irreducibility.

**Evidence:** 2025/26 Q2(b).

## 10. Factorisation over a finite field

**Front:** What is an exam-safe factorisation workflow in F_q[x]?

**Back:** First test all elements of F_q for roots and divide out each linear factor. Factor the remaining polynomial by degree; a quadratic or cubic with no root is irreducible. State the final factorisation and briefly justify that each listed factor is irreducible. Repeated factors must retain their multiplicity.

**Evidence:** Q2(a), 2022/23 and 2023/24.

## 11. Quotient-field construction

**Front:** Construct F_q[x]/(p(x)) when p is irreducible of degree m.

**Back:** F_q[x]/(p(x)) is a field with q^m elements. Its elements are residue classes [a_0 + a_1x + … + a_(m−1)x^(m−1)], with coefficients in F_q. Add coefficients modulo q; multiply polynomials and reduce every power x^m or higher using p(x) = 0.

**Evidence:** Q2(b), 2022/23–2025/26.

## 12. Quotient-field multiplication and reduction

**Front:** How do you multiply residue classes in F_q[x]/(p(x))?

**Back:** Multiply representatives in F_q[x], then use the relation p(x) = 0 to replace the highest power of x and continue until the representative has degree less than deg p. Reduce coefficients in F_q throughout. Finish by giving the degree-<deg p representative, not an unreduced product.

**Evidence:** 2022/23 Q2(b)(ii).

## 13. Inverse in a quotient field

**Front:** How do you find [a(x)]⁻¹ in F_q[x]/(p(x))?

**Back:** Since p is irreducible and a is nonzero modulo p, gcd(a,p) = 1. Use the extended Euclidean algorithm to find u,v with u(x)a(x) + v(x)p(x) = 1. Reducing modulo p gives [u][a] = [1], so [u] is [a]⁻¹. Reduce u to degree less than deg p and check the product if time permits.

**Evidence:** Q2(b)/(c), every current-format paper.

## 14. Multiplicative order and primitive elements

**Front:** Define multiplicative order and a primitive element of a finite field.

**Back:** For a ∈ F^×, ord(a) is the least positive integer m such that a^m = 1. Since F^× has order |F| − 1, a is primitive exactly when ord(a) = |F| − 1. To find an order, test divisors of |F| − 1, using a^(|F|−1) = 1.

**Evidence:** 2023/24 Q2(b)(ii); 2024/25 Q2(c)(i).

## 15. Inverse of a primitive element

**Front:** Prove that the inverse of a primitive element is primitive.

**Back:** First, for every n, (a⁻¹)^n = (a^n)⁻¹. Hence (a⁻¹)^n = 1 iff a^n = 1, so a and a⁻¹ have the same multiplicative order. If a is primitive, ord(a) = |F| − 1; therefore ord(a⁻¹) = |F| − 1 and a⁻¹ is primitive.

**Evidence:** 2024/25 Q2(c)(ii)–(iii).

## 16. Restriction of scalars from F₄ to F₂

**Front:** How do you turn an F₄-basis into an F₂-basis?

**Back:** If F₄ = F₂(a), then {1,a} is an F₂-basis of F₄. If {e_1,…,e_n} is an F₄-basis of V, then {e_1,…,e_n, ae_1,…,ae_n} is an F₂-basis. For spanning, expand each F₄ coefficient as u + va with u,v ∈ F₂. For independence, group a linear relation into F₄ coefficients of the e_i, use F₄-independence, then use independence of {1,a} over F₂.

**Evidence:** 2024/25 Q1(d).

## 17. Frobenius identity in characteristic p

**Front:** Prove (a + b)^p = a^p + b^p in a field of characteristic p.

**Back:** By the binomial theorem, (a+b)^p = Σ_(j=0)^p binom(p,j)a^j b^(p−j). For 0 < j < p, the prime p divides binom(p,j), so those coefficients are 0 in a field of characteristic p. Only the j = 0 and j = p terms remain, giving a^p + b^p.

**Evidence:** 2025/26 Q2(d).

## 18. Generator matrix to standard form

**Front:** How do you put a generator matrix G into standard form?

**Back:** Perform elementary row operations over the stated field until G = [I_k | A]. Row operations replace the chosen basis of the same row space, so they do not change the linear code. Do all arithmetic in F_q; in particular, reduce nonbinary entries modulo q.

**Evidence:** Q3(a), 2024/25–2025/26.

## 19. Parity-check matrix and membership test

**Front:** Construct a parity-check matrix from G = [I_k | A], and state the membership criterion.

**Back:** Take H = [−Aᵀ | I_(n−k)]. Then GHᵀ = 0. A row vector v ∈ F_q^n is a codeword of C exactly when vHᵀ = 0. Always check dimensions: G is k × n and H is (n−k) × n.

**Evidence:** Q3(b), every current-format paper.

## 20. Minimum distance by codeword weights

**Front:** How do you find d_min of a small linear code from its codewords?

**Back:** Enumerate all linear combinations of rows of G, excluding the zero word. Compute each Hamming weight. For a linear code, d_min is the smallest nonzero codeword weight. State at least one word attaining the minimum.

**Evidence:** Q3(a)(i)–(ii), 2022/23–2023/24.

## 21. Minimum distance from H

**Front:** How do columns of a parity-check matrix determine d_min?

**Back:** For a linear code with parity-check matrix H, d_min is the smallest number of columns of H that are linearly dependent. Thus no zero column gives d ≥ 2; no proportional pair gives d ≥ 3; then exhibit a dependent set of the claimed size to obtain equality. Over F_q, “proportional” includes every nonzero scalar multiple.

**Evidence:** Q4(a), 2022/23–2023/24; Q3(c), 2024/25–2025/26.

## 22. Self-duality

**Front:** Give a complete proof that C is self-dual.

**Back:** Show C ⊆ C^⊥, for example by proving every pair of generator rows has zero inner product, equivalently GGᵀ = 0. Then compare dimensions: dim C^⊥ = n − dim C. If dim C = n/2, the inclusion is between equal-dimensional subspaces, so C = C^⊥.

**Evidence:** Q3(d), 2024/25–2025/26.

## 23. Syndrome decoding

**Front:** Give the syndrome-decoding algorithm for a received word r.

**Back:** Compute s = rHᵀ. Choose the minimum-weight coset leader e whose syndrome is eHᵀ = s. The decoded codeword is r − e, because (r−e)Hᵀ = 0. In a nonbinary code, identify both the error position and its nonzero magnitude: syndrome a h_j corresponds to error ae_j.

**Evidence:** Q3(b)/(e), every current-format paper.

## 24. Standard array versus nearest-neighbour decoding

**Front:** Distinguish standard-array decoding from nearest-neighbour decoding.

**Back:** A standard array has the codewords in the top row and each later row formed by adding a coset leader; a received word decodes to the top-row word in its column. Nearest-neighbour decoding asks for the codeword(s) at minimum Hamming distance from r. The two agree when the selected coset leader has minimum weight; report a tie if more than one nearest codeword exists.

**Evidence:** Q3(a)(iii), 2022/23–2023/24.

## 25. Hamming-code definition and parameters

**Front:** Define Ham(r,q) and state its parameters.

**Back:** Let n = (q^r − 1)/(q − 1), and let H be an r × n matrix whose columns are one representative from each one-dimensional subspace of F_q^r. Then Ham(r,q) = {c ∈ F_q^n : cHᵀ = 0}. It has parameters [n, n−r, 3].

**Evidence:** Q4, every current-format paper.

## 26. Hamming parity-check matrix

**Front:** How do you construct the parity-check matrix for Ham(r,q)?

**Back:** List every one-dimensional subspace of F_q^r and choose exactly one nonzero vector from each as a column. Do not include both scalar multiples. There are (q^r − 1)/(q − 1) such columns. Any two columns are not proportional, so no two columns are dependent; three may be dependent, giving d_min = 3.

**Evidence:** Q4(b), every current-format paper.

## 27. Single-error correction in a Hamming code

**Front:** How does a Hamming-code syndrome locate and correct one error?

**Back:** If the transmitted word c receives the single error ae_j, then r = c + ae_j and rHᵀ = a h_j, where h_j is column j of H. Find the unique column proportional to the syndrome and its scalar a, then correct by r − ae_j. Give the corrected word and, if asked, the original error location and magnitude.

**Evidence:** Q4(c), every current-format paper.

## 28. Why Hamming codes are perfect

**Front:** Prove that Ham(r,q) is perfect.

**Back:** Its d_min is 3, so radius-1 balls around codewords are disjoint. Each has 1 + n(q−1) = 1 + ((q^r−1)/(q−1))(q−1) = q^r words. Since |Ham(r,q)| = q^(n−r), the total covered is q^(n−r)q^r = q^n, the whole ambient space. Thus every word lies in exactly one radius-1 ball, so the code is perfect.

**Evidence:** Q4(e), 2024/25–2025/26.

## 29. Cyclic-code generator matrix

**Front:** Construct G from a cyclic-code generator polynomial g(x).

**Back:** Work in F_q[x]/(x^n − 1), with monic g(x) dividing x^n − 1. If deg g = n − k, then C has dimension k. The coefficient vectors of g, xg, …, x^(k−1)g are the k rows of a generator matrix G, with coefficients ordered consistently from x^0 to x^(n−1).

**Evidence:** Q5(a)/(b), every current-format paper.

## 30. Cyclic check polynomial and check matrix

**Front:** Given g(x), construct a check polynomial and a parity-check matrix for a cyclic code.

**Back:** Compute h(x) = (x^n − 1)/g(x). A generator polynomial for C^⊥ is h*(x) = h(0)⁻¹x^(deg h)h(x⁻¹), the normalised reciprocal of h. Form H from the coefficient vectors of h*, xh*, …, x^(n−k−1)h*. Verify GHᵀ = 0; H has n−k rows and n columns.

**Evidence:** Q5(a)/(b), every current-format paper.

## 31. Odd-weight binary cyclic theorem

**Front:** Prove that an odd-length binary cyclic code containing an odd-weight word contains the all-ones word.

**Back:** Let u ∈ C have odd weight and sum all n cyclic shifts of u. Cyclicity and linearity keep this sum in C. In each coordinate, every entry of u occurs exactly once, so that coordinate equals wt(u) mod 2 = 1. The sum is therefore the all-ones word, which lies in C.

**Evidence:** 2024/25 Q5(b).

## 32. Weight enumerator

**Front:** Define the one-variable weight enumerator and compute it from a small code.

**Back:** W_C(z) = Σ_(c∈C) z^(wt(c)). Enumerate every codeword, calculate its Hamming weight, and collect equal exponents. The constant term is 1 from the zero word; W_C(1) = |C| is a useful check. Do not omit multiplicities.

**Evidence:** Q5(a), 2022/23–2023/24; Q5(c), 2025/26.

## 33. MacWilliams’ identity and minimum distance

**Front:** State binary MacWilliams’ identity and use an enumerator to find minimum distance.

**Back:** For binary C of length n,

W_(C^⊥)(z) = |C|⁻¹(1+z)^n W_C((1−z)/(1+z)).

Use it in the required direction, expanding only as far as requested. The minimum distance of a nonzero code is the least positive exponent having a nonzero coefficient in its weight enumerator. Keep W_C and W_(C^⊥) distinct.

**Evidence:** 2025/26 Q5(d)–(f).

## 34. Hamming distance is a metric [legacy]

**Front:** Define Hamming distance and prove it is a metric.

**Back:** For x,y ∈ A^n, d(x,y) is the number of coordinates i with x_i ≠ y_i. It is nonnegative, d(x,y)=0 iff x=y, and symmetric. For each coordinate, the indicator of x_i ≠ z_i is at most the sum of indicators of x_i ≠ y_i and y_i ≠ z_i; summing proves d(x,z) ≤ d(x,y)+d(y,z).

**Evidence:** 2018/19 Q1(a).

## 35. ISBN check digits [legacy]

**Front:** State the ISBN-10 and ISBN-13 check conditions.

**Back:** ISBN-10 digits d_1,…,d_10 satisfy 10d_1 + 9d_2 + … + d_10 ≡ 0 (mod 11); X represents 10 where needed. ISBN-13 uses alternating weights 1,3,1,3,…,1 and requires the weighted sum to be 0 modulo 10. Substitute the missing digit and solve the resulting congruence.

**Evidence:** 2018/19 and 2021/22 Q1(b).

## 36. Units in F[x] [legacy]

**Front:** What are the units of F[x], and why?

**Back:** The units of F[x] are exactly the nonzero constants F^×. If f(x)g(x)=1, then deg f + deg g = deg 1 = 0, so both f and g have degree 0. Conversely every nonzero constant has its scalar inverse in F. More generally, units in a Euclidean domain are elements u having uv=1 for some v.

**Evidence:** 2018/19 Q2(c).
