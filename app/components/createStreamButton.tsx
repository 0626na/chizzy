"use client";
import { useRouter } from "next/navigation";

export default function CreateStreamButton() {
  const router = useRouter();

  const handleCreateStream = () => {
    router.push("/create-stream");
  };

  return <button onClick={handleCreateStream}>새 방송 생성</button>;
}
