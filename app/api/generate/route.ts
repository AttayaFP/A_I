import { NextRequest, NextResponse } from "next/server";
import { validateGenerateInput } from "@/lib/validators";
import { createJob } from "@/lib/video-provider";
import { createJobRecord } from "@/lib/job-store";
import { VideoJob } from "@/types/video";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const validation = validateGenerateInput(body);

    if (!validation.isValid || !validation.data) {
      return NextResponse.json(
        { error: validation.error ?? "Input tidak valid" },
        { status: 400 }
      );
    }

    const {
      prompt,
      duration,
      ratio,
      style,
      theme,
      voice,
      bgm,
      age,
      image,
    } = validation.data;

    const providerResult = await createJob(validation.data);

    const now = new Date().toISOString();
    const newJob: VideoJob = {
      id: providerResult.id,
      prompt,
      duration,
      ratio,
      style,
      theme,
      voice,
      bgm,
      age,
      image,
      status: providerResult.status,
      videoUrl: null,
      audioUrl: null,
      bgmUrl: null,
      narration: null,
      moralMessage: null,
      scenes: [],
      error: null,
      createdAt: now,
      updatedAt: now,
    };

    await createJobRecord(newJob);

    return NextResponse.json({
      id: providerResult.id,
      status: providerResult.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
