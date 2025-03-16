import Chat from "@/app/live/components/chat";
import StreamPlayer from "@/app/live/components/streamPlayer";

const LiveStreamingPage = ({ params }: { params: { streamId: string } }) => {
  const { streamId } = params;

  return (
    <section className="flex flex-col h-screen bg-[#121212] overflow-hidden">
      <div className="h-full flex-1 grid grid-cols-[4fr_1fr] gap-4">
        <StreamPlayer streamId={streamId} />
        <Chat />
      </div>
    </section>
  );
};

export default LiveStreamingPage;
