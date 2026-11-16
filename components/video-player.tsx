"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { StoryScene } from "@/types/video";

interface VideoPlayerProps {
  videoUrl: string;
  audioUrl?: string | null;
  bgmUrl?: string | null;
  narration?: string | null;
  moralMessage?: string | null;
  scenes?: StoryScene[];
  prompt?: string;
  ratio?: string;
  duration?: number;
  style?: string;
}

export function VideoPlayer({
  videoUrl,
  audioUrl,
  bgmUrl,
  narration,
  moralMessage,
  scenes = [],
  prompt,
  ratio = "16:9",
  duration = 10,
  style = "nusantara-3d",
}: VideoPlayerProps) {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isBgmPlaying, setIsBgmPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const activeScenes =
    scenes && scenes.length > 0
      ? scenes
      : [
          {
            sceneNumber: 1,
            title: "Adegan Utama",
            narration: narration || prompt || "Kisah animasi anak",
            imageUrl: "",
            duration: duration,
          },
        ];

  const totalDuration = duration;
  const sceneDuration = totalDuration / activeScenes.length;

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.1;
        if (next >= totalDuration) {
          setShowMoralCard(true);
          return 0;
        }

        const currentIdx = Math.min(
          Math.floor(next / sceneDuration),
          activeScenes.length - 1
        );
        setActiveSceneIndex(currentIdx);
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, sceneDuration, activeScenes.length]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.currentTime = 0;
        void audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeSceneIndex]);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = 0.25;
      if (isPlaying && isBgmPlaying) {
        void bgmRef.current.play().catch(() => {});
      } else {
        bgmRef.current.pause();
      }
    }
  }, [isPlaying, isBgmPlaying]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getAspectClass = () => {
    if (ratio === "9:16") return "aspect-[9/16] max-w-sm mx-auto";
    if (ratio === "1:1") return "aspect-square max-w-lg mx-auto";
    return "aspect-video w-full";
  };

  const currentScene = activeScenes[activeSceneIndex] || activeScenes[0];

  return (
    <div className="w-full flex flex-col gap-6 bg-[#1a1a1a] border border-[#27272a] rounded-[8px] p-6 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272a]">
        <div className="flex flex-wrap items-center gap-3 text-[13px] uppercase tracking-[0.35px] text-[#767d88]">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
          <span className="text-white font-medium">ANIMASI SIAP DIPUTAR</span>
          <span>·</span>
          <span>{ratio}</span>
          <span>·</span>
          <span>{duration} DETIK</span>
          <span>·</span>
          <span className="text-amber-400">
            {style === "nusantara-3d"
              ? "GAYA UPIN & IPIN"
              : style === "pixar-3d"
              ? "GAYA 3D PIXAR"
              : style === "storybook-2d"
              ? "BUKU CERITA 2D"
              : "ANIME CHIBI"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsBgmPlaying(!isBgmPlaying)}
            className="text-[12px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white px-3 py-1.5 border border-[#27272a] rounded-[4px] transition-colors"
          >
            {isBgmPlaying ? "BGM: HIDUP" : "BGM: SENYAP"}
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-[12px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white px-3 py-1.5 border border-[#27272a] rounded-[4px] transition-colors"
          >
            {copied ? "TAUTAN TERSALIN" : "BAGIKAN TAUTAN"}
          </button>
          <a
            href={videoUrl}
            download="animasi-cerita-anak.mp4"
            className="text-[12px] uppercase font-semibold tracking-[0.35px] text-black bg-white hover:bg-[#e9ecf2] px-4 py-1.5 rounded-[4px] leading-none transition-colors"
          >
            UNDUH MP4
          </a>
        </div>
      </div>

      <div className="relative w-full bg-[#030303] border border-[#27272a] rounded-[6px] overflow-hidden flex items-center justify-center">
        <div className={`relative w-full ${getAspectClass()} overflow-hidden`}>
          {currentScene.imageUrl ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={currentScene.imageUrl}
                alt={currentScene.title}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover scale-105 transition-transform duration-[6000ms] ease-out hover:scale-110"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>
          ) : (
            <video
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          )}

          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.35px] bg-black/70 backdrop-blur border border-[#27272a] px-2.5 py-1 rounded-[4px] text-white">
              BABAK {activeSceneIndex + 1} / {activeScenes.length}
            </span>
            <span className="text-[10px] uppercase tracking-[0.35px] bg-black/70 backdrop-blur border border-[#27272a] px-2.5 py-1 rounded-[4px] text-amber-400">
              {currentScene.title}
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-3">
            <div className="p-4 rounded-[6px] bg-black/85 backdrop-blur border border-[#27272a] text-center shadow-none">
              <p className="text-sm sm:text-base text-white font-medium leading-relaxed tracking-[-0.16px]">
                &quot;{currentScene.narration}&quot;
              </p>
            </div>

            <div className="w-full bg-zinc-800 h-1.5 rounded-[2px] overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-100 ease-linear"
                style={{
                  width: `${(progress / totalDuration) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => {}}
          />
        )}
        {bgmUrl && (
          <audio
            ref={bgmRef}
            src={bgmUrl}
            loop
          />
        )}
      </div>

      <div className="flex items-center justify-between border-b border-[#27272a] pb-4">
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35px] text-white bg-[#030303] border border-[#27272a] px-4 py-2 rounded-[4px] hover:border-white transition-colors"
        >
          <span>{isPlaying ? "⏸ JEDA PEMUTARAN" : "▶ PUTAR KEMBALI"}</span>
        </button>

        <span className="text-xs text-[#767d88]">
          Waktu: {Math.floor(progress)}s / {totalDuration}s
        </span>
      </div>

      {moralMessage && (
        <div className="p-5 rounded-[6px] border border-amber-900/60 bg-amber-950/20 flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.35px] text-amber-400 font-semibold">
            HIKMAH & PESAN MORAL CERITA
          </span>
          <p className="text-sm sm:text-base text-zinc-100 leading-relaxed font-medium">
            {moralMessage}
          </p>
        </div>
      )}

      {prompt && (
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
            IDE & KARANGAN AWAL
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed tracking-[-0.16px]">
            &quot;{prompt}&quot;
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272a]">
        <span className="text-[12px] uppercase tracking-[0.35px] text-[#767d88]">
          STUDIO ANIMASI ANAK · NUSANTARA EDITION
        </span>

        <Link
          href="/generate"
          className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white border border-[#27272a] hover:border-white px-4 py-2 rounded-[4px] transition-colors"
        >
          BUAT SEKUEN CERITA LAINNYA
        </Link>
      </div>
    </div>
  );
}
