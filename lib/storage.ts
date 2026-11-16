import { promises as fs } from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SAMPLES_DIR = path.join(PUBLIC_DIR, "samples");
const VIDEOS_DIR = path.join(PUBLIC_DIR, "videos");

export async function ensureStorageDirectories(): Promise<void> {
  await fs.mkdir(SAMPLES_DIR, { recursive: true });
  await fs.mkdir(VIDEOS_DIR, { recursive: true });
}

export async function getSampleVideoUrl(): Promise<string> {
  await ensureStorageDirectories();
  return "/samples/sample.mp4";
}

export async function checkVideoExists(videoUrl: string): Promise<boolean> {
  await ensureStorageDirectories();
  const cleanPath = videoUrl.startsWith("/") ? videoUrl.slice(1) : videoUrl;
  const fullPath = path.join(PUBLIC_DIR, cleanPath);
  try {
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}
