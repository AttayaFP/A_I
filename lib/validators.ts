import {
  AnimationStyle,
  AspectRatio,
  BgmOption,
  CreateJobInput,
  DurationOption,
  StoryTheme,
  TargetAge,
  VoiceCharacter,
} from "@/types/video";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  data?: CreateJobInput;
}

const ALLOWED_RATIOS: AspectRatio[] = ["16:9", "9:16", "1:1"];
const ALLOWED_DURATIONS: DurationOption[] = [10, 15, 30];
const ALLOWED_STYLES: AnimationStyle[] = [
  "nusantara-3d",
  "pixar-3d",
  "storybook-2d",
  "anime-chibi",
];
const ALLOWED_THEMES: StoryTheme[] = ["history", "science", "fantasy", "moral"];
const ALLOWED_VOICES: VoiceCharacter[] = ["female", "male"];
const ALLOWED_BGMS: BgmOption[] = ["nusantara", "cheerful", "calm", "none"];
const ALLOWED_AGES: TargetAge[] = ["toddler", "school"];

export function validateGenerateInput(input: unknown): ValidationResult {
  if (typeof input !== "object" || input === null) {
    return {
      isValid: false,
      error: "Data input harus berupa objek JSON yang valid",
    };
  }

  const record = input as Record<string, unknown>;

  const prompt = typeof record.prompt === "string" ? record.prompt.trim() : "";
  if (!prompt) {
    return {
      isValid: false,
      error: "Prompt atau topik cerita wajib diisi",
    };
  }

  if (prompt.length > 5000) {
    return {
      isValid: false,
      error: "Panjang cerita melebihi batas maksimum 5000 karakter",
    };
  }

  let duration: DurationOption = 10;
  if (typeof record.duration === "number") {
    if (ALLOWED_DURATIONS.includes(record.duration as DurationOption)) {
      duration = record.duration as DurationOption;
    }
  } else if (typeof record.duration === "string") {
    const parsed = parseInt(record.duration, 10);
    if (ALLOWED_DURATIONS.includes(parsed as DurationOption)) {
      duration = parsed as DurationOption;
    }
  }

  let ratio: AspectRatio = "16:9";
  if (typeof record.ratio === "string") {
    if (ALLOWED_RATIOS.includes(record.ratio as AspectRatio)) {
      ratio = record.ratio as AspectRatio;
    }
  }

  let style: AnimationStyle = "nusantara-3d";
  if (typeof record.style === "string") {
    if (ALLOWED_STYLES.includes(record.style as AnimationStyle)) {
      style = record.style as AnimationStyle;
    }
  }

  let theme: StoryTheme = "history";
  if (typeof record.theme === "string") {
    if (ALLOWED_THEMES.includes(record.theme as StoryTheme)) {
      theme = record.theme as StoryTheme;
    }
  }

  let voice: VoiceCharacter = "female";
  if (typeof record.voice === "string") {
    if (ALLOWED_VOICES.includes(record.voice as VoiceCharacter)) {
      voice = record.voice as VoiceCharacter;
    }
  }

  let bgm: BgmOption = "nusantara";
  if (typeof record.bgm === "string") {
    if (ALLOWED_BGMS.includes(record.bgm as BgmOption)) {
      bgm = record.bgm as BgmOption;
    }
  }

  let age: TargetAge = "school";
  if (typeof record.age === "string") {
    if (ALLOWED_AGES.includes(record.age as TargetAge)) {
      age = record.age as TargetAge;
    }
  }

  let image: string | null = null;
  if (typeof record.image === "string" && record.image.trim().length > 0) {
    image = record.image.trim();
  }

  return {
    isValid: true,
    data: {
      prompt,
      duration,
      ratio,
      style,
      theme,
      voice,
      bgm,
      age,
      image,
    },
  };
}
