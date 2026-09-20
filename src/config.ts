import * as dotenv from 'dotenv';
dotenv.config();

export const GUARDRAIL_CONFIG = {
  // Max value allow per transaction (in native token or USD equivalent)
  MAX_PER_TX_LIMIT: 50.0, 
  
  // Total daily budget cap for the autonomous agent
  DAILY_BUDGET_CAP: 200.0,
  
  // Whitelisted destination addresses (e.g., Lendora Pool or SVP Native DEX)
  WHITELISTED_CONTRACTS: [
    "0xLendoraMoneyMarketContractAddress111111", 
    "0xSVPChainNativeCLOBDEXContractAddress222"
  ],
  
  // Discord or Telegram Webhook for real-time risk alerts
  EMERGENCY_WEBHOOK_URL: process.env.EMERGENCY_WEBHOOK_URL || ""
};
