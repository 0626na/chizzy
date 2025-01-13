import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "찌지직 MVP",
  description:
    "네이버 라이브 스트리밍 플랫폼 치지직을 보고 최소한의 기능만 가진 라이브 스트리밍 기능을 가진 웹 애플리케이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <header className="bg-black p-4 text-white">
          <h1>Chizzy MVP</h1>
        </header>
        {children}
        <footer className="bg-black p-4 text-white">
          <p>© 2024 LiveCast MVP</p>
        </footer>
      </body>
    </html>
  );
}
