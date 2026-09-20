import { SVPGuardrail, SVPTransaction } from './Guardrail';

const guardrail = new SVPGuardrail();

async function simulateAgentFlow() {
  console.log("🚀 Initializing SVP Chain Guardrail Simulation Test...\n");

  // Case A: Safe Valid Transaction inside white list
  const safeTx: SVPTransaction = {
    agentId: "agent_alpha_01",
    to: "0xLendoraMoneyMarketContractAddress111111",
    value: 10,
    data: "0x095ea7b300000000000000"
  };

  // Case B: Dangerous Exploited Transaction (Malicious Address)
  const exploitTx: SVPTransaction = {
    agentId: "agent_alpha_01",
    to: "0xMaliciousHackerDrainerAddress99999",
    value: 5,
    data: "0x"
  };

  // Processing Case A
  const res1 = await guardrail.validateTransaction(safeTx);
  console.log(`Test 1 (Lendora Deposit): ${res1.approved ? "✅ APPROVED" : "❌ BLOCKED - " + res1.reason}`);

  // Processing Case B
  const res2 = await guardrail.validateTransaction(exploitTx);
  console.log(`Test 2 (Hacker Contract): ${res2.approved ? "✅ APPROVED" : "❌ BLOCKED - " + res2.reason}`);
}

simulateAgentFlow();
