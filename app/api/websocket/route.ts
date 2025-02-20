import { WebSocketServer } from "ws";

let wss: WebSocketServer | undefined;

export const runtime = "nodejs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: { server: any }): Promise<Response> {
  if (!wss) {
    console.log("WebSocket 서버 초기화");
    console.log(req);
    if (!req.server) {
      console.log(req);
      throw new Error("서버 객체를 찾을 수 없습니다. ...");
    }

    if (!req.server) {
      throw new Error(
        "서버 객체를 찾을 수 없습니다. WebSocket 서버 초기화를 위해 유효한 HTTP 서버 객체가 필요합니다."
      );
    }
    const { server } = req;
    wss = new WebSocketServer({ server });

    wss.on("connection", (socket) => {
      console.log("클라이언트가 연결되었습니다.");

      socket.on("message", (message) => {
        console.log(`수신된 메시지: ${message}`);
        wss?.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(message);
          }
        });
      });
    });
  }
  return new Response("WebSocket 설정 완료", { status: 200 });
}
