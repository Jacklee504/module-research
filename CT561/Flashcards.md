# CT561 Quick-Recall Flashcards

Short prompts for rapid memory refresh. Use [most_asked.html](most_asked.html) for full paper wording, diagrams, workings and mark-level detail. Every Evidence cell names the relevant paper and question/subpart.

## 1. Graphical Integration and Stock Behaviour

| Front | Back | Evidence |
|---|---|---|
| Stock and net-flow equations? | `NF = Inflow - Outflow`; `Stock = INTEG(NF, Initial Stock)`. NF: stock/time; Stock: stock. | 2023/24 Q4(a); 2024/25 Q4(a); 2025/26 Q1(a) |
| Graphical integration rule? | `Delta Stock = ((NF_start + NF_end)/2) x Delta t` on a linear interval. Add signed area to the previous stock. | 2023/24 Q4(a); 2024/25 Q4(a); 2025/26 Q1(a) |
| Read a stock from net flow? | `NF > 0`: rising; `NF < 0`: falling. A + to - crossing is a stock maximum; a - to + crossing is a minimum. | 2023/24 Q4(a); 2024/25 Q4(a); 2025/26 Q1(a) |
| Infer one-stock feedback from behaviour? | Accelerating growth: reinforcing, e.g. `Inflow = k x Stock`. Approach to a limit: balancing, e.g. goal seeking/carrying capacity. | 2023/24 Q1(a) |

## 2. Euler Integration and Error

| Front | Back | Evidence |
|---|---|---|
| Forward Euler formula and assumption? | `S(t+DT) = S(t) + NF(t) x DT`. Use start-of-step NF; treat it as constant over a sufficiently small DT. | 2023/24 Q4(b); 2024/25 Q4(b); 2025/26 Q1(b) |
| Euler error direction for linear NF? | Falling NF: forward Euler overestimates. Rising NF: forward Euler underestimates. | 2023/24 Q4(b); 2024/25 Q4(b); 2025/26 Q1(b) |
| Euler table routine? | For each DT: write `t`, `NF(t)`, `NF x DT`, then `next S = current S + change`. | 2023/24 Q4(c); 2024/25 Q4(c); 2025/26 Q1(c) |

## 3. Feedback Principles

| Front | Back | Evidence |
|---|---|---|
| Link and loop polarity? | `+` link: cause and effect move together; `-` link: opposite. Odd negative links = balancing; even = reinforcing. | 2024/25 Q1(a,c); 2025/26 Q3(a,c) |
| Reinforcing vs balancing? | Reinforcing amplifies change. Balancing opposes change or closes a gap. Confirm with an increase-trace. | 2024/25 Q1(a,c); 2025/26 Q3(a,c) |
| Why model feedback? | It explains behaviour, delays, side-effects and policy resistance; rates are not independent inputs. | 2024/25 Q1(a) |

## 4. Workload Models and Policy Loops

| Front | Back | Evidence |
|---|---|---|
| Backlog stock equation? | `Backlog = INTEG(New Work + Rework - Completed, Initial Backlog)`. Pressure, fatigue and workweek are auxiliaries. | 2023/24 Q1(b); 2024/25 Q1(b); 2025/26 Q3(b) |
| Standard capacity loop? | `Backlog + -> Pressure + -> Capacity/effort + -> Completed + -> Backlog -`: one negative link, so balancing. | 2023/24 Q1(c); 2024/25 Q1(c); 2025/26 Q3(c) |
| Common reinforcing side-effects? | Rework: less Time per Task -> more Rework. Fatigue: more Workweek -> more Fatigue -> less Completed. Claims model: more Temporary Staff -> more Time per Claim -> less Completed. Each closes a reinforcing backlog loop. | 2023/24 Q1(c); 2024/25 Q1(c); 2025/26 Q3(c) |
| Policy-discussion trigger? | Name the balancing benefit, delayed reinforcing side-effects and affected outcome; test backlog, completion, rework, fatigue and capacity together. | 2024/25 Q1(c); 2025/26 Q3(c) |

## 5. Fractional Rates, Goals and Smoothing

| Front | Back | Evidence |
|---|---|---|
| Fractional increase/decrease? | `Flow = Stock x Fractional Rate`; rate units are `1/time`. Constant positive increase gives exponential growth; constant decrease gives exponential decay. | 2024/25 Q2(a) |
| Goal seeking and smoothing? | `Adjustment = (Goal - Actual)/AT`; `Smoothed = INTEG((Input - Smoothed)/AT, Initial Smoothed)`. Larger AT = slower response. | 2023/24 Q2(a); 2024/25 Q2(a) |
| Varying decrease fraction? | `G = INTEG((G* - G)/AT, G0)`; `Outflow = Stock x G`. The rate, not only the stock, is goal seeking. | 2025/26 Q2(a) |

## 6. Stock Management and Workforce Models

