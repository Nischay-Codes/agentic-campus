# Agentic-Campus: Safety-Constrained Autonomous Infrastructure Remediation

[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Load--Bearing-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com)
[![Gemini 2.0](https://img.shields.io/badge/Gemini_2.0-Function_Calling-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Cloud Run](https://img.shields.io/badge/Cloud_Run-Serverless-34A853?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/run)
[![Hackathon Submission](https://img.shields.io/badge/GeeksforGeeks-Hack_Sprint_2026-008A00?style=for-the-badge)](https://geeksforgeeks.org)

> **GeeksforGeeks x Google Cloud Hack Sprint Submission**  
> **Track:** Open Innovation / Smart Campus  
> **Target Institution:** Shri Shankaracharya Technical Campus, Bhilai  

---

## 📌 Problem Statement

Campus web portals, grading microservices, and student enrollment systems regularly experience unexpected outages (HTTP 500 crashes, bad revision deployments, connection pool locks, or silent white-screen renders) during peak registration windows.

Current monitoring tools only send alerts—they do **not** repair infrastructure. Manual IT debugging takes time, causing student delays. **Agentic-Campus** bridges this gap by deploying an autonomous, safety-constrained closed-loop agent that executes a **Detect → Plan → Safety Policy Gate → Act → Verify → Memory** lifecycle to remediate failures in a simulated sandbox.

---

## ⚡ 5-Line Quick Setup

```bash
# 1. Clone repository
git clone https://github.com/nischay/agentic-campus.git
cd agentic-campus

# 2. Install dependencies & run backend
pip install fastapi uvicorn requests pydantic google-genai beautifulsoup4
python3 -m uvicorn backend.app:app --port 8000 --host 0.0.0.0
# Open http://localhost:8000/docs for API docs or http://localhost:8080 for UI
```

---

## 🛠️ Google Cloud Stack (Load-Bearing Architecture)

- **Gemini 2.0 API (`google-genai` SDK)**: Core reasoning engine utilizing typed **Function Calling** to select remediation tools (`rollback_revision`, `restart_service`, `scale_service`) and **Multimodal Vision** for screenshot UI verification.
- **Google Cloud Run**: Serverless container execution platform hosting target microservices and executing immutable revision traffic rollbacks.
- **Firebase Realtime Database**: Real-time event bus streaming agent thoughts, policy decisions, and incident states to the dashboard.
- **Google BigQuery**: Verified incident memory store (`BigQueryIncidentMemory`) that archives past successful resolutions for similarity lookup.

---

## 🔄 Closed-Loop Remediation Lifecycle

```
[OUTAGE DETECTED] ──> 1. PLAN (Gemini 2.0 Tool Selection)
                            │
                            ▼
                      2. POLICY GATE (Deterministic Safety Check)
                            │
                            ▼
                      3. ACT (Cloud Run Revision Rollback)
                            │
                            ▼
                      4. VERIFY (Visual DOM & Screenshot Assertions)
                            │
                            ▼
                      5. MEMORY (Store Verified Resolution in BigQuery)
```

---

## 📊 Measured Sandbox Performance Metrics

Across simulated fault injection runs, Agentic-Campus measured the following sandbox execution breakdown:

- **Detection Latency:** ~0.002s (DOM & HTTP check)
- **Policy Gate Check:** ~0.001s (Deterministic whitelist validation)
- **Verification Check:** ~0.003s (DOM assertion inspection)
- **Total Measured Sandbox MTTR:** **~1.8s - 3.2s** *(Includes network & rendering overhead)*

---

## 📜 Submission Deliverables

- **Working Prototype:** Interactive FastAPI Backend + Glassmorphic Command Center Dashboard (`http://localhost:8080`).
- **8-Slide Pitch Deck:** Available in `presentation_deck.md` or as exported PDF.
- **90-Second Demo Video Script:** Rehearsed backup video walkthrough in `presentation_deck.md`.
# agentic-campus
