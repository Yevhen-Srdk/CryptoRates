export const PairsUrls = {
  BTC_USDT: "btcusdt@aggTrade",
  BNB_USDT: "bnbusdt@aggTrade",
  XRP_USDT: "xrpusdt@aggTrade",
  SOL_USDT: "solusdt@aggTrade",
  ETH_USDT: "ethusdt@aggTrade",
} as const;

export type PairsUrls = (typeof PairsUrls)[keyof typeof PairsUrls];