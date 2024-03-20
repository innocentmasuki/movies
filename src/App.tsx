import "./App.css";
import Counter from "./components/Counter/Counter.tsx";
import { useAppSelector } from "./hooks/storeHooks.ts";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  return (
    <div>
      <div>
        <div>
          <div>
            <h1>The count is {count} </h1>
          </div>
        </div>
        <div>
          <div>
            <Counter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
