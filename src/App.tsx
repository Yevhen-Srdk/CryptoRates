import "./App.css";
import "./hooks/useCryptoPrice";
import { useCryptoPrice } from "./hooks/useCryptoPrice";

function App() {
  const price = useCryptoPrice();

  return (
    <section className="App">
      <h1>Crypto Rates</h1>
      <p>{price}</p>
    </section>
  );
}

export default App;
