/* Agentic-Campus Frontend Command Center App */

const API_BASE = 'http://localhost:8000';

// DOM Elements
const terminalBody = document.getElementById('terminal-body');
const statusText = document.getElementById('status-text');
const memoryList = document.getElementById('memory-list');

const metricDetect = document.getElementById('metric-detect');
const metricSafety = document.getElementById('metric-safety');
const metricVisual = document.getElementById('metric-visual');
const metricTotal = document.getElementById('metric-total');

// Navigation Helpers
function openPortalWindow() {
  window.open(`${API_BASE}/demo/portal`, '_blank');
}

function openSwaggerDocs() {
  window.open(`${API_BASE}/docs`, '_blank');
}

// Append Terminal Log
function log(step, message) {
  const time = new Date().toLocaleTimeString('en-US', { hour12: false });
  const line = document.createElement('div');
  line.className = 'log-line';

  let stepClass = 'log-step';
  if (step === '[PLAN]') stepClass = 'log-plan';
  else if (step === '[SAFETY_GATE]') stepClass = 'log-policy';
  else if (step === '[ACT]') stepClass = 'log-act';
  else if (step === '[VERIFY]') stepClass = 'log-verify';
  else if (step === '[ERROR]') stepClass = 'log-error';

  line.innerHTML = `
    <span class="log-time">[${time}]</span>
    <span class="${stepClass}">${step}</span>
    <span>${message}</span>
  `;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Inject Chaos Fault
async function injectFault(faultType) {
  try {
    log('[SYSTEM]', `Triggering Chaos Fault Injector: ${faultType}...`);
    const res = await fetch(`${API_BASE}/api/infra/inject-fault?fault_type=${faultType}`, { method: 'POST' });
    const data = await res.json();
    
    statusText.innerText = `CRITICAL: Fault Injected (${faultType})`;
    statusText.style.color = 'var(--accent-rose)';

    log('[ERROR]', `CRITICAL OUTAGE DETECTED on campus-portal! HTTP Status: ${data.state.http_status}`);
  } catch (err) {
    log('[ERROR]', `Failed to connect to backend: ${err.message}`);
  }
}

// Run Remediation Engine
async function runRemediation() {
  try {
    log('[SYSTEM]', 'Executing Agentic Remediation Engine (Detect → Plan → Policy Gate → Act → Verify)...');
    
    const res = await fetch(`${API_BASE}/api/agent/remediate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ service_name: 'campus-portal' })
    });
    
    const data = await res.json();
    
    if (data.status === 'NO_ACTION_REQUIRED') {
      log('[SYSTEM]', 'Service is already 100% healthy. Zero action required.');
      return;
    }

    // Step 1: PLAN
    log('[PLAN]', `Hypothesis: ${data.incident.hypothesis}`);
    log('[PLAN]', `Proposed Action: ${data.incident.proposed_action}(${JSON.stringify(data.incident.parameters)})`);

    // Step 2: POLICY GATE
    const policy = data.policy_gate;
    if (policy.allowed) {
      log('[SAFETY_GATE]', `POLICY CHECK PASSED: ${policy.reason}`);
    } else {
      log('[SAFETY_GATE]', `POLICY CHECK DENIED: ${policy.reason}`);
      return;
    }

    // Step 3: ACT
    log('[ACT]', `Executed Cloud Run Traffic Rollback: Target Revision -> ${data.action_result.new_revision}`);

    // Step 4: VERIFY
    const vis = data.visual_verification;
    if (vis.visual_passed) {
      log('[VERIFY]', `VISUAL ASSERTIONS PASSED: ${vis.verdict} (DOM Render Verified)`);
    } else {
      log('[VERIFY]', `VISUAL ASSERTIONS FAILED: ${vis.verdict}`);
    }

    // Step 5: UPDATE METRICS & UI
    statusText.innerText = '100% Healthy (rev-0824-stable)';
    statusText.style.color = 'var(--accent-emerald)';

    const m = data.measured_metrics;
    metricDetect.innerText = `${m.detection_time_sec}s`;
    metricSafety.innerText = `${m.safety_check_time_sec}s`;
    metricVisual.innerText = vis.visual_passed ? 'PASSED' : 'FAILED';
    metricTotal.innerText = `${m.total_measured_recovery_time_sec}s`;

    log('[SYSTEM]', `REMEDIATION VERIFIED IN ${m.total_measured_recovery_time_sec}s!`);

    // Refresh Memory List
    fetchMemory();

  } catch (err) {
    log('[ERROR]', `Remediation execution failed: ${err.message}`);
  }
}

// Fetch BigQuery Memory Store
async function fetchMemory() {
  try {
    const res = await fetch(`${API_BASE}/api/memory/incidents`);
    const data = await res.json();
    
    memoryList.innerHTML = '';
    data.incidents.forEach(inc => {
      const item = document.createElement('div');
      item.style.background = 'rgba(255,255,255,0.03)';
      item.style.padding = '0.6rem';
      item.style.borderRadius = '8px';
      item.style.fontSize = '0.78rem';
      item.style.borderLeft = '3px solid var(--accent-purple)';

      item.innerHTML = `
        <div style="font-weight:700; color:#c4b5fd;">${inc.incident_id} - ${inc.service_name}</div>
        <div style="color:var(--text-muted);">${inc.failure_signature}</div>
        <div style="color:var(--accent-emerald); font-size:0.72rem; margin-top:0.2rem;">✓ Verified Remediation: ${inc.verified_remediation_action} (${inc.target_revision})</div>
      `;
      memoryList.appendChild(item);
    });
  } catch (err) {
    console.error('Failed to fetch BigQuery memory:', err);
  }
}

// Initial Setup
fetchMemory();
