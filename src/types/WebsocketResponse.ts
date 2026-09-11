export type WebsocketResponse = {
  "E": bigint; // Event time
  "M": boolean;// Ignore
  "T": bigint; // Trade time
  "a": number; // Aggregate trade ID
  "e": string; // Event type
  "f": number; // First trade ID
  "l": number; // Last trade ID
  "m": boolean; // Is the buyer the market maker?
  "p": string; // Price
  "q": string; // Quantity
  "s": string; // Symbol
};
