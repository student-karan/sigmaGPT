import { getAllThreads } from "@/actions/server-actions";
import ThreadComponent from "./Thread";

const Allthreads = async () => {
  const threads = await getAllThreads();
  return (
    <div>
      {threads.length === 0 && <p className="sidebar-msg">No threads available.</p>}
      {threads.map((thread) => (
        <ThreadComponent key={thread.id} thread={thread} />
      ))}
    </div>
  );
};
export default Allthreads;
