import { promises as fs } from "fs";
import path from "path";
import { VideoJob } from "@/types/video";

const DATA_DIR = path.join(process.cwd(), "data");
const JOBS_FILE = path.join(DATA_DIR, "jobs.json");

async function ensureFileExists(): Promise<void> {
  try {
    await fs.access(JOBS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(JOBS_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export async function getAllJobs(): Promise<VideoJob[]> {
  await ensureFileExists();
  try {
    const raw = await fs.readFile(JOBS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed as VideoJob[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function getJobById(id: string): Promise<VideoJob | null> {
  const jobs = await getAllJobs();
  const match = jobs.find((job) => job.id === id);
  return match ?? null;
}

export async function createJobRecord(job: VideoJob): Promise<VideoJob> {
  await ensureFileExists();
  const jobs = await getAllJobs();
  const existingIndex = jobs.findIndex((item) => item.id === job.id);

  if (existingIndex >= 0) {
    jobs[existingIndex] = job;
  } else {
    jobs.push(job);
  }

  await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2), "utf8");
  return job;
}

export async function updateJobRecord(
  id: string,
  updates: Partial<VideoJob>
): Promise<VideoJob | null> {
  await ensureFileExists();
  const jobs = await getAllJobs();
  const index = jobs.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updated: VideoJob = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  jobs[index] = updated;
  await fs.writeFile(JOBS_FILE, JSON.stringify(jobs, null, 2), "utf8");
  return updated;
}
