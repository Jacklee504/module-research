# MA3491 / MA539: Most Likely Exam Questions

## Scope

This is a **solution-free question bank** distilled from the six local papers:
2018-19, 2021-22, 2022-23, 2023-24, 2024-25, and 2025-26.  The 2024-25 paper uses the
combined code **MA3491/MA539**.

The aim is to recognise the *same question family* when the field, alphabet,
numbers, or wording change.  A change from “construct a check matrix” to
“hence determine whether this word is a codeword” is usually not a new topic:
it is the same generator/check-matrix workflow with a different final task.

No methods, formulas, or worked answers are included here.

## Recurrence at a Glance

| Question family | 2018-19 | 2021-22 | 2022-23 | 2023-24 | 2024-25 | 2025-26 | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sphere-packing bound / parameters of a block code | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Singleton bound / MDS or perfect-code consequence | - | - | Yes | Yes | Yes | Yes | High |
| Finite-field irreducibility or factorisation | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Finite-field construction, arithmetic, inverse, order, or primitive element | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Generator matrix, standard form, parity-check matrix, or minimum distance | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Syndrome / nearest-neighbour / standard-array decoding | Yes | - | Yes | Yes | Yes | Yes | Very high |
| Hamming-code definition, parity-check matrix, and single-error decoding | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Cyclic-code generator matrix, check polynomial, and check matrix | Yes | Yes | Yes | Yes | Yes | Yes | Very high |
| Weight enumerator / MacWilliams extension | - | - | Yes | Yes | - | Yes | Recurring secondary |
| ISBN checks, units in polynomial rings, or one-off proof/extension questions | Yes | Yes | - | - | Yes (different one-offs) | Low |

The recent four papers use five questions.  The most stable broad structure is:

1. bounds and block-code parameters;
2. finite fields;
3. linear codes and decoding;
4. Hamming codes; and
5. cyclic codes (with weight enumerators in 2022-23, 2023-24, and 2025-26).

## 2025-26 Update

The new paper confirms the full Q1-to-Q5 pattern.  It repeats the Singleton
proof, the standard-form/check-matrix/self-duality/syndrome sequence, and the
full Hamming-code definition/construction/correction/parameters/perfection
sequence from 2024-25.  Its new extension is a Q5 chain linking a cyclic code
to the weight enumerator of its dual and MacWilliams' identity.  Treat the
weight-enumerator definition as recurring secondary material and MacWilliams'
identity as a one-paper extension.

---

## 1. Bounds and Block-Code Parameters

### 1A. Sphere-packing bound - appears in all five papers

**Core prompt:** state the sphere-packing bound, then use it to obtain an
upper bound on the number of codewords.

Wording variations that mean the same thing:

- “State the sphere packing bound and use it to show that a binary code of
  block length 8 that can correct all single errors can have at most ...
  code words.” (2018-19)
- “State the sphere packing bound, and determine which upper bound on the
  number of codewords in a block code with alphabet \(\mathbb F_5\), block
  length 8, that corrects all single errors it gives.” (2021-22)
- “State the sphere packing bound, and determine the upper bound it gives on
  the number of code words in a 4-ary code with block length 8 and minimum
  distance 3.” (2022-23)
- The same prompt with a ternary code of length 8 and minimum distance 3.
  (2023-24)
- “State the sphere packing bound”; then, separately, “Determine the upper
  bound ... in a binary code with block length 10 and minimum distance 5.”
  (2024-25)

**Do not be misled by:** “corrects all single errors” versus “minimum distance
3”, or a different alphabet size.  They are variants of the same bound
application.

### 1B. Singleton bound - three most recent papers

**Core prompt:** state the Singleton bound and use it to obtain an upper
bound.  Be ready for a proof request.

Wording variations:

- “State the Singleton bound, and determine the upper bound it gives on the
  number of code words in a ternary code with block length 8 and minimum
  distance 3.” (2022-23)
- The same wording with a 4-ary code of length 8 and minimum distance 3.
  (2023-24)
- “State the Singleton bound”; “Prove the Singleton bound”; then “Determine
  the upper bound ... in a ternary code with block length 9 and minimum
  distance 3.” (2024-25)

**Do not be misled by:** a standalone “prove” part.  It is an extension of
the same recurring bound, not evidence that bounds have disappeared.

### 1C. Find code parameters or minimum distance from a specially described code

