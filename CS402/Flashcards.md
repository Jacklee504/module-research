# CS402 Cryptography Flashcards

Source: CS402 past papers 2018/19, 2021/22, 2022/23, 2023/24, 2024/25, with 2017/18 used only for legacy backup where the format differs.

Use these as physical cards: write the Front on one side and the Back on the other. The Evidence field shows the paper family that justified the card.

## Priority 1 - Classical Ciphers And Key Spaces

| Front | Back | Evidence |
|---|---|---|
| How do you decode a shift cipher when a plaintext symbol and ciphertext symbol are known? | If encryption is `c = p + k mod 27`, compute `k = c - p mod 27`, then decode each ciphertext symbol by `p = c - k mod 27`. Use the exam alphabet `A=0, ..., Z=25, _=26` when the question includes a space symbol. | Q1 shift, 2018/19-2024/25 |
| In 2024/25 Q1(a), `TREASURE` encrypts as `WUHDVXUH`. What is the shift and decoded message for `EULOOLDQWCZRUN`? | The first letter gives `k = W - T = 22 - 19 = 3 mod 27`. Subtract 3 from each ciphertext symbol. `EULOOLDQWCZRUN` decodes to `BRILLIANT_WORK`. | 2024/25 Q1(a), 5 marks |
| What is the exam-safe method for decrypting a 2-dimensional Hill cipher over `Z_27`? | Split ciphertext into pairs, convert characters using `A=0, ..., Z=25, _=26`, compute `K^{-1} mod 27`, multiply each ciphertext column by `K^{-1}`, reduce entries mod 27, then convert numbers back to symbols. State the determinant is invertible mod 27. | Q1 Hill, 2021/22-2024/25 |
| What is the formula for the inverse of a 2 by 2 Hill key matrix over `Z_n`? | For `K = [[a,b],[c,d]]`, `det(K)=ad-bc`. If `gcd(det(K), n)=1`, then `K^{-1} = det(K)^{-1} [[d,-b],[-c,a]] mod n`. | Q1 Hill |
| What plaintext is obtained in 2024/25 Q1(b), Hill cipher over `Z_27`, ciphertext `LPDG`, key `[[3,7],[2,5]]`? | `det(K)=1`, so `K^{-1} = [[5,20],[25,3]] mod 27`. Multiplying pairs `LP` and `DG` gives `EX` and `AM`, so the plaintext is `EXAM`. | 2024/25 Q1(b), 10 marks |
| What are the latest-three Hill plaintexts after decryption? | 2024/25: `LPDG -> EXAM`; 2023/24: `ZLV_ -> HELP`; 2022/23: `GM_L -> MAYO`. Show inverse-matrix working, not only the final word. | 2022/23-2024/25 Q1(b) |
| State Kerckhoff's principle. | A cryptosystem should remain secure even if everything about the system is public except the secret key. Security must not depend on keeping the algorithm secret. | 2018/19 Q1(c), 2024/25 Q1(c) |
| What is a brute force attack, and when is it feasible? | A brute force attack tries every possible key until meaningful plaintext or successful decryption is found. It is feasible when the key space is small enough, keys can be tested quickly, and there is a way to recognise the correct plaintext. | 2021/22 Q1(c), 2022/23 Q1(c) |
| How many keys does a 1-dimensional affine cipher over `Z_n` have? | Encryption has the form `x -> ax + b mod n`, where `a` must be a unit in `Z_n` and `b` can be any element of `Z_n`. The number of keys is `phi(n) * n`. | Q1 affine key count |
| What are the affine key counts asked in current-format papers? | `Z_900`: `phi(900)=240`, so `216000` keys. `Z_450`: `phi(450)=120`, so `54000` keys. `Z_360`: `phi(360)=96`, so `34560` keys. `Z_55`: `phi(55)=40`, so `2200` keys. | 2018/19, 2021/22, 2022/23, 2024/25 |
| How do you solve an affine cipher key from two known plaintext/ciphertext pairs? | Write equations `c1 = a p1 + b mod n` and `c2 = a p2 + b mod n`; subtract to get `c1-c2 = a(p1-p2) mod n`; solve for `a` if `p1-p2` is invertible, then substitute back to get `b`. Check `gcd(a,n)=1`. | 2018/19 Q1(b) |
| How does the Vigenere cipher work over the 27-character CS402 alphabet? | Repeat the key to match the plaintext length. Convert plaintext and key letters to numbers in `Z_27`, then encrypt each position by `c_i = p_i + k_i mod 27`. Decryption subtracts the repeated key symbols. | 2023/24 Q1(c) |
| What is the 2023/24 Vigenere encryption of `BEATLES` with key `FAB` over the 27-character alphabet? | Repeat the key as `FABFABF`. Add mod 27: `BEATLES` encrypts to `GEBYLFX`. | 2023/24 Q1(c), 10 marks |

