# CS402 Flashcards

Source deck generated from `flashcards.html` after adding the 2025/26 paper. Answers are written to be complete enough to reproduce in an exam without inferring missing hypotheses, formulas, or proof steps.

Links: [CS402 overview](details.html), [most asked analysis](most_asked.html), [HTML flashcards](flashcards.html), [2025/26 paper](2025_2026.pdf).

## 1. Classical Ciphers And Key Spaces

### Card 1
Front: How do you decode a shift cipher when a plaintext symbol and ciphertext symbol are known?

Back: If encryption is `c = p + k mod 27`, compute `k = c - p mod 27`, then decode each ciphertext symbol by `p = c - k mod 27`. Use `A=0, ..., Z=25, _=26` when the question includes a space symbol.

Evidence: Q1 shift, 2018/19-2025/26

### Card 2
Front: In 2025/26 Q1(a), plaintext symbol `O` corresponds to ciphertext symbol `X`. What is the shift and first plaintext word?

Back: The shift is `k = X - O = 23 - 14 = 9 mod 27`. Subtract 9 from each ciphertext symbol. The ciphertext begins `O_NN...`, which decodes to `FREEDOM...`, so the first word is `FREEDOM`.

Evidence: 2025/26 Q1(a)

### Card 3
Front: In 2024/25 Q1(a), `TREASURE` encrypts as `WUHDVXUH`. What is the shift and decoded message?

Back: The first letter gives `k = W - T = 22 - 19 = 3 mod 27`. Subtract 3 from each ciphertext symbol. `EULOOLDQWCZRUN` decodes to `BRILLIANT_WORK`.

Evidence: 2024/25 Q1(a)

### Card 4
Front: What is the exam-safe method for decrypting a 2-dimensional Hill cipher over `Z_27`?

Back: Split ciphertext into pairs, convert characters to numbers, compute `K^{-1} mod 27`, multiply each ciphertext column by `K^{-1}`, reduce entries mod 27, then convert numbers back to symbols. State the determinant is invertible mod 27.

Evidence: Q1 Hill

### Card 5
Front: What is the formula for the inverse of a 2 by 2 Hill key matrix over `Z_n`?

Back: For `K=[[a,b],[c,d]]`, `det(K)=ad-bc`. If `gcd(det(K),n)=1`, then `K^{-1}=det(K)^{-1}[[d,-b],[-c,a]] mod n`.

Evidence: Q1 Hill

### Card 6
Front: What plaintext is obtained in 2025/26 Q1(b), Hill cipher over `Z_27`, ciphertext `AZMZ`, key `[[5,7],[4,7]]`?

Back: `det(K)=7` and `7^{-1}=4 mod 27`, so `K^{-1}=[[1,26],[11,20]] mod 27`. Multiplying pairs `AZ` and `MZ` gives `CO` and `OL`, so the plaintext is `COOL`.

Evidence: 2025/26 Q1(b)

### Card 7
Front: Why is the 2025/26 Hill matrix `[[4,7],[2,17]]` not a valid key over `Z_27`?

Back: A Hill key over `Z_27` must be invertible, so its determinant must be coprime to 27. Here `det=4*17-7*2=54`, and `54 == 0 mod 27`, so `gcd(det,27)=27`. The matrix has no inverse modulo 27 and cannot be used as a key.

Evidence: 2025/26 Q1(c)

### Card 8
Front: What plaintext is obtained in 2024/25 Q1(b), Hill cipher over `Z_27`, ciphertext `LPDG`, key `[[3,7],[2,5]]`?

Back: `det(K)=1`, so `K^{-1}=[[5,20],[25,3]] mod 27`. Multiplying pairs `LP` and `DG` gives `EX` and `AM`, so the plaintext is `EXAM`.

Evidence: 2024/25 Q1(b)

### Card 9
Front: What are the latest-three Hill plaintexts after decryption?

