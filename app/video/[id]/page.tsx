"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { JobStatus, StoryScene } from "@/types/video";
import { StatusIndicator } from "@/components/status-indicator";
import { VideoPlayer } from "@/components/video-player";

interface StatusResponse {
  id: string;
  status: JobStatus;
  videoUrl?: string | null;
  audioUrl?: string | null;
  bgmUrl?: string | null;
  narration?: string | null;
  moralMessage?: string | null;
  scenes?: StoryScene[];
  error?: string;
  prompt?: string;
  ratio?: string;
  duration?: number;
  style?: string;
  theme?: string;
  voice?: string;
  bgm?: string;
  age?: string;
}

function VideoDetailContent() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [status, setStatus] = useState<JobStatus | "loading">("loading");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [bgmUrl, setBgmUrl] = useState<string | null>(null);
  const [narration, setNarration] = useState<string | null>(null);
  const [moralMessage, setMoralMessage] = useState<string | null>(null);
  const [scenes, setScenes] = useState<StoryScene[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [ratio, setRatio] = useState<string>("16:9");
  const [duration, setDuration] = useState<number>(10);
  const [style, setStyle] = useState<string>("nusantara-3d");

  const isFinishedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    async function poll() {
      if (!id || isFinishedRef.current) return;

      try {
        const res = await fetch(`/api/status/${id}`, { cache: "no-store" });
        if (isCancelled) return;

        if (!res.ok) {
          if (res.status === 404) {
            setError("Sekuen pekerjaan tidak ditemukan");
            setStatus("failed");
            isFinishedRef.current = true;
            return;
          }
          setError("Gagal memeriksa status pekerjaan");
          return;
        }

        const data: StatusResponse = await res.json();
        if (isCancelled) return;

        setStatus(data.status);

        if (data.prompt) setPrompt(data.prompt);
        if (data.ratio) setRatio(data.ratio);
        if (data.duration) setDuration(data.duration);
        if (data.style) setStyle(data.style);

        if (data.status === "completed") {
          isFinishedRef.current = true;
          if (data.videoUrl) setVideoUrl(data.videoUrl);
          if (data.audioUrl) setAudioUrl(data.audioUrl);
          if (data.bgmUrl) setBgmUrl(data.bgmUrl);
          if (data.narration) setNarration(data.narration);
          if (data.moralMessage) setMoralMessage(data.moralMessage);
          if (data.scenes) setScenes(data.scenes);
        }

        if (data.status === "failed") {
          isFinishedRef.current = true;
          setError(data.error || "Alur pembuatan video gagal");
        }
      } catch {
        if (!isCancelled) {
          setError(
            "Terjadi kesalahan jaringan saat memeriksa status pekerjaan"
          );
        }
      }
    }

    void poll();

    const interval = setInterval(() => {
      if (!isFinishedRef.current) {
        void poll();
      }
    }, 2000);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col selection:bg-white selection:text-black">
      <header className="w-full border-b border-[#27272a]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-lg font-normal tracking-[-0.9px] text-white"
            >
              RUNWAY KIDS
            </Link>
            <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88] px-2 py-0.5 border border-[#27272a] rounded-[4px]">
              PENINJAU ANIMASI
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/generate"
              className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white transition-colors"
            >
              BUAT CERITA BARU
            </Link>
            <Link
              href="/"
              className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white transition-colors"
            >
              BERANDA
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 lg:px-12 py-16 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            MONITOR STUDIO ANIMASI ANAK
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-white leading-none tracking-[-1.2px]">
            {status === "completed"
              ? "Animasi Cerita Selesai"
              : status === "failed"
              ? "Pembuatan Animasi Gagal"
              : "Sedang Merender Visual & Narasi Suara"}
          </h1>
          <p className="text-[#767d88] text-base leading-relaxed tracking-[-0.16px]">
            {status === "completed"
              ? "Sekuen animasi kartun anak beserta suara narator bahasa Indonesia telah berhasil dirakit dan siap diputar."
              : status === "failed"
              ? "Sistem lokal melaporkan kendala saat memproses permintaan ini."
              : "Menghasilkan visual kartun 3D, menyusun naskah edukatif, dan merender suara narator bahasa Indonesia..."}
          </p>
        </div>

        {status === "loading" && (
          <div className="w-full p-12 bg-[#1a1a1a] border border-[#27272a] rounded-[8px] flex items-center justify-center text-sm uppercase tracking-[0.35px] text-[#767d88]">
            MEMUAT MONITOR PEKERJAAN...
          </div>
        )}

        {(status === "queued" || status === "processing") && id && (
          <div className="flex flex-col gap-8">
            <StatusIndicator status={status} jobId={id} />

            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-[8px] p-6 sm:p-8 flex flex-col gap-4">
              <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
                PARAMETER PRODUKSI ANIMASI
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px] border-b border-[#27272a] pb-4">
                <div>
                  <div className="text-[11px] uppercase text-[#767d88]">GAYA</div>
                  <div className="text-white font-medium">
                    {style === "nusantara-3d"
                      ? "3D Upin & Ipin"
                      : style === "pixar-3d"
                      ? "3D Pixar"
                      : style === "storybook-2d"
                      ? "Buku Cerita 2D"
                      : "Anime Chibi"}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] uppercase text-[#767d88]">DURASI</div>
                  <div className="text-white font-medium">{duration} Detik</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase text-[#767d88]">RASIO</div>
                  <div className="text-white font-medium">{ratio}</div>
                </div>
                <div>
                  <div className="text-[11px] uppercase text-[#767d88]">BIAYA</div>
                  <div className="text-white font-medium">Rp 0 (GRATIS)</div>
                </div>
              </div>

              {prompt && (
                <div className="flex flex-col gap-1 pt-2">
                  <span className="text-[11px] uppercase text-[#767d88]">
                    IDE CERITA
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    &quot;{prompt}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {status === "completed" && videoUrl && (
          <VideoPlayer
            videoUrl={videoUrl}
            audioUrl={audioUrl}
            bgmUrl={bgmUrl}
            narration={narration}
            moralMessage={moralMessage}
            scenes={scenes}
            prompt={prompt}
            ratio={ratio}
            duration={duration}
            style={style}
          />
        )}

        {status === "failed" && (
          <div className="w-full p-8 bg-[#1a1a1a] border border-red-900/60 rounded-[8px] flex flex-col items-start gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] uppercase tracking-[0.35px] text-red-400 font-semibold">
                KESALAHAN EKSEKUSI
              </span>
              <p className="text-base text-zinc-200">
                {error || "Terjadi kendala tak terduga saat merender video."}
              </p>
            </div>

            <Link
              href="/generate"
              className="text-[13px] font-semibold text-black bg-white hover:bg-[#e9ecf2] px-6 py-3 rounded-[4px] leading-none transition-colors"
            >
              COBA BUAT KEMBALI
            </Link>
          </div>
        )}
      </main>

      <footer className="w-full border-t border-[#27272a] bg-[#000000]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#767d88] tracking-[-0.2px]">
            Runway Kids · Studio Animasi Cerita Anak Nusantara
          </span>
          <span className="text-[11px] uppercase tracking-[0.35px] text-[#7d848e]">
            PRODUKSI CERITA SUARA · BIAYA NOL
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function VideoDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#000000] text-white flex items-center justify-center">
          <div className="text-[13px] uppercase tracking-[0.35px] text-[#767d88]">
            MEMUAT PENINJAU ANIMASI...
          </div>
        </div>
      }
    >
      <VideoDetailContent />
    </Suspense>
  );
}
