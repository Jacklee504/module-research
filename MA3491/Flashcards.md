# MA3491 / MA539 Exam Flashcards

This is a capped **10-card source deck**. Each card deliberately combines one tightly linked exam workflow, rather than creating many small definition cards. The detailed paper wording, marks, and coverage map are in [most_asked.html](most_asked.html).

## 1. Bounds

**Front:** State and apply the sphere-packing and Singleton bounds. Give the Singleton proof.

**Back:** For a q-ary code C of length n, minimum distance d, and t = floor((d − 1)/2),

|C| Σᵢ₌₀ᵗ C(n,i)(q − 1)ⁱ ≤ qⁿ.

This is the sphere-packing bound. Substitute q, n, d, calculate the radius-t sphere size, divide qⁿ by it, and take the integer upper bound. “Corrects all single errors” means t = 1, hence d ≥ 3.

Singleton: |C| ≤ qⁿ⁻ᵈ⁺¹. Delete d − 1 coordinate positions from every codeword. The deletion map is injective: otherwise two original codewords differ in at most d − 1 places, contradicting minimum distance d. Its codomain has qⁿ⁻ᵈ⁺¹ words, proving the bound.

**Evidence:** Q1(a)–(b), every 2022/23–2025/26 paper; proof explicitly in 2024/25 and 2025/26.

## 2. Parameters And Classifications Of Described Codes

**Front:** How do you find a code’s size, minimum distance, and perfect/MDS status when it is described by a condition on its words?

**Back:** Count legal words directly, then construct two legal words as close as possible to prove the distance. Exact patterns:

- Binary length-8 words with four 0s and four 1s: |C| = C(8,4) = 70 and dₘᵢₙ = 2, by swapping one 0 and one 1.
- P₂ₖ,ᵩ has qᵏ words and dₘᵢₙ = 2; P₂ₖ₊₁,ᵩ has qᵏ⁺¹ words and dₘᵢₙ = 1 because only the centre can change.
- For 2025/26’s X/Y condition, |C| = Σᵢ₌₀⁴ C(4,i)² = C(8,4) = 70 and dₘᵢₙ = 2.
- The q-ary repetition code of length n has [n, 1, n] and is MDS because |C| = q = qⁿ⁻ᵈ⁺¹. It is perfect only if |C| times the radius-floor((n − 1)/2) sphere size equals qⁿ. For the ternary 7-ply code, the radius-3 sphere size is 1 + 7·2 + C(7,2)·2² + C(7,3)·2³ = 379, so 3·379 ≠ 3⁷: it is not perfect.

**Evidence:** Q1(c), every current-format paper; MDS/perfect proof in 2024/25.

## 3. Finite-Field Polynomial Tests And Quotient Construction

**Front:** Give an exam-safe method for proving irreducibility, factoring over Fᵩ[x], and constructing Fᵩ[x]/(p(x)).

**Back:** A quadratic or cubic over a field is irreducible exactly when it has no root in that field, so evaluate it at every element of Fᵩ. To factor, find and divide out roots, then keep factoring until each factor is irreducible. For a degree-5 polynomial over F₂, rule out a degree-1 factor and the only irreducible quadratic x² + x + 1; every proper degree-5 factorisation has a factor of degree 1 or 2.

If p(x) in Fᵩ[x] is irreducible of degree m, then Fᵩ[x]/(p(x)) is a field with qᵐ elements. Its elements are residue classes with representatives of degree less than m. Add coefficientwise modulo q; multiply normally, then use p(x) = 0 to reduce to degree less than m.

**Evidence:** Q2(a) and Q2(b)(i), all 2022/23–2025/26 papers.

## 4. Finite-Field Arithmetic And Proof Extensions

**Front:** How do you find an inverse in a quotient field, and what must you state/prove for order, primitive elements, and the characteristic-p identity?

**Back:** For a nonzero class [a(x)] in Fᵩ[x]/(p(x)), use Euclid to find u(x), v(x) with u(x)a(x) + v(x)p(x) = 1. Then [u(x)] is [a(x)]⁻¹. Alternatively solve for an unknown representative of degree less than deg p and verify the product reduces to 1.

The multiplicative order of a in F× is the least positive m with aᵐ = 1 and divides |F| − 1. A primitive element has order |F| − 1. Since (a⁻¹)ⁿ = (aⁿ)⁻¹, a and a⁻¹ have the same order, so the inverse of a primitive element is primitive.

If char(F) = p, expand (a + b)ᵖ. Every intermediate binomial coefficient C(p,j), 0 < j < p, is divisible by p and is therefore zero in F. Thus (a + b)ᵖ = aᵖ + bᵖ.

For the 2024/25 restriction-of-scalars variant, {1,a} is an F₂-basis of F₄ because every element is uniquely u + va with u,v ∈ F₂. If V has F₄-basis {e₁,…,eₙ}, then {e₁,…,eₙ, ae₁,…,aeₙ} is an F₂-basis: expand each F₄ coefficient as uᵢ + vᵢa for spanning, and compare those coefficients for independence.

**Evidence:** Q2(b)–(d), 2023/24–2025/26.

## 5. Linear-Code Matrix Workflow

**Front:** Given a generator matrix G, how do you obtain a check matrix, test membership, find minimum distance, and prove self-duality?

**Back:** Row-reduce over the stated field to G = [Iₖ | A]. A compatible parity-check matrix is H = [−Aᵀ | Iₙ₋ₖ], so GHᵀ = 0. A row vector v lies in C exactly when vHᵀ = 0. For a linear code, dₘᵢₙ is the least Hamming weight of a nonzero codeword; enumerate a small code, or find the least number of linearly dependent columns of H.