Back: 2025/26: `AZMZ -> COOL`; 2024/25: `LPDG -> EXAM`; 2023/24: `ZLV_ -> HELP`. Show inverse-matrix working, not only the final word.

Evidence: 2023/24-2025/26

### Card 10
Front: State Kerckhoff's principle.

Back: A cryptosystem should remain secure even if everything about the system is public except the secret key. Security must not depend on keeping the algorithm secret.

Evidence: 2018/19, 2024/25

### Card 11
Front: What is a brute force attack, and when is it feasible?

Back: A brute force attack tries every possible key until meaningful plaintext or successful decryption is found. It is feasible when the key space is small enough, keys can be tested quickly, and there is a way to recognise the correct plaintext.

Evidence: 2021/22, 2022/23

### Card 12
Front: How many keys does a 1-dimensional affine cipher over `Z_n` have?

Back: Encryption has the form `x -> ax + b mod n`, where `a` must be a unit in `Z_n` and `b` can be any element of `Z_n`. The number of keys is `phi(n) * n`.

Evidence: Affine key count

### Card 13
Front: What are the affine key counts asked in current-format papers?

Back: `Z_150`: `6000`, since `phi(150)=40`. `Z_900`: `216000`. `Z_450`: `54000`. `Z_360`: `34560`. `Z_55`: `2200`.

Evidence: 2018/19-2025/26

### Card 14
Front: How do you solve an affine cipher key from two known plaintext/ciphertext pairs?

Back: Write equations `c1 = a p1 + b mod n` and `c2 = a p2 + b mod n`; subtract to get `c1-c2 = a(p1-p2) mod n`; solve for `a` if `p1-p2` is invertible, then substitute back to get `b`. Check `gcd(a,n)=1`.

Evidence: 2018/19 Q1(b)

### Card 15
Front: How does the Vigenere cipher work over the 27-character CS402 alphabet?

Back: Repeat the key to match the plaintext length. Convert plaintext and key letters to numbers in `Z_27`, then encrypt each position by `c_i = p_i + k_i mod 27`. Decryption subtracts the repeated key symbols.

Evidence: 2023/24 Q1(c)

### Card 16
Front: What is the 2023/24 Vigenere encryption of `BEATLES` with key `FAB`?

Back: Repeat the key as `FABFABF`. Add mod 27: `BEATLES` encrypts to `GEBYLFX`.

Evidence: 2023/24 Q1(c)

## 2. Symmetric Cryptosystems, Perfect Security, And Shannon

### Card 17
Front: Formally define a symmetric cryptosystem.

Back: A symmetric cryptosystem consists of non-empty finite sets `P` of plaintexts, `C` of ciphertexts, and `K` of keys, with encryption maps `e_k: P -> C` and decryption maps `d_k: C -> P` for each `k in K`, such that `d_k(e_k(p)) = p` for every `p in P` and `k in K`.

Evidence: Q2 definition

### Card 18
Front: Define perfect security for a symmetric cryptosystem.

Back: For every plaintext `p` and ciphertext `c` with positive probability, observing `c` does not change the probability of `p`: `Pr(P=p | C=c) = Pr(P=p)`. Equivalently, the ciphertext gives no information about the plaintext.

Evidence: Q2 perfect security

### Card 19
Front: Do perfectly secure cryptosystems exist? Give the standard example.

Back: Yes. The one-time pad is perfectly secure when the key is chosen uniformly at random, is as long as the message, is used once, and encryption combines plaintext and key in the same finite alphabet or group.

Evidence: 2022/23-2025/26

### Card 20
Front: State Shannon's theorem on perfect security in the form used in CS402.

Back: If a finite symmetric cryptosystem is perfectly secure, every ciphertext has positive probability, and every plaintext can occur, then `|K| >= |C| >= |P|`. In the sharp equality form, if `|K|=|C|=|P|`, perfect security is equivalent to each plaintext/ciphertext pair being connected by exactly one key, with uniformly chosen keys.

Evidence: Q2 Shannon

