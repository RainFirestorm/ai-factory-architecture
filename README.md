# AI Factory Blueprint

**Animated, interactive architecture diagrams for a production AI Factory** — four Chief Architect perspectives built as diagram-as-code artifacts. No frameworks, no build step. Pure HTML, SVG, and JavaScript.

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=flat-square&logo=github)](https://rainfirestorm.github.io/ai-factory-architecture/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Diagrams](https://img.shields.io/badge/Diagrams-4-purple?style=flat-square)]()

---

## Live Demo

**[rainfirestorm.github.io/ai-factory-architecture](https://rainfirestorm.github.io/ai-factory-architecture/)**

---

## What This Is

A set of production-grade, interactive architecture diagrams covering a Claude + Databricks multi-agent AI Factory platform. Each diagram is built entirely in HTML/SVG/JS — no Mermaid, no D3, no React — and ships as a single self-contained file.

The four diagrams represent the perspectives of each Chief Architect role:

| Diagram | Audience | Covers |
|---|---|---|
| [Technical Architecture](01-technical.html) | CTO / Platform Engineering | Kubernetes, CDN/Edge, API Gateways, Vault, Databricks, Delta Lake, DR |
| [Application Architecture](02-application.html) | Chief Application Architect | Claude Orchestrator, multi-agent dispatch, tool invocation, response pipeline |
| [Data Architecture](03-data.html) | Chief Data Officer | Bronze/Silver/Gold medallion, Kafka ingestion, Feature Store, MLflow, RAG/Vector |
| [Business Architecture](04-business.html) | Chief Business Architect | Business capabilities, AI engine, KPIs, measured outcomes |

---

## Features

- **Animated data particles** — live flow dots traverse every edge using SVG `animateMotion` with cubic-bezier easing
- **Collapsible navigator pane** — slides in from the left; sections match architecture layers; live search filters in real time
- **Interactive node selection** — click any node to highlight its direct connections and dim everything else
- **Rich detail panels** — every node has: purpose description, technology stack chips, SLA metric cards, architectural pattern callout, connected components map, and risk & mitigation notes
- **Per-role theming** — blue (Technical), purple (Application), green (Data), amber (Business)
- **DevOps / CI·CD panel** — Technical diagram includes a full CI/CD pipeline expansion (GitHub Actions → ArgoCD GitOps)
- **Zero dependencies** — no npm, no bundler, no CDN imports; open the HTML file and it works

---

## Platform Overview

The AI Factory this diagrams represents is built on three core pillars:

```
Claude (Anthropic)          Databricks                  Multi-Agent Systems
─────────────────          ──────────                  ───────────────────
LLM Orchestration     ●    Delta Lake (Bronze/Silver/Gold)    ●    Specialist Agents
Tool Use / Planning        Spark ETL + Feature Store              Coordinator Pattern
claude-opus-4 (synthesis)  MLflow Model Registry               Confidence-weighted merge
RAG + Semantic Search      AutoML + Custom Training            Structured output validation
```

---

## Architecture Highlights

### Technical Layer
- Multi-region Kubernetes across US-East / US-West with 3 availability zones
- CloudFront CDN + WAF at the edge; dual API Gateway zones with rate limiting
- HashiCorp Vault with Vault Agent sidecar injection — zero static credentials
- Databricks workspace (64 CPUs, 256 GB) wired to Delta Lake (30 TB, ACID, Time Travel)
- Prometheus/Grafana observability; US-West DR with 15-min RPO

### Application Layer
- User request → Claude parse/plan → Decide → Dispatch → 3 specialist agents → Coordinator synthesis
- `<500ms P99` synthesis latency; `>98%` response coherence rate
- Kafka result queue + Redis hot-feature cache + distributed state store (KV / Workflow)

### Data Layer
- Kafka 3.x (Confluent Cloud) at 100K+ msg/s with Schema Registry (Avro)
- Medallion architecture: Bronze (raw, immutable) → Silver (validated, cleaned) → Gold (business aggregates)
- Feature Store (online + offline + point-in-time correct) feeding real-time ML inference
- Vector DB / FAISS + Embedding Service powering Search / RAG

### Business Layer
- 5 capabilities: Customer Intelligence, Product Analytics, Risk Management, Ops Optimization
- Live KPIs: `<500ms P99`, `5,000 req/s`, `99.9% uptime`, `~$5K/mo infra cost`, `3–20 pods auto-scale`, `<1 min RPO`
- Measurable outcomes: Revenue Growth (+12% CTR proven), Risk Reduction (<200ms fraud detect), Platform Scale (1M+ users, cloud-native)

---

## File Structure

```
ai-factory-architecture/
├── index.html              # Landing page — links to all four diagrams
├── 01-technical.html       # CTO / Infrastructure view
├── 02-application.html     # Chief Application Architect view
├── 03-data.html            # Chief Data Officer view
├── 04-business.html        # Chief Business Architect view
├── _engine.js              # Shared rendering engine reference (each HTML is self-contained)
├── .github/
│   ├── workflows/
│   │   └── pages.yml       # GitHub Pages deployment
│   └── ISSUE_TEMPLATE/
│       └── diagram-feedback.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

## Running Locally

```bash
git clone https://github.com/RainFirestorm/ai-factory-architecture.git
cd ai-factory-architecture

# Any static file server works — no build step needed
python3 -m http.server 8080
# → open http://localhost:8080
```

Or just open `index.html` directly in a browser.

---

## Design Decisions

**Why no framework?**
Each diagram ships as a single HTML file. A hiring manager, client, or stakeholder can download one file and open it — no npm install, no API key, no network dependency.

**Why SVG over Canvas?**
SVG elements are DOM nodes — they're queryable, styleable, and event-driven. This enables the click-to-select interaction and connection highlighting without a separate scene graph.

**Why self-contained rather than shared engine?**
Each diagram is a deployment artifact. Treating them as independent files means each can be shared, embedded, or versioned individually without breaking the others.

---

## About

Built as a portfolio of architecture thinking for **Chief Data Officer, AI Director, and Analytics Leadership** roles. The diagrams represent the kind of cross-functional systems design work that sits at the intersection of data engineering, AI/ML infrastructure, and business strategy.

Each node in every diagram reflects real production patterns — not toy examples.

---

## License

[MIT](LICENSE) — use freely, attribution appreciated.
