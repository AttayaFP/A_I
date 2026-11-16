import { BgmOption, VoiceCharacter } from "@/types/video";

export function generateVoiceoverUrl(
  text: string,
  voice: VoiceCharacter = "female"
): string {
  const cleanText = text.replace(/['"]/g, "").trim();
  const truncated = cleanText.slice(0, 180);
  const encoded = encodeURIComponent(truncated);
  const slow = voice === "female" ? "0" : "0";
  return `https://translate.google.com/translate_tts?ie=UTF-8&tl=id&client=tw-ob&slow=${slow}&q=${encoded}`;
}

export function getBgmUrl(bgm: BgmOption): string | null {
  if (bgm === "none") return null;

  if (bgm === "nusantara") {
    return "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3";
  }
  if (bgm === "cheerful") {
    return "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3";
  }
  if (bgm === "calm") {
    return "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3";
  }

  return null;
}