### Card 21
Front: Prove the inequality `|K| >= |C| >= |P|` for perfect security.

Back: First, for each key `k`, decryptability makes `e_k: P -> C` injective, so `|C| >= |P|`. For `|K| >= |C|`, fix a plaintext `p` with positive probability. For every ciphertext `c` with positive probability, perfect security gives `Pr(P=p | C=c)>0`, so some key must encrypt `p` to `c`. For fixed `p`, one key gives only one ciphertext, so distinct ciphertexts require at least `|C|` keys.

Evidence: 2017/18, 2024/25

### Card 22
Front: What must a 15-mark Shannon theorem proof contain?

Back: State hypotheses, define perfect security probabilistically, show every plaintext remains possible for each observed ciphertext, use decryptability/injectivity to count keys or ciphertexts, and conclude the requested inequality or equivalence. Do not only name the theorem.

Evidence: 2022/23, 2023/24

### Card 23
Front: Compare block ciphers and stream ciphers.

Back: A block cipher encrypts fixed-size blocks using a key, often with a mode of operation; examples include AES or DES. A stream cipher generates a keystream and combines it symbol-by-symbol with plaintext, usually by XOR over binary alphabets; examples include LFSR-based stream ciphers or A5/1.

Evidence: 2018/19, 2024/25

## 3. Linear Feedback Shift Registers

### Card 24
Front: Define a linear feedback shift register of length `L`.

Back: An LFSR of length `L` over a field, usually `Z_2`, produces a sequence from an initial state `(s_0,...,s_{L-1})` and a linear recurrence. With connection polynomial `C(X)=c_0+c_1X+...+c_LX^L` and `c_0=c_L=1`, the CS402 convention writes the recurrence as `s_{n+L}=c_0s_n+c_1s_{n+1}+...+c_{L-1}s_{n+L-1}` over `Z_2`.

Evidence: LFSR questions

### Card 25
Front: What is a connection polynomial?

Back: It is the polynomial whose coefficients encode the linear recurrence of an LFSR. In CS402 notation it is usually written with constant term 1 and leading term `X^L`; the non-zero lower coefficients say which previous state bits are fed back to compute the next bit.

Evidence: LFSR definitions

### Card 26
Front: Is an LFSR determined by its connection polynomial?

Back: Not completely. The connection polynomial determines the recurrence/taps, but the produced sequence also depends on the initial state. Singular behaviour can occur if the transition is not invertible under the relevant convention.

Evidence: 2021/22 Q2(c)

### Card 27
Front: How do you recover an LFSR keystream from known plaintext and ciphertext in a binary stream cipher?

Back: Use `s_i = x_i + y_i mod 2`, because encryption and decryption use XOR/addition in `Z_2`. Then fit the length-`L` recurrence to the recovered keystream bits to identify the connection polynomial. State the recurrence convention being used.

Evidence: 2022/23, 2023/24

### Card 28
Front: How do you find the least period of an LFSR sequence in an exam?

Back: Generate terms from the recurrence and initial state until the full `L`-bit state repeats. The least period is the number of steps between the repeated states, not just the first repeated output bit.

Evidence: LFSR period

### Card 29
Front: What is the least period for the 2025/26 LFSR `C(X)=1+X^2+X^3` with `s_0=1`, `s_1=0`, `s_2=1`?

Back: Using the CS402 convention, `s_{n+3}=s_n+s_{n+2}` over `Z_2`. The states cycle `101 -> 010 -> 100 -> 001 -> 011 -> 111 -> 110 -> 101`, so the initial state returns after 7 steps. The least period is `7`.

Evidence: 2025/26 Q2(c)

### Card 30
Front: What is the least period for `C(X)=1+X+X^2+X^4` with `s_0=s_2=1`, `s_1=s_3=0`?

Back: The recurrence is `s_{n+4}=s_n+s_{n+1}+s_{n+2}` over `Z_2`. Starting `1,0,1,0`, the sequence begins `1,0,1,0,0,1,1,1,0,1,0,...`; the initial state reappears after 7 steps, so the least period is 7.

