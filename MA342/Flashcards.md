**MA342 Quick Revision Flashcards**

# Lean 77-Card Topology Deck

Short definitions, distinctions, examples, and reusable proof moves drawn from the repeated MA342 question families in the current study document.

## How To Use This Page

Write the first column on the front of a card and the second on the back. Aim to give the back in one or two sentences unless the card is a proof move. The evidence column shows which current-format papers support that card.

## Priority Reality Check

**Drill first:** topology definitions; subspaces; lower-limit/cofinite examples; closure/interior; compactness and Hausdorffness; connectedness; and the standard homeomorphism comparisons. These families recur across all three current papers.

**Then drill:** product/initial/final/quotient topologies, Cantor-set arguments, and homotopy. These also recur across all three current papers but are concentrated later in the exam.

**Coverage note:** the paper evidence, priorities, examples, and proof moves come from the supplied MA342 study page. Where that page explicitly asks for a basic definition but does not spell the definition out (for example standard topology, basis, neighbourhood, Hausdorff, discrete, or clopen), the card uses the standard textbook definition. The page names *homotopy equivalence* and *simply connected* but gives neither definition, so those two are left out rather than guessed from the page.

## 1. Core Topology, Subspaces, Bases, Closure, And Interior

| Front | Back | Evidence |
| --- | --- | --- |
| **What is a topology on a set X?** | A collection τ of subsets of X such that ∅ and X are in τ, arbitrary unions of sets in τ are in τ, and finite intersections of sets in τ are in τ. | 2023/24, 2024/25, 2025/26 |
| **What is the standard topology on ℝ?** | The topology whose open sets are unions of ordinary open intervals. | 2025/26 |
| **What is the cofinite topology on X?** | The topology consisting of ∅ together with all subsets of X whose complement is finite. | 2023/24, 2024/25, 2025/26 |
| **What is the discrete topology?** | The topology in which every subset of the space is open. | 2024/25, 2025/26 |
| **How can you show the standard and cofinite topologies on ℝ are different?** | Use an ordinary open interval: it is open in the standard topology, but its complement is infinite, so it is not cofinite-open. | 2025/26 |
| **What is the subspace topology on A ⊆ X?** | A set V ⊆ A is open in A exactly when V = A ∩ U for some open set U in X. | 2023/24, 2025/26 |
| **What does it mean for a subspace to be discrete?** | Every subset of the subspace is open; in particular, every singleton must be open in the subspace topology. | 2023/24, 2024/25, 2025/26 |
| **Why is ℚ not discrete in the usual subspace topology?** | Its points are not isolated: an ordinary open interval around a rational also contains other rational numbers. | 2023/24 |
| **Why is ℤ discrete as a subspace of ℝ?** | Each integer n can be isolated by a sufficiently small open interval, so {n} is open in the subspace topology. | 2024/25 |
| **Why is [0,1] not discrete in the usual subspace topology?** | An interior point such as 1/2 cannot be isolated by intersecting [0,1] with an ordinary open interval. | 2025/26 |
| **What is a basis for a topology?** | A collection of open sets from which every open set can be formed as a union of basis elements. | 2023/24 |
| **What is a basis for the lower-limit topology on ℝ?** | All half-open intervals [a,b) with a < b. | 2023/24, 2024/25 |
| **What basic intervals are used in the lower-limit topology?** | Intervals of the form [a,b): the left endpoint is included and the right endpoint is excluded. | 2023/24, 2024/25 |
| **What does clopen mean?** | A set is clopen if it is both open and closed. | 2024/25 |
| **Why is [0,1) clopen in the lower-limit topology?** | It is open because [0,1) is a basic interval. Its complement is open in the lower-limit topology, so [0,1) is also closed. | 2024/25 |
| **What is a neighbourhood of a point x?** | A set containing an open set that contains x. | 2024/25 |
| **What is the interior of A?** | The largest open subset contained in A. | 2024/25, 2025/26 |
| **How can interior be recognised using neighbourhoods?** | A point x is in the interior of A exactly when x has a neighbourhood contained in A. | 2024/25 |
| **What is the closure of A?** | The set of points x such that every neighbourhood of x meets A. | 2023/24, 2025/26 |
| **What is an accumulation point of A?** | A point x such that every neighbourhood of x meets A \ {x}. | 2025/26 |
| **What is the key difference between closure and accumulation points?** | For closure, every neighbourhood must meet A. For an accumulation point, every neighbourhood must meet A with the point x itself removed. | 2023/24, 2025/26 |
| **What neighbourhood test characterises closure?** | x is in the closure of A exactly when every neighbourhood of x intersects A. | 2023/24 |
| **How do you prove a set is closed if it has no accumulation points?** | Show that every point outside the set has an open neighbourhood disjoint from the set, so the complement is open. | 2025/26 |
| **What should you test first when deciding whether a subspace is discrete?** | Test whether a singleton is open in the subspace topology. | 2023/24, 2024/25, 2025/26 |

