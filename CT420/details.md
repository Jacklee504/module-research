---
code: CT420
title: Real Time Systems
status: Optional
semester: Semester 2
credits: 5
exam_weight: 70%
ca_weight: 30%
assessment: 70% exam / 30% CA
predictability: Medium-High
lecturer: Michael Schukat / Jawad Manzoor
lecturer_risk: Low
priority: Good if systems/protocols suit you
module_url: https://www.universityofgalway.ie/course-information/module/CT420
---

# CT420 - Real Time Systems

## Source Material Checked

- Past papers reviewed: 2017/18, 2018/19, 2021/22, 2022/23, 2023/24, 2024/25.
- Module page checked: https://www.universityofgalway.ie/course-information/module/CT420
- Date checked: 2026-06-11.

## Module Page Summary

- Semester: Semester 2.
- Credits: 5.
- Assessment weighting:
  - Written assessment / exam: 70%.
  - Continuous assessment: 30%.
- Module description: engineering approaches to evaluate and construct hard and soft real-time systems; time synchronisation protocols; multimedia protocols; emerging protocols including QUIC and HTTP/3.
- Stated learning outcomes:
  - Discuss and differentiate between real-time and safety-critical systems.
  - Differentiate between and practically use NTP and PTP.
  - Design and implement hard and soft real-time software systems.
  - Explain and assess the design and performance of QUIC and HTTP3.
  - Discuss soft real-time systems and multimedia protocols.
- Listed teachers/administrators: Michael Schukat, Deirdre King, Geraldine Healy, Jawad Manzoor.
- Module page says the information is valid from 2026 onwards.

## Lecturer / Personal Note

- Lecturer fit: not recorded yet.
- Lecturer/staff change risk: low.
- Current module page lists Michael Schukat, Deirdre King, Geraldine Healy, and Jawad Manzoor.
- Starred internal examiners, treated as the module lecturer on each paper:
  - 2023/24 and 2024/25: Jawad Manzoor and Michael Schukat.
  - 2018/19, 2021/22 and 2022/23: Michael Schukat.
  - 2017/18: Mohannad Alahmadi and Michael Schukat.
- The bigger risk is not staff replacement, but syllabus emphasis: recent papers and the current page put more weight on QUIC/HTTP2/HTTP3 and soft real-time web/network performance.
- Main implication: recent papers from 2023/24 and 2024/25 should be weighted more heavily than older papers.

## Predictability Rating

Medium-High. The repeated core is strong, especially in recent papers, but the module appears to have shifted over time. Older papers include a broader mix of redundancy, POSIX, RAID, Hamming codes, VoIP, RTP/RTCP and scheduling. Recent papers split more clearly into hard real-time/synchronisation topics and soft real-time/web protocol topics such as QUIC, HTTP/2 and performance analysis.

## Evidence From Past Papers

- Format varies year to year, so predict topics more than exact question order.
- Time synchronisation is the safest area: NTP, PTP, offset/delay calculations, ntpq output, boundary/transparent clocks, BMCA and logical clocks.
- Scheduling is consistently examinable: cyclic executives, overrun detection, Rate Monotonic, EDF, schedulability, WCET and loop/longest-path reasoning.
- Concurrency and priority protocols recur: priority inheritance/ceiling, deadlock, semaphores, memory locking and POSIX-style real-time concerns.
- Fault tolerance/redundancy is more historical but still worth background revision: RAID, Hamming/SEC, hardware redundancy, voters and Java exception examples.
- Recent papers increasingly favour soft real-time/web protocol material: QUIC, HTTP/2/HTTP/3, QoS, latency, jitter buffers, Wireshark/qLog/qViz and Core Web Vitals.

## Current-Syllabus Warning

The current module page is valid from 2026 onwards and explicitly mentions QUIC and HTTP/3. Older papers are still useful for core real-time systems, scheduling, NTP/PTP and fault tolerance, but recent papers from 2023/24 and 2024/25 are more representative of the current direction.

## Assessment Strategy

- This is 70% exam and 30% CA, so it is not CA-heavy but still has a meaningful CA component.
- The paper is technical and broad. It is predictable if prepared by topic blocks rather than by memorising single questions.
- Highest-value preparation areas:
  - NTP: robustness, RTD, offset, ntpq output interpretation.
  - PTP: E2E/P2P, transparent clocks, boundary clocks, hardware timestamping, BMCA, grandmaster redundancy.
  - Clock concepts: offset, skew, accuracy, stability, Berkeley algorithm, Lamport clocks, vector clocks.
  - Scheduling: Cyclic Executive, RM, EDF, utilisation, schedulability analysis, overrun detection.
  - Priority protocols: Priority Ceiling, Priority Inheritance, deadlock prevention.
  - POSIX.4: memory locking, signals, timers, nanosleep, sigqueue.
  - Soft real-time systems: latency, QoS, perceived vs intrinsic QoS, jitter buffers, VoIP/cloud gaming delay.
  - QUIC/HTTP2/HTTP3: connection establishment, multiplexing, head-of-line blocking, congestion control, analysis/debugging with Wireshark/qLog/qViz.
- Give more weight to 2023/24 and 2024/25 when deciding what to prioritise.

## Overall Judgement

CT420 is a reasonable target if systems, protocols and timing suit you. It is less cleanly repetitive than CT421 or CT4100 because the format and topic emphasis have changed, but the recent pattern is strong enough to be useful. The 30% CA is helpful, but the 70% exam means it should not be chosen purely for CA marks.

## Short Learning Material

Use Degreed/Percipio-style catalogues for short tutorials, guided projects, or video chapters. Prefer material under 3 hours per topic.

- Real-time systems fundamentals: hard vs soft real time, deadlines, latency and jitter.
- Scheduling algorithms: rate-monotonic scheduling, earliest-deadline-first and schedulability checks.
- Embedded/RTOS basics: tasks, interrupts, timers, priorities and resource sharing.
- Concurrency in real-time systems: priority inversion, mutexes, semaphores and deadlock.
- CAN bus and industrial protocols: message arbitration, timing and reliability.
- Real-time Linux/OS concepts: preemption, scheduling classes and timing measurement.
