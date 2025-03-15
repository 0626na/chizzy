"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

const StreamPlayer = ({ streamId }: { streamId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsUrl =
    "https://customer-enoitsj7ymtxo44p.cloudflarestream.com/48e7c3bb842cb0ca0bf820262a71b9da/manifest/video.m3u8"; // Cloudflare에서 제공된 HLS URL

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          liveSyncDuration: 1, // 🔥 지연 시간을 최소화
          liveMaxLatencyDuration: 3, // 🔥 최대 대기 시간 조정
          enableWorker: true, // 웹 워커를 사용하여 성능 최적화
          lowLatencyMode: true, // ✅ LL-HLS 모드 활성화
          backBufferLength: 90, // 백버퍼 조정
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl; // ✅ Safari에서 직접 HLS 재생
      }
    }
  }, [streamId]);

  return (
    <div className="flex flex-col bg-gray-500 h-full">
      <video
        ref={videoRef}
        className="w-full h-full bg-black"
        controls
        autoPlay
      />
    </div>
  );
};

export default StreamPlayer;
