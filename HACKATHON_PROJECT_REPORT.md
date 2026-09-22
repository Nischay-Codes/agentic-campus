# 🏆 Agentic-Campus: Comprehensive Project Report & Implementation Guide

**Project Title:** Agentic-Campus  
**Track:** Open Innovation / Smart & Digital Campus  
**Event:** GeeksforGeeks x Google Cloud Hack Sprint  
**Target Institution:** Shri Shankaracharya Technical Campus (SSTC), Bhilai  

---

## 1. Executive Summary & Problem Statement

Campus web portals, grading microservices, and student enrollment systems regularly experience unexpected outages (HTTP 500 crashes, bad revision deployments, connection pool locks, or silent white-screen renders) during peak enrollment and submission periods.

Current monitoring tools (e.g., Datadog, PagerDuty) are purely **passive**—they alert human engineers via SMS/Slack, leaving IT teams to manually search stacktraces and deploy fixes.

**Agentic-Campus** is an autonomous, safety-constrained closed-loop infrastructure remediation agent built on **Google Cloud**. It automates the incident lifecycle in a simulated sandbox:

$$\text{Detect} \longrightarrow \text{Plan (Gemini 2.0)} \longrightarrow \text{Policy Gate} \longrightarrow \text{Act (Cloud Run)} \longrightarrow \text{Verify (Visual DOM)} \longrightarrow \text{Memory (BigQuery)}$$

---

## 2. Technical Architecture & Google Cloud Stack (Load-Bearing)

Judges evaluate **~20% strictly on Google Cloud usage**, asking: *"Why this service, and what breaks without it?"*

```
                       ┌─────────────────────────────────────────────────────────┐
                       │             Firebase Realtime Event Bus                 │
                       │    (Streams live state logs to Command Dashboard)       │
                       └────────────────────────────┬────────────────────────────┘
                                                    │
                                                    ▼
┌───────────────────────────┐             ┌───────────────────┐             ┌───────────────────────────┐
│   Google Cloud Run        │ ──────────> │  Gemini 2.0 Flash │ <────────── │   Google BigQuery         │
│ (Hosts microservices &    │ <────────── │ (Function Calling │ ──────────> │ (Vector Search Store for  │
│  immutable revision APIs) │             │  & Multimodal)    │             │  verified past fixes)     │
└───────────────────────────┘             └───────────────────┘             └───────────────────────────┘
```

### Google Stack Justification Table

| Google Service | Role in Agentic-Campus Architecture | **What breaks without it?** |
| :--- | :--- | :--- |
| **Gemini 2.0 API (`google-genai` SDK)** | Core reasoning engine utilizing typed **Function Calling** to select remediation tools and **Multimodal Vision** for screenshot UI verification. | Without Gemini 2.0, the system cannot natively select tool schemas or perform visual DOM verification, turning the agent into a passive text generator. |
| **Google Cloud Run** | Serverless container platform hosting target campus microservices. Executes instant container scaling and revision traffic shifts. | Without Cloud Run, the agent cannot execute zero-latency container scaling or immutable revision rollbacks. |
| **Firebase Realtime DB** | Acts as the real-time event bus streaming agent thoughts, policy decisions, and incident states to the dashboard. | Without Firebase, live state sync fails over poor network connections, forcing high-latency REST polling during the presentation. |
| **Google BigQuery** | Stores historical failure signatures and verified resolution vectors (`BigQueryIncidentMemory`). | Without BigQuery, the agent cannot execute vector similarity searches over historical incidents. |

---

## 3. The 3-Phase Technical Implementation

### Phase 1: Core Agentic Loop & Policy Gate Engine (MUST HAVE MVP)
- **Typed Tool Registry (No Shell Execution!):** Defined safe, typed Python tools (`get_logs()`, `health_check()`, `rollback_revision()`, `restart_service()`, `scale_service()`).
- **Deterministic Policy Gate:** Before any action proposed by Gemini is executed, it passes through `PolicyGate.evaluate()`. It checks if the revision is immutable and marked safe in the policy manifest. Destructive primitives are mathematically blocked.

### Phase 2: Visual UI Verification Engine (BIG WOW)
- **HTTP 200 OK $\neq$ User-Visible Health:** An API endpoint might return HTTP 200 OK, but render a silent **White Screen of Death**.
- **Visual Assertions:** `VisualVerifier.inspect_rendered_page()` inspects the rendered DOM for assertions (`login_form_present`, `submit_button_present`, `no_error_banner`, `white_screen_detected`).

### Phase 3: BigQuery Verified Remediation Memory (RESEARCH LAYER)
- Stores every successfully resolved incident in BigQuery memory.
- When a similar failure occurs, `BigQueryIncidentMemory` retrieves the previous verified resolution vector.
- **Safety Constraint:** Even memory-retrieved actions **MUST STILL PASS through the Deterministic Policy Gate**.

---

## 4. Measured Sandbox Performance Metrics

During real test runs on the running system, the agent measured the following sandbox execution metrics:

- **Detection Time:** ~0.002s
- **Memory Search Time:** ~0.0001s
- **Policy Gate Check:** ~0.0001s
- **Visual DOM Verification:** ~0.0029s
- **Measured Sandbox Recovery Time:** **~1.8s - 3.2s** *(Includes network & rendering overhead)*

---

## 5. Local Setup & Execution Guide

```bash
# 1. Clone repository & navigate to directory
git clone https://github.com/nischay/agentic-campus.git
cd agentic-campus

# 2. Install dependencies
pip install fastapi uvicorn requests pydantic google-genai beautifulsoup4

# 3. Launch Backend Orchestrator (Port 8000)
python3 -m uvicorn backend.app:app --port 8000 --host 0.0.0.0

# 4. Launch Command Center UI (Port 8080)
python3 -m http.server 8080 --directory frontend
```

* **Command Center Dashboard:** `http://localhost:8080`
* **Interactive FastAPI Docs:** `http://localhost:8000/docs`
* **Simulated Campus Portal:** `http://localhost:8000/demo/portal`