## 2. Compactness, Hausdorffness, Cofinite, And Lower-Limit Examples

| Front | Back | Evidence |
| --- | --- | --- |
| **What does compact mean?** | Every open cover of the space has a finite subcover. | 2023/24, 2024/25, 2025/26 |
| **Is standard ℝ compact?** | No. For example, the open cover {(-n,n) : n ∈ ℕ} has no finite subcover of ℝ. | 2023/24 |
| **What does dense mean?** | A subset A is dense in X when its closure is all of X. | 2024/25, 2025/26 |
| **Which subsets are dense in cofinite ℝ?** | Every infinite subset is dense in cofinite ℝ. | 2024/25, 2025/26 |
| **How can you disprove compactness of the lower-limit line?** | Use the open cover {[n,n+1) : n ∈ ℤ}. No finite subfamily covers all of ℝ. | 2024/25, 2025/26 |
| **Why does no finite subfamily of {[n,n+1) : n ∈ ℤ} cover ℝ?** | A finite collection covers only a bounded part of the line, while ℝ is unbounded. | 2024/25, 2025/26 |
| **Is an infinite cofinite space compact?** | Yes. Every open cover has a finite subcover. | 2023/24 |
| **What does Hausdorff mean?** | Any two distinct points have disjoint open neighbourhoods. | 2023/24, 2024/25, 2025/26 |
| **Why is an infinite cofinite space not Hausdorff?** | Any two nonempty cofinite open sets must intersect, so distinct points cannot always be separated by disjoint open neighbourhoods. | 2023/24, 2024/25 |
| **Why is the lower-limit topology on ℝ Hausdorff?** | If x < y, use [x,y) and [y,y+1). They are disjoint basic neighbourhoods of x and y. | 2025/26 |
| **What theorem relates closed subsets and compact spaces?** | A closed subset of a compact space is compact. | 2024/25 |
| **What theorem relates compact subspaces and Hausdorff spaces?** | A compact subspace of a Hausdorff space is closed. | 2025/26 |
| **What theorem turns a continuous bijection into a homeomorphism?** | A continuous bijection from a compact space to a Hausdorff space is a homeomorphism. | 2023/24 |
| **What is the proof pattern for showing a compact subset A of a Hausdorff space X is closed?** | For x outside A, separate x from each point of A, use compactness to choose finitely many of those neighbourhoods, then intersect the corresponding neighbourhoods of x to show X \ A is open. | 2025/26 |
| **What compactness theorem directions must not be mixed up?** | Closed subset of compact ⇒ compact; compact subspace of Hausdorff ⇒ closed; continuous bijection compact → Hausdorff ⇒ homeomorphism. | 2023/24, 2024/25, 2025/26 |

## 3. Connectedness, Separations, Continuous Images, And IVT

| Front | Back | Evidence |
| --- | --- | --- |
| **What is a separation of X?** | A decomposition X = U ∪ V where U and V are disjoint, nonempty, open subsets of X. | 2023/24, 2024/25, 2025/26 |
| **What does connected mean?** | A space is connected if it has no separation. | 2023/24, 2024/25, 2025/26 |
| **Why is discrete ℚ disconnected?** | {0} and ℚ \ {0} are disjoint, nonempty, open sets whose union is ℚ. | 2025/26 |
| **Why is indiscrete ℚ connected?** | The only open sets are ∅ and ℚ, so there is no nonempty proper open set that could form a separation. | 2025/26 |
| **Why is ℚ with the usual subspace topology disconnected?** | Cut at the irrational number √2; this gives two nonempty disjoint relatively open pieces of ℚ. | 2025/26 |
| **Why is cofinite ℚ connected?** | Any two nonempty open sets intersect, so a separation cannot exist. | 2025/26 |
| **What happens to connectedness under a continuous surjection?** | A continuous surjective image of a connected space is connected. | 2023/24, 2024/25, 2025/26 |
| **What is the standard proof move for continuous images of connected spaces?** | Assume the image has a separation U,V. Then f⁻¹(U) and f⁻¹(V) form a separation of the original space, contradicting connectedness. | 2023/24, 2024/25, 2025/26 |
| **How does connectedness give the Intermediate Value Theorem?** | [a,b] is connected, so h([a,b]) is connected in ℝ and therefore an interval containing h(a) and h(b). | 2023/24, 2024/25, 2025/26 |

## 4. Homeomorphisms And Invariants