| Front | Back | Evidence |
|---|---|---|
| Stock-management anchor vs adjustment? | Anchor replaces expected loss: `Expected Losses = SMOOTH(Actual Losses, EAT)`. Adjustment closes gap: `(Desired - Actual)/AT`. `Required Inflow = Expected Losses + Adjustment`. | 2023/24 Q2(b); 2024/25 Q2(b); 2025/26 Q4(b) |
| Desired University staff and target shock? | `Desired Staff = Students / Desired Student-Staff Ratio`. At 10,000 students, ratio 20 -> 500; ratio 10 -> 1,000. Lower ratio means more staff required. | 2024/25 Q2(c) |
| Core University staff model? | `Staff = INTEG(Hires - Quits, Staff0)`; `Quits = Quit Fraction x Staff`; `Hires = Expected Quits + (Desired Staff - Staff)/Staff AT`. | 2024/25 Q2(c) |
| Three-stage workforce chain? | `Trainees -> Experienced -> Seniors`; each stage has attrition. `Progress = stock/delay`; `Total Staff = T + E + S`. | 2025/26 Q4(c) |
| What if the staff target falls and there is no dismissal flow? | Adjustment becomes negative; constrain hires to zero. Staff then falls through attrition, so delays determine reduction speed. | 2025/26 Q4(d) |

## 7. SIR Core Equations and Proofs

| Front | Back | Evidence |
|---|---|---|
| Core frequency-dependent SIR? | `lambda = beta I/N`; `Infections = lambda S`; `Recoveries = I/D`; `S=INTEG(-Infections,S0)`, `I=INTEG(Infections-Recoveries,I0)`, `R=INTEG(Recoveries,R0)`. | 2023/24 Q3(a); 2024/25 Q3(b); 2025/26 Q2(b) |
| Contact notation and reproduction numbers? | `beta = c i`; `R0 = beta d = c i d`; `Re = R0(S/N)`. Infection grows when `Re > 1`. | 2023/24 Q3(a); 2024/25 Q3(a) |
| Force of infection: formula and units? | `lambda = beta I/N`, in `1/time`: risk per susceptible per time. Total infection flow is `lambda x S`, in people/time. | 2024/25 Q3(a) |
| Herd-immunity threshold? | `HIT = 1 - 1/R0`. For `R0 = 12`, HIT = `11/12 = 91.7%`. | 2024/25 Q3(a) |
| Threshold and peak proof triggers? | With `S=N`, growth threshold is `R0=1` (`c i d=1`). At an I peak set `dI/dt=0`, giving `S/N=1/R0`. | 2023/24 Q3(a); 2018/19 Q3(c) |

## 8. SIR Policies and Extensions

| Front | Back | Evidence |
|---|---|---|
| Standard SIR loops? | Contagion is reinforcing: `I -> Infections -> I`. Depletion and recovery are balancing: infections reduce S; recoveries reduce I. | 2018/19 Q3(b); 2024/25 Q3(b); 2025/26 Q2(b) |
| Quarantine: 2024/25 vs 2025/26? | 2024/25: move a flagged fraction from I to Q. 2025/26: split infection flow, `To Q=QF x lambda x S`, `To I=(1-QF) x lambda x S`; Q does not transmit. | 2024/25 Q3(b); 2025/26 Q2(b) |
| Vaccination, attack rate and policy plot? | Vaccination flow is `Vaccination Fraction x S` from S to Vaccinated. `Attack Rate=(I+Q+R)/N`. Bubble plot: x=quarantine, y=vaccination, size=attack rate; largest at low/low. | 2025/26 Q2(b,c) |
| Cohort extension? | Replicate states by group, e.g. `Sy,Iy,Ry` and `Se,Ie,Re`, then use within/between-group contacts or a contact matrix. | 2024/25 Q3(c) |
| SEI2H2R memory chain? | `S -> E -> Ia/Is`; Ia recovers, Is recovers or enters hospital; hospital is a second-order delay. Ia has 50% of Is infectiousness. | 2023/24 Q3(b) |
| Control flag? | A `0/1` parameter that switches a policy pathway off/on, usually by multiplying the relevant flow or fraction. | 2024/25 Q3(b) |

## 9. Legacy and Supporting Constructions

| Front | Back | Evidence |
|---|---|---|
| Resource-constrained vaccination? | `Capacity = Medics x Productivity`; `Dispensed = MIN(Unvaccinated, Available Vaccines, Capacity)`. | 2016/17 Q3(b); 2017/18 Q3(c); 2021/22 Q2(b) |
| Effects function? | Normalise input, use a dimensionless lookup multiplier, then multiply by the reference rate: `Rate = Reference Rate x Effect(normalised input)`. | 2016/17 Q4(a,b); 2018/19 Q4(b); 2019/20 Q3(b,c) |
| Little's Law? | `Average Stock = Average Throughput x Average Delay`; use compatible steady-state averages. | 2017/18 Q4(a,b); 2018/19 Q1(c) |
| Convert `dS/dt = t`, `S(0)=0`? | Stock-flow: `S=INTEG(t,0)`. Analytical check: `S=t^2/2`; `S(20)=200`. | 2017/18 Q2(a) |
| Logistic decline and doubling time? | `dP/dt=rP(1-P/C)-sP`. For constant net fractional growth `g`, doubling time is `ln(2)/g`. | 2021/22 Q2(a,c) |

## Scope

This is a 38-card quick-recall deck. It deliberately combines related facts and omits full worked examples, diagrams and one-off drafting instructions; those remain in [most_asked.html](most_asked.html).
