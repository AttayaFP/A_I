export type AllowedProvider = "mock" | "ffmpeg";

export interface EnvConfig {
  videoProvider: AllowedProvider;
}

export function getEnv(): EnvConfig {
  const rawProvider = process.env.VIDEO_PROVIDER?.trim().toLowerCase();

  if (rawProvider === "ffmpeg") {
    return {
      videoProvider: "ffmpeg",
    };
  }

  return {
    videoProvider: "mock",
  };
}
