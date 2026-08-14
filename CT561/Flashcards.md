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
| Core frequency-dependent SIR? | `λ=βI/N`; `F_inf=λS`; `F_rec=I/D`. `S=INTEG(−F_inf,S(0))`; `I=INTEG(F_inf−F_rec,I(0))`; `R=INTEG(F_rec,R(0))`. | 2023/24 Q3(a); 2024/25 Q3(b); 2025/26 Q2(b) |
| Transmission and outbreak threshold? | `β=ci`; `R₀=βd=cid`. In a fully susceptible population, an outbreak grows when `R₀>1`. | 2023/24 Q3(a); 2024/25 Q3(a) |
| Force of infection and HIT? | `λ=βI/N`, units `1/time`; `F_inf=λS`, people/time. `p_c=1−1/R₀`. | 2024/25 Q3(a) |

## 8. SIR Policies and Extensions

| Front | Back | Evidence |
|---|---|---|
| Standard SIR loops? | `I → F_inf → I`: reinforcing. `F_inf → S↓ → F_inf↓` and `I → F_rec → I↓`: balancing. | 2018/19 Q3(b); 2024/25 Q3(b); 2025/26 Q2(b) |
| Quarantine: 2024/25 vs 2025/26? | 2024/25: `I → Q`, controlled by `u∈{0,1}`. 2025/26: `F_Q=qλS`, `F_I=(1−q)λS`; Q does not transmit. | 2024/25 Q3(b); 2025/26 Q2(b) |
| Vaccination, attack rate and policy plot? | `F_vax=vS`, `S → V`; `AR=(I+Q+R)/N`. Bubble plot: `x=q`, `y=v`, size `=AR`; largest at low q,v. | 2025/26 Q2(b,c) |
| Cohort extension? | Replicate states: `(S_y,I_y,R_y)`, `(S_e,I_e,R_e)`; add within-/between-cohort contact terms or a contact matrix. | 2024/25 Q3(c) |
| SEI2H2R memory chain? | `S → E → I_a/I_s`; `I_a → R`, `I_s → R/H`. H is a second-order delay; `I_a` infectiousness `=0.5I_s`. | 2023/24 Q3(b) |

## 9. Legacy and Supporting Constructions

| Front | Back | Evidence |
|---|---|---|
| Resource-constrained vaccination? | `C=M×p`; `F_vax=min(U,V,C)`, where U=unvaccinated and V=available vaccines. | 2016/17 Q3(b); 2017/18 Q3(c); 2021/22 Q2(b) |
| Effects function? | `x*=x/x_ref`; `Rate=Rate_ref×Effect(x*)`. Effect is dimensionless. | 2016/17 Q4(a,b); 2018/19 Q4(b); 2019/20 Q3(b,c) |
| Little's Law? | `L=λW`: average stock = average throughput × average delay, at equilibrium. | 2017/18 Q4(a,b); 2018/19 Q1(c) |
| Legacy growth formulae? | `dS/dt=t`, `S(0)=0` ⇒ `S(t)=t²/2`. `dP/dt=rP(1−P/C)−sP`. Constant net fractional growth: `T₂=ln(2)/g`. | 2017/18 Q2(a); 2021/22 Q2(a,c) |

## Scope

This is a 38-card quick-recall deck. It deliberately combines related facts and omits full worked examples, diagrams and one-off drafting instructions; those remain in [most_asked.html](most_asked.html).
