# DeleGate: Intent-Aware Authorization & Zero-Trust Runtime Enforcement Layer

> **"Delegating a task does not mean delegating unlimited authority."**  
> *Developed by **Team Cyphora** for **CyberForge Hackathon by Mitigata***

---

## 🛡️ Executive Summary

**DeleGate** is an intent-aware authorization and zero-trust runtime enforcement layer that prevents autonomous multi-agent AI systems (MCP, LangGraph, CrewAI, AutoGen) from exceeding the authority granted by the original user prompt.

Operating as an inline microsecond proxy (`<10ms`, benchmarked at **2.14ms**), DeleGate compiles root user prompts into an immutable, cryptographically signed (`Ed25519-SHA256`) **Task Contract** spanning 6 linked stages. It deterministically clamps multi-hop tool execution to root human intent, eliminating the lateral privilege drift that completely bypasses legacy EDRs and firewalls.

---

## ⚡ The Delegation Blind Spot in Multi-Agent AI

In modern agentic architectures, tasks are routinely chained across multiple hops:
```
[User: "Summarize bug in ticket #204"]
       │
       ▼
[Agent A: Orchestrator / Triage Master]
       │ (Unbounded Delegation)
       ▼
[Agent B: Worker / Ingestion Node] ──► Ingests Ticket #204 with Indirect Prompt Injection (OWASP LLM01)
       │
       ▼
[Hijacked Agent B attempts: execute_sql("DROP TABLE user_cache;")]
```

### Why Legacy Defenses Fail:
1. **EDRs (CrowdStrike, SentinelOne):** Monitor host OS processes and kernel syscalls. Tool calls execute inside legitimate Python / Node runtimes using valid developer credentials. EDRs are completely blind to LLM reasoning drift.
2. **GenAI Guardrails (NeMo, Llama Guard):** Filter prompt strings at the initial ingress/egress token boundary. They are blind to multi-hop agent-to-agent delegation and data-injected payloads.
3. **Static API Gateways (Kong, Apigee):** Rely on long-lived OAuth tokens and static role permissions, incapable of understanding ephemeral task intent or dynamically restricting parameter bounds.

**Enterprise Blast Radius:** Production database wipes • Unrestricted IP/credential exfiltration • Cascading business-interruption losses.

---

## 📐 The 6-Stage Task Contract Architecture

DeleGate translates human intent into an immutable policy boundary across 6 linked stages:

| Stage | Name | Enforcement Mechanism | Deterministic Guarantee |
| :---: | :--- | :--- | :--- |
| **01** | **Allowed Actions** | Kernel-level tool capability whitelist mask | Only declared tools can be dispatched; default deny on all others |
| **02** | **Resources** | Path, URI, and entity pattern matching | Restricts access to rows, files, and tickets named in root intent |
| **03** | **Data Scope** | Payload schema & parameter validation | Enforces read-only flags, maximum record limits, and DPDP purpose bounds |
| **04** | **Destinations** | Inline network socket firewall | Closes unauthorized external sockets and aborts data egress in <1ms |
| **05** | **Expiry (TTL)** | Ephemeral session countdown | Automatically self-destructs contract; prevents zombie agent tasks |
| **06** | **Approvals** | Tri-state gate (Allow / Deny / Approve) | Pauses pipeline for cryptographic operator sign-off on destructive mutations |

---

## 🕹️ Interactive Privilege Drift Simulator

The application features a split-screen interactive demo console:
- **Left Console (Execution Controller):**
  - **Preset 1: Benign Ticket Triage** (`read_ticket(204)` authorized in 2.12ms)
  - **Preset 2: Indirect SQL Injection (OWASP LLM01)** (`DROP TABLE user_cache;` intercepted and aborted in 2.14ms)
  - **Preset 3: Unauthorized Exfiltration** (Out-of-contract C2 socket transmission terminated in 1.89ms)
  - **Preset 4: High-Impact Mutation Gate** (Interactive Stage 6 operator sign-off with *Sign & Authorize* vs *Reject*)
  - Step Scrubber & Auto-Run controller
- **Right Console (Gateway Inspector):**
  - Live syntax-highlighted Task Contract JSON viewer
  - Real-time 5-point validation checklist
  - Glowing verdict banner with sub-10ms latency metrics and mitigation blast radius analysis

---

## 🔒 The 5 Deterministic Runtime Invariants

1. **Inherit Restrictions:** Downstream agents strictly inherit parental constraints; authority never expands.
2. **Least Privilege at the Boundary:** Binary capability check evaluated in <10ms without slow LLM re-prompting loops.
3. **Tri-State Execution Decisions:** Evaluates calls strictly into `ALLOW`, `DENY`, or `REQUIRE HUMAN APPROVAL`.
4. **Cross-Vendor Protocol Translation:** Maps a unified contract across MCP, LangGraph, AutoGen, CrewAI, and REST/gRPC.
5. **Cryptographic Chain Auditability:** Immutable Merkle tree recording the entire delegation tree and policy reasoning with Ed25519 signatures.

---

## 💼 Strategic Synergy & Value for Mitigata

1. **India DPDP Act 2023 (Section 6) & OWASP Mitigation:**
   - Programmatically enforces Purpose Limitation; stops downstream agents repurposing or leaking personal identifiers.
   - Comprehensive defense against OWASP LLM01 (Prompt Injection) & LLM06 (Excessive Agency).
2. **IRDAI Cyber Insurance Loss-Ratio Containment:**
   - Directly protects Mitigata's underwritten enterprise portfolios by eliminating business-interruption claims driven by rogue AI tool actions.
3. **High-Margin ARR & Gordon AI SOC Enrichment:**
   - Designed as an enterprise B2B SaaS module priced at **₹1,500/developer/month** at **80%+ gross margin**.
   - Streams novel "Privilege Drift" threat telemetry directly into Mitigata's proprietary **Gordon AI SOC** platform.

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation & Launch
```bash
# Clone or navigate to the repository
cd DeleGate

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000/` in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 👥 Authors & Attribution
- **Team Cyphora**
- Developed for **CyberForge Hackathon by Mitigata**
- *Core Principle: “Delegating a task does not mean delegating unlimited authority.”*