Evidence: 2021/22-2023/24

### Card 31
Front: Give an example of a singular LFSR of length 3.

Back: Over `Z_2`, an LFSR whose recurrence does not depend invertibly on the oldest state bit is singular. For example, `s_{n+3}=s_{n+2}` has no dependence on `s_n`, so different previous states can lead to the same next state and the transition is not invertible.

Evidence: 2021/22 Q2(c)

## 4. RSA And Public-Key Cryptography

### Card 32
Front: Compare symmetric cryptosystems and public-key cryptosystems.

Back: Symmetric systems use the same secret key for encryption and decryption, are usually fast, but require secure key distribution. Public-key systems use a public key for encryption/verification and a private key for decryption/signing, make key distribution easier, but are usually slower and rely on hard mathematical problems.

Evidence: Q3 comparison

### Card 33
Front: Give examples of symmetric and public-key cryptosystems with one advantage and disadvantage each.

Back: Symmetric example: AES or a one-time pad; advantage speed or perfect secrecy for OTP; disadvantage key distribution. Public-key example: RSA, Diffie-Hellman, or ElGamal; advantage public key exchange/encryption; disadvantage slower computation or reliance on factoring/discrete logarithms.

Evidence: 2022/23-2023/24

### Card 34
Front: Describe RSA key generation.

Back: Choose distinct large primes `p,q`, compute `n=pq` and `phi(n)=(p-1)(q-1)`. Choose `e` with `1<e<phi(n)` and `gcd(e,phi(n))=1`. Compute `d` with `ed == 1 mod phi(n)`. Public key is `(n,e)` and private key is `d` together with the factorisation information.

Evidence: RSA Q3

### Card 35
Front: Describe RSA encryption and decryption.

Back: For message `m in Z_n`, encrypt with public key `(n,e)` by `c = m^e mod n`. Decrypt with private key `d` by `m = c^d mod n`. Correctness follows because `ed == 1 mod phi(n)`.

Evidence: RSA Q3

### Card 36
Front: What conditions make a small pair `(n,e)` a valid RSA public key in these papers?

Back: `n` should be a product of two distinct primes `pq`, and `e` must be coprime to `phi(n)=(p-1)(q-1)`. If `n` is a square, has more than two prime factors, or `gcd(e,phi(n))>1`, the pair is invalid for standard RSA.

Evidence: RSA validity

### Card 37
Front: Which 2025/26 RSA key pairs are valid?

Back: `(187,7)` is valid because `187=11*17`, `phi=160`, and `gcd(7,160)=1`. `(289,15)` is invalid because `289=17^2`, not a product of two distinct primes. `(143,3)` is invalid because `143=11*13`, `phi=120`, and `gcd(3,120)=3`.

Evidence: 2025/26 Q3(b)

### Card 38
Front: Which 2024/25 RSA key pairs are valid?

Back: `(299,17)` is valid because `299=13*23`, `phi=264`, and `gcd(17,264)=1`. `(323,9)` is invalid because `323=17*19`, `phi=288`, and `gcd(9,288)=9`. `(385,55)` is invalid because `385=5*7*11`.

Evidence: 2024/25 Q3(b)

### Card 39
Front: Why are the 2022/23 RSA key pairs invalid?

Back: `(187,15)`: `187=11*17`, `phi=160`, `gcd(15,160)=5`. `(289,13)`: `289=17^2`, not two distinct primes. `(385,77)`: `385=5*7*11`, not two distinct primes.

Evidence: 2022/23 Q3(c)

### Card 40
Front: Compute the repeated RSA ciphertext: `m=23`, public key `(n,e)=(77,17)`.

Back: Compute `23^17 mod 77`. Fast exponentiation gives ciphertext `67` in `Z_77`.

Evidence: 2018/19, 2024/25

### Card 41
Front: Compute the 2025/26 RSA ciphertext for `m=3` with public key `(187,7)`.

