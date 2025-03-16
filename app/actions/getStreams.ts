"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStreams() {
  try {
    const streams = await prisma.stream.findMany({
      orderBy: {
        createdAt: "desc", // 최신 스트림 순으로 정렬
      },
    });

    return streams;
  } catch (error) {
    console.error("❌ Error fetching live streams:", error);
    return [];
  }
}
