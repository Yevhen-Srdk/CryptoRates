import { useState } from "react";
import "./App.css";
import { usePairInfo } from "./hooks/usePairInfo";
import { PairsUrls } from "./types/PairsUrls";
import cn from "classnames";
import { Loader } from "./Loader";
import { PAIR_OPTIONS } from "./types/PairOptions";

function App() {
  const [pair, setPair] = useState<PairsUrls>();
  const [pairName, setPairName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { price, direction, connect, disconnect, socketStatus } = usePairInfo({
    param: pair,
  });

  const handlePairChange = (name: string, pair: PairsUrls) => {
    setPair(pair);
    setPairName(name);
    setIsMenuOpen(false);
    disconnect();
  };

  const toggleConnect = () => {
    if (socketStatus === "connected") {
      disconnect();
    } else if (socketStatus === "disconnected" || socketStatus === "error") {
      connect();
    }
  };

  return (
    <section className="app">
      <h1>
        <span className="binance">BINANCE</span> WS DEMO
      </h1>

      <div className="controls">
        <div
          className="select"
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              setIsMenuOpen(false);
            }
          }}
        >
          <button
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
            style={
              isMenuOpen
                ? {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }
                : undefined
            }
            className="chooseField"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span>{pairName || "Choose a pair"}</span>
            <svg
              className="icon"
              fill="currentColor"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              width="12px"
              height="12px"
              viewBox="0 0 30.727 30.727"
            >
              <g>
                <path
                  d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0
		l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"
                />
              </g>
            </svg>
          </button>

          <ul
            role="listbox"
            className={cn("pairList", { hidden: !isMenuOpen })}
          >
            {PAIR_OPTIONS.map((option) => (
              <li
                key={`${option.label}-${option.value}`}
                role="option"
                aria-selected={pair === option.value}
                className="listItem"
              >
                <button
                  className="listBtn"
                  onClick={() => handlePairChange(option.label, option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button
          className={cn("connectBtn", { hidden: !pair })}
          onClick={toggleConnect}
          disabled={!pair}
        >
          {socketStatus === "connected" && "Stop"}
          {socketStatus === "disconnected" && "Connect"}
          {socketStatus === "connecting" && "Connecting..."}
        </button>

        <div className="onlineStatus">
          <div
            className={cn("indicator", {
              online: socketStatus === "connected",
              offline: socketStatus !== "connected",
            })}
          ></div>
          <span>{socketStatus === "connected" ? "online" : "offline"}</span>
        </div>
      </div>

      <div className="priceContainer">
        <span className="priceSpan">LAST PRICE</span>

        {pair &&
        (socketStatus === "connecting" ||
          (socketStatus === "connected" && price === 0)) ? (
          <Loader />
        ) : (
          <h2
            className={cn("price", {
              up: direction === "up",
              down: direction === "down",
            })}
          >
            {price > 0 ? `$${price}` : "—"}
          </h2>
        )}
        <span className="priceSpan">{pairName}</span>
      </div>
    </section>
  );
}

export default App;