## Priority 2 - Symmetric Cryptosystems, Perfect Security, And Shannon

| Front | Back | Evidence |
|---|---|---|
| Formally define a symmetric cryptosystem. | A symmetric cryptosystem consists of non-empty finite sets `P` of plaintexts, `C` of ciphertexts, and `K` of keys, with encryption maps `e_k: P -> C` and decryption maps `d_k: C -> P` for each `k in K`, such that `d_k(e_k(p)) = p` for every `p in P` and `k in K`. | Q2 definition, 2021/22-2023/24 |
| Define perfect security for a symmetric cryptosystem. | For every plaintext `p` and ciphertext `c` with positive probability, observing `c` does not change the probability of `p`: `Pr(P=p | C=c) = Pr(P=p)`. Equivalently, the ciphertext gives no information about the plaintext. | Q2 perfect security |
| Do perfectly secure cryptosystems exist? Give the standard example. | Yes. The one-time pad is perfectly secure when the key is chosen uniformly at random, is as long as the message, is used once, and encryption combines plaintext and key in the same finite alphabet or group. | 2022/23-2023/24 Q2(b), 2017/18 Q10(b) |
| State Shannon's theorem on perfect security in the form used in CS402. | If a finite symmetric cryptosystem is perfectly secure, every ciphertext has positive probability, and every plaintext can occur, then `|K| >= |C| >= |P|`. In the common sharp form, if `|K|=|C|=|P|`, perfect security is equivalent to each plaintext/ciphertext pair being connected by exactly one key, with uniformly chosen keys. | Q2 Shannon, 2017/18-2024/25 |
| Prove the inequality `|K| >= |C| >= |P|` for perfect security. | First, for each key `k`, decryptability makes `e_k: P -> C` injective, so `|C| >= |P|`. For `|K| >= |C|`, fix a plaintext `p` with positive probability. For every ciphertext `c` with positive probability, perfect security gives `Pr(P=p | C=c)>0`, so some key must encrypt `p` to `c`. For fixed `p`, one key gives only one ciphertext, so distinct ciphertexts require at least `|C|` keys. Hence `|K| >= |C| >= |P|`. | 2017/18 Q6(b), 2024/25 Q2(b) |
| What must a 15-mark Shannon theorem proof contain? | State hypotheses, define perfect security probabilistically, show every plaintext remains possible for each observed ciphertext, use decryptability/injectivity to count keys or ciphertexts, and conclude the requested inequality or equivalence. Do not only name the theorem. | 2022/23 Q2(c), 2023/24 Q2(c) |
| Compare block ciphers and stream ciphers. | A block cipher encrypts fixed-size blocks using a key, often with a mode of operation; examples include AES or DES. A stream cipher generates a keystream and combines it symbol-by-symbol with plaintext, usually by XOR over binary alphabets; examples include LFSR-based stream ciphers or A5/1. | 2018/19 Q2(b), 2024/25 Q2(c) |

## Priority 3 - Linear Feedback Shift Registers