To show C = C⊥, first show C ⊆ C⊥, for example by GGᵀ = 0, then show dimensions agree. Since dim C⊥ = n − k, equality follows when k = n/2.

**Evidence:** Q3 and Q4(a), all current-format papers; self-dual proof in 2024/25 and 2025/26.

## 6. Decoding: Syndrome, Standard Array, And Nearest Neighbour

**Front:** Give a complete syndrome-decoding answer, and distinguish it from standard-array and nearest-neighbour wording.

**Back:** For received row vector r, calculate s = rHᵀ. Use the syndrome table to select a minimum-weight coset leader e with eHᵀ = s, then decode to r − e. In a nonbinary code, s can be a nonzero scalar multiple of a column of H: identify both the error position and its nonzero magnitude before subtracting e.

A standard array has the codewords in its first row and a coset leader at the start of every later row. Locate r and decode to the codeword at the top of that column. Nearest-neighbour decoding means choose the codeword(s) at minimum Hamming distance from r; state any tie.

**Evidence:** Q3(a)(iii), Q3(b)(ii), or Q3(e), every 2022/23–2025/26 paper.

## 7. Hamming Codes

**Front:** Define Ham(r,q), construct its parity-check matrix, correct one error, state its parameters, and prove it is perfect.

**Back:** Let n = (qʳ − 1)/(q − 1). Choose one nonzero representative from each 1-dimensional subspace of Fᵩʳ as a column of an r × n matrix H. Then Ham(r,q) = {c ∈ Fᵩⁿ : cHᵀ = 0} and has parameters [n, n − r, 3].

For a single error aeⱼ, the syndrome is aeⱼHᵀ = ahⱼ, where hⱼ is column j of H. Match the syndrome to the unique column up to a nonzero scalar, identify a and j, subtract aeⱼ, and give the corrected word.

It is perfect because d = 3, so radius-1 balls are disjoint. Each has 1 + n(q − 1) = qʳ words. There are qⁿ⁻ʳ codewords and qⁿ⁻ʳqʳ = qⁿ ambient words.

**Evidence:** Q4(b) in 2022/23–2023/24 and Q4(a)–(e) in 2024/25–2025/26.

## 8. Cyclic-Code Generator And Check Construction

**Front:** Given a cyclic code of length n and generator polynomial g(x), how do you construct its generator and check matrices?

**Back:** Work in Fᵩ[x]/(xⁿ − 1). The monic generator polynomial satisfies g(x) | xⁿ − 1. If deg g = n − k, rows from coefficient vectors of g, xg, …, xᵏ⁻¹g form G. Compute h(x) = (xⁿ − 1)/g(x). A check matrix is a generator matrix for C⊥: use h*(x) = h(0)⁻¹xᵈᵉᵍʰh(x⁻¹) as the dual generator polynomial; the n − k rows are its shifts h*, xh*, …, xⁿ⁻ᵏ⁻¹h*. Verify GHᵀ = 0.

If asked about the 2024/25 odd-weight theorem, sum all cyclic shifts of an odd-weight binary word u. Every coordinate of the sum receives wt(u) ones, hence equals 1 in F₂; cyclic closure puts the all-ones word in C.

**Evidence:** Q5(b), 2022/23–2023/24; Q5(a), 2024/25–2025/26; odd-weight proof in 2024/25.

## 9. Weight Enumerators And MacWilliams’ Identity

**Front:** Define a weight enumerator, compute it, state binary MacWilliams’ identity, and read minimum distance from it.

**Back:** The one-variable weight enumerator is W_C(z) = Σ_{c∈C} z^wt(c). Enumerate every codeword, including the zero word, so the constant term is 1. For binary length-n code C,

W_C⊥(z) = |C|⁻¹(1 + z)ⁿ W_C((1 − z)/(1 + z)).

Use it in the requested direction, expand only as far as needed, and read dₘᵢₙ as the smallest positive exponent having nonzero coefficient. Do not confuse W_C with W_C⊥: the 2025/26 paper explicitly asks for the dual’s enumerator first.

**Evidence:** Q5(a), 2022/23 and 2023/24; Q5(c)–(f), 2025/26.

## 10. Legacy Backup: Metric, Checksums, And Polynomial-Ring Units

**Front:** State the older-paper backup ideas that are not part of the current recurring format.

**Back:** Hamming distance on Aⁿ is d(x,y) = the number of coordinates i with xᵢ ≠ yᵢ. It is a metric: it is nonnegative, zero exactly when x = y, symmetric, and satisfies the triangle inequality coordinate by coordinate.

For an ISBN-10 number d₁…d₁₀, use 10d₁ + 9d₂ + … + d₁₀ ≡ 0 (mod 11), with X representing 10 if required. For ISBN-13, use d₁ + 3d₂ + d₃ + 3d₄ + … + 3d₁₂ + d₁₃ ≡ 0 (mod 10). Substitute the unknown, solve the congruence, and check the result.

In a Euclidean domain R, u is a unit iff there exists v in R with uv = 1. U(R) is a group under multiplication: closure, associativity, identity 1, and inverses all come from ring multiplication and the definition. If F is a field, the units of F[x] are exactly the nonzero constant polynomials, because deg(fg) = deg f + deg g.

**Evidence:** 2018/19 Q1(a), Q1(c), Q2(c); 2021/22 Q1(b).
