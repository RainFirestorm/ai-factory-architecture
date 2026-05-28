# Security Policy

## Overview

This repository contains **static HTML/SVG/JavaScript files only** — there is no backend, no server-side execution, no database, and no user data collection. The diagrams run entirely in the browser.

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (`main`) | ✅ |

## Reporting a Vulnerability

If you discover a security issue in this project (e.g., an XSS vector in the SVG rendering, a malicious dependency, or a sensitive credential accidentally committed), please **do not open a public GitHub issue**.

Instead, report it via one of the following:

- **GitHub Security Advisories**: [Report a vulnerability](https://github.com/RainFirestorm/ai-factory-architecture/security/advisories/new)
- **Email**: Use the contact on the GitHub profile

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (if known)

You can expect an acknowledgment within **48 hours** and a resolution or status update within **7 days**.

## Scope

Since this is a static portfolio project, the primary security concerns are:

| Concern | Status |
|---------|--------|
| No eval() or innerHTML with untrusted input | ✅ All SVG elements created via `createElementNS` |
| No external script dependencies | ✅ Zero CDN imports, fully self-contained |
| No credentials or secrets in source | ✅ All architecture values are illustrative |
| No user data collected or stored | ✅ Pure client-side, no analytics, no cookies |

## Credential Notice

Any credentials, API keys, IP addresses, or connection strings shown in the architecture diagrams are **illustrative examples only**. They do not represent real infrastructure credentials and should not be treated as such.
