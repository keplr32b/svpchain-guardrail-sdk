# SVP-Guardrail SDK 🛡️

An inline, zero-trust programmatic circuit breaker tailored explicitly for autonomous AI Agents acting on **SVP Chain Layer 1**. 

By decoupling reasoning from final local execution signing hooks (`svpchain-signer`), this developer SDK wraps agent tasks with critical risk monitoring guards to eliminate privilege escalation, intent exploits, or continuous loop bleedouts.

## Key Features
- **Deterministic Budget Controls:** Enforce strict programmatic caps per individual transaction or accumulated rolling 24-hour schedules.
- **Protocol Boundary Whitelisting:** Prevent agents from interacting with unauthorized smart contracts outside of verified dApps (like Lendora or native CLOB DEX).
- **Asynchronous Kill-Switch Alerts:** Instantly broadcasts structural failure anomalies directly into remote infrastructure channels (Discord Webhooks).

## How to Test Locally
1. Clone this repository and run setup installation:
   ```bash
   npm install
   ```
2. Run execution simulations using:
   ```bash
   npm run start
   ```
