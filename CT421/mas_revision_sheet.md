# CT421: Multi-Agent Systems Revision Sheet

## The core idea

A **multi-agent system (MAS)** is a system containing two or more autonomous agents that interact in a shared environment. Each agent can perceive, decide, and act. Their objectives may be aligned, opposed, or partly shared.

MAS matters when one central controller would be impractical, when information is distributed, or when separate decision-makers compete for scarce resources. Examples include delivery vehicles choosing jobs, trading systems, robots sharing tasks, and software agents allocating cloud computing resources.

For most CT421 answers, make the connection explicit: identify the agents, their goals, the interaction problem, and the mechanism used to coordinate or compete.

## Game-theory foundations

### Payoff matrix

A **payoff matrix** shows the outcome, or payoff, received by each agent for every combination of actions. It is a simple model of strategic interaction: an agent's best action can depend on what the other agent chooses.

**Relation to MAS:** it models decisions made by self-interested agents whose outcomes depend on one another.

### Dominant strategy

A **dominant strategy** is an action that gives an agent at least as good a payoff as every alternative, regardless of what the other agents do.

**Relation to MAS:** if an agent has a dominant strategy, it has a clear individual choice without needing to predict another agent's action. When all agents use dominant strategies, the resulting outcome is a dominant-strategy equilibrium.

### Nash equilibrium

A **Nash equilibrium** is a set of strategies in which no agent can improve its own payoff by changing strategy alone, assuming every other agent keeps their strategy unchanged.

**Relation to MAS:** Nash equilibrium predicts stable behaviour among self-interested agents. It does not necessarily give the best result for the group.

### Prisoner's Dilemma

The **Prisoner's Dilemma** is a two-agent game where each agent is individually better off defecting, regardless of the other agent's choice, but both would be better off if both cooperated. Mutual defection is the Nash equilibrium, even though mutual cooperation is socially preferable.

**Relation to MAS:** it explains why agents with shared long-term interests may still fail to cooperate if they optimise only their immediate individual reward. This is relevant to resource sharing, traffic routing, and distributed task allocation.

### Repeated games and tit-for-tat

A **repeated game** is played more than once, so an agent can respond to another agent's past behaviour. **Tit-for-tat** starts by cooperating, then repeats the other agent's previous action: cooperate after cooperation and defect after defection.

**Relation to MAS:** repeated interaction can make cooperation rational. Tit-for-tat rewards cooperative agents, discourages exploitation, and can restore cooperation after one agent changes behaviour.

## Coordination and allocation

### Auction

An **auction** is a protocol for allocating a scarce item, resource, or task using bids from agents. An agent's bid represents how much it values the item or how costly it considers the task.

Common forms include:

- **English auction:** price increases until only one bidder remains.
- **Dutch auction:** price decreases until a bidder accepts.
- **First-price sealed-bid auction:** highest bid wins and pays its own bid.
- **Second-price sealed-bid (Vickrey) auction:** highest bid wins but pays the second-highest bid.

**Relation to MAS:** auctions let autonomous agents allocate resources without a central planner knowing each agent's private valuation. For example, delivery agents could bid for jobs based on distance, capacity, and expected profit.

### Task allocation

**Task allocation** is the process of assigning tasks to agents so that work is completed efficiently. Agents may have different skills, locations, costs, or current workloads.

**Relation to MAS:** task allocation is a central coordination problem. Auctions are one method; a central scheduler, negotiation, or a contract-net protocol are others.

### Negotiation

**Negotiation** is a process in which agents exchange proposals and counter-proposals to reach an agreement. An agreement may concern price, task ownership, deadlines, resource quantities, or constraints.

**Relation to MAS:** negotiation helps agents resolve conflicts when no single agent controls all relevant information or resources. It is more flexible than a simple auction but can require more communication and time.

### Contract Net Protocol

The **Contract Net Protocol** is a distributed task-allocation protocol. A manager agent announces a task, contractor agents submit bids, the manager awards the task, and the selected contractor performs it.

**Relation to MAS:** it is a concrete way for agents to organise work without a single system-wide controller. It is particularly suitable when agents know their own availability and cost better than a central system does.

## Cooperation and communication

### Cooperative distributed problem solving

**Cooperative distributed problem solving (CDPS)** occurs when several agents share a common overall goal and divide a problem into smaller parts. They coordinate their actions and share relevant information to solve the joint problem.

**Relation to MAS:** this is the cooperative side of MAS. Examples include robots searching different areas after a disaster or services jointly planning a delivery route.

### Agent communication

**Agent communication** is the exchange of structured messages between agents. Messages can communicate information, requests, proposals, commitments, acceptances, or refusals.

An **agent communication language (ACL)** is a formal language for these message types. Typical communicative acts include `inform`, `request`, `propose`, `accept`, and `reject`.

**Relation to MAS:** agents cannot coordinate, negotiate, or run protocols such as Contract Net unless they can communicate clearly. The message's intended action matters, not just its raw data.

## How the topics fit together

1. A MAS contains autonomous agents interacting in an environment.
2. Game theory models strategic choices when agents' rewards depend on one another: dominant strategies, Nash equilibrium, and the Prisoner's Dilemma.
3. Repeated interaction and tit-for-tat explain how cooperation can arise despite individual self-interest.
4. Auctions, negotiation, and the Contract Net Protocol are practical mechanisms agents use to allocate tasks and resources.
5. Communication lets agents exchange the information and commitments needed to use those mechanisms.

## Short exam-answer pattern

For a question about any MAS mechanism, use this order:

1. Define it precisely.
2. State the MAS problem it solves: competition, cooperation, communication, or allocation.
3. Explain how agents use it.
4. Give a concrete example.
5. State one benefit and one limitation where relevant.

Example: “An auction is a decentralised resource-allocation mechanism in which agents submit bids based on private valuations. In a delivery MAS, vehicles can bid for delivery jobs according to distance and capacity. This avoids a central controller needing all information, but strategic bidding may lead to inefficient outcomes.”
