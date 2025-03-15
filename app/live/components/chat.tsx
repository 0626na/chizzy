"use client";

import React, { useEffect, useRef, useState } from "react";

// 실제 배포 시에는, webserver URL로 변경해야함
const WEBSOCKET_URL = "ws://localhost:4000";

type ChatMessage = {
  nickname: string;
  text: string;
  timestamp: number;
};

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  //WebSocket 연결
  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    wsRef.current = ws;

    //연결이 됐을때
    ws.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    //메시지 수신 핸들러
    ws.onmessage = (event) => {
      const receivedMsg = JSON.parse(event.data);

      if (receivedMsg.type === "history") {
        setMessages(receivedMsg.data);
      } else {
        setMessages((prev) => [...prev, receivedMsg]);
      }
    };

    // 에러, 연결 종료 핸들러
    ws.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };
    ws.onclose = () => {
      console.log("WebSocket 연결 종료");
    };

    // cleanup
    return () => {
      ws.close();
    };
  }, []);

  // 5) 메시지 전송 함수
  const handleSend = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const sentMessgae: ChatMessage = {
      text: inputValue,
      nickname: "test",
      timestamp: Date.now(),
    };
    wsRef.current.send(JSON.stringify(sentMessgae));
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* 채팅 헤더 */}
      <div className="text-white border-b border-black p-4">
        <h3>채팅</h3>
      </div>

      {/* 채팅 메시지 리스트 */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 text-white">
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>

      {/* 채팅 입력창 */}
      <div className="p-1">
        <div className="flex items-center">
          <input
            id="chatInput"
            type="text"
            value={inputValue}
            aria-label="Type your message"
            placeholder="채팅을 입력하세요"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault(); // 엔터키 기본 동작(폼 제출 등) 방지
                handleSend();
              }
            }}
          />
          <button
            className="ml-1 p-2 bg-black text-white text-nowrap"
            onClick={handleSend}
          >
            <span className="flex">채팅</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
