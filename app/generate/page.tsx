import Link from "next/link";
import { PromptForm } from "@/components/prompt-form";

export default function GeneratePage() {
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
              STUDIO ANIMASI
            </span>
          </div>

          <Link
            href="/"
            className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white transition-colors"
          >
            KEMBALI KE BERANDA
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 lg:px-12 py-16 flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
            STUDIO ANIMASI EDUKASI ANAK
          </span>
          <h1 className="text-3xl sm:text-5xl font-normal text-white leading-none tracking-[-1.2px]">
            Ciptakan video animasi cerita bersuara
          </h1>
          <p className="text-[#767d88] text-base leading-relaxed max-w-2xl tracking-[-0.16px]">
            Pilih gaya kartun 3D nusantara (ala Upin &amp; Ipin) atau Pixar, tentukan tema cerita, pilih narator suara bahasa Indonesia, atau unggah gambar sendiri untuk dihidupkan bergerak. Semuanya 100% gratis!
          </p>
        </div>

        <PromptForm />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-5 rounded-[8px] border border-[#27272a] bg-[#1a1a1a] flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
              GAYA 3D NUSANTARA
            </span>
            <h4 className="text-sm font-normal text-white leading-tight">
              Inspirasi Upin &amp; Ipin
            </h4>
            <p className="text-xs text-[#767d88] leading-relaxed">
              Visual karakter 3D kartun ramah bernuansa nusantara yang hangat dan ceria, sangat cocok untuk dongeng dan kisah sejarah.
            </p>
          </div>

          <div className="p-5 rounded-[8px] border border-[#27272a] bg-[#1a1a1a] flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
              IMAGE-TO-VIDEO
            </span>
            <h4 className="text-sm font-normal text-white leading-tight">
              Hidupkan Gambar Anda
            </h4>
            <p className="text-xs text-[#767d88] leading-relaxed">
              Unggah gambar/foto buatan Anda sendiri dari komputer, dan AI akan menganimasikannya menjadi video bergerak lengkap dengan narasi suara.
            </p>
          </div>

          <div className="p-5 rounded-[8px] border border-[#27272a] bg-[#1a1a1a] flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
              NARASI SUARA &amp; PESAN MORAL
            </span>
            <h4 className="text-sm font-normal text-white leading-tight">
              Bahasa Indonesia &amp; Edukatif
            </h4>
            <p className="text-xs text-[#767d88] leading-relaxed">
              Lengkap dengan suara pembaca cerita bahasa Indonesia, musik pengiring, teks berjalan subtitle, dan kartu hikmah pesan moral.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-[#27272a] bg-[#000000]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[13px] text-[#767d88] tracking-[-0.2px]">
            Runway Kids · Studio Video Animasi Anak
          </span>
          <span className="text-[11px] uppercase tracking-[0.35px] text-[#7d848e]">
            BIAYA NOL · PENYIMPANAN DATA/JOBS.JSON
          </span>
        </div>
      </footer>
    </div>
  );
}
