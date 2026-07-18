---
code: CS4423
title: Networks
status: Optional
semester: Semester 2
credits: 5
exam_weight: 80%
ca_weight: 20%
assessment: 80% exam / 20% CA
predictability: Medium-High
lecturer: Mary Kelly / Collette McLoughlin / Gotz Pfeiffer
lecturer_risk: High
priority: Exam-heavy but staff-change risk
module_url: https://www.universityofgalway.ie/course-information/module/CS4423
---

# CS4423 - Networks

## Source Material Checked

- Past papers reviewed: 2017/18, 2018/19, 2021/22, 2022/23, 2023/24, 2024/25.
- Module page checked: https://www.universityofgalway.ie/course-information/module/CS4423
- Date checked: 2026-06-11.

## Module Page Summary

- Semester: Semester 2.
- Credits: 5.
- Assessment weighting:
  - Written assessment / exam: 80%.
  - Continuous assessment: 20%.
- Module description: introduction to Network Science.
- Stated learning outcomes:
  - Describe a network in graph-theoretic terms.
  - Apply graph traversal techniques to networks with additional attributes.
  - Define and apply centrality measures.
  - Describe random graph generators and derive properties of resulting networks.
  - Reason about markets represented as networks.
  - Reason about document networks such as the web.
- Listed teachers/administrators: Mary Kelly, Collette McLoughlin, Gotz Pfeiffer.
- Reading list:
  - Complex Networks by Vito Latora, Vincenzo Nicosia, Giovanni Russo.
  - Networks, An Introduction by Mark Newman.
  - Networks, Crowds and Markets by D. Easley and J. Kleinberg.
- Module page says the information is valid from 2025 onwards.

## Lecturer / Personal Note

- Lecturer fit: not recorded yet.
- Lecturer/staff change risk: high.
- Current module page lists Mary Kelly, Collette McLoughlin, and Gotz Pfeiffer.
- Starred internal examiners, treated as the module lecturer on each paper:
  - 2024/25: Niall Madden.
  - 2021/22, 2022/23 and 2023/24: A. Carnevale.
  - 2017/18 and 2018/19: Gotz Pfeiffer.
- Gotz Pfeiffer links the current page to older papers, but the recent starred lecturers were A. Carnevale and Niall Madden. Mary Kelly and Collette McLoughlin do not appear as starred lecturers on the reviewed papers.
- Main implication: CS4423 has a Medium-High syllabus/topic pattern, but exact paper style and emphasis could change. Current lecture notes and tutorial sheets should be weighted heavily.

## Predictability Rating

Medium-High at core-topic level. Graph traversal, centrality and random-graph work recur, but the 2024/25 paper changed from four large questions to seven shorter questions, so exact format is low-confidence.

## Evidence From Past Papers

- Core graph basics recur: definitions, trees, order/size, directed graphs and adjacency matrices.
- BFS is the safest topic: it appears in every reviewed paper and usually asks for algorithm description, distances, predecessors, spanning trees or shortest paths.
- Centrality is a major repeat area: degree, closeness, betweenness and sometimes eigenvector centrality.
- Random graph models recur strongly: Erdos-Renyi G(n,m)/G(n,p), edge-count probabilities and dice/coin probability questions.
- Other high-value repeats: Watts-Strogatz/clustering, Prufer codes, strong/weak connectedness, strongly connected components and Bow-Tie diagrams.
- Treat older extras such as structural balance, game theory, transport networks and PageRank as secondary. Newer additions include affiliation/bipartite networks, Laplacian reconstruction and NetworkX-style graph input.

## Assessment Strategy

- This is an exam-heavy module: 80% written assessment and only 20% CA.
- The low CA weighting makes it less attractive if the main goal is banking marks before exams.
- However, the exam looks predictable enough that targeted preparation could pay off.
- Highest-value preparation areas:
  - BFS: algorithm, distances, spanning trees, predecessors, all shortest paths.
  - Centrality: degree, closeness, betweenness, eigenvector.
  - Random graphs: G(n,m), G(n,p), expected size, degree probabilities, giant component.
  - Watts-Strogatz: construction, clustering, characteristic path length, comparison with Erdos-Renyi and circle graphs.
  - Prufer codes: tree to code, code to degree sequence, code to tree.
  - Directed graphs: in-degree, out-degree, strong/weak components, Bow-Tie diagram.
  - Bipartite/affiliation networks and projections, especially because 2024/25 included them.

## Overall Judgement

CS4423 is medium-high at core-topic level but exam-heavy. It is not ideal for a CA-first strategy because only 20% is continuous assessment. The recurring core can still reward targeted preparation, provided the current teaching material sets the final emphasis.

## Predictability Audit (2026-07-17)

- **Status: Medium-High (topic-level); low confidence for exact format.** Local evidence is `2017_2018.pdf`, `2018_2019.pdf`, `2021_2022.pdf`, `2022_2023.pdf`, `2023_2024.pdf`, and `2024_2025.pdf`. Graph traversal, centrality and random-graph work recur, but the latest paper changed from four broad questions to seven short questions.
- **Applicability:** the current [official module page](https://www.universityofgalway.ie/course-information/module/CS4423) still names graph traversal, centrality and random graph generators. It supports those core topic families, not claims that Prufer codes, Bow-Tie diagrams or any question slot will recur.
- **Decision:** prepare the recurring core and use the most recent format as a reference only; treat older specialist topics as coverage rather than prediction.

## Topic Guides

- [Graph Foundations](graph_foundations_revision_sheet.html)
- [BFS and Shortest Paths](bfs_shortest_paths_revision_sheet.html)
- [Centrality](centrality_revision_sheet.html)
- [Random Graphs](random_graphs_revision_sheet.html)
- [Small-World Networks](small_world_revision_sheet.html)
- [Prufer Codes and Trees](prufer_codes_trees_revision_sheet.html)
- [Connectivity and Directed Networks](connectivity_revision_sheet.html)
- [Bipartite, Affiliation and Laplacian Networks](bipartite_affiliation_laplacian_revision_sheet.html)
- [Secondary Applications](secondary_applications_revision_sheet.html)

## Short Learning Material

Use Degreed/Percipio-style catalogues for short tutorials, guided projects, or video chapters. Prefer material under 3 hours per topic.

- Graph theory for networks: directed/undirected graphs, paths, trees, components and adjacency matrices.
- BFS and shortest paths: distances, predecessor trees and spanning-tree construction.
- Network centrality: degree, closeness, betweenness and eigenvector centrality.
- Random graph models: Erdos-Renyi `G(n,p)` / `G(n,m)`, expected edges and degree probability.
- Small-world networks: Watts-Strogatz construction, clustering coefficient and characteristic path length.
- Prufer codes and labelled trees: encode/decode worked examples.
- NetworkX basics: creating graphs, reading edge lists and computing centrality metrics.
