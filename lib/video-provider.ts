import {
  CreateJobInput,
  ProviderCreateJobResult,
  ProviderJobStatusResult,
  VideoJob,
  VideoProvider,
} from "@/types/video";
import { getEnv } from "@/lib/env";
import { mockProvider } from "@/lib/providers/mock";

function getActiveProvider(): VideoProvider {
  const env = getEnv();

  if (env.videoProvider === "ffmpeg") {
    return mockProvider;
  }

  return mockProvider;
}

export async function createJob(
  input: CreateJobInput
): Promise<ProviderCreateJobResult> {
  const provider = getActiveProvider();
  return provider.createJob(input);
}

export async function getJobStatus(
  id: string,
  job?: VideoJob
): Promise<ProviderJobStatusResult> {
  const provider = getActiveProvider();
  return provider.getJobStatus(id, job);
}