| Front | Back | Evidence |
|---|---|---|
| Define a linear feedback shift register of length `L`. | An LFSR of length `L` over a field, usually `Z_2`, produces a sequence from an initial state `(s_0,...,s_{L-1})` and a linear recurrence. With connection polynomial `C(X)=c_0+c_1X+...+c_LX^L` and `c_0=c_L=1`, the CS402 convention writes the recurrence as `s_{n+L}=c_0s_n+c_1s_{n+1}+...+c_{L-1}s_{n+L-1}` over `Z_2`. | Q2/Q3/Q4 LFSR |
| What is a connection polynomial? | It is the polynomial whose coefficients encode the linear recurrence of an LFSR. In CS402 notation it is usually written with constant term 1 and leading term `X^L`; the non-zero lower coefficients say which previous state bits are fed back to compute the next bit. | LFSR definition questions |
| Is an LFSR determined by its connection polynomial? | Not completely. The connection polynomial determines the recurrence/taps, but the produced sequence also depends on the initial state. If the leading feedback coefficient is not invertible/non-zero under the relevant convention, singular behaviour can also occur. | 2021/22 Q2(c) |
| How do you recover an LFSR keystream from known plaintext and ciphertext in a binary stream cipher? | Use `s_i = x_i + y_i mod 2`, because encryption and decryption use XOR/addition in `Z_2`. Then fit the length-`L` recurrence to the recovered keystream bits to identify the connection polynomial. State the recurrence convention being used. | 2022/23 Q3(d), 2023/24 Q4(a), 2017/18 Q7(a) |
| How do you find the least period of an LFSR sequence in an exam? | Generate terms from the recurrence and initial state until the full `L`-bit state repeats. The least period is the number of steps between the repeated states, not just the first repeated output bit. | LFSR period questions |
| What is the least period for `C(X)=1+X+X^2+X^4` over `Z_2` with `s_0=s_2=1`, `s_1=s_3=0`? | The recurrence is `s_{n+4}=s_n+s_{n+1}+s_{n+2}` over `Z_2`. Starting `1,0,1,0`, the sequence begins `1,0,1,0,0,1,1,1,0,1,0,...`; the initial state reappears after 7 steps, so the least period is 7. | 2021/22-2023/24 Q2/Q3/Q4 |
| Give an example of a singular LFSR of length 3. | Over `Z_2`, an LFSR whose recurrence does not depend invertibly on the oldest state bit is singular. For example, a recurrence such as `s_{n+3}=s_{n+2}` has no dependence on `s_n`, so different previous states can lead to the same next state and the transition is not invertible. | 2021/22 Q2(c)(iii) |

## Priority 4 - RSA And Public-Key Cryptography

