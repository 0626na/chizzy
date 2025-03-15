"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CLOUDFLARE_STREAM_API = `${process.env.CLOUDFLARE_STREAM_API}/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`;

export async function createStream(title: string): Promise<{
  streamId: string;
  streamURL: string;
  streamKey: string;
}> {
  try {
    const cfRes = await fetch(CLOUDFLARE_STREAM_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meta: { name: title },
        recording: { mode: "automatic" },
      }),
    });

    const newStream = await cfRes.json();
    if (!newStream.success) {
      throw new Error("Failed to create Cloudflare Stream");
    }

    const streamId = newStream.result.uid;
    const streamURL = newStream.result.rtmps.url;
    const streamKey = newStream.result.rtmps.streamKey;

    await prisma.stream.create({
      data: { title, streamId, streamKey },
    });

    return { streamId, streamURL, streamKey };
  } catch (error) {
    console.error(error);
    return { streamId: "", streamKey: "", streamURL: "" };
  }
}
