export type JobStatus = "queued" | "processing" | "completed" | "failed";

export type AspectRatio = "16:9" | "9:16" | "1:1";

export type DurationOption = 10 | 15 | 30;

export type AnimationStyle =
  | "nusantara-3d"
  | "pixar-3d"
  | "storybook-2d"
  | "anime-chibi";

export type StoryTheme = "history" | "science" | "fantasy" | "moral";

export type VoiceCharacter = "female" | "male";

export type BgmOption = "nusantara" | "cheerful" | "calm" | "none";

export type TargetAge = "toddler" | "school";

export interface StoryScene {
  sceneNumber: number;
  title: string;
  narration: string;
  imageUrl: string;
  duration: number;
}

export interface CreateJobInput {
  prompt: string;
  image?: string | null;
  duration: DurationOption;
  ratio: AspectRatio;
  style: AnimationStyle;
  theme: StoryTheme;
  voice: VoiceCharacter;
  bgm: BgmOption;
  age: TargetAge;
}

export interface VideoJob {
  id: string;
  prompt: string;
  image?: string | null;
  duration: DurationOption;
  ratio: AspectRatio;
  style: AnimationStyle;
  theme: StoryTheme;
  voice: VoiceCharacter;
  bgm: BgmOption;
  age: TargetAge;
  status: JobStatus;
  videoUrl?: string | null;
  audioUrl?: string | null;
  bgmUrl?: string | null;
  narration?: string | null;
  moralMessage?: string | null;
  scenes?: StoryScene[];
  error?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderCreateJobResult {
  id: string;
  status: JobStatus;
}

export interface ProviderJobStatusResult {
  id: string;
  status: JobStatus;
  videoUrl?: string;
  audioUrl?: string;
  bgmUrl?: string | null;
  narration?: string;
  moralMessage?: string;
  scenes?: StoryScene[];
  error?: string;
}

export interface VideoProvider {
  createJob(input: CreateJobInput): Promise<ProviderCreateJobResult>;
  getJobStatus(id: string, job?: VideoJob): Promise<ProviderJobStatusResult>;
}

export interface ApiResponseSuccess {
  id: string;
  status: JobStatus;
  videoUrl?: string | null;
}

export interface ApiResponseError {
  error: string;
}