| Front | Back | Evidence |
|---|---|---|
| Compare symmetric cryptosystems and public-key cryptosystems. | Symmetric systems use the same secret key for encryption and decryption, are usually fast, but require secure key distribution. Public-key systems use a public key for encryption/verification and a private key for decryption/signing, make key distribution easier, but are usually slower and rely on hard mathematical problems. | Q3 comparison |
| Give examples of symmetric and public-key cryptosystems with one advantage and disadvantage each. | Symmetric example: AES or a one-time pad; advantage speed or perfect secrecy for OTP; disadvantage key distribution. Public-key example: RSA, Diffie-Hellman, or ElGamal; advantage public key exchange/encryption; disadvantage slower computation or reliance on factoring/discrete logarithms. | 2022/23-2023/24 Q3(a) |
| Describe RSA key generation. | Choose distinct large primes `p,q`, compute `n=pq` and `phi(n)=(p-1)(q-1)`. Choose `e` with `1<e<phi(n)` and `gcd(e,phi(n))=1`. Compute `d` with `ed == 1 mod phi(n)`. Public key is `(n,e)` and private key is `d` together with the factorisation information. | RSA Q3 |
| Describe RSA encryption and decryption. | For message `m in Z_n`, encrypt with public key `(n,e)` by `c = m^e mod n`. Decrypt with private key `d` by `m = c^d mod n`. Correctness follows because `ed == 1 mod phi(n)` and Euler/Fermat reasoning applies to the prime factors. | RSA Q3 |
| What conditions make a small pair `(n,e)` a valid RSA public key in these papers? | `n` should be a product of two distinct primes `p q`, and `e` must be coprime to `phi(n)=(p-1)(q-1)`. If `n` is a square, has more than two prime factors, or `gcd(e,phi(n))>1`, the pair is invalid for standard RSA. | RSA validity Q3 |
| Which 2024/25 RSA key pairs are valid? | `(299,17)` is valid because `299=13*23`, `phi=264`, and `gcd(17,264)=1`. `(323,9)` is invalid because `323=17*19`, `phi=288`, and `gcd(9,288)=9`. `(385,55)` is invalid because `385=5*7*11`, not a product of two distinct primes. | 2024/25 Q3(b) |
| Why are the 2022/23 RSA key pairs invalid? | `(187,15)`: `187=11*17`, `phi=160`, `gcd(15,160)=5`. `(289,13)`: `289=17^2`, not two distinct primes. `(385,77)`: `385=5*7*11`, not two distinct primes. | 2022/23 Q3(c) |
| Compute the repeated RSA ciphertext: `m=23`, public key `(n,e)=(77,17)`. | Compute `23^17 mod 77`. Fast exponentiation gives ciphertext `67` in `Z_77`. | 2018/19 Q3(d), 2024/25 Q3(c) |
| Would efficient primality testing alone break RSA? | No. RSA security mainly relies on the difficulty of factoring `n=pq`, not merely deciding whether a number is prime. Efficient primality testing helps generate/check primes but does not by itself recover `p` and `q` from `n`. | 2021/22 Q3(d), 2023/24 Q3(d) |

## Priority 5 - Number Theory, Primality, And Cyclic Groups

| Front | Back | Evidence |
|---|---|---|
| Define Euler's totient function. | `phi(n)` is the number of integers `a` with `1 <= a <= n` and `gcd(a,n)=1`; equivalently, the number of units in `Z_n`. For distinct primes `p,q`, `phi(pq)=(p-1)(q-1)`. | 2018/19 Q4(a), affine/RSA |
| State Euler's theorem. | If `gcd(a,n)=1`, then `a^phi(n) == 1 mod n`. This is used in RSA correctness and modular exponent reduction. | 2018/19 Q4(a), 2017/18 Q8(a) |
| Describe fast exponentiation for `a^e mod n`. | Write `e` in binary or repeatedly square. Maintain a running product modulo `n`; square the base each step and multiply into the product when the current binary digit of `e` is 1. Reduce modulo `n` after every multiplication. | Q3/Q4 fast exponentiation |
| Describe Fermat's primality test. | For input `n>1`, choose `a` with `1 <= a <= n-1`. If `gcd(a,n)>1`, declare composite. Otherwise compute `a^{n-1} mod n`; if it is not 1, declare composite; if it is 1, say `n` passes this base but is only probably prime. Every prime passes for bases coprime to it. | 2018/19, 2024/25 Q4(a) |
| Define pseudoprime in the Fermat-test context. | A composite number `n` is a pseudoprime to base `a` if `gcd(a,n)=1` and `a^{n-1} == 1 mod n`, so it passes Fermat's test for that base despite being composite. | 2024/25 Q3(d) |
| Define a Carmichael number. | A composite number `n` is a Carmichael number if `a^{n-1} == 1 mod n` for every `a` coprime to `n`. Equivalently, it fools Fermat's test for all coprime bases. | 2018/19 Q4(c), 2024/25 Q3(d) |
| Why can Fermat's test still detect a Carmichael number as composite sometimes? | If the random base `a` is not coprime to the Carmichael number `n`, then `gcd(a,n)>1` reveals a non-trivial factor and the test can declare composite. Carmichael numbers only fool Fermat for coprime bases. | 2021/22 Q3(e), 2023/24 Q3(e) |
| Define a cyclic group. | A group `G` is cyclic if there exists an element `g in G` such that every element of `G` is a power of `g`; then `g` is a generator and `G=<g>`. | 2021/22-2023/24 Q4(a/c) |
| State Gauss's characterisation for `Z_n^*` being cyclic. | `Z_n^*` is cyclic exactly when `n` is `1`, `2`, `4`, `p^k`, or `2p^k`, where `p` is an odd prime and `k >= 1`. | Cyclic group questions |
| Decide cyclicity for the recurring examples `Z_169^*`, `Z_242^*`, and `Z_315^*`. | `169=13^2`, so `Z_169^*` is cyclic. `242=2*11^2`, so `Z_242^*` is cyclic. `315=3^2*5*7`, not one of Gauss's allowed forms, so `Z_315^*` is not cyclic. | 2021/22-2023/24 Q4 |