**Core prompt:** a code is given in words rather than by a matrix.  Find its
size, parameters, minimum distance, or classify it using perfect/MDS language.

Past variations:

- Given four explicit words over \(\{A,B\}\), “Determine the minimum
  distance.” (2018-19)
- Given all length-9 ternary words in which each symbol occurs exactly three
  times, “Determine the minimum distance.” (2021-22)
- Given binary length-8 words with an equal number of 0s and 1s, ask:
  “How many code words does \(C\) have?” and “What is the minimum distance
  of \(C\)?” (2022-23)
- Given palindromic words of even or odd block length, determine both the
  number of codewords and the minimum distance. (2023-24)
- Given a ternary 7-ply repetition code, “Determine the parameters”; “Show
  that \(C\) is not a perfect code”; and “Show that \(C\) is an MDS code.”
  (2024-25)

**Same-skill signal:** the code is specified by a property of its words;
you are being asked to reason about its distance/size, rather than row-reduce
a matrix.

### 1D. Older, lower-priority variation: checksum codes

- A symbol in an ISBN number is replaced by `#`; find it. (2018-19 and
  2021-22)

This repeats in the two older papers but does not occur in the recent
three-paper structure.  Treat it as a short bonus question, not a core focus.

---

## 2. Finite Fields and Polynomial Arithmetic

### 2A. Irreducibility or factorisation over a finite field - appears in all five papers

**Core prompt:** decide whether one or more polynomials in \(\mathbb F_q[x]\)
are irreducible; factor any reducible ones into irreducibles.

Wording variations:

- “Show that the ternary polynomial ... is irreducible.” (2018-19)
- “For each of the following polynomials in \(\mathbb F_3[x]\), determine if
  it is irreducible or not, and if it is reducible, factor it into
  irreducibles.” (2021-22)
- The same instruction in \(\mathbb F_5[x]\) for two cubic polynomials.
  (2022-23)
- “Factor the polynomial \(x^6-1\in\mathbb F_3[x]\) into irreducibles.”
  (2023-24)
- “Show that the polynomial \(p(x)=x^2+x+1\in\mathbb F_5[x]\) is
  irreducible.” (2024-25)

**Do not be misled by:** “show irreducible,” “determine if irreducible,” and
“factor into irreducibles.”  They all test polynomial factorisation in a
finite-field setting.

### 2B. Define a field quotient, then calculate in it - appears in four papers; field work in all five

**Core prompt:** after an irreducible polynomial is supplied or established,
work in the corresponding quotient field.

Past variations:

- “Construct the field of eight elements.  Give its elements and show how
  they are added and multiplied.” (2018-19)
- “Show that \(f(x)\in\mathbb Z_2[x]\) is irreducible, and hence let
  \(\mathbb F_8=\mathbb Z_2[x]/(f(x))\).  Calculate the product ... in
  \(\mathbb F_8\).” (2021-22)
- Establish \(\mathbb F_{27}=\mathbb F_3[x]/(f(x))\), then calculate a
  product represented by a polynomial of bounded degree. (2022-23)
- Establish \(\mathbb F_{16}=\mathbb F_2[x]/(f(x))\), then work with named
  residue classes. (2023-24)
- Use the supplied presentation \(\mathbb F_{25}=\mathbb F_5[x]/(p(x))\)
  to calculate an inverse. (2024-25)

**Same-skill signal:** the notation may change from \(\mathbb Z_p[x]\) to
\(\mathbb F_p[x]\), and the field may be \(8,16,25,\) or \(27\) elements.
The task remains quotient-field arithmetic.

### 2C. Multiplicative inverse in a finite field - appears in three recent-consecutive papers plus 2021-22

**Core prompt:** calculate the inverse of a given non-zero element and write
it in the required polynomial-degree form.

Past variations:

- “Calculate the multiplicative inverse of \(x^2\) in \(\mathbb F_8\).”
  (2021-22)
- The same request in \(\mathbb F_{27}\). (2022-23)
- The same request in \(\mathbb F_{16}\), with degree at most 3. (2023-24)
- “Calculate the multiplicative inverse of \(x+3\) in \(\mathbb F_{25}\),”
  with degree at most 1. (2024-25)

**Do not be misled by:** the inverse target can be a monomial or a general
linear polynomial, and the required representative degree depends on the
defining polynomial.

