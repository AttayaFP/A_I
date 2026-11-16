import { AnimationStyle, AspectRatio } from "@/types/video";

export function getResolutionForRatio(ratio: AspectRatio): {
  width: number;
  height: number;
} {
  if (ratio === "9:16") {
    return { width: 720, height: 1280 };
  }
  if (ratio === "1:1") {
    return { width: 1024, height: 1024 };
  }
  return { width: 1280, height: 720 };
}

export function generateSceneImageUrl(
  sceneText: string,
  style: AnimationStyle,
  ratio: AspectRatio,
  userImage?: string | null,
  sceneIndex: number = 0
): string {
  if (userImage && userImage.trim().length > 0) {
    return userImage;
  }

  const { width, height } = getResolutionForRatio(ratio);

  let styleModifier = "";
  if (style === "nusantara-3d") {
    styleModifier =
      "cute 3D cartoon animation character in tropical Southeast Asian village, Upin and Ipin style, colorful, warm sunny lighting, cheerful, high quality 3D render";
  } else if (style === "pixar-3d") {
    styleModifier =
      "cute 3D Pixar Disney style character, vibrant colors, expressive eyes, whimsical, cinema lighting 3D render, children movie";
  } else if (style === "storybook-2d") {
    styleModifier =
      "vintage watercolor children storybook illustration, whimsical cute hand drawn cartoon, soft warm pastel colors, fairy tale art";
  } else {
    styleModifier =
      "cute chibi kawaii anime illustration, cheerful bright colors, Ghibli inspired children animation, high resolution";
  }

  const seed = (Math.abs(hashString(sceneText)) + sceneIndex * 17) % 999999;
  const promptQuery = `${sceneText}, ${styleModifier}`;
  const encoded = encodeURIComponent(promptQuery.slice(0, 450));

  return `https://image.pollinations.ai/prompt/${encoded}?width=${width}&height=${height}&seed=${seed}&model=flux&nologo=true`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
