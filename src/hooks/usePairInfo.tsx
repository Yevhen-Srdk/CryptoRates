import { useEffect, useRef, useState } from "react";
import { PairsUrls } from "../types/PairsUrls";

type Props = {
  param?: PairsUrls;
};

type SocketStatus = "connected" | "connecting" | "disconnected" | "error";

export const usePairInfo = ({ param }: Props) => {
  const [price, setPrice] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [socketStatus, setSocketStatus] =
    useState<SocketStatus>("disconnected");
  const prevPrice = useRef<number | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (direction === null) {
      return;
    }

    const timer = setTimeout(() => {
      setDirection(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [price, direction]);

  const connect = () => {
    if (!param || socketRef.current) {
      return;
    }

    setSocketStatus("connecting");
    prevPrice.current = null;
    setPrice(0);
    setDirection(null);

    const socket = new WebSocket("wss://stream.binance.com:9443/ws");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: [param],
          id: crypto.randomUUID(),
        }),
      );

      setSocketStatus("connected");
    };

    socket.onmessage = (event) => {
      let data: unknown;

      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("p" in data) ||
        !("e" in data) ||
        data.e !== "aggTrade" ||
        typeof data.p !== "string"
      ) {
        return;
      }

      const newPrice = Number(Number(data.p).toFixed(2));

      if (prevPrice.current !== null) {
        if (newPrice > prevPrice.current) {
          setDirection("up");
        } else if (newPrice < prevPrice.current) {
          setDirection("down");
        }
      }

      prevPrice.current = newPrice;
      setPrice(newPrice);
    };

    socket.onerror = (error) => {
      console.log(error);
      setSocketStatus("error");
      socket.close();
    };

    socket.onclose = () => {
      if (socketRef.current !== socket) {
        return;
      }

      socketRef.current = null;
      setPrice(0);
      setDirection(null);
      setSocketStatus("disconnected");
    };
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.onclose = null;
      socketRef.current.close();
      socketRef.current = null;
    }

    setPrice(0);
    setDirection(null);
    setSocketStatus("disconnected");
  };

  return {
    price,
    direction,
    connect,
    disconnect,
    socketStatus,
  };
};
