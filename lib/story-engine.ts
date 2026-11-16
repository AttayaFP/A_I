import {
  CreateJobInput,
  StoryScene,
} from "@/types/video";

export interface GeneratedStoryResult {
  fullNarration: string;
  moralMessage: string;
  scenes: StoryScene[];
}

export function generateStoryContent(input: CreateJobInput): GeneratedStoryResult {
  const { prompt, duration } = input;
  const isCustomStory = prompt.length > 90 || prompt.includes(".");

  if (isCustomStory) {
    const rawSentences = prompt
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const sceneCount = duration === 10 ? 1 : duration === 15 ? 2 : 3;
    const sceneDuration = Math.round(duration / sceneCount);

    const scenes: StoryScene[] = [];
    const sentencesPerScene = Math.max(
      1,
      Math.ceil(rawSentences.length / sceneCount)
    );

    for (let i = 0; i < sceneCount; i++) {
      const start = i * sentencesPerScene;
      const end = start + sentencesPerScene;
      const sceneSentences = rawSentences.slice(start, end);
      const sceneText =
        sceneSentences.length > 0
          ? sceneSentences.join(". ") + "."
          : `Adegan ke-${i + 1}: ${prompt.slice(0, 80)}`;

      scenes.push({
        sceneNumber: i + 1,
        title: `Babak ${i + 1}`,
        narration: sceneText,
        imageUrl: "",
        duration: sceneDuration,
      });
    }

    const fullNarration = scenes.map((s) => s.narration).join(" ");
    const moralMessage =
      "Pesan Berharga: Setiap cerita penuh kebaikan mengajarkan kita tentang arti persahabatan, ketekunan, dan kejujuran.";

    return {
      fullNarration,
      moralMessage,
      scenes,
    };
  }

  const isBorobudur =
    prompt.toLowerCase().includes("borobudur") ||
    prompt.toLowerCase().includes("candi");
  const isKancil =
    prompt.toLowerCase().includes("kancil") ||
    prompt.toLowerCase().includes("hewan") ||
    prompt.toLowerCase().includes("binatang");
  const isSpace =
    prompt.toLowerCase().includes("roket") ||
    prompt.toLowerCase().includes("mars") ||
    prompt.toLowerCase().includes("antariksa") ||
    prompt.toLowerCase().includes("bintang");
  const isDino =
    prompt.toLowerCase().includes("dino") ||
    prompt.toLowerCase().includes("dinosaurus");

  let storyScenesData: { title: string; narration: string }[] = [];
  let moralMessage =
    "Pesan Moral: Selalu rajin belajar dan berbuat baik kepada sesama manusia dan alam semesta.";

  if (isBorobudur) {
    moralMessage =
      "Pesan Moral: Kerja sama, gotong royong, dan kesabaran tinggi dapat melahirkan karya agung yang dikenang sepanjang masa.";
    if (duration === 10) {
      storyScenesData = [
        {
          title: "Pembangunan Megah",
          narration:
            "Ratusan tahun lalu di tanah Jawa, para pemahat hebat bergotong royong menyusun jutaan batu vulkanik hingga berdirilah Candi Borobudur yang megah dan indah!",
        },
      ];
    } else if (duration === 15) {
      storyScenesData = [
        {
          title: "Batu Vulkanik dari Gunung",
          narration:
            "Zaman dahulu, masyarakat bekerja sama mengumpulkan batu-batu kokoh dari sungai dan lereng gunung dengan penuh semangat.",
        },
        {
          title: "Mahakarya Tanpa Semen",
          narration:
            "Semua batu dipahat dan dikunci rapat tanpa semen hingga berdiri Candi Borobudur yang megah di tengah alam nusantara yang permai.",
        },
      ];
    } else {
      storyScenesData = [
        {
          title: "Awal Mula Rencana Mulia",
          narration:
            "Di sebuah desa yang asri di Jawa Tengah, para tetua dan perancang kerajaan bermusyawarah mendirikan tempat kedamaian yang agung.",
        },
        {
          title: "Gotong Royong Ribuan Warga",
          narration:
            "Ribuan warga dengan riang gembira bergotong royong mengangkut batu kali dan memahat relief relief indah tentang kebaikan budi pekerti.",
        },
        {
          title: "Kemegahan Candi Borobudur",
          narration:
            "Kini Candi Borobudur berdiri kokoh sebagai kebanggaan nusantara, membuktikan bahwa kerja keras bersama selalu membuahkan keajaiban abadi.",
        },
      ];
    }
  } else if (isKancil) {
    moralMessage =
      "Pesan Moral: Kecerdasan dan akal budi yang baik harus digunakan untuk membantu sesama, bukan untuk menjahili orang lain.";
    if (duration === 10) {
      storyScenesData = [
        {
          title: "Si Kancil yang Cerdik",
          narration:
            "Di hutan tropis yang rindang, si Kancil yang lincah selalu menggunakan kecerdasan akalnya untuk menyelesaikan masalah dengan penuh senyuman.",
        },
      ];
    } else if (duration === 15) {
      storyScenesData = [
        {
          title: "Menatap Buah di Seberang Sungai",
          narration:
            "Kancil ingin mencicipi mentimun ranum di seberang sungai yang deras, namun ada para buaya yang sedang berjemur.",
        },
        {
          title: "Jembatan Persahabatan",
          narration:
            "Dengan sopan dan cerdik, Kancil mengajak para buaya berbaris rapi untuk berhitung sambil melompat menyeberang dengan selamat.",
        },
      ];
    } else {
      storyScenesData = [
        {
          title: "Pagi Cerah di Rimba Nusantara",
          narration:
            "Burung-burung berkicau merdu menyambut si Kancil yang melompat lincah di sela rerumputan hijau hutan tropis.",
        },
        {
          title: "Rintangan Sungai Mengalir",
          narration:
            "Saat terhalang sungai berarus deras, Kancil tidak menyerah melainkan menyapa para sahabat buaya dengan santun dan bersahabat.",
        },
        {
          title: "Kecerdasan Membawa Kebaikan",
          narration:
            "Setelah berhasil menyeberang, Kancil tak lupa membagikan mentimun manis kepada kawan-kawannya sebagai tanda terima kasih.",
        },
      ];
    }
  } else if (isSpace) {
    moralMessage =
      "Pesan Moral: Jangan pernah takut bermimpi besar, karena penjelajah cilik hari ini adalah ilmuwan hebat masa depan.";
    if (duration === 10) {
      storyScenesData = [
        {
          title: "Meluncur ke Bintang",
          narration:
            "Tiga, dua, satu! Roket cilik bersinar melesat cepat menembus awan biru menuju keindahan planet Mars dan bintang-bintang berkelap-kelip!",
        },
      ];
    } else if (duration === 15) {
      storyScenesData = [
        {
          title: "Melesat ke Langit Malam",
          narration:
            "Astronot cilik tersenyum bahagia saat roket bertenaga surya meluncur tinggi melewati indahnya bulan purnama.",
        },
        {
          title: "Mendarat di Planet Merah",
          narration:
            "Setibanya di planet Mars yang merah dan ajaib, mereka meneliti bebatuan baru sambil melambaikan tangan ke arah bumi tercinta.",
        },
      ];
    } else {
      storyScenesData = [
        {
          title: "Persiapan di Pangkalan Roket",
          narration:
            "Di stasiun antariksa ceria, para petualang cilik memeriksa helm astronot dan sistem komputer sebelum memulai misi jelajah galaksi.",
        },
        {
          title: "Menari di Hampa Udara",
          narration:
            "Roket melesat halus melintasi gugusan cincin planet Saturnus yang berkilauan bagai emas di angkasa luas.",
        },
        {
          title: "Jejak Kebaikan di Angkasa",
          narration:
            "Mereka menemukan sumber air kristal di planet baru dan mencatat rahasia keindahan alam semesta ciptaan Tuhan yang luar biasa.",
        },
      ];
    }
  } else if (isDino) {
    moralMessage =
      "Pesan Moral: Perbedaan ukuran fisik bukanlah penghalang untuk saling menyayangi dan hidup rukun bersama teman-teman.";
    if (duration === 10) {
      storyScenesData = [
        {
          title: "Dinosaurus Sahabat Kita",
          narration:
            "Di lembah purba yang hijau dan damai, seekor dinosaurus leher panjang yang ramah memetik dedaunan segar sambil menyapa burung-burung kecil!",
        },
      ];
    } else if (duration === 15) {
      storyScenesData = [
        {
          title: "Pagi di Hutan Purba",
          narration:
            "Dino cilik bermain petak umpet di balik pohon pakis raksasa sambil tertawa riang bersama kupu-kupu warna-warni.",
        },
        {
          title: "Saling Membantu Teman",
          narration:
            "Ketika buah manis jatuh ke celah batu, Dino dengan senang hati membukakan jalan agar sahabat-sahabatnya bisa makan bersama.",
        },
      ];
    } else {
      storyScenesData = [
        {
          title: "Dunia Lembah Hijau Purba",
          narration:
            "Jutaan tahun lalu, bumi dipenuhi pepohonan hijau raksasa dan danau bening tempat para dinosaurus bermain bersahabat.",
        },
        {
          title: "Pertolongan Dino yang Baik",
          narration:
            "Brontosaurus yang tinggi membantu burung purba yang kehilangan sarangnya, meletakkannya kembali di pucuk dahan yang aman.",
        },
        {
          title: "Pesta Buah Bersama",
          narration:
            "Semua hewan purba berkumpul di tepi telaga, bersyukur memiliki sahabat yang berhati lembut dan selalu siap menolong sesama.",
        },
      ];
    }
  } else {
    if (duration === 10) {
      storyScenesData = [
        {
          title: "Kisah Kebaikan",
          narration: `${prompt}. Di dunia penuh warna dan keajaiban, setiap langkah petualangan membawa senyuman dan kebahagiaan bagi anak-anak!`,
        },
      ];
    } else if (duration === 15) {
      storyScenesData = [
        {
          title: "Awal Petualangan Ceria",
          narration: `Mari kita mulai cerita tentang ${prompt.toLowerCase()} yang penuh kehangatan dan rasa ingin tahu yang tinggi.`,
        },
        {
          title: "Keberhasilan dan Senyuman",
          narration:
            "Dengan hati yang tulus dan semangat pantang menyerah, segala hal yang diimpikan berhasil terwujud dengan penuh kebahagiaan.",
        },
      ];
    } else {
      storyScenesData = [
        {
          title: "Pengenalan Kisah",
          narration: `Pada suatu hari yang cerah dan indah, dimulailah kisah menakjubkan tentang ${prompt.toLowerCase()}.`,
        },
        {
          title: "Perjalanan Penuh Semangat",
          narration:
            "Berbagai tantangan seru dihadapi bersama para sahabat dengan keceriaan, rasa ingin tahu, dan tolong-menolong.",
        },
        {
          title: "Akhir Cerita yang Membanggakan",
          narration:
            "Petualangan ini membuktikan bahwa persahabatan sejati dan ketulusan hati selalu membuahkan hasil terbaik bagi kita semua.",
        },
      ];
    }
  }

  const sceneDuration = Math.round(duration / storyScenesData.length);
  const scenes: StoryScene[] = storyScenesData.map((s, idx) => ({
    sceneNumber: idx + 1,
    title: s.title,
    narration: s.narration,
    imageUrl: "",
    duration: sceneDuration,
  }));

  const fullNarration = scenes.map((s) => s.narration).join(" ");

  return {
    fullNarration,
    moralMessage,
    scenes,
  };
}
