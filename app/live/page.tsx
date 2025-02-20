import Chat from "./components/chat";
import StreamPlayer from "./components/streamPlayer";

const Live = () => {
  return (
    <section className="grid grid-cols-[4fr_1fr] gap-4 h-[calc(100vh-120px)] bg-[#121212] ">
      <StreamPlayer />

      <Chat />
    </section>
  );
};

export default Live;
