const Live = () => {
  return (
    <section className="grid grid-cols-[3fr_1fr] gap-4 h-[calc(100vh-120px)] bg-[#121212] ">
      {/* 왼쪽: 영상 영역 */}

      {/* 이슈: 라이브 스트리밍 UI가 영역을 벗어나서 footer 영역까지 침범하는 문제 발생 
          원인: iframe을 감싸는 div가 h-full로 높이를 설정함. 이는 부모 div를 100% 차지하기에 이런 상태에
          다른 요소가 존재하는 경우, 이미 높이 100% 인 상태에서 다른 요소의 높이까지 추가되어 영역을 벗어남.
          
          해결: flexbox를 적용하여 이슈 해결. flexbox로 처리하면 h-full 설정된 요소가 있다 하더라도 flexbox 내 높이를 유연하게
          서로 차지하기에 다른 영역으로 침범하지 않는다.
      */}
      <div className="flex flex-col bg-gray-500">
        <h3>안녕</h3>
        <div className="bg-black h-full">
          <iframe
            src="https://youtu.be/rjddthcbSxA?si=yPCYd7NAeEp4DbHc"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 오른쪽: 채팅 영역 */}
      <div className="flex flex-col bg-gray-400">
        {/* 채팅 헤더 */}
        <div className="text-white border-b border-black p-4">
          <h3>채팅</h3>
        </div>

        {/* 채팅 메시지 리스트 */}
        <div className="flex-1 overflow-y-auto p-4 text-white">
          <p>메시지1: Hello!</p>
          <p>메시지2: Testing...</p>
          {/* 여기서 WebSocket/Socket.io로 받은 메시지를 렌더링할 예정 */}
        </div>

        {/* 채팅 입력창 */}
        <div className="p-4 border-t border-black">
          <input
            type="text"
            placeholder="메시지를 입력..."
            className="w-full p-2 rounded border-none text-black"
          />
        </div>
      </div>
    </section>
  );
};

export default Live;
