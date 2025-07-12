import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllThreads } from "../../redux/actions/threads";

export default function ThreadsHome() {
  const threads = useSelector((state) => state.threads.threads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllThreads());
  }, []);
  return (
    <>
      {/* <CounterPage /> */}

      {threads.map((thread) => (
        <li key={thread.id}>{thread.title}</li>
      ))}
    </>
  );
}

