# Agentic-Campus: 8-Slide Pitch Deck Content (Judge-Safe Edition)

This document contains the exact slide-by-slide copy for your PowerPoint/PDF presentation (following Slide 16 of the hackathon guidelines) and your backup 90-second video demo script.

---

## 📊 8-Slide Presentation Deck Outline

### Slide 1: Title & Pitch
- **Title:** Agentic-Campus
- **Subtitle:** Safety-Constrained Autonomous Infrastructure Remediation
- **Track:** Open Innovation / Smart Campus
- **Tagline:** Detect → Plan → Policy Gate → Act → Verify → Memory

### Slide 2: The Problem
- **Key Pain Point:** Campus web portals and microservices experience outages during peak registration windows (OOM leaks, bad revision deployments, connection pool locks).
- **Current Limitation:** Monitoring tools only send SMS/Slack alerts. Manual IT log searching and repair takes time.

### Slide 3: Why Existing Monitoring is Insufficient
- **HTTP Health $\neq$ User Experience:** Silent "White Screen of Death" renders can pass raw HTTP status checks while leaving the UI completely broken.
- **Unconstrained AI Risks:** Autonomous LLM agents require deterministic safety gates to ensure commands are non-destructive.

### Slide 4: Our Solution
- **Agentic-Campus:** A safety-constrained autonomous system that detects outages, formulates remediation plans via Gemini 2.0, evaluates actions through a Deterministic Policy Gate, executes Cloud Run rollbacks, and visually verifies UI health.

### Slide 5: How It Works (Google Cloud Stack)
- **Gemini 2.0 API:** Function Calling for tool selection + Multimodal screenshot verification.
- **Google Cloud Run:** Serverless microservice execution & immutable revision rollbacks.
- **Firebase Realtime DB:** Live incident state event bus.
- **Google BigQuery:** Verified incident memory store (`BigQueryIncidentMemory`).

### Slide 6: Live Demo (Golden Path)
- **1-Click Chaos Fault Injection:** Live demonstration of a silent "White Screen of Death" UI failure.
- **Automated Remediation:** Gemini selects `rollback_revision()`, Policy Gate approves, Cloud Run shifts traffic, and DOM assertions confirm 100% UI recovery.

### Slide 7: Measured Sandbox Metrics
- **Policy Gate Latency:** <0.001s (Deterministic whitelist evaluation).
- **Measured Sandbox Recovery Time:** ~1.8s to 3.2s total end-to-end recovery in our test sandbox.
- **Visual Assertion Verification:** 100% DOM element verification before incident closure.

### Slide 8: Research & Future Expansion
- **Verified Incident Memory:** Retrieving past verified resolutions from BigQuery vector memory while maintaining mandatory Policy Gate checks.
- **Expansion:** Multi-region Cloud Run failover & campus IoT network self-healing.

---

## 🎥 90-Second Backup Demo Video Script

- **[0:00 - 0:20] The Hook:**  
  *"Campus portals regularly experience outages during registration. But HTTP 200 status codes often mask silent 'White Screen of Death' renders, leaving IT teams blind while users suffer."*

- **[0:20 - 0:40] The Turn:**  
  *"We built Agentic-Campus on Google Cloud. It combines Gemini 2.0 Function Calling, a Deterministic Policy Gate, Cloud Run revision rollbacks, and visual DOM verification."*

- **[0:40 - 1:15] The Demo:**  
  *"Watch what happens when we inject a silent White Screen failure live. Gemini formulates a Plan, our Policy Gate validates safety, Cloud Run executes a revision rollback, and visual DOM assertions confirm page restoration."*

- **[1:15 - 1:30] The Close:**  
  *"Agentic-Campus brings safe, policy-gated infrastructure remediation to Google Cloud. Thank you!"*
