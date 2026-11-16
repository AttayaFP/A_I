import { NextRequest, NextResponse } from "next/server";
import { getJobById, updateJobRecord } from "@/lib/job-store";
import { getJobStatus } from "@/lib/video-provider";
import { checkVideoExists } from "@/lib/storage";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "ID pekerjaan tidak valid" },
        { status: 400 }
      );
    }

    const job = await getJobById(id);
    if (!job) {
      return NextResponse.json(
        { error: "Pekerjaan tidak ditemukan" },
        { status: 404 }
      );
    }

    const providerStatus = await getJobStatus(id, job);

    if (
      providerStatus.status !== job.status ||
      providerStatus.videoUrl !== job.videoUrl ||
      providerStatus.narration !== job.narration ||
      providerStatus.error !== job.error
    ) {
      await updateJobRecord(id, {
        status: providerStatus.status,
        videoUrl: providerStatus.videoUrl ?? null,
        audioUrl: providerStatus.audioUrl ?? null,
        bgmUrl: providerStatus.bgmUrl ?? null,
        narration: providerStatus.narration ?? null,
        moralMessage: providerStatus.moralMessage ?? null,
        scenes: providerStatus.scenes ?? [],
        error: providerStatus.error ?? null,
      });
    }

    if (providerStatus.status === "completed" && providerStatus.videoUrl) {
      await checkVideoExists(providerStatus.videoUrl);
    }

    return NextResponse.json({
      id: providerStatus.id,
      status: providerStatus.status,
      videoUrl: providerStatus.videoUrl ?? null,
      audioUrl: providerStatus.audioUrl ?? null,
      bgmUrl: providerStatus.bgmUrl ?? null,
      narration: providerStatus.narration ?? null,
      moralMessage: providerStatus.moralMessage ?? null,
      scenes: providerStatus.scenes ?? [],
      prompt: job.prompt,
      ratio: job.ratio,
      duration: job.duration,
      style: job.style,
      theme: job.theme,
      voice: job.voice,
      bgm: job.bgm,
      age: job.age,
      image: job.image,
      ...(providerStatus.error ? { error: providerStatus.error } : {}),
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
