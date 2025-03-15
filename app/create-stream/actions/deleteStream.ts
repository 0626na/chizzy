"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CLOUDFLARE_STREAM_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const CLOUDFLARE_STREAM_API = process.env.CLOUDFLARE_STREAM_API;
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

export async function deleteStream(streamId: string) {
  try {
    // Cloudflare Stream API 호출하여 Live Input 삭제
    const response = await fetch(
      `${CLOUDFLARE_STREAM_API}/${CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/${streamId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CLOUDFLARE_STREAM_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const res = await response.json();
    console.log("삭제 api 결과", JSON.stringify(res, null, 2));

    if (!res.success) throw new Error(res.errors);

    // Prisma를 이용해 데이터베이스에서 스트림 삭제
    await prisma.stream.delete({
      where: { streamId: streamId },
    });

    console.log(`✅ Successfully deleted stream from database: ${streamId}`);
  } catch (error) {
    console.error("Error deleting stream:", error);
  }
}
