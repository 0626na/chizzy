"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createStream } from "@/app/create-stream/actions/createStream";
import { deleteStream } from "@/app/create-stream/actions/deleteStream";

export default function CreateStreamPage() {
  const [title, setTitle] = useState("");
  const [streamURL, setStreamURL] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [streamId, setStreamId] = useState("");
  const [isCreated, setIsCreated] = useState(true);
  const router = useRouter();

  const handleCreate = async () => {
    const {
      streamURL: url,
      streamId: id,
      streamKey: key,
    } = await createStream(title);

    setStreamURL(url);
    setStreamKey(key);
    setStreamId(id);
  };

  useEffect(() => {
    return () => {
      console.log("벗어남");
      if (streamId) {
        deleteStream(streamId);
      }
    };
  }, [streamId]);

  return (
    <div>
      <h1>새로운 방송 생성</h1>
      <input
        type="text"
        placeholder="방송 제목 입력"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={async () => {
          if (!title) return null;
          setIsCreated(true);
          await handleCreate();
        }}
      >
        방송 생성
      </button>
      <div>
        {streamURL && <span>Stream URL: {streamURL}</span>}
        {streamKey && <span>Stream Key: {streamKey}</span>}
      </div>
      <button
        disabled={isCreated && !title}
        onClick={() => router.push(`/live/${streamId}`)}
      >
        방송채널로 이동
      </button>
    </div>
  );
}
