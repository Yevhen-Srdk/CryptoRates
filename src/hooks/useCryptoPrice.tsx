import { useEffect, useState } from "react";
import { PairsUrls } from "../types/PairsUrls";
import type { WebsocketResponse } from "../types/WebsocketResponse";

export const useCryptoPrice = (param: PairsUrls = PairsUrls.BTC_USDT) => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");

      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [param],
          id: crypto.randomUUID(),
        }),
      );
    };

    socket.onmessage = (event) => {
      const data: WebsocketResponse = JSON.parse(event.data);
      setPrice(data.p);
    };

    socket.onerror = (error) => {
      console.log(error);
    };

    return () => socket.close();
  }, [param]);

  return Number(price).toFixed(2);
};
