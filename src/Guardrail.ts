import { GUARDRAIL_CONFIG } from './config';
import axios from 'axios';

export interface SVPTransaction {
  to: string;
  value: number; // Token amount
  data: string;  // Smart contract payload
  agentId: string;
}

export class SVPGuardrail {
  private dailySpentToday: number = 0;
  private lastResetTimestamp: number = Date.now();

  constructor() {
    this.resetDailyTracker();
  }

  // 24 ghante baad daily spending budget ko reset karne ke liye
  private resetDailyTracker() {
    const hours24 = 24 * 60 * 60 * 1000;
    setInterval(() => {
      this.dailySpentToday = 0;
      this.lastResetTimestamp = Date.now();
      console.log("[GUARDRAIL] Daily spending metrics refreshed safely.");
    }, hours24);
  }

  // Real-time emergency Discord notification system
  private async triggerEmergencyAlert(reason: string, tx: SVPTransaction) {
    console.error(`🚨 CRITICAL SAFETY BREACH: ${reason}`);
    if (GUARDRAIL_CONFIG.EMERGENCY_WEBHOOK_URL) {
      try {
        await axios.post(GUARDRAIL_CONFIG.EMERGENCY_WEBHOOK_URL, {
          content: `⚠️ **SVP Chain Agent Security Breach Blocked!**\n**Agent ID:** ${tx.agentId}\n**Reason:** ${reason}\n**Target:** ${tx.to}\n**Attempted Value:** ${tx.value} SVP`
        });
      } catch (err) {
        console.error("Failed to dispatch external webhook alert:", err);
      }
    }
  }

  // Pre-execution evaluation check
  public async validateTransaction(tx: SVPTransaction): Promise<{ approved: boolean; reason?: string }> {
    // Rule 1: Individual Per-Tx Cap evaluation
    if (tx.value > GUARDRAIL_CONFIG.MAX_PER_TX_LIMIT) {
      const reason = `Transaction value (${tx.value}) exceeds the maximum threshold limit of ${GUARDRAIL_CONFIG.MAX_PER_TX_LIMIT}`;
      await this.triggerEmergencyAlert(reason, tx);
      return { approved: false, reason };
    }

    // Rule 2: Cumulative Daily Spending Cap evaluation
    if (this.dailySpentToday + tx.value > GUARDRAIL_CONFIG.DAILY_BUDGET_CAP) {
      const reason = `Accumulated daily spend would exceed total budget cap of ${GUARDRAIL_CONFIG.DAILY_BUDGET_CAP}. Current today: ${this.dailySpentToday}`;
      await this.triggerEmergencyAlert(reason, tx);
      return { approved: false, reason };
    }

    // Rule 3: Target Smart Contract Destination Whitelist check
    const isWhitelisted = GUARDRAIL_CONFIG.WHITELISTED_CONTRACTS.some(
      addr => addr.toLowerCase() === tx.to.toLowerCase()
    );
    if (!isWhitelisted) {
      const reason = `Unrecognized or malicious target contract address interaction attempted: ${tx.to}`;
      await this.triggerEmergencyAlert(reason, tx);
      return { approved: false, reason };
    }

    // Every rule passed successfully
    this.dailySpentToday += tx.value;
    return { approved: true };
  }
}