Back: Compute `3^7 mod 187`. Since `3^2=9`, `3^4=81`, and `3^7=3^4*3^2*3=81*9*3=2187`, reducing modulo 187 gives `130`. The ciphertext is `130 in Z_187`.

Evidence: 2025/26 Q3(c)

### Card 42
Front: Why would efficient integer factorisation break RSA?

Back: Given the public modulus `n=pq`, an efficient factorisation algorithm would recover `p` and `q`. Then an attacker computes `phi(n)=(p-1)(q-1)` and finds `d=e^{-1} mod phi(n)`, so ciphertexts can be decrypted with `m=c^d mod n`.

Evidence: 2025/26 Q3(d)

### Card 43
Front: Would efficient primality testing alone break RSA?

Back: No. RSA security mainly relies on the difficulty of factoring `n=pq`, not merely deciding whether a number is prime. Efficient primality testing helps generate/check primes but does not by itself recover `p` and `q` from `n`.

Evidence: 2021/22, 2023/24

## 5. Number Theory, Primality, And Cyclic Groups

### Card 44
Front: Define Euler's totient function.

Back: `phi(n)` is the number of integers `a` with `1 <= a <= n` and `gcd(a,n)=1`; equivalently, the number of units in `Z_n`. For distinct primes `p,q`, `phi(pq)=(p-1)(q-1)`.

Evidence: 2018/19 Q4(a)

### Card 45
Front: State Euler's theorem.

Back: If `gcd(a,n)=1`, then `a^phi(n) == 1 mod n`. This is used in RSA correctness and modular exponent reduction.

Evidence: 2018/19, 2017/18

### Card 46
Front: Describe fast exponentiation for `a^e mod n`.

Back: Write `e` in binary or repeatedly square. Maintain a running product modulo `n`; square the base each step and multiply into the product when the current binary digit of `e` is 1. Reduce modulo `n` after every multiplication.

Evidence: Fast exponentiation

### Card 47
Front: Describe Fermat's primality test.

Back: For input `n>1`, choose `a` with `1 <= a <= n-1`. If `gcd(a,n)>1`, declare composite. Otherwise compute `a^{n-1} mod n`; if it is not 1, declare composite; if it is 1, say `n` passes this base but is only probably prime.

Evidence: 2018/19, 2024/25, 2025/26

### Card 48
Front: Define pseudoprime in the Fermat-test context.

Back: A composite number `n` is a pseudoprime to base `a` if `gcd(a,n)=1` and `a^{n-1} == 1 mod n`, so it passes Fermat's test for that base despite being composite.

Evidence: 2024/25 Q3(d)

### Card 49
Front: Define a Carmichael number.

Back: A composite number `n` is a Carmichael number if `a^{n-1} == 1 mod n` for every `a` coprime to `n`. Equivalently, it fools Fermat's test for all coprime bases.

Evidence: 2018/19, 2024/25

### Card 50
Front: Why can Fermat's test still detect a Carmichael number as composite sometimes?

Back: If the random base `a` is not coprime to the Carmichael number `n`, then `gcd(a,n)>1` reveals a non-trivial factor and the test can declare composite. Carmichael numbers only fool Fermat for coprime bases.

Evidence: 2021/22, 2023/24

### Card 51
Front: Define a cyclic group.

Back: A group `G` is cyclic if there exists an element `g in G` such that every element of `G` is a power of `g`; then `g` is a generator and `G=<g>`.

Evidence: Q4 cyclic groups

### Card 52
Front: State Gauss's characterisation for `Z_n^*` being cyclic.

Back: `Z_n^*` is cyclic exactly when `n` is `1`, `2`, `4`, `p^k`, or `2p^k`, where `p` is an odd prime and `k >= 1`.

Evidence: Q4 cyclic groups

### Card 53
Front: Decide cyclicity for `Z_121^*`, `Z_169^*`, `Z_242^*`, and `Z_315^*`.

