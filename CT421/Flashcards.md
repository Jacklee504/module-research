# CT421 Flashcards

[CT421 overview](details.html) | [Most asked questions](most_asked.html) | [HTML flashcard deck](flashcards.html) | [Past papers](details.html#past-papers)

## How To Use This Deck

Use the first column as the prompt and the second as a fast, exam-safe answer. The evidence column maps each card to the supplied papers. Full question wording, marks, and constructions are in [most_asked.html](most_asked.html).

**Drill first:** GA design and diversity, minimax/alpha-beta, Nash/Prisoner's Dilemma, explainability, and ACO. Then memorise iterative-deepening complexity, NK landscapes, graph-colouring fitness, and LLM hallucination safeguards. Legacy-only variants remain documented in [most_asked.html](most_asked.html), not in this fast deck.

## Topics

[1. Game-tree search](#1-game-tree-search) | [2. State-space search](#2-state-space-search-and-mcts) | [3. Novelty search](#3-novelty-search) | [4. Genetic algorithms](#4-genetic-algorithms) | [5. MAS protocols and auctions](#5-mas-protocols-auctions-and-negotiation) | [6. Game theory](#6-game-theory-equilibria-and-cooperation) | [7. Explainability](#7-explainability-and-llm-reliability) | [8. Bio-inspired AI](#8-bio-inspired-ai-and-aco) | [9. AI paradigms](#9-symbolic-and-connectionist-ai)

## 1. Game-Tree Search

| Front | Back | Evidence |
|----|----|----|
| State minimax, including a depth limit. | States are nodes; moves are edges. Score leaves for MAX; back up max at MAX and min at MIN. At depth *L*, use *h(s)*. | 2022/23 Q1(a)-(b); 2023/24 Q1(a); 2024/25 Q1(a)(i); 2025/26 Q1(b) |
| How do you work a minimax tree? | Draw legal moves; label MAX/MIN; score leaves; back up values; state the root move. Check whether taking the last item wins or loses. | 2023/24 Q1(a); 2024/25 Q1(a)(i); 2025/26 Q1(b) |
| What are α and β? When do you prune? | α is MAX's lower bound; β is MIN's upper bound. Prune when α ≥ β. | 2024/25 Q1(a)(ii); 2025/26 Q1(b)(iii); legacy 2021/22 Q1(b) |

## 2. State-Space Search and MCTS

| Front | Back | Evidence |
|----|----|----|
| BFS: order, complexity, completeness? | FIFO by depth; complete with finite branching. At goal depth *d*: time and space O(b<sup>d</sup>). | 2023/24 Q1(b); 2024/25 Q1(b) |
| DFS: order, complexity, completeness? | Follow one branch then backtrack. To depth *m*: time O(b<sup>m</sup>), space O(bm); incomplete in infinite-depth spaces. | 2023/24 Q1(b); 2024/25 Q1(b) |
| Iterative deepening: method, complexity, completeness? | Depth-limited DFS for 0, 1, 2, … . Complete with finite branching; time O(b<sup>d</sup>), space O(bd). | 2023/24 Q1(b); 2024/25 Q1(b); 2025/26 Q1(a) |
| MCTS stages and UCT? | Select, expand, rollout, backpropagate. UCT = mean reward + *c*√(ln *N* / *n*): exploit reward, explore low visits. | 2024/25 Q1(c) |
| NK model: what are *N* and *K*? | *N* genes; each depends on itself and *K* others. Average local fitness. *K* = 0 is smooth; larger *K* means ruggedness and local optima. | 2025/26 Q1(c) |

## 3. Novelty Search

| Front | Back | Evidence |
|----|----|----|
| Novelty search for a maze robot? | Reward behaviour difference, not goal score: compare final positions/trajectories with an archive or neighbours, then retain novel behaviour. | 2022/23 Q1(c); 2023/24 Q1(c) |

## 4. Genetic Algorithms

| Front | Back | Evidence |
|----|----|----|
| Core parts of a constrained GA design? | State encoding, objective, hard constraints, fitness, and repair. Tournament selects; crossover recombines then repairs; mutation makes one valid small change. | 2022/23 Q2(b); 2023/24 Q2(b); 2024/25 Q2(b); 2025/26 Q2(b) |
| How can a GA represent an assignment problem? | Use one gene per item, task, or vertex. Each gene records a choice, such as a knapsack, processor, or colour. | 2021/22 Q2(b); 2023/24 Q2(b); 2024/25 Q2(b); 2025/26 Q2(b) |
| How should a GA score an assignment solution? | Reward the goal, such as high value or low cost, and penalise broken constraints, such as excess weight or clashes. | 2021/22 Q2(b); 2023/24 Q2(b); 2024/25 Q2(b); 2025/26 Q2(b) |
| What is a schema in a GA? | A partial pattern of genes, such as 1*0*, describing similar candidate solutions. | 2022/23 Q2(a); 2023/24 Q2(a) |
| What does the schema theorem say? | Useful, short patterns tend to become more common unless crossover or mutation breaks them. | 2022/23 Q2(a); 2023/24 Q2(a) |
| How do GA operators affect useful patterns? | Selection favours them; crossover and mutation can preserve them or break them. | 2022/23 Q2(a); 2023/24 Q2(a) |
| Why does GA diversity matter? | It prevents the population becoming too similar and getting stuck early. | 2024/25 Q2(a)(i); 2025/26 Q2(a) |
| How can a GA keep diversity? | Use mutation, varied parent selection, niching/crowding, or introduce new candidates. | 2024/25 Q2(a)(i); 2025/26 Q2(a) |
| Why can hill climbing fail? | It can get stuck at a local optimum, plateau, or ridge. | 2024/25 Q2(a)(ii) |
| How can hill climbing escape a poor area? | Restart elsewhere, choose moves randomly, or occasionally accept a worse move. | 2024/25 Q2(a)(ii) |

## 5. MAS Protocols, Auctions, and Negotiation

| Front | Back | Evidence |
|----|----|----|
| How do agents communicate clearly? | They use messages with a clear purpose, such as informing, requesting, proposing, accepting, or rejecting. | 2023/24 Q3(a); 2025/26 Q3(a) |
| How does an auction allocate work in MAS? | Announce the task, collect bids, choose a winner, then confirm or reject bids. | 2022/23 Q3(a); 2024/25 Q3(c); 2025/26 Q3(a) |
| What can make agent communication unreliable? | Messages may be late, lost, misunderstood, or based on different assumptions. | 2023/24 Q3(a); 2025/26 Q3(a) |
| English versus Dutch auction? | English: price rises; last bidder wins. Dutch: price falls; first accepter wins. | 2022/23 Q3(a); 2024/25 Q3(c) |
| What is multi-attribute negotiation? | Agents negotiate several factors, such as price, quality, and deadline, rather than price alone. | 2022/23 Q3(b) |

## 6. Game Theory: Equilibria and Cooperation

| Front | Back | Evidence |
|----|----|----|
| What is the difference between a dominant strategy and a Nash equilibrium? | A dominant strategy is best whatever others do. A Nash equilibrium is a situation where nobody benefits by changing alone. | 2022/23 Q3(c); 2023/24 Q3(b); 2024/25 Q3(a); 2025/26 Q3(b) |
| Can a game have more than one Nash equilibrium? | Yes. A coordination game can have two stable choices, so agents may need communication or a shared convention. | 2025/26 Q3(b) |
| What does the Prisoner's Dilemma show? | Each player has a reason to defect, but both would be better off if both cooperated. | 2024/25 Q3(a); 2025/26 Q3(c) |
| What can encourage cooperation in a Prisoner's Dilemma? | Repeated interaction, reputation, partner choice, rewards or penalties, and cooperative groups can make defection less attractive. | 2023/24 Q3(c); 2025/26 Q3(c) |
| What is tit-for-tat, and why does noise matter? | Start by cooperating, then copy the other player's last move. Mistakes can cause retaliation cycles; forgiveness helps stop them. | 2024/25 Q3(b) |

## 7. Explainability and LLM Reliability

| Front | Back | Evidence |
|----|----|----|
| Why explain a black-box model? | Its internal reasoning is hard to inspect. Explanations support trust, debugging, bias checks, audits, and accountability. | 2022/23 Q4(a); 2023/24 Q4(a); 2024/25 Q4(c); 2025/26 Q4(b) |
| What does a saliency map show? | The input regions or features most associated with one prediction. It does not prove causation or explain the whole model. | 2023/24 Q4(a); 2024/25 Q4(c); 2025/26 Q4(b) |
| How does LIME explain one prediction? | It changes inputs near that case, observes output changes, and fits a simple local explanation. | 2022/23 Q4(a); 2023/24 Q4(a); 2024/25 Q4(c) |
| Why can an LLM hallucinate? | It generates likely text rather than automatically checking facts, especially when information is unclear or missing. | 2025/26 Q4(c) |
| How can hallucinations be reduced? | Ground answers in reliable sources, verify important claims, or state uncertainty instead of guessing. | 2025/26 Q4(c) |

## 8. Bio-Inspired AI and ACO

| Front | Back | Evidence |
|----|----|----|
| How can artificial life create emergent behaviour? | Simple agents follow local rules without a controller; repeated interaction can create global patterns, such as flocking. | 2022/23 Q4(c); 2023/24 Q4(b); 2025/26 Q4(a); legacy 2021/22 Q4(a) |
| How does neuro-evolution work? | It evolves neural-network weights or architecture using fitness. It works without gradients, but many evaluations are costly. | 2022/23 Q4(b); legacy 2021/22 Q4(b) |
| How does ACO find a good route? | Ants choose edges using pheromone and distance; short routes reinforce pheromone, while evaporation keeps alternatives available. | 2023/24 Q4(c); 2024/25 Q4(a); 2025/26 Q4(a) |

## 9. Symbolic and Connectionist AI

| Front | Back | Evidence |
|----|----|----|
| How do symbolic and connectionist AI differ? | Symbolic AI uses explicit rules and is easier to inspect. Connectionist AI learns patterns from data but is harder to explain. | 2024/25 Q4(b) |

**Total cards:** 38
