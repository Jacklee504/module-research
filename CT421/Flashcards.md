# CT421 Flashcards

[CT421 overview](details.html) | [Most asked questions](most_asked.html) | [HTML flashcard deck](flashcards.html) | [Past papers](details.html#past-papers)

## How To Use This Deck

Use the first column as the prompt and the second as a fast, exam-safe answer. The evidence column maps each card to the supplied papers. Full question wording, marks, and constructions are in [most_asked.html](most_asked.html).

**Drill first:** GA allocation design, minimax/alpha-beta, auctions/game theory, and explainability. Legacy backup: three-player minimax and game-theory limitations.

## Topics

[1. Minimax](#1-game-trees-and-minimax) | [2. Alpha-beta](#2-alpha-beta-pruning-and-scalable-minimax) | [3. Search and MCTS](#3-state-space-search-and-monte-carlo-tree-search) | [4. Novelty search](#4-novelty-search-and-multi-player-games) | [5. GA design](#5-ga-design-and-constraint-handling) | [6. GA theory](#6-ga-schema-theory-and-operators) | [7. GA balance](#7-ga-search-balance-and-hill-climbing) | [8. Communication](#8-agent-communication-and-negotiation) | [9. Auctions](#9-auction-mechanisms-and-resource-allocation) | [10. Equilibria](#10-dominance-nash-equilibrium-and-prisoners-dilemma) | [11. Cooperation](#11-repeated-cooperation-and-game-theory-limits) | [12. Explainability](#12-explainability) | [13. Artificial life](#13-artificial-life-and-neuro-evolution) | [14. ACO](#14-ant-colony-optimisation) | [15. AI paradigms](#15-symbolic-and-connectionist-ai)

## 1. Game Trees and Minimax

| Front | Back | Evidence |
|----|----|----|
| What is a two-player game tree? | Nodes are legal states and edges are legal moves. Label turns MAX and MIN; MAX seeks the greatest backed-up utility and MIN the least. | 2022/23 Q1(a); 2023/24 Q1(a); 2024/25 Q1(a)(i) |
| Give the minimax rule, including a depth limit. | Give terminal states utility from MAX's viewpoint; back up max at MAX and min at MIN. If full search is too large, stop at depth *L* and use heuristic *h(s)* at the frontier. | 2022/23 Q1(a)-(b); 2024/25 Q1(a)(i) |
| How do you answer a Nim or tic-tac-toe minimax question? | Draw the requested legal-move tree, label turns, give leaves utilities or *h(s)*, back up MAX/MIN values, and state the best root move. For misère Nim, taking the last item loses. | 2023/24 Q1(a); 2024/25 Q1(a)(i) |

## 2. Alpha-Beta Pruning and Scalable Minimax

| Front | Back | Evidence |
|----|----|----|
| What are α and β, and when do you prune? | α is MAX's best guaranteed value; β is MIN's. Prune when α ≥ β. Example: if α = 6 and a MIN child gives β = 4, prune its remaining children. | 2024/25 Q1(a)(ii); legacy 2021/22 Q1(b) |

## 3. State-Space Search and Monte Carlo Tree Search

| Front | Back | Evidence |
|----|----|----|
| Define BFS with complexity and completeness. | FIFO, level by level. At shallowest goal depth *d*: time and space O(b<sup>d</sup>); complete with finite branching. | 2023/24 Q1(b); 2024/25 Q1(b) |
| Define DFS with complexity and completeness. | Follow one branch then backtrack. To maximum depth *m*: time O(b<sup>m</sup>), space O(bm); not complete in infinite-depth spaces. | 2023/24 Q1(b); 2024/25 Q1(b) |
| Define iterative deepening with complexity and completeness. | Repeat depth-limited DFS for limits 0, 1, 2, … . It is complete with finite branching, takes O(b<sup>d</sup>) time, and O(bd) space. | 2023/24 Q1(b); 2024/25 Q1(b); legacy 2021/22 Q1(a) |
| What are MCTS's stages and UCT's purpose? | Selection, expansion, rollout, backpropagation. UCT chooses children by mean reward + *c*√(ln *N* / *n*), balancing high reward against low visits. | 2024/25 Q1(c) |

## 4. Novelty Search and Multi-Player Games

| Front | Back | Evidence |
|----|----|----|
| What is novelty search for a maze robot? | Reward behavioural difference, not just goal score. Use final position or trajectory, score distance from an archive/nearest neighbours, and retain sufficiently novel behaviour. | 2022/23 Q1(c); 2023/24 Q1(c) |
| How is minimax extended to three players? | Store terminal vector (u<sub>1</sub>, u<sub>2</sub>, u<sub>3</sub>); at player *i*'s node choose the child maximising u<sub>i</sub>. This is max-n, not ordinary zero-sum minimax. | Legacy: 2021/22 Q1(c)(a) |

## 5. GA Design and Constraint Handling

| Front | Back | Evidence |
|----|----|----|
| What must a GA design state before operators? | One candidate solution, the objective, hard constraints, and a small valid change. These determine encoding, fitness, repair/penalty, and mutation. | 2022/23 Q2(b); 2023/24 Q2(b); 2024/25 Q2(b) |
| Give encoding and fitness for multiple knapsack. | x<sub>i</sub> ∈ {0, 1, …, K}: 0 means omit item *i*; *k* means knapsack *k*. Maximise total value − λΣ<sub>k</sub> max(0, load<sub>k</sub> − C<sub>k</sub>). | 2023/24 Q2(b); legacy 2021/22 Q2(b) |
| Give encoding and fitness for task-to-processor allocation. | x<sub>i</sub> ∈ {1, …, M} gives task *i*'s processor. Minimise makespan/cost, penalising memory excess or missing capability. | 2024/25 Q2(b)(i)-(ii) |
| Give encoding and fitness for unique student-project allocation. | Gene *i* is student *i*'s project. Use a permutation or repair duplicates; maximise preference score and penalise invalid or unassigned projects. | 2022/23 Q2(b) |
| How do selection, crossover, and mutation work in constrained allocation? | Tournament selection chooses the best of a random small sample. Crossover combines assignments then repairs violations. Mutation makes one valid change: reassign a task, swap projects, or move/add/remove an item. | 2022/23 Q2(b); 2023/24 Q2(b); 2024/25 Q2(b)(iii)-(iv) |

## 6. GA Schema Theory and Operators

| Front | Back | Evidence |
|----|----|----|
| What is a schema? | A template for chromosomes, e.g. 1\*0\*, where \* is a wildcard. Order = fixed positions; defining length = distance between first and last fixed position. | 2022/23 Q2(a); 2023/24 Q2(a) |
| State the schema theorem. | In expectation, short, low-order, above-average-fitness schemas grow under proportional selection, unless crossover or mutation disrupts them. It is not a survival guarantee. | 2023/24 Q2(a) |
| How do GA operators affect schemas? | Selection increases fitter schemas. Crossover can combine or break schemas, especially long ones. Mutation adds variation but breaks a schema when it changes a fixed position. | 2022/23 Q2(a)(a)-(c); 2023/24 Q2(a) |

## 7. GA Search Balance and Hill Climbing

| Front | Back | Evidence |
|----|----|----|
| Distinguish exploration and exploitation in a GA. | Exploitation improves promising regions; exploration samples new ones. Excess exploitation causes premature convergence; excess exploration becomes near-random search. | 2024/25 Q2(a)(i) |
| What is hill climbing, and how is exploration added? | Repeatedly move to a better neighbour; it can stop at a local optimum, plateau, or ridge. Add random restarts, stochastic moves, or occasional worse moves. | 2024/25 Q2(a)(ii) |

## 8. Agent Communication and Negotiation

| Front | Back | Evidence |
|----|----|----|
| What is a speech act? Give a negotiation sequence. | A message with agreed intent, e.g. `inform`, `request`, `propose`, `accept`, `reject`. Example: inform job → request bids → propose/counter-propose → accept or reject. | 2023/24 Q3(a) |

## 9. Auction Mechanisms and Resource Allocation

| Front | Back | Evidence |
|----|----|----|
| Compare English and Dutch auctions and their bidding strategy. | English: price rises; last bidder wins; stay until valuation. Dutch: price falls; first acceptance wins; wait below value but not so long that another bidder accepts. | 2022/23 Q3(a)(i)-(ii); 2024/25 Q3(c)(i)-(ii) |
| Compare English and Dutch auction trade-offs. | English reveals more information and can be efficient, but is slower and may permit collusion. Dutch is quick but reveals less and demands timing. | 2022/23 Q3(a)(iii); 2024/25 Q3(c)(iii) |
| How does multi-attribute negotiation go beyond price? | Offers are bundles, e.g. (price, deadline, quality). Agents use private utility, exchange counteroffers, and seek a Pareto-efficient agreement. | 2022/23 Q3(b) |
| Why are auctions useful for MAS resource allocation? | Agents bid from private cost, capacity, route, or value information; the rule allocates a task without central knowledge of all values. | 2022/23 Q3(a)-(b); 2024/25 Q3(c) |

## 10. Dominance, Nash Equilibrium, and Prisoner's Dilemma

| Front | Back | Evidence |
|----|----|----|
| Distinguish dominant strategy and Nash equilibrium. | s<sub>i</sub> is dominant if it is at least as good as every alternative for every s<sub>−i</sub>. s\* is Nash if no player can improve by changing s<sub>i</sub>\* alone while s<sub>−i</sub>\* stays fixed. | 2022/23 Q3(c); 2023/24 Q3(b); 2024/25 Q3(a) |
| What does Prisoner's Dilemma show about dominance and Nash? | Defection is dominant, so (defect, defect) is Nash. Yet (cooperate, cooperate) is better jointly: Nash need not be socially optimal. | 2023/24 Q3(b)-(c); 2024/25 Q3(a) |

## 11. Repeated Cooperation and Game-Theory Limits

| Front | Back | Evidence |
|----|----|----|
| What mechanisms promote cooperation in repeated PD? | Repeated interaction, reputation, partner selection, incentives/enforcement, and cooperative network clusters make defection less rewarding. | 2023/24 Q3(c) |
| What is tit-for-tat, and how does it handle noise? | Cooperate first, then copy the opponent's last move. It is cooperative, retaliatory, and forgiving, but noise can cause retaliation cycles; generous forgiveness repairs them. | 2024/25 Q3(b) |
| Give two strengths and limitations of game theory in MAS. | It models strategic dependence and stable outcomes. It can miss incomplete information, bounded rationality, changing preferences, noise, and fixed-payoff assumptions. | Legacy: 2021/22 Q3(c) |

## 12. Explainability

| Front | Back | Evidence |
|----|----|----|
| What is a black-box model, and why explain it? | Its predictions are visible but its internal reasoning is hard to inspect. Explanation supports trust, debugging, bias checks, auditability, and high-stakes accountability. | 2022/23 Q4(a); 2023/24 Q4(a); 2024/25 Q4(c) |
| What does feature attribution or a saliency map explain? | Which features, pixels, regions, or tokens most influenced one prediction. It is usually local, not the model's full causal reasoning. | 2023/24 Q4(a); 2024/25 Q4(c) |
| What is a local surrogate such as LIME? | Perturb inputs near one case, observe outputs, and fit a simple local model. It approximates that prediction's neighbourhood, not the full model. | 2022/23 Q4(a); 2023/24 Q4(a); 2024/25 Q4(c) |
| What is a counterfactual explanation? | The smallest feasible, relevant change that flips a decision, while unrelated attributes stay fixed. | 2022/23 Q4(a); 2024/25 Q4(c) |

## 13. Artificial Life and Neuro-Evolution

| Front | Back | Evidence |
|----|----|----|
| What characterises artificial life? Give a Boids example. | Many components follow local rules, adapt/evolve, and produce emergent global behaviour. Boids use separation, alignment, and cohesion; flocking emerges without a controller. | 2022/23 Q4(c); 2023/24 Q4(b); legacy 2021/22 Q4(a) |
| What is neuro-evolution? | An evolutionary algorithm optimises neural-network weights, architecture, or both, using task fitness, selection, crossover, and mutation. | 2022/23 Q4(b); legacy 2021/22 Q4(b) |
| Give neuro-evolution representations, advantage, and limitation. | Encode a weight vector or a graph of nodes/connections. It avoids differentiable gradients and can optimise topology, but evaluating many networks is expensive. | 2022/23 Q4(b); legacy 2021/22 Q4(b) |

## 14. Ant Colony Optimisation

| Front | Back | Evidence |
|----|----|----|
| Describe one ACO iteration and pheromone's role. | Ants build paths with probability based on τ<sub>ij</sub><sup>α</sup>η<sub>ij</sub><sup>β</sup>; score paths, reinforce good/short ones, and evaporate old trails. This learns good components while keeping exploration. | 2023/24 Q4(c); 2024/25 Q4(a) |
| How does ACO solve TSP or a shortest path? | Build feasible tours/paths, score total length, reinforce shorter ones, evaporate trails, and keep the best found. Short high-pheromone edges become more likely. | 2023/24 Q4(c); 2024/25 Q4(a) |

## 15. Symbolic and Connectionist AI

| Front | Back | Evidence |
|----|----|----|
| Compare symbolic and connectionist AI, using medicine. | Symbolic AI uses explicit, auditable rules but can be brittle. Neural networks learn complex scan patterns from data but are harder to interpret; explanation is needed for safe clinical use. | 2024/25 Q4(b) |

**Total cards:** 40