## Priority 6 - Diffie-Hellman And ElGamal

| Front | Back | Evidence |
|---|---|---|
| Describe the Diffie-Hellman key exchange in a cyclic group. | Publicly choose a cyclic group `G=<g>`. Alice chooses secret `a` and sends `g^a`; Bob chooses secret `b` and sends `g^b`. Alice computes `(g^b)^a` and Bob computes `(g^a)^b`; both get shared key `g^{ab}`. | Q4 Diffie-Hellman |
| What are the latest-three Diffie-Hellman shared keys? | 2024/25: in `Z_61^*`, `g=2`, `a=5`, `b=7`, key `2^35 mod 61 = 29`. 2023/24: in `Z_29^*`, `g=2`, `a=5`, `b=4`, key `23`. 2022/23: in `Z_59^*`, `g=2`, `a=3`, `b=4`, key `25`. | 2022/23-2024/25 Q4 |
| Describe ElGamal key generation. | Choose a cyclic group `G=<g>`. Bob chooses private key `b` and publishes `h=g^b` with `G` and `g`. The private key is `b`; the public key is `(G,g,h)`. | 2021/22, 2022/23, 2024/25 |
| Describe ElGamal encryption. | To encrypt message `m in G` to Bob, Alice chooses fresh random `r`, computes `c_1=g^r` and `c_2=m h^r`, and sends `(c_1,c_2)`. Fresh randomness is required for each encryption. | ElGamal Q4 |
| Describe ElGamal decryption. | Bob computes `c_1^b=g^{rb}=h^r`, then recovers `m = c_2 (c_1^b)^{-1}` in the group. The inverse is taken in the same group. | ElGamal Q4 |

## Priority 7 - Elliptic Curves

