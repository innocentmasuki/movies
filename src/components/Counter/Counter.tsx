import { useAppDispatch } from "../../hooks/storeHooks.ts";
import { decrement, increment } from "../../redux/slices/counterSlice.ts";
export default function Counter() {
  const dispatch = useAppDispatch();

  function incrementCounter() {
    dispatch(increment());
  }

  function decrementCounter() {
    dispatch(decrement());
  }

  return (
    <>
      <div>
        <div>
          <button onClick={incrementCounter}>Increment +</button>
        </div>
        <div>
          <button onClick={decrementCounter}>Decrement -</button>
        </div>
      </div>
    </>
  );
}
