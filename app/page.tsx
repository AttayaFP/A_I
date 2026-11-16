import Link from "next/link";
import { getAllJobs } from "@/lib/job-store";

export default async function Home() {
  const allJobs = await getAllJobs();
  const completedJobs = allJobs.filter((j) => j.status === "completed").reverse();

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
              STUDIO ANIMASI CERITA ANAK
            </span>
          </div>

          <nav className="flex items-center gap-8">
            <Link
              href="/generate"
              className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] hover:text-white transition-colors"
            >
              BUAT ANIMASI
            </Link>
            <Link
              href="/generate"
              className="text-[14px] font-semibold text-black bg-white hover:bg-[#e9ecf2] px-4 py-2 rounded-[4px] leading-none transition-colors"
            >
              MULAI SEKARANG
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="w-full">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-20 pb-24 flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <span className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
                STUDIO KREATIF ANIMASI &amp; DONGENG NUSANTARA
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-normal text-white leading-none tracking-[-1.2px] max-w-5xl">
                Ciptakan video animasi anak bersuara, semudah mengetik cerita.
              </h1>
              <p className="text-[#767d88] text-base sm:text-lg leading-relaxed max-w-2xl tracking-[-0.2px]">
                Buat video animasi 3D bernuansa nusantara (seperti Upin &amp; Ipin) atau gaya Pixar lengkap dengan suara narator bahasa Indonesia, musik latar, teks subtitle, dan pesan moral. Bisa dari ide teks maupun unggah gambar sendiri!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center text-[14px] font-semibold text-black bg-white hover:bg-[#e9ecf2] px-6 py-3.5 rounded-[4px] leading-none transition-colors"
              >
                BUAT VIDEO ANIMASI SEKARANG
              </Link>
              <div className="text-[12px] uppercase tracking-[0.35px] text-[#767d88] px-3.5 py-3 border border-[#27272a] rounded-[4px]">
                100% GRATIS · BIAYA NOL · TANPA KARTU KREDIT
              </div>
            </div>

            <div className="mt-8 w-full aspect-[21/9] sm:aspect-[16/7] bg-[#030303] border border-[#27272a] rounded-[8px] overflow-hidden flex flex-col justify-between p-6 sm:p-10 relative">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
                <div className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 rounded-[2px] bg-red-600 animate-pulse" />
                  <span>STUDIO PRODUKSI · UPIN &amp; IPIN STYLE</span>
                </div>
                <div>GAYA: 3D ANIMASI NUSANTARA</div>
                <div className="hidden sm:block">SUARA: NARATOR BAHASA INDONESIA</div>
              </div>

              <div className="flex flex-col gap-2 max-w-3xl">
                <span className="text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
                  CONTOH CERITA AKTIF
                </span>
                <p className="text-xl sm:text-2xl lg:text-3xl font-normal text-white leading-tight tracking-[-0.9px]">
                  &quot;Bagaimana Candi Borobudur dibuat oleh para pemahat hebat di tanah Jawa ratusan tahun lalu tanpa menggunakan semen.&quot;
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#27272a] pt-4 text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
                <span>PILIHAN DURASI: 10S · 15S · 30S</span>
                <span>AUDIO: NARASI + BGM NUSANTARA</span>
                <span>STATUS: SIAP PRODUKSI</span>
              </div>
            </div>
          </div>
        </section>

        {completedJobs.length > 0 && (
          <section className="w-full border-t border-[#27272a] bg-[#030303]">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 flex flex-col gap-10">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
                    PUSTAKA CERITA LOKAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-normal text-white leading-none tracking-[-0.9px]">
                    Cerita yang baru saja Anda ciptakan
                  </h2>
                </div>

                <Link
                  href="/generate"
                  className="text-xs uppercase tracking-[0.35px] text-[#767d88] hover:text-white border border-[#27272a] hover:border-white px-3.5 py-2 rounded-[4px] transition-colors"
                >
                  + Tambah Cerita Baru
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedJobs.slice(0, 6).map((job) => (
                  <Link
                    key={job.id}
                    href={`/video/${job.id}`}
                    className="group rounded-[8px] border border-[#27272a] bg-[#1a1a1a] p-5 flex flex-col justify-between min-h-[220px] hover:border-white transition-colors"
                  >
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35px] text-[#767d88]">
                      <span>{job.style}</span>
                      <span>{job.duration} Detik</span>
                    </div>

                    <div className="flex flex-col gap-2 my-4">
                      <h3 className="text-base font-normal text-white leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                        &quot;{job.prompt}&quot;
                      </h3>
                      {job.moralMessage && (
                        <p className="text-xs text-[#767d88] line-clamp-2">
                          {job.moralMessage}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.35px] text-[#767d88] border-t border-[#27272a] pt-3">
                      <span>Rasio: {job.ratio}</span>
                      <span className="text-white group-hover:underline">
                        Tonton Video →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="w-full border-t border-[#27272a] bg-[#030303]">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 flex flex-col gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
                FITUR UTAMA STUDIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal text-white leading-none tracking-[-1px]">
                Teknologi cerdas untuk cerita anak berkualitas tinggi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-[8px] border border-[#27272a] bg-[#1a1a1a] p-6 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.35px] text-amber-400">
                  GAYA KARTUN POPULER
                </span>
                <h3 className="text-xl font-normal text-white leading-tight">
                  3D Nusantara &amp; Pixar
                </h3>
                <p className="text-sm text-[#767d88] leading-relaxed">
                  Pilihan visual animasi 3D ramah anak bergaya Upin &amp; Ipin, kartun modern Pixar, ilustrasi dongeng 2D, maupun anime imut.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#27272a] bg-[#1a1a1a] p-6 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.35px] text-emerald-400">
                  IMAGE-TO-VIDEO
                </span>
                <h3 className="text-xl font-normal text-white leading-tight">
                  Hidupkan Gambar Sendiri
                </h3>
                <p className="text-sm text-[#767d88] leading-relaxed">
                  Unggah gambar atau foto dari komputer Anda dan saksikan AI menganimasikannya bergerak dengan kamera dinamis.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#27272a] bg-[#1a1a1a] p-6 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.35px] text-sky-400">
                  SUARA &amp; MUSIK
                </span>
                <h3 className="text-xl font-normal text-white leading-tight">
                  Narator &amp; Musik Latar
                </h3>
                <p className="text-sm text-[#767d88] leading-relaxed">
                  Suara narator bahasa Indonesia fasih dan jernih, dipadukan alunan musik latar tradisional nusantara atau melodi ceria.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#27272a] bg-[#1a1a1a] p-6 flex flex-col gap-4">
                <span className="text-[11px] uppercase tracking-[0.35px] text-rose-400">
                  EDUKASI &amp; HIKMAH
                </span>
                <h3 className="text-xl font-normal text-white leading-tight">
                  Subtitle &amp; Pesan Moral
                </h3>
                <p className="text-sm text-[#767d88] leading-relaxed">
                  Menampilkan teks narasi kalimat per kalimat di layar untuk belajar membaca, diakhiri kartu pesan moral yang mendidik.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full border-t border-b border-[#27272a] bg-[#000000] py-28 px-6 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
            <span className="text-[14px] uppercase tracking-[0.35px] text-[#767d88] font-medium">
              VISI STUDIO ANIMASI
            </span>
            <blockquote className="text-3xl sm:text-5xl font-normal text-white leading-tight sm:leading-none tracking-[-0.9px]">
              &quot;Membantu anak-anak Indonesia belajar sejarah, sains, dan kebaikan budi pekerti lewat keajaiban animasi cerita.&quot;
            </blockquote>
            <div className="pt-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center text-[14px] font-semibold text-black bg-white hover:bg-[#e9ecf2] px-6 py-3.5 rounded-[4px] leading-none transition-colors"
              >
                BUAT CERITA PERTAMA ANDA SEKARANG
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#27272a] bg-[#000000]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[13px] text-[#767d88] tracking-[-0.2px]">
            <span>RUNWAY KIDS</span>
            <span>·</span>
            <span>STUDIO ANIMASI EDUKASI ANAK NUSANTARA</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.35px] text-[#7d848e]">
            <Link href="/generate" className="hover:text-white transition-colors">
              PEMBUAT VIDEO
            </Link>
            <span className="text-[#27272a]">/</span>
            <span>NEXT.JS APP ROUTER</span>
            <span className="text-[#27272a]">/</span>
            <span>100% GRATIS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
