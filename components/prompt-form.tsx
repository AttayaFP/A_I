"use client";

import { useState, useTransition, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AnimationStyle,
  AspectRatio,
  BgmOption,
  DurationOption,
  StoryTheme,
  TargetAge,
  VoiceCharacter,
} from "@/types/video";

export function PromptForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<AnimationStyle>("nusantara-3d");
  const [theme, setTheme] = useState<StoryTheme>("history");
  const [duration, setDuration] = useState<DurationOption>(10);
  const [ratio, setRatio] = useState<AspectRatio>("16:9");
  const [voice, setVoice] = useState<VoiceCharacter>("female");
  const [bgm, setBgm] = useState<BgmOption>("nusantara");
  const [age, setAge] = useState<TargetAge>("school");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const presets = [
    {
      label: "🏛️ Candi Borobudur",
      prompt:
        "Bagaimana Candi Borobudur dibuat oleh masyarakat nusantara zaman dahulu",
      style: "nusantara-3d" as AnimationStyle,
      theme: "history" as StoryTheme,
      bgm: "nusantara" as BgmOption,
    },
    {
      label: "🦌 Kancil & Buaya",
      prompt:
        "Kisah si Kancil yang cerdik dan ramah menyeberangi sungai bersama para buaya",
      style: "nusantara-3d" as AnimationStyle,
      theme: "moral" as StoryTheme,
      bgm: "cheerful" as BgmOption,
    },
    {
      label: "🚀 Petualangan Mars",
      prompt:
        "Perjalanan roket astronot cilik mendarat di planet Mars penuh rasa ingin tahu",
      style: "pixar-3d" as AnimationStyle,
      theme: "science" as StoryTheme,
      bgm: "cheerful" as BgmOption,
    },
    {
      label: "🦕 Dinosaurus Sahabat",
      prompt:
        "Dinosaurus leher panjang yang berhati lembut suka menolong hewan kecil di hutan purba",
      style: "storybook-2d" as AnimationStyle,
      theme: "fantasy" as StoryTheme,
      bgm: "calm" as BgmOption,
    },
  ];

  const handleApplyPreset = (p: (typeof presets)[0]) => {
    setPrompt(p.prompt);
    setStyle(p.style);
    setTheme(p.theme);
    setBgm(p.bgm);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG, WEBP)");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim() && !image.trim()) {
      setError(
        "Harap tuliskan ide cerita / prompt atau unggah gambar yang ingin dianimasikan."
      );
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: prompt.trim() || "Animasi hidup dari gambar pilihan pengguna",
            duration,
            ratio,
            style,
            theme,
            voice,
            bgm,
            age,
            image: image.trim() ? image.trim() : null,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Gagal membuat pekerjaan video");
          return;
        }

        router.push(`/video/${data.id}`);
      } catch {
        setError(
          "Terjadi kesalahan jaringan saat mengirim permintaan pembuatan"
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-8 bg-[#1a1a1a] border border-[#27272a] rounded-[8px] p-6 sm:p-10"
    >
      <div className="flex flex-col gap-3">
        <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
          Ide Cerita Cepat (Sekali Klik)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              disabled={isPending}
              className="px-3 py-2.5 rounded-[4px] border border-[#27272a] bg-[#030303] text-xs font-medium text-[#767d88] hover:text-white hover:border-[#3f3f3f] transition-colors text-left truncate"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Gaya Animasi Video
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "nusantara-3d", label: "3D Nusantara (Upin-Ipin)" },
              { id: "pixar-3d", label: "3D Pixar Modern" },
              { id: "storybook-2d", label: "Buku Cerita 2D" },
              { id: "anime-chibi", label: "Anime Chibi Imut" },
            ].map((item) => {
              const isActive = style === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyle(item.id as AnimationStyle)}
                  disabled={isPending}
                  className={`h-12 px-3 rounded-[4px] border text-xs font-medium text-left leading-tight transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Tema Cerita
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "history", label: "Sejarah & Budaya" },
              { id: "science", label: "Sains & Alam" },
              { id: "fantasy", label: "Petualangan & Fantasi" },
              { id: "moral", label: "Fabel & Nilai Moral" },
            ].map((item) => {
              const isActive = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id as StoryTheme)}
                  disabled={isPending}
                  className={`h-12 px-3 rounded-[4px] border text-xs font-medium text-left leading-tight transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="prompt"
          className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium flex items-center justify-between"
        >
          <span>Topik Cerita atau Karangan Sendiri</span>
          <span className="text-[11px] text-[#767d88]">
            TOPIK PENDEK / TULIS BEBAS
          </span>
        </label>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Tuliskan topik cerita (contoh: Bagaimana Candi Borobudur dibuat) ATAU tuliskan karangan cerita Anda sendiri di sini agar dibacakan oleh narator AI..."
          className="w-full bg-[#030303] text-white border border-[#27272a] rounded-[4px] p-4 text-base leading-relaxed tracking-[-0.16px] placeholder:text-[#3f3f3f] focus:outline-none focus:border-white transition-colors resize-y"
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-3 p-4 rounded-[6px] border border-[#27272a] bg-[#030303]">
        <div className="flex items-center justify-between">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Unggah Gambar Sendiri (Image-to-Video)
          </span>
          {image && (
            <button
              type="button"
              onClick={() => setImage("")}
              className="text-[11px] uppercase tracking-[0.35px] text-red-400 hover:underline"
            >
              Hapus Gambar
            </button>
          )}
        </div>
        <p className="text-xs text-[#767d88] leading-relaxed">
          Punya gambar buatan sendiri, foto anak, atau karakter kartun? Unggah di sini dan AI akan menghidupkannya menjadi video bergerak!
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <label className="cursor-pointer inline-flex items-center justify-center text-xs uppercase tracking-[0.35px] font-medium text-white border border-[#27272a] hover:border-white px-4 py-2.5 rounded-[4px] transition-colors bg-[#1a1a1a]">
            <span>Pilih File dari Komputer</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isPending}
            />
          </label>

          <span className="text-xs text-[#3f3f3f]">atau tempel tautan:</span>

          <input
            type="url"
            value={image.startsWith("data:") ? "" : image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/gambar-anda.jpg"
            className="flex-1 bg-[#1a1a1a] text-white border border-[#27272a] rounded-[4px] px-3 py-2 text-xs placeholder:text-[#3f3f3f] focus:outline-none focus:border-white transition-colors"
            disabled={isPending}
          />
        </div>

        {image && (
          <div className="mt-3 flex items-center gap-3 p-2 bg-[#1a1a1a] border border-[#27272a] rounded-[4px]">
            <div className="relative w-16 h-12 bg-black rounded overflow-hidden">
              <Image
                src={image}
                alt="Pratinjau Gambar"
                fill
                sizes="64px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="text-xs text-emerald-400 font-medium">
              ✓ Gambar siap dianimasikan bergerak!
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Durasi Video
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {[10, 15, 30].map((d) => {
              const isActive = duration === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d as DurationOption)}
                  disabled={isPending}
                  className={`h-11 rounded-[4px] border text-xs font-medium uppercase tracking-[0.35px] transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {d} Detik
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Rasio Layar
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            {(["16:9", "9:16", "1:1"] as AspectRatio[]).map((r) => {
              const isActive = ratio === r;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRatio(r)}
                  disabled={isPending}
                  className={`h-11 rounded-[4px] border text-xs font-medium uppercase tracking-[0.35px] transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Karakter Suara
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "female", label: "Kakak / Ibu" },
              { id: "male", label: "Paman / Guru" },
            ].map((v) => {
              const isActive = voice === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVoice(v.id as VoiceCharacter)}
                  disabled={isPending}
                  className={`h-11 px-2 rounded-[4px] border text-xs font-medium transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            Target Usia
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: "toddler", label: "Balita (2-5 Th)" },
              { id: "school", label: "Sekolah (6-10 Th)" },
            ].map((a) => {
              const isActive = age === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAge(a.id as TargetAge)}
                  disabled={isPending}
                  className={`h-11 px-2 rounded-[4px] border text-xs font-medium transition-colors ${
                    isActive
                      ? "border-white bg-white text-black"
                      : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
          Musik Latar Belakang (BGM)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: "nusantara", label: "🎵 Nusantara Hangat" },
            { id: "cheerful", label: "🎈 Ceria & Riang" },
            { id: "calm", label: "🌙 Tenang / Pengantar" },
            { id: "none", label: "🔇 Tanpa Musik" },
          ].map((b) => {
            const isActive = bgm === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBgm(b.id as BgmOption)}
                disabled={isPending}
                className={`h-11 px-3 rounded-[4px] border text-xs font-medium text-left leading-tight transition-colors ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-[#27272a] bg-[#030303] text-[#767d88] hover:text-white hover:border-[#3f3f3f]"
                }`}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-[4px] border border-red-900/60 bg-red-950/20 text-red-400 text-sm tracking-[-0.16px]">
          {error}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#27272a]">
        <div className="text-[12px] uppercase tracking-[0.35px] text-[#767d88]">
          STUDIO ANIMASI ANAK · 100% GRATIS SELAMANYA
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto inline-flex items-center justify-center text-[14px] font-semibold text-black bg-white hover:bg-[#e9ecf2] disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3.5 rounded-[4px] leading-none transition-colors"
        >
          {isPending ? "SEDANG MERENDAI CERITA..." : "BUAT VIDEO ANIMASI"}
        </button>
      </div>
    </form>
  );
}