Back: `121=11^2` and `169=13^2`, so both are cyclic by Gauss's `p^k` case. `242=2*11^2`, so `Z_242^*` is cyclic by the `2p^k` case. `315=3^2*5*7`, not one of Gauss's forms, so `Z_315^*` is not cyclic.

Evidence: 2021/22-2025/26

## 6. Diffie-Hellman And ElGamal

### Card 54
Front: Describe the Diffie-Hellman key exchange in a cyclic group.

Back: Publicly choose a cyclic group `G=<g>`. Alice chooses secret `a` and sends `g^a`; Bob chooses secret `b` and sends `g^b`. Alice computes `(g^b)^a` and Bob computes `(g^a)^b`; both get shared key `g^{ab}`.

Evidence: Q4 Diffie-Hellman

### Card 55
Front: What are the latest-three Diffie-Hellman shared keys?

Back: 2025/26: in `Z_121^*`, `g=8`, `a=3`, `b=5`, key `8^15 mod 121 = 54`. 2024/25: in `Z_61^*`, key `29`. 2023/24: in `Z_29^*`, key `23`.

Evidence: 2023/24-2025/26

### Card 56
Front: Describe ElGamal key generation.

Back: Choose a cyclic group `G=<g>`. Bob chooses private key `b` and publishes `h=g^b` with `G` and `g`. The private key is `b`; the public key is `(G,g,h)`.

Evidence: ElGamal Q4

### Card 57
Front: Describe ElGamal encryption.

Back: To encrypt message `m in G` to Bob, Alice chooses fresh random `r`, computes `c_1=g^r` and `c_2=m h^r`, and sends `(c_1,c_2)`. Fresh randomness is required for each encryption.

Evidence: ElGamal Q4

### Card 58
Front: Describe ElGamal decryption.

Back: Bob computes `c_1^b=g^{rb}=h^r`, then recovers `m = c_2 (c_1^b)^{-1}` in the group. The inverse is taken in the same group.

Evidence: ElGamal Q4

## 7. Elliptic Curves

### Card 59
Front: What points are on an elliptic curve over a finite field in these papers?

Back: For a curve `y^2=f(x)` over `Z_p`, test each `x in Z_p`, compute `f(x) mod p`, and include all `y` whose square equals that value mod `p`, plus the point at infinity `O`.

Evidence: 2022/23, 2024/25

### Card 60
Front: What is the point at infinity `O`?

Back: `O` is the identity element of the elliptic-curve group. For every point `P`, `P+O=P`, and the inverse of `P=(x,y)` over a field is `(x,-y)`.

Evidence: Elliptic curves

### Card 61
Front: How do you identify order-2 points on `y^2=f(x)`?

Back: A point has order 2 when `P+P=O`, equivalently `P=-P`. Since `-(x,y)=(x,-y)`, this means `y=0` in the field. Solve `f(x)=0` and list the points `(x,0)`.

Evidence: 2022/23, 2024/25

### Card 62
Front: What are the points on the 2024/25 curve `y^2=x^3+2x+3` over `Z_7`?

Back: `E(Z_7) = {O, (2,1), (2,6), (3,1), (3,6), (6,0)}`. The only order-2 point is `(6,0)`.

Evidence: 2024/25 Q4(e)

### Card 63
Front: What are the points on the 2022/23 curve `y^2=x^3+2x^2+2x` over `Z_5`?

Back: `E(Z_5) = {O, (0,0), (1,0), (2,0), (3,1), (3,4), (4,2), (4,3)}`. The order-2 points are `(0,0)`, `(1,0)`, and `(2,0)`.

Evidence: 2022/23 Q4(e)

### Card 64
Front: For the real curve `y^2=x^3+3x`, which points satisfy `P+P=O`?

Back: Order-2 points have `y=0`. Solve `x^3+3x=x(x^2+3)=0` over `R`, giving only `x=0`. Thus `(0,0)` is the non-identity point with `P+P=O`, and `O` also satisfies `O+O=O`.

