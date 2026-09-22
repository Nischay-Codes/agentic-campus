# Agentic-Campus

> **A safety-constrained autonomous infrastructure agent that detects failures, reasons about remediation, executes only approved actions, verifies real application recovery, and remembers verified solutions.**

**Live Demo:** https://agentic-campus.vercel.app/
**GitHub:** https://github.com/Nischay-Codes/agentic-campus

---

## ◆ What Is Agentic-Campus?

Agentic-Campus explores how AI agents can autonomously remediate infrastructure failures **without giving the AI unrestricted control**.

The core principle is:

> **AI provides reasoning. Deterministic systems provide authority. The application provides proof of recovery.**

### Core Loop

```text
DETECT → REASON → CONSTRAIN → ACT → VERIFY → REMEMBER
```

---

## ◆ How It Works

```text
┌─────────────────────┐
│   Incident / Fault  │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Gemini AI      │
│  Reason + Diagnose  │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│    Policy Gate      │
│ Validate & Authorize│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     Cloud Run       │
│ Execute Remediation │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Browser / DOM Check │
│ Verify Real Recovery│
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      BigQuery       │
│ Verified Experience │
└─────────────────────┘
```

---

## ◆ Key Features

**◈ Constrained Autonomy**
Gemini operates through predefined tools instead of unrestricted shell access.

**◈ Deterministic Safety Gate**
Every proposed action is checked for:

* Allowed action
* Valid target
* Valid parameters
* Valid revision
* Safety constraints

**◈ Application-Level Verification**
The system doesn't assume:

```text
Command succeeded = Application recovered
```

It verifies HTTP state, DOM elements, UI content, and error states.

**◈ Verified Memory**
Only successfully executed and independently verified remediations are stored for future incidents.

---

## ◆ Example Incident

A deployment can produce:

```text
Server Running
      ↓
HTTP 200
      ↓
Frontend JavaScript Failure
      ↓
Blank / Broken UI
```

A normal health check may say **HEALTHY**, while users see a broken application.

Agentic-Campus detects the difference between:

```text
SERVER AVAILABILITY ≠ APPLICATION USABILITY
```

---

## ◆ Remediation Tools

```text
get_logs()
health_check()
rollback_revision()
restart_service()
scale_service()
```

Gemini can **propose** an operation, but the policy engine decides whether it can actually execute.

> **The model can propose an action, but it cannot grant itself permission.**

---

## ◆ Technology Stack

| Layer            | Technology                 |
| ---------------- | -------------------------- |
| ◆ Reasoning      | Gemini API                 |
| ◆ Infrastructure | Google Cloud Run           |
| ◆ Live State     | Firebase Realtime Database |
| ◆ Memory         | Google BigQuery            |
| ◆ Backend        | FastAPI                    |
| ◆ Verification   | Browser / DOM              |
| ◆ Frontend       | Web Command Center         |
| ◆ Deployment     | Vercel                     |

---

## ◆ Evaluation

The prototype can be evaluated using controlled fault injection:

* **Remediation Success Rate**
* **Safety Enforcement**
* **Failure Detection**
* **Recovery Latency**
* **Verified Memory Effect**

### Sandbox Measurements

| Metric          | Approx. Value |
| --------------- | ------------: |
| Detection       |      ~0.002 s |
| Policy Check    |      ~0.001 s |
| Verification    |      ~0.003 s |
| End-to-End MTTR |    ~1.8–3.2 s |

> These are sandbox measurements, not production guarantees.

---

## ◆ Research Contribution

Agentic-Campus combines:

```text
AI Reasoning
      +
Deterministic Authorization
      +
Real Infrastructure Execution
      +
Application-Level Verification
      +
Verified Operational Memory
```

The central research idea:

> **Autonomous does not have to mean unrestricted.**

---

## ◆ Demo Flow

1. ◆ Trigger/observe an incident
2. ◆ Gemini analyzes the failure
3. ◆ Gemini proposes remediation
4. ◆ Policy gate validates the action
5. ◆ Cloud Run executes it
6. ◆ Browser/DOM verifies recovery
7. ◆ Verified result is stored in memory

```text
INCIDENT
   ↓
REASONING
   ↓
AUTHORIZED ACTION
   ↓
INFRASTRUCTURE CHANGE
   ↓
APPLICATION VERIFICATION
   ↓
VERIFIED RECOVERY
   ↓
REUSABLE EXPERIENCE
```

---

## ◆ Security

Agentic-Campus is an experimental prototype.

Recommended safeguards include:

* Least-privilege cloud identities
* Explicitly allowed remediation tools
* No unrestricted shell access
* Target validation
* Audit logging
* Production isolation
* Human approval for high-risk operations

---

## ◆ Future Work

**◇ Multi-service dependency reasoning**
**◇ Multi-step verified remediation**
**◇ Risk-aware authorization**
**◇ Larger infrastructure failure benchmark**
**◇ Continual evaluation and learning**

---

## ◆ Links

**Live:** https://agentic-campus.vercel.app/
**Source:** https://github.com/Nischay-Codes/agentic-campus

---

### Agentic-Campus

**Detect. Reason. Constrain. Act. Verify. Learn.**