| Front | Back | Evidence |
| --- | --- | --- |
| **What is a homeomorphism?** | A continuous bijection whose inverse is also continuous. | 2023/24, 2024/25, 2025/26 |
| **What properties are used as homeomorphism invariants in these papers?** | Compactness and connectedness, including connectedness after deleting corresponding points. | 2023/24, 2024/25, 2025/26 |
| **Why are ℝ and [0,1] not homeomorphic?** | [0,1] is compact and ℝ is not, and compactness is preserved by homeomorphisms. | 2024/25, 2025/26 |
| **Why are ℝ² and ℝ not homeomorphic?** | Remove a point: ℝ with one point removed is disconnected, while ℝ² with one point removed remains connected. | 2024/25 |
| **Why are S¹ and [0,1] not homeomorphic?** | Remove corresponding interior points: the punctured circle remains connected, while [0,1] with an interior point removed is disconnected. | 2023/24, 2025/26 |
| **When is point removal useful for proving spaces are not homeomorphic?** | When the spaces share simpler invariants such as compactness and connectedness, but deleting corresponding points changes connectedness differently. | 2023/24, 2025/26 |
| **Give a homeomorphism from ℝ to (0,∞).** | f(x) = eˣ. | 2024/25, 2025/26 |
| **What is the inverse of the homeomorphism f(x)=eˣ from ℝ to (0,∞)?** | f⁻¹(y) = ln(y). | 2024/25, 2025/26 |

## 5. Product, Initial, Final, And Quotient Topologies

| Front | Back | Evidence |
| --- | --- | --- |
| **What is a basis for the product topology on X × Y?** | All sets U × V where U is open in X and V is open in Y. | 2023/24, 2024/25 |
| **What is the initial topology?** | The coarsest topology making the given maps out of the set continuous. | 2024/25 |
| **What is the final topology?** | The finest topology making the given maps into the set continuous. | 2025/26 |
| **What is the initial/final direction trap?** | Initial: maps out of the set and coarsest. Final: maps into the set and finest. | 2024/25, 2025/26 |
| **What is the quotient topology on X/~?** | A set W in X/~ is open exactly when q⁻¹(W) is open in X, where q is the quotient map. | 2023/24, 2024/25 |
| **Why is S¹ a quotient of [0,1]?** | Use a continuous surjection from [0,1] onto the circle that identifies exactly the endpoints 0 and 1. | 2023/24, 2024/25, 2025/26 |
| **How is the endpoint identification for the circle written?** | [0,1]/(0 ~ 1): the endpoints 0 and 1 are identified to the same point. | 2023/24, 2024/25, 2025/26 |
| **Why can ℝ not be a quotient of the Cantor set C?** | A quotient map C → ℝ would be a continuous surjection from compact C, which would force ℝ to be compact. | 2025/26 |

## 6. Cantor Set: Definition, Compactness, Images, And Quotients

| Front | Back | Evidence |
| --- | --- | --- |
| **How is the Cantor set C constructed?** | Start with [0,1] and repeatedly remove the open middle third from every remaining closed interval. | 2024/25, 2025/26 |
| **How can the Cantor set be described using ternary expansions?** | It is the set of points in [0,1] that have a ternary expansion using only the digits 0 and 2. | 2024/25, 2025/26 |
| **Why is the Cantor set compact?** | It is closed in the compact space [0,1]. | 2025/26 |
| **Why is the Cantor set Hausdorff?** | It is a subspace of ℝ, which is Hausdorff. | 2025/26 |
| **Is [0,1] a continuous image of the Cantor set?** | Yes. The current papers require this direction as a standard Cantor-set image fact. | 2023/24 |
| **Why can the continuous-image statement not simply be reversed?** | Connectedness blocks a continuous surjection [0,1] → C because [0,1] is connected while C is disconnected. | 2023/24 |
| **What property rules out a quotient map from C onto standard ℝ?** | Compactness: continuous images of compact spaces are compact, but standard ℝ is not compact. | 2025/26 |

## 7. Homotopy And Star-Shaped/Convex Spaces

| Front | Back | Evidence |
| --- | --- | --- |
| **When are two maps f,g : X → Y homotopic?** | When there is a continuous H : X × [0,1] → Y with H(x,0)=f(x) and H(x,1)=g(x). | 2023/24, 2024/25, 2025/26 |
| **What straight-line homotopy works for maps into ℝⁿ?** | H(x,t) = (1−t)f(x) + t g(x). | 2024/25, 2025/26 |
| **Why does the straight-line homotopy work in ℝⁿ?** | It is continuous and every straight-line combination stays in ℝⁿ. | 2024/25, 2025/26 |
| **For what more general targets does straight-line interpolation work?** | Any convex target. | 2023/24, 2024/25, 2025/26 |
| **How do you contract a star-shaped space with centre x₀?** | Use H(x,t) = (1−t)x + t x₀. | 2023/24 |
| **What must be checked in the star-shaped contraction?** | The whole line segment from x to x₀ must stay inside the space. | 2023/24 |