### 2D. Multiplicative order / primitive elements - recent extension

- “Find the order of the element \(x^2+x\) in \(\mathbb F_{16}\).”
  (2023-24)
- “What is meant by a primitive element of \(F\)?” followed by short proof
  questions concerning inverses of powers and the inverse of a primitive
  element. (2024-25)

This is less frequent than irreducibility and inverses, but it is a coherent
finite-field extension worth recognising.

### 2E. One-off/older algebra variations

- Find a polynomial gcd in \(\mathbb Z_3[x]\). (2018-19)
- Define a unit in a Euclidean domain; show units form a group; identify the
  units in \(F[x]\). (2018-19)
- Treat \(\mathbb F_4\) as a vector space over \(\mathbb F_2\), then extend a
  basis from an \(\mathbb F_4\)-vector space to an \(\mathbb F_2\)-vector
  space. (2024-25)

These are genuine possible extensions but not a repeated core template.

---

## 3. Linear Codes, Check Matrices, and Decoding

### 3A. Generate codewords and find minimum distance - appears in all five papers

**Core prompt:** a linear code is presented by a generator matrix.  List or
otherwise obtain its codewords and determine its minimum distance.

Wording variations:

- “List the codewords of \(C\). Hence find the minimum distance.”
  (2018-19)
- “Write down the code words of \(C\). Determine the minimum distance.”
  (2021-22 and 2022-23)
- “What is the minimum distance of \(C_1\)?” after listing the codewords.
  (2023-24)
- Given a generator matrix, first put it in standard form, then construct a
  check matrix and determine the minimum distance. (2024-25)

**Do not be misled by:** “hence” versus a separate part, binary versus ternary
versus a larger field, or a direct question about minimum distance after a
matrix conversion.  The central object is still the linear code generated by
\(G\).

### 3B. Convert a generator matrix to standard form, then construct a check matrix - appears in all five papers

**Core prompt:** transform or use a generator matrix to obtain a parity-check
(check) matrix.

Wording variations:

- “Find a generator matrix in standard form for \(C\). Hence, construct a
  parity check matrix for \(C\).” (2018-19 and 2021-22)
- “Construct a check matrix for \(C_2\)” when the displayed generator matrix
  is already in standard form. (2022-23 and 2023-24)
- “Construct a generator matrix in standard form”; “Construct a check
  matrix.” (2024-25)

**Same-skill signal:** “parity check matrix” and “check matrix” are being used
for the same target.  “Hence” signals that the previous standard-form result
is intended to be used.

### 3C. Use a check matrix to test membership or determine distance

**Core prompt:** use a check matrix to establish whether a supplied word is a
codeword, or use it to find minimum distance.

Past variations:

- After constructing \(H\), “determine if the word ... is a codeword in
  \(C\).” (2021-22)
- A check matrix is supplied for a linear \([5,3]\)-code; “Determine the
  minimum distance of \(C\).” (2022-23)
- The same wording for a linear \([4,1]\)-code over \(\mathbb F_7\).
  (2023-24)
- A generator/check-matrix question ends by asking to “Show that \(C\) is
  self-dual.” (2024-25)

**Do not be misled by:** a supplied matrix instead of a derived one, or by a
membership/minimum-distance/self-duality final part.  These are all standard
linear-code consequences built around \(G\), \(H\), and the dual code.

### 3D. Syndrome table and decoding - four of the five papers

**Core prompt:** construct a syndrome lookup table, then use it to decode one
or more received words.

Wording variations:

- “Construct a syndrome lookup table for \(C\) and use it to decode the
  words ...” (2018-19)
- “Construct a syndrome table for \(C_2\) and use it to decode the word
  ...” (2022-23 and 2023-24)
- “Construct a syndrome table”; then “Use the syndrome table to decode the
  message words ...” (2024-25)

**Same-skill signal:** “lookup table” and “syndrome table” are the same
request.  The word being called “received” or “message” does not alter the
decoding task.

### 3E. Decoding without the phrase “syndrome table”

- “What is the result of nearest-neighbour decoding of a received word ...?”
  after codewords and minimum distance are found. (2022-23)
- “Construct a standard array ... and use that to decode the received words
  ...” (2023-24)

These are alternative *decoding representations*.  Group them with syndrome
decoding in revision rather than treating them as wholly new topics.

---

## 4. Hamming Codes

### 4A. The Hamming-code sequence - appears in all five papers

