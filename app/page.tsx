import { getStreams } from "@/app/actions/getStreams";
import CreateStreamButton from "@/app/components/createStreamButton";

export default async function Home() {
  const streams = await getStreams();

  if (streams.length === 0)
    return (
      <div className="h-full flex flex-col">
        <h1 className="text-2xl font-bold text-center my-4">
          현재 방송중인 채널
        </h1>

        <p className="text-center text-lg">현재 방송중인 채널이 없습니다.</p>
        <div className="fixed bottom-4 right-4">
          <CreateStreamButton />
        </div>
      </div>
    );
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold text-center my-4">
        현재 방송중인 채널
      </h1>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {streams.map((stream) => (
          <div
            key={stream.streamId}
            className="bg-blue-500 p-4 rounded-lg shadow-lg flex items-center justify-center h-48"
          >
            <p className="text-white font-bold">{stream.title}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <CreateStreamButton />
      </div>
    </div>
  );
}