| Front | Back | Evidence |
|---|---|---|
| What points are on an elliptic curve over a finite field in these papers? | For a curve `y^2 = f(x)` over `Z_p`, test each `x in Z_p`, compute `f(x) mod p`, and include all `y` whose square equals that value mod `p`, plus the point at infinity `O`. | 2022/23 Q4(e), 2024/25 Q4(e) |
| What is the point at infinity `O`? | `O` is the identity element of the elliptic-curve group. For every point `P`, `P+O=P`, and the inverse of `P=(x,y)` over a field is `(x,-y)`. | Elliptic curve questions |
| How do you identify order-2 points on `y^2=f(x)`? | A point has order 2 when `P+P=O`, equivalently `P=-P`. Since `-(x,y)=(x,-y)`, this means `y=0` in the field. Solve `f(x)=0` and list the points `(x,0)`. | 2022/23, 2024/25 |
| What are the points on the 2024/25 curve `y^2=x^3+2x+3` over `Z_7`? | `E(Z_7) = {O, (2,1), (2,6), (3,1), (3,6), (6,0)}`. The only order-2 point is `(6,0)`. | 2024/25 Q4(e), 6 marks |
| What are the points on the 2022/23 curve `y^2=x^3+2x^2+2x` over `Z_5`? | `E(Z_5) = {O, (0,0), (1,0), (2,0), (3,1), (3,4), (4,2), (4,3)}`. The order-2 points are `(0,0)`, `(1,0)`, and `(2,0)`. | 2022/23 Q4(e), 5 marks |
| For the real curve `y^2=x^3+3x`, which points satisfy `P+P=O`? | Order-2 points have `y=0`. Solve `x^3+3x=x(x^2+3)=0` over `R`, giving only `x=0`. Thus `(0,0)` is the non-identity point with `P+P=O`, and `O` also satisfies `O+O=O`. | 2021/22, 2023/24 Q4(e) |
| Give a point `Q` on `y^2=x^3+3x` over `R` with `Q+Q != O`. | One valid example is `(1,2)` because `2^2=4` and `1^3+3*1=4`. Since `y != 0`, `Q` is not equal to `-Q`, so `Q+Q != O`. | 2021/22, 2023/24 Q4(e) |
| Describe elliptic-curve addition geometrically. | To add distinct points `P` and `Q`, draw the line through them, find the third intersection with the curve, and reflect it in the x-axis. To double `P`, use the tangent at `P`, find the third intersection, and reflect. `O` is the identity. | 2018/19 Q4(d), 2017/18 Q9(b) |

## Legacy Backup From 2017/18

| Front | Back | Evidence |
|---|---|---|
| What Enigma property made it stronger than Vigenere against ciphertext-only attacks? | Enigma used a changing polyalphabetic substitution controlled by rotors, so the substitution changed after each character and produced a much longer and more complex period than a simple repeated Vigenere key. | 2017/18 Q3(c) legacy |
| What is the key-space size for a `d`-dimensional affine cipher over an alphabet of `p` letters, with `p` prime? | A key has the form `v -> Av+B` over `F_p^d`, where `A` must be invertible and `B` is arbitrary. Thus the number of keys is `|GL_d(F_p)| p^d = (p^d-1)(p^d-p)...(p^d-p^{d-1}) p^d`. | 2017/18 Q4 legacy |
| Define two-factor authentication. | Authentication requiring two different categories of evidence, such as something the user knows, something the user has, or something the user is. | 2017/18 Q6(a) legacy |
| Define forward security. | Compromise of a long-term key should not reveal past session keys or past encrypted communications. | 2017/18 Q6(a) legacy |
| What is A5/1? | A5/1 is a GSM stream cipher based on three LFSRs with irregular majority-clocked stepping, historically used for over-the-air mobile phone traffic encryption. | 2017/18 Q7(b) legacy |
| Prove the RSA correctness congruence from 2017/18 Q8(a). | Let `N=pq` with distinct primes, `gcd(a,N)=1`, `gcd(e,(p-1)(q-1))=1`, and `d == e^{-1} mod (p-1)(q-1)`. Then `ed=1+t phi(N)`, so `(a^e)^d=a^{ed}=a^{1+t phi(N)}=a(a^{phi(N)})^t == a mod N` by Euler's theorem. | 2017/18 Q8(a) legacy |
| Why does a non-Carmichael composite pass `k` independent Fermat tests with probability at most `(1/2)^k`? | For a composite `m` that is not Carmichael, the set of coprime bases that falsely satisfy `a^{m-1} == 1 mod m` is a proper subgroup of `Z_m^*`, so it has size at most half of `Z_m^*`. Non-coprime bases reveal compositeness by `gcd(a,m)>1`. Therefore each random trial passes with probability at most `1/2`, and `k` independent trials pass with probability at most `(1/2)^k`. | 2017/18 Q8(b) legacy |
| What is Pollard's rho method for factorisation trying to find? | It iterates a polynomial modulo `n` to produce a pseudo-random sequence and compares pairs of iterates; a non-trivial `gcd(|x_i-x_j|, n)` gives a factor of `n`. | 2017/18 Q10(a) legacy |
