import { randomUUID } from "crypto";
import {
  CreateJobInput,
  ProviderCreateJobResult,
  ProviderJobStatusResult,
  VideoJob,
  VideoProvider,
} from "@/types/video";
import { getJobById } from "@/lib/job-store";
import { getSampleVideoUrl } from "@/lib/storage";
import { generateStoryContent } from "@/lib/story-engine";
import { generateSceneImageUrl } from "@/lib/visual-engine";
import { generateVoiceoverUrl, getBgmUrl } from "@/lib/audio-engine";

export class MockVideoProvider implements VideoProvider {
  async createJob(input: CreateJobInput): Promise<ProviderCreateJobResult> {
    if (!input.prompt || input.prompt.trim().length === 0) {
      throw new Error("Prompt wajib diisi");
    }

    const id = randomUUID();
    return {
      id,
      status: "queued",
    };
  }

  async getJobStatus(
    id: string,
    passedJob?: VideoJob
  ): Promise<ProviderJobStatusResult> {
    const job = passedJob ?? (await getJobById(id));

    if (!job) {
      return {
        id,
        status: "failed",
        error: "Pekerjaan tidak ditemukan",
      };
    }

    const createdTime = new Date(job.createdAt).getTime();
    const elapsedMs = Date.now() - createdTime;

    if (elapsedMs < 2000) {
      return {
        id,
        status: "queued",
      };
    }

    if (elapsedMs < 8000) {
      return {
        id,
        status: "processing",
      };
    }

    const story = generateStoryContent(job);

    const scenesWithImages = story.scenes.map((scene, idx) => ({
      ...scene,
      imageUrl: generateSceneImageUrl(
        scene.narration,
        job.style,
        job.ratio,
        job.image,
        idx
      ),
    }));

    const audioUrl = generateVoiceoverUrl(story.fullNarration, job.voice);
    const bgmUrl = getBgmUrl(job.bgm);
    const videoUrl = await getSampleVideoUrl();

    return {
      id,
      status: "completed",
      videoUrl,
      audioUrl,
      bgmUrl,
      narration: story.fullNarration,
      moralMessage: story.moralMessage,
      scenes: scenesWithImages,
    };
  }
}

export const mockProvider = new MockVideoProvider();
