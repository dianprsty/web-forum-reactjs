import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "@/redux/slice/counter";

export default function CounterPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <main className="flex justify-center items-center w-screen min-h-dvh bg-red-500">
        <div className="flex w-full h-full flex-col bg-white justify-center gap-2 items-center ">
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </main>
    </>
  );
}