This is the most regular multi-part question family.  Expect a sequence of:

1. define \(\operatorname{Ham}(r,q)\);
2. construct a parity-check matrix for a specified \(r,q\);
3. explain single-error correction; and
4. decode one or more words.

Wording variations:

- “What is the definition of the Hamming code \(\operatorname{Ham}(r,q)\)?”
  (2018-19, 2021-22, 2022-23, 2023-24, 2024-25)
- “Write down a parity check matrix for \(\operatorname{Ham}(2,5)\).”
  (2018-19 and 2021-22)
- “Construct a parity check matrix” for \(\operatorname{Ham}(2,7)\),
  \(\operatorname{Ham}(2,4)\), or \(\operatorname{Ham}(3,2)\).
  (2022-23 to 2024-25)
- “Explain how a single error can be corrected in ... Decode the word(s)
  ...” (every paper)

**Do not be misled by:** “write down” versus “construct”; a changed \(r,q\);
or a one-word versus two-word decoding request.  The construction and
single-error correction family is unchanged.

### 4B. Recent extensions of the Hamming-code sequence

- “State (without proof) the parameters of the Hamming code
  \(\operatorname{Ham}(r,q)\).” (2024-25)
- “Show that the Hamming code \(\operatorname{Ham}(r,q)\) is a perfect
  code.” (2024-25)

These extend the universal construction/decoding question and are worth
adding after the main sequence is secure.

---

## 5. Cyclic Codes

### 5A. Generator polynomial to generator matrix, check polynomial, and check matrix - appears in all five papers

**Core prompt:** a cyclic code is specified by its length, field, and
generator polynomial.  Construct its generator matrix, obtain the check
polynomial, and construct/use a check matrix.

Wording variations:

- “Give the generator matrix of \(C\). Find the check polynomial. Write down
  the check matrix and hence verify that ... is a codeword.” (2018-19)
- “Give the generator matrix ... Find the check polynomial ... Write down the
  check matrix and hence determine if any of the words ... is a codeword.”
  (2021-22)
- “Construct the generator matrix ... Find the check polynomial for \(C\) and
  hence construct a check matrix.” (2022-23 and 2023-24)
- The same two-part construction over \(\mathbb F_4\), with a supplied
  multiplication description for its elements. (2024-25)

**Do not be misled by:** “give” versus “construct,” or “verify” versus
“determine if.”  The same generator/check-polynomial/check-matrix chain is
being assessed.

### 5B. Likely cyclic-code extension questions

- Given a cyclic code, “Show that \(C\) is an MDS code.” (2024-25)
- For a binary cyclic code of odd block length, prove that the presence of an
  odd-weight word forces the all-ones word to be in the code; a hint refers to
  the sum of all cyclic shifts. (2024-25)

These appeared only in the latest paper.  They are lower-confidence than the
construction chain, but are the most plausible add-on if a cyclic-code proof
is included.

---

## 6. Secondary Question Family: Weight Enumerators

This occurs in 2022-23 and 2023-24, both as the first part of Question 5.

Typical sequence:

1. “Define the weight enumerator of a linear \([n,k]\)-code.”
2. “Compute the weight enumerator” of a supplied binary or ternary code
   given by a small generator matrix.

Wording variation:

- Binary \([5,2]\)-code. (2022-23)
- Ternary \([4,2]\)-code. (2023-24)

Treat it as a useful secondary topic: it has a short, repeatable shape but
was absent in 2024-25.

---

## Suggested Self-Test Set

For a compact high-yield session, choose one prompt from each of these seven
families before attempting a full past paper:

1. Sphere-packing and Singleton bounds, including a changed alphabet/length.
2. A structured-code size/minimum-distance question.
3. Irreducibility/factorisation plus quotient-field arithmetic.
4. A finite-field inverse or multiplicative-order question.
5. Generator matrix to standard form/check matrix/minimum distance.
6. Syndrome (or standard-array) decoding.
7. The full Hamming-code and cyclic-code construction sequences.

Only then add a weight-enumerator question and the one-off proof extensions.

## Source Papers

- `MA3491/2018_2019.pdf`
- `MA3491/2021_2022.pdf`
- `MA3491/2022_2023.pdf`
- `MA3491/2023_2024.pdf`
- `MA3491/2024_2025.pdf`
- `MA3491/2025_2026.pdf`