Evidence: 2021/22, 2023/24

### Card 65
Front: For the 2025/26 real curve `y^2=x^3-x`, which points satisfy `P+P=O`?

Back: Order-2 points have `y=0`, and `O` also satisfies `O+O=O`. Solve `x^3-x=x(x-1)(x+1)=0` over `R`, giving `x=-1,0,1`. The full answer is `O, (-1,0), (0,0), (1,0)`.

Evidence: 2025/26 Q4(d)(ii)

### Card 66
Front: Give a point `Q` on `y^2=x^3+3x` over `R` with `Q+Q != O`.

Back: One valid example is `(1,2)` because `2^2=4` and `1^3+3*1=4`. Since `y != 0`, `Q` is not equal to `-Q`, so `Q+Q != O`.

Evidence: 2021/22, 2023/24

### Card 67
Front: Describe elliptic-curve addition geometrically.

Back: To add distinct points `P` and `Q`, draw the line through them, find the third intersection with the curve, and reflect it in the x-axis. To double `P`, use the tangent at `P`, find the third intersection, and reflect. `O` is the identity.

Evidence: 2018/19, 2017/18

## 8. Legacy Backup From 2017/18

### Card 68
Front: What Enigma property made it stronger than Vigenere against ciphertext-only attacks?

Back: Enigma used a changing polyalphabetic substitution controlled by rotors, so the substitution changed after each character and produced a much longer and more complex period than a simple repeated Vigenere key.

Evidence: 2017/18 Q3(c)

### Card 69
Front: What is the key-space size for a `d`-dimensional affine cipher over an alphabet of `p` letters, with `p` prime?

Back: A key has the form `v -> Av+B` over `F_p^d`, where `A` must be invertible and `B` is arbitrary. Thus the number of keys is `|GL_d(F_p)| p^d = (p^d-1)(p^d-p)...(p^d-p^{d-1}) p^d`.

Evidence: 2017/18 Q4

### Card 70
Front: Define two-factor authentication.

Back: Authentication requiring two different categories of evidence, such as something the user knows, something the user has, or something the user is.

Evidence: 2017/18 Q6(a)

### Card 71
Front: Define forward security.

Back: Compromise of a long-term key should not reveal past session keys or past encrypted communications.

Evidence: 2017/18 Q6(a)

### Card 72
Front: What is A5/1?

Back: A5/1 is a GSM stream cipher based on three LFSRs with irregular majority-clocked stepping, historically used for over-the-air mobile phone traffic encryption.

Evidence: 2017/18 Q7(b)

### Card 73
Front: Prove the RSA correctness congruence from 2017/18 Q8(a).

Back: Let `N=pq` with distinct primes, `gcd(a,N)=1`, `gcd(e,(p-1)(q-1))=1`, and `d == e^{-1} mod (p-1)(q-1)`. Then `ed=1+t phi(N)`, so `(a^e)^d=a^{ed}=a^{1+t phi(N)}=a(a^{phi(N)})^t == a mod N` by Euler's theorem.

Evidence: 2017/18 Q8(a)

### Card 74
Front: Why does a non-Carmichael composite pass `k` independent Fermat tests with probability at most `(1/2)^k`?

Back: For a composite `m` that is not Carmichael, the set of coprime bases that falsely satisfy `a^{m-1} == 1 mod m` is a proper subgroup of `Z_m^*`, so it has size at most half of `Z_m^*`. Non-coprime bases reveal compositeness by `gcd(a,m)>1`. Therefore `k` independent trials pass with probability at most `(1/2)^k`.

Evidence: 2017/18 Q8(b)

### Card 75
Front: What is Pollard's rho method for factorisation trying to find?

Back: It iterates a polynomial modulo `n` to produce a pseudo-random sequence and compares pairs of iterates; a non-trivial `gcd(|x_i-x_j|, n)` gives a factor of `n`.

Evidence: 2017/18 Q10(a)

Total cards: 75
