/* =========================================================
   LKPD Berpikir Komputasional — Game Logic v2
   + Timer Mode Tantangan + 15 Masalah + Mode Guru
   ========================================================= */

// ============ DATA SOAL DEFAULT ============

const LEVEL1_DATA = [
  { term: "Decomposition (Dekomposisi)",
    def: "Memecah masalah besar menjadi bagian-bagian kecil (breaking a big problem into smaller parts)" },
  { term: "Pattern Recognition (Pengenalan Pola)",
    def: "Mencari kesamaan atau pola dari masalah yang pernah ada (finding similarities or patterns)" },
  { term: "Abstraction (Abstraksi)",
    def: "Fokus pada hal penting, mengabaikan detail yang tidak perlu (focusing on what matters)" },
  { term: "Algorithm (Algoritma)",
    def: "Menyusun langkah-langkah penyelesaian secara berurutan (arranging steps in order)" }
];

const LEVEL2_DATA = [
  { scenario: "Jihan disuruh membersihkan kamar dalam 30 menit. Ia bingung harus mulai dari mana.",
    question: "Pertanyaan analisis mana yang paling tepat untuk mengetahui 'garis finish'-nya?",
    options: ["Apa tujuan akhirnya? (What is the final goal?)",
              "Apa saja yang sudah kita punya? (What do we have?)",
              "Apa hambatannya? (What are the obstacles?)",
              "Informasi apa yang masih kurang? (What info is missing?)"],
    answer: 0,
    explanation: "'Apa tujuan akhirnya?' membantu kita tahu garis finish. Di kasus Jihan: kamar bersih dalam 30 menit." },
  { scenario: "Doni ingin belajar untuk ulangan besok. Ia sudah punya buku dan catatan.",
    question: "Pertanyaan analisis mana yang cocok untuk mengidentifikasi hambatan?",
    options: ["Apa tujuan akhirnya? (What is the final goal?)",
              "Apa saja yang sudah kita punya? (What do we have?)",
              "Apa hambatannya? (What are the obstacles?)",
              "Informasi apa yang masih kurang? (What info is missing?)"],
    answer: 2,
    explanation: "Hambatan Doni: materi banyak, waktu terbatas. Mengetahui hambatan membantu kita siap-siap." },
  { scenario: "Sari mau piknik sekolah. Ia belum tahu barang apa saja yang wajib dibawa.",
    question: "Pertanyaan analisis mana yang paling tepat untuk kondisi Sari?",
    options: ["Apa tujuan akhirnya? (What is the final goal?)",
              "Apa saja yang sudah kita punya? (What do we have?)",
              "Apa hambatannya? (What are the obstacles?)",
              "Informasi apa yang masih kurang? (What info is missing?)"],
    answer: 3,
    explanation: "Sari kurang informasi tentang barang wajib. Ia perlu baca surat edaran dulu." },
  { scenario: "Budi ingin menabung untuk membeli sepatu baru seharga Rp 300.000.",
    question: "Pertanyaan analisis mana yang membantu Budi tahu berapa lama ia harus menabung?",
    options: ["Apa tujuan akhirnya? (What is the final goal?)",
              "Apa saja yang sudah kita punya? (What do we have?)",
              "Apa hambatannya? (What are the obstacles?)",
              "Informasi apa yang masih kurang? (What info is missing?)"],
    answer: 1,
    explanation: "Budi perlu tahu sumber daya yang dimiliki (uang jajan per hari) agar tahu berapa lama menabung." }
];

// ===== LEVEL 3: 15 SKENARIO DEKOMPOSISI =====
const LEVEL3_DATA = [
  { title: "PR Matematika yang Menumpuk (Stacked Math Homework)",
    steps: ["Kumpulkan semua PR dan catat deadline masing-masing",
            "Urutkan dari yang paling sulit atau paling dekat deadline",
            "Kerjakan satu bab/topik dalam satu waktu, jangan loncat-loncat",
            "Cek kembali jawaban setelah selesai satu bagian",
            "Simpan dan siapkan untuk dikumpulkan besok"] },
  { title: "Persiapan Ulangan Harian (Preparing for a Quiz)",
    steps: ["Cari tahu materi apa saja yang akan diujikan",
            "Kumpulkan semua catatan dan rangkuman terkait materi itu",
            "Bagi materi menjadi beberapa sesi belajar per hari",
            "Kerjakan latihan soal untuk menguji pemahaman",
            "Review ulang bagian yang masih sering salah"] },
  { title: "Kamar Tidur yang Berantakan (Messy Bedroom)",
    steps: ["Pisahkan barang menjadi kategori (baju, buku, mainan, sampah)",
            "Buang barang yang sudah tidak terpakai",
            "Kembalikan barang ke tempat aslinya per kategori",
            "Bersihkan lantai dan meja dari debu",
            "Rapikan tempat tidur sebagai sentuhan akhir"] },
  { title: "Membuat Jadwal Belajar Mingguan (Weekly Study Schedule)",
    steps: ["Catat semua kegiatan tetap (sekolah, les, ekskul)",
            "Identifikasi waktu kosong yang tersedia tiap hari",
            "Bagi waktu kosong tersebut untuk tiap mata pelajaran",
            "Prioritaskan mapel yang dirasa paling sulit",
            "Tempel jadwal di tempat yang mudah terlihat"] },
  { title: "Tugas Proyek Kelompok (Group Project)",
    steps: ["Diskusikan pembagian tugas ke setiap anggota",
            "Tentukan tenggat waktu untuk tiap bagian tugas",
            "Kerjakan bagian masing-masing secara paralel",
            "Gabungkan semua hasil kerja menjadi satu",
            "Review bersama sebelum dikumpulkan"] },
  { title: "Memilih Ekstrakurikuler (Choosing an Extracurricular)",
    steps: ["Buat daftar semua ekskul yang tersedia di sekolah",
            "Cocokkan dengan minat dan bakat pribadi",
            "Cek jadwal ekskul agar tidak bentrok dengan kegiatan lain",
            "Coba ikuti sesi percobaan jika tersedia",
            "Putuskan pilihan akhir dan daftar resmi"] },
  { title: "Mengatur Uang Jajan Sebulan (Managing Monthly Pocket Money)",
    steps: ["Hitung total uang jajan yang diterima",
            "Bagi jumlah tersebut per hari atau per minggu",
            "Catat pengeluaran harian secara sederhana",
            "Sisihkan sedikit untuk ditabung",
            "Evaluasi di akhir minggu apakah pengeluaran sesuai rencana"] },
  { title: "Menyiapkan Presentasi di Depan Kelas (Class Presentation)",
    steps: ["Kumpulkan materi inti yang akan disampaikan",
            "Susun materi menjadi poin-poin penting di slide",
            "Latihan bicara di depan cermin atau keluarga",
            "Siapkan jawaban untuk kemungkinan pertanyaan",
            "Tampil presentasi dengan tenang dan percaya diri"] },
  { title: "Merencanakan Ulang Tahun Teman (Planning a Friend's Birthday)",
    steps: ["Tentukan tanggal, tempat, dan tema acara",
            "Buat daftar tamu yang akan diundang",
            "Susun anggaran untuk makanan dan dekorasi",
            "Bagi tugas persiapan ke teman-teman lain",
            "Cek ulang semua persiapan H-1 sebelum acara"] },
  { title: "Meja Belajar yang Berantakan (Tidying the Study Desk)",
    steps: ["Keluarkan semua barang dari atas meja",
            "Pilah kertas penting dan yang bisa dibuang",
            "Kelompokkan alat tulis sesuai fungsinya",
            "Susun kembali barang sesuai prioritas penggunaan",
            "Bersihkan permukaan meja dari debu"] },
  { title: "Persiapan Piknik Sekolah (School Picnic Prep)",
    steps: ["Baca surat edaran untuk tahu barang yang wajib dibawa",
            "Buat daftar checklist barang bawaan",
            "Siapkan barang sehari sebelum keberangkatan",
            "Centang daftar saat memasukkan ke dalam tas",
            "Cek ulang tas sebelum berangkat di pagi hari"] },
  { title: "Menghafal Kosakata Bahasa Inggris (Memorizing English Vocabulary)",
    steps: ["Kumpulkan daftar kosakata yang harus dihafal",
            "Bagi kosakata menjadi kelompok kecil (5-10 kata)",
            "Hafalkan satu kelompok sebelum lanjut ke kelompok berikutnya",
            "Uji diri sendiri dengan menutup arti kata",
            "Ulangi kelompok yang masih sering salah keesokan harinya"] },
  { title: "Konflik dengan Teman (Conflict with a Friend)",
    steps: ["Tenangkan diri dulu sebelum bicara",
            "Cari tahu akar masalah dari sudut pandang masing-masing",
            "Sampaikan perasaan dengan cara yang sopan",
            "Dengarkan penjelasan teman tanpa memotong",
            "Cari solusi bersama agar tidak terulang lagi"] },
  { title: "Membuat Video Pendek untuk Tugas (Making a Short Video)",
    steps: ["Tulis ide cerita atau naskah singkat",
            "Siapkan alat rekam (HP/kamera) dan lokasi",
            "Rekam video sesuai naskah yang sudah dibuat",
            "Edit video dan tambahkan teks/musik jika perlu",
            "Ekspor video dan kirim sesuai format tugas"] },
  { title: "Merapikan Tas Sekolah (Organizing School Bag)",
    steps: ["Cek jadwal pelajaran untuk besok hari",
            "Kumpulkan buku dan alat sesuai mata pelajaran besok",
            "Masukkan barang ke tas sesuai urutan pemakaian",
            "Sisipkan alat tulis dan perlengkapan pendukung lainnya",
            "Cek ulang tas sebelum tidur agar pagi tidak terburu-buru"] }
];

// ===== LEVEL 4: 15 RIDDLE TEBAK MASALAH =====
const LEVEL4_DATA = [
  { steps: ["Cek prakiraan cuaca sebelum berangkat",
            "Siapkan payung atau jas hujan sejak malam sebelumnya",
            "Bungkus buku dan alat elektronik agar tidak basah",
            "Berangkat lebih awal untuk antisipasi jalan tergenang",
            "Pilih rute yang lebih aman jika ada genangan air"],
    correct: "Perjalanan ke Sekolah Saat Hujan (Going to School in the Rain)",
    distractors: ["Persiapan Piknik Sekolah (School Picnic Prep)",
                  "Merapikan Tas Sekolah (Organizing School Bag)",
                  "Menghafal Kosakata (Memorizing Vocabulary)"] },
  { steps: ["Cari tahu materi apa saja yang akan diujikan",
            "Kumpulkan semua catatan dan rangkuman",
            "Bagi materi menjadi beberapa sesi belajar",
            "Kerjakan latihan soal untuk menguji pemahaman",
            "Review ulang bagian yang masih sering salah"],
    correct: "Persiapan Ulangan Harian (Preparing for a Quiz)",
    distractors: ["PR Matematika yang Menumpuk (Stacked Math Homework)",
                  "Membuat Jadwal Belajar (Weekly Study Schedule)",
                  "Menghafal Kosakata (Memorizing Vocabulary)"] },
  { steps: ["Tentukan tanggal, tempat, dan tema acara",
            "Buat daftar tamu yang akan diundang",
            "Susun anggaran untuk makanan dan dekorasi",
            "Bagi tugas persiapan ke teman-teman lain",
            "Cek ulang semua persiapan H-1 sebelum acara"],
    correct: "Merencanakan Ulang Tahun Teman (Planning a Friend's Birthday)",
    distractors: ["Tugas Proyek Kelompok (Group Project)",
                  "Membuat Video Pendek (Making a Short Video)",
                  "Mengatur Uang Jajan (Managing Pocket Money)"] },
  { steps: ["Diskusikan pembagian tugas ke setiap anggota",
            "Tentukan tenggat waktu untuk tiap bagian tugas",
            "Kerjakan bagian masing-masing secara paralel",
            "Gabungkan semua hasil kerja menjadi satu",
            "Review bersama sebelum dikumpulkan"],
    correct: "Tugas Proyek Kelompok (Group Project)",
    distractors: ["Membuat Video Pendek (Making a Short Video)",
                  "Menyiapkan Presentasi (Class Presentation)",
                  "Memilih Ekstrakurikuler (Choosing an Extracurricular)"] },
  { steps: ["Buat daftar semua ekskul yang tersedia di sekolah",
            "Cocokkan dengan minat dan bakat pribadi",
            "Cek jadwal ekskul agar tidak bentrok",
            "Coba ikuti sesi percobaan jika tersedia",
            "Putuskan pilihan akhir dan daftar resmi"],
    correct: "Memilih Ekstrakurikuler (Choosing an Extracurricular)",
    distractors: ["Membuat Jadwal Belajar (Weekly Study Schedule)",
                  "Menyiapkan Presentasi (Class Presentation)",
                  "Mengatur Uang Jajan (Managing Pocket Money)"] },
  { steps: ["Kumpulkan materi inti yang akan disampaikan",
            "Susun materi menjadi poin-poin penting di slide",
            "Latihan bicara di depan cermin atau keluarga",
            "Siapkan jawaban untuk kemungkinan pertanyaan",
            "Tampil presentasi dengan tenang dan percaya diri"],
    correct: "Menyiapkan Presentasi di Depan Kelas (Class Presentation)",
    distractors: ["Membuat Video Pendek (Making a Short Video)",
                  "Tugas Proyek Kelompok (Group Project)",
                  "Persiapan Ulangan Harian (Preparing for a Quiz)"] },
  { steps: ["Hitung total uang jajan yang diterima",
            "Bagi jumlah tersebut per hari atau per minggu",
            "Catat pengeluaran harian secara sederhana",
            "Sisihkan sedikit untuk ditabung",
            "Evaluasi di akhir minggu apakah pengeluaran sesuai rencana"],
    correct: "Mengatur Uang Jajan Sebulan (Managing Monthly Pocket Money)",
    distractors: ["Menabung untuk Sepatu Baru (Saving for New Shoes)",
                  "Mengatur Waktu Bermain Game (Managing Game Time)",
                  "Merapikan Meja Belajar (Tidying the Study Desk)"] },
  { steps: ["Keluarkan semua barang dari atas meja",
            "Pilah kertas penting dan yang bisa dibuang",
            "Kelompokkan alat tulis sesuai fungsinya",
            "Susun kembali barang sesuai prioritas penggunaan",
            "Bersihkan permukaan meja dari debu"],
    correct: "Meja Belajar yang Berantakan (Tidying the Study Desk)",
    distractors: ["Kamar Tidur yang Berantakan (Messy Bedroom)",
                  "Merapikan Tas Sekolah (Organizing School Bag)",
                  "PR Matematika yang Menumpuk (Stacked Math Homework)"] },
  { steps: ["Cari tahu harga sepatu yang diinginkan",
            "Hitung berapa lama waktu menabung yang dibutuhkan",
            "Tentukan jumlah tabungan harian/mingguan",
            "Simpan uang secara konsisten di tempat aman",
            "Cek total tabungan secara berkala hingga cukup"],
    correct: "Menabung untuk Membeli Sepatu Baru (Saving for New Shoes)",
    distractors: ["Mengatur Uang Jajan (Managing Pocket Money)",
                  "Memilih Ekstrakurikuler (Choosing an Extracurricular)",
                  "Mengatur Waktu Bermain Game (Managing Game Time)"] },
  { steps: ["Selesaikan semua tugas sekolah terlebih dahulu",
            "Tentukan batas waktu bermain game per hari",
            "Pasang alarm sebagai pengingat waktu habis",
            "Hentikan permainan tepat saat alarm berbunyi",
            "Evaluasi mingguan apakah waktu bermain sudah seimbang"],
    correct: "Mengatur Waktu Bermain Game dan Belajar (Managing Game Time)",
    distractors: ["Membuat Jadwal Belajar (Weekly Study Schedule)",
                  "PR Matematika yang Menumpuk (Stacked Math Homework)",
                  "Persiapan Ulangan Harian (Preparing for a Quiz)"] },
  { steps: ["Baca resep dan siapkan semua bahan yang diperlukan",
            "Cuci dan potong bahan sesuai kebutuhan resep",
            "Masak bahan sesuai urutan langkah di resep",
            "Cicipi dan sesuaikan rasa jika diperlukan",
            "Sajikan masakan dan bersihkan alat yang telah dipakai"],
    correct: "Membantu Orang Tua Memasak (Helping Parents Cook)",
    distractors: ["Merapikan Meja Belajar (Tidying the Study Desk)",
                  "Persiapan Piknik Sekolah (School Picnic Prep)",
                  "Merencanakan Ulang Tahun Teman (Planning a Friend's Birthday)"] },
  { steps: ["Pahami dulu apa hasil akhir yang diminta soal",
            "Pecah logika program menjadi langkah-langkah kecil",
            "Tulis kode sesuai langkah logika yang sudah dibuat",
            "Jalankan program dan lihat apakah hasilnya sesuai",
            "Perbaiki bagian kode yang masih menghasilkan error"],
    correct: "Tugas Coding Sederhana (Simple Coding Task)",
    distractors: ["Membuat Video Pendek (Making a Short Video)",
                  "Persiapan Presentasi (Presentation Preparation)",
                  "Membantu Orang Tua Memasak (Helping Parents Cook)"] },
  { steps: ["Tulis ide cerita atau naskah singkat",
            "Siapkan alat rekam (HP/kamera) dan lokasi",
            "Rekam video sesuai naskah yang sudah dibuat",
            "Edit video dan tambahkan teks/musik jika perlu",
            "Ekspor video dan kirim sesuai format tugas"],
    correct: "Membuat Video Pendek untuk Tugas (Making a Short Video)",
    distractors: ["Menyiapkan Presentasi (Class Presentation)",
                  "Tugas Proyek Kelompok (Group Project)",
                  "Merencanakan Ulang Tahun Teman (Planning a Friend's Birthday)"] },
  { steps: ["Tenangkan diri dulu sebelum bicara",
            "Cari tahu akar masalah dari sudut pandang masing-masing",
            "Sampaikan perasaan dengan cara yang sopan",
            "Dengarkan penjelasan teman tanpa memotong",
            "Cari solusi bersama agar tidak terulang lagi"],
    correct: "Konflik dengan Teman (Conflict with a Friend)",
    distractors: ["Memilih Ekstrakurikuler (Choosing an Extracurricular)",
                  "Persiapan Ulangan Harian (Preparing for a Quiz)",
                  "Membantu Orang Tua Memasak (Helping Parents Cook)"] },
  { steps: ["Kumpulkan semua PR dan catat deadline masing-masing",
            "Urutkan dari yang paling sulit atau paling dekat deadline",
            "Kerjakan satu bab/topik dalam satu waktu",
            "Cek kembali jawaban setelah selesai satu bagian",
            "Simpan dan siapkan untuk dikumpulkan besok"],
    correct: "PR Matematika yang Menumpuk (Stacked Math Homework)",
    distractors: ["Persiapan Ulangan Harian (Preparing for a Quiz)",
                  "Membuat Jadwal Belajar (Weekly Study Schedule)",
                  "Meja Belajar yang Berantakan (Tidying the Study Desk)"] }
];

const LEVEL5_DATA = {
  pattern: [
    { slot: 1, answer: "kumpulkan", en: "gather information" },
    { slot: 2, answer: "pilah/bagi", en: "sort / divide" },
    { slot: 3, answer: "kerjakan bertahap", en: "do gradually" },
    { slot: 4, answer: "periksa", en: "check" },
    { slot: 5, answer: "selesaikan", en: "finish" }
  ],
  wordBank: ["kumpulkan", "pilah/bagi", "kerjakan bertahap", "periksa", "selesaikan",
             "abaikan", "tunda", "lupakan", "serahkan"]
};

// ============ STATE ============
const STORAGE_KEY = "lkpd_comp_thinking_best_score";
const CUSTOM_KEY  = "lkpd_comp_thinking_custom_questions";

const state = {
  nama: "",
  modeTimer: "latihan",   // "latihan" atau "tantangan"
  flow: "adventure",      // "adventure" atau "free"
  showArti: true,
  mute: false,
  currentLevel: 0,
  scores: [0, 0, 0, 0, 0],
  bonusPoints: 0,
  wrongLevels: [],
  startTime: null,
  // timer
  timeLeft: 0,
  timerInterval: null,
  // data aktif (bisa dioverride oleh custom/URL)
  data: {
    l1: LEVEL1_DATA,
    l2: LEVEL2_DATA,
    l3: LEVEL3_DATA,
    l4: LEVEL4_DATA,
    l5: LEVEL5_DATA
  },
  // runtime per level
  l1: { selectedLeft: null, matched: 0 },
  l2: { qIndex: 0, correctCount: 0 },
  l3: { scenarioIndex: 0, order: [], correctOrder: [] },
  l4: { qIndex: 0, correctCount: 0 },
  l5: { placements: {}, selectedWord: null, correctCount: 0 }
};

const TIMER_PER_LEVEL = 90; // detik untuk Mode Tantangan
const TIMER_BONUS_THRESHOLD = 30; // sisa detik untuk dapat bonus
const TIMER_BONUS_VALUE = 2; // poin bonus

// ============ AUDIO ============
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { audioCtx = null; }
  }
  return audioCtx;
}
function playTone(freq, duration, type) {
  if (state.mute) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + duration / 1000);
}
function soundCorrect() { playTone(880, 120, "sine"); }
function soundWrong()   { playTone(180, 200, "square"); }
function soundFinish()  {
  playTone(523, 150, "sine");
  setTimeout(() => playTone(659, 150, "sine"), 150);
  setTimeout(() => playTone(784, 220, "sine"), 300);
}

// ============ HELPERS ============
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#" + id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showModal(id) { $("#" + id).classList.remove("hidden"); }
function hideModal(id) { $("#" + id).classList.add("hidden"); }

// ============ TIMER ============
function startLevelTimer() {
  stopLevelTimer();
  if (state.modeTimer !== "tantangan") {
    updateTimerDisplay();
    return;
  }
  state.timeLeft = TIMER_PER_LEVEL;
  updateTimerDisplay();
  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();
    if (state.timeLeft <= 0) {
      stopLevelTimer();
      handleTimeUp();
    }
  }, 1000);
}
function stopLevelTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}
function updateTimerDisplay() {
  const el = $("#timerDisplay");
  if (!el) return;
  if (state.modeTimer === "latihan") {
    el.textContent = "🧘 Latihan";
    el.classList.remove("danger");
    return;
  }
  const m = Math.floor(state.timeLeft / 60);
  const s = state.timeLeft % 60;
  el.textContent = "⏱ " + m + ":" + String(s).padStart(2, "0");
  el.classList.toggle("danger", state.timeLeft <= 15);
}
function awardTimeBonus() {
  if (state.modeTimer === "tantangan" && state.timeLeft >= TIMER_BONUS_THRESHOLD) {
    state.bonusPoints += TIMER_BONUS_VALUE;
    return TIMER_BONUS_VALUE;
  }
  return 0;
}
function handleTimeUp() {
  soundWrong();
  showFeedback("⏰", "Waktu Habis! / Time's Up!",
    "Level ini berakhir karena waktu habis. Lanjut ke level berikutnya ya!",
    () => {
      hideModal("modalFeedback");
      gotoNextLevel();
    });
}

// ============ WELCOME SCREEN ============
$$(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.modeTimer = btn.dataset.mode;
  });
});
$$(".flow-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".flow-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.flow = btn.dataset.flow;
  });
});

$("#btnHelp").addEventListener("click", () => showModal("modalHelp"));
$("#btnCloseHelp").addEventListener("click", () => hideModal("modalHelp"));

$("#btnStart").addEventListener("click", () => {
  const nama = $("#inputNama").value.trim();
  if (!nama) { alert("Nama wajib diisi dulu ya! / Please enter your name first."); return; }
  state.nama = nama;
  state.startTime = Date.now();
  state.scores = [0, 0, 0, 0, 0];
  state.bonusPoints = 0;
  state.wrongLevels = [];
  state.currentLevel = 0;
  $("#topbar").classList.remove("hidden");
  if (state.flow === "free") {
    showScreen("screen-free");
  } else {
    startLevel(0);
  }
});

// ============ FREE MODE ============
$$(".free-level-list .btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const lvl = parseInt(btn.dataset.freelvl, 10);
    state.scores = [0, 0, 0, 0, 0];
    state.bonusPoints = 0;
    state.wrongLevels = [];
    state.startTime = Date.now();
    startLevel(lvl);
  });
});
$("#btnCloseFree").addEventListener("click", () => {
  showScreen("screen-welcome");
  $("#topbar").classList.add("hidden");
});

// ============ TOP CONTROLS ============
$("#btnToggleArti").addEventListener("click", () => {
  state.showArti = !state.showArti;
  $("#btnToggleArti").classList.toggle("off", !state.showArti);
  renderLevel(state.currentLevel);
});
$("#btnMute").addEventListener("click", () => {
  state.mute = !state.mute;
  $("#btnMute").textContent = state.mute ? "🔇" : "🔊";
});

// ============ LEVEL DISPATCHER ============
function startLevel(idx) {
  state.currentLevel = idx;
  const labels = [
    "Level 1 dari 5 — Kenali 4 Keterampilan",
    "Level 2 dari 5 — 4 Pertanyaan Analisis",
    "Level 3 dari 5 — Susun Langkah Dekomposisi",
    "Level 4 dari 5 — Tebak Masalah",
    "Level 5 dari 5 — Pola Dekomposisi"
  ];
  $("#levelLabel").textContent = labels[idx];
  $("#progressFill").style.width = ((idx) / 5 * 100) + "%";
  renderLevel(idx);
  showScreen("screen-level");
  startLevelTimer();
}

function renderLevel(idx) {
  if (idx === 0) renderLevel1();
  else if (idx === 1) renderLevel2();
  else if (idx === 2) renderLevel3();
  else if (idx === 3) renderLevel4();
  else if (idx === 4) renderLevel5();
}

function gotoNextLevel() {
  stopLevelTimer();
  const bonus = awardTimeBonus();
  const next = state.currentLevel + 1;
  if (next >= 5) { showResult(); return; }
  const bonusMsg = bonus > 0 ? ` ⚡ Bonus +${bonus} poin karena sisa waktu >30s!` : "";
  if (bonusMsg) setTimeout(() => alert("⚡ Bonus waktu! +" + bonus + " poin"), 100);
  startLevel(next);
}

// ============ LEVEL 1: MATCHING ============
function renderLevel1() {
  const content = $("#levelContent");
  const left = shuffle(state.data.l1.map((d, i) => ({ ...d, idx: i })));
  const right = shuffle(state.data.l1.map((d, i) => ({ ...d, idx: i })));
  state.l1.matched = 0;
  state.l1.selectedLeft = null;

  content.innerHTML = `
    <div class="card">
      <div class="level-title">🧩 Level 1 — Kenali 4 Keterampilan</div>
      <div class="level-instruction">
        Klik kartu di kolom <b>kiri</b> (istilah), lalu klik kartu di kolom <b>kanan</b> (definisi) yang cocok.<br>
        <i>Click a term on the left, then click its matching definition on the right.</i>
      </div>
      <div class="match-grid">
        <div class="match-col" id="colLeft">
          ${left.map(d => `<div class="match-card" data-side="left" data-idx="${d.idx}">${d.term}</div>`).join("")}
        </div>
        <div class="match-col" id="colRight">
          ${right.map(d => `<div class="match-card" data-side="right" data-idx="${d.idx}">${state.showArti ? d.def : d.def.split("(")[0]}</div>`).join("")}
        </div>
      </div>
    </div>
  `;
  $("#levelNav").innerHTML = "";
  content.querySelectorAll('.match-card').forEach(card => {
    card.addEventListener("click", () => handleL1Click(card));
  });
}

function handleL1Click(card) {
  if (card.classList.contains("matched")) return;
  const side = card.dataset.side;
  if (side === "left") {
    if (state.l1.selectedLeft) state.l1.selectedLeft.classList.remove("selected");
    state.l1.selectedLeft = card;
    card.classList.add("selected");
    return;
  }
  if (!state.l1.selectedLeft) return;
  const leftCard = state.l1.selectedLeft;
  if (leftCard.dataset.idx === card.dataset.idx) {
    leftCard.classList.remove("selected");
    leftCard.classList.add("matched");
    card.classList.add("matched");
    state.l1.matched++;
    state.scores[0] = Math.round(state.l1.matched * 16 / state.data.l1.length);
    soundCorrect();
    state.l1.selectedLeft = null;
    if (state.l1.matched === state.data.l1.length) {
      setTimeout(() => {
        showFeedback("✅", "Bagus!", "Kamu sudah kenal 4 pondasi Computational Thinking.", () => {
          hideModal("modalFeedback");
          gotoNextLevel();
        });
      }, 400);
    }
  } else {
    card.classList.add("wrong");
    leftCard.classList.add("wrong");
    soundWrong();
    setTimeout(() => {
      card.classList.remove("wrong");
      leftCard.classList.remove("wrong");
      leftCard.classList.remove("selected");
      state.l1.selectedLeft = null;
    }, 500);
  }
}

// ============ LEVEL 2 ============
function renderLevel2() {
  state.l2.qIndex = 0;
  state.l2.correctCount = 0;
  renderL2Question();
  $("#levelNav").innerHTML = "";
}

function renderL2Question() {
  const content = $("#levelContent");
  const q = state.data.l2[state.l2.qIndex];
  content.innerHTML = `
    <div class="card">
      <div class="level-title">🔍 Level 2 — Soal ${state.l2.qIndex + 1} dari ${state.data.l2.length}</div>
      <div class="level-instruction">Baca skenario, lalu pilih pertanyaan analisis yang paling tepat.</div>
      <div class="q-scenario">${q.scenario}</div>
      <div class="q-question">${q.question}</div>
      <div class="q-options">
        ${q.options.map((opt, i) => `<button class="q-option" data-i="${i}">${opt}</button>`).join("")}
      </div>
    </div>
  `;
  content.querySelectorAll(".q-option").forEach(btn => {
    btn.addEventListener("click", () => handleL2Answer(parseInt(btn.dataset.i, 10), btn));
  });
}

function handleL2Answer(i, btn) {
  const q = state.data.l2[state.l2.qIndex];
  const all = $("#levelContent").querySelectorAll(".q-option");
  all.forEach(b => b.disabled = true);
  if (i === q.answer) {
    btn.classList.add("correct");
    state.l2.correctCount++;
    state.scores[1] = Math.round(state.l2.correctCount * 24 / state.data.l2.length);
    soundCorrect();
  } else {
    btn.classList.add("wrong");
    all[q.answer].classList.add("correct");
    soundWrong();
  }
  setTimeout(() => {
    showFeedback(i === q.answer ? "✅" : "❌",
      i === q.answer ? "Benar! / Correct!" : "Belum tepat / Not quite",
      q.explanation,
      () => {
        hideModal("modalFeedback");
        state.l2.qIndex++;
        if (state.l2.qIndex >= state.data.l2.length) gotoNextLevel();
        else renderL2Question();
      });
  }, 500);
}

// ============ LEVEL 3 ============
function renderLevel3() {
  state.l3.scenarioIndex = 0;
  initL3Scenario();
  $("#levelNav").innerHTML = "";
}

function initL3Scenario() {
  const scenario = state.data.l3[state.l3.scenarioIndex];
  state.l3.correctOrder = scenario.steps.map((_, i) => i);
  let shuffled;
  do { shuffled = shuffle(scenario.steps); }
  while (shuffled.every((s, i) => s === scenario.steps[i]) && scenario.steps.length > 1);
  state.l3.order = shuffled;

  const content = $("#levelContent");
  content.innerHTML = `
    <div class="card">
      <div class="level-title">📋 Level 3 — Skenario ${state.l3.scenarioIndex + 1} dari ${state.data.l3.length}</div>
      <div class="level-instruction">Susun 5 langkah berikut agar urutannya benar. Gunakan tombol ▲/▼ untuk menggeser posisi.</div>
      <div class="seq-title">${scenario.title}</div>
      <ul class="seq-list" id="seqList"></ul>
      <button id="btnCheckL3" class="btn btn-primary" style="margin-top:12px;">✓ Periksa Urutan / Check Order</button>
    </div>
  `;
  renderL3List();
  $("#btnCheckL3").addEventListener("click", checkL3);
}

function renderL3List() {
  const list = $("#seqList");
  list.innerHTML = state.l3.order.map((step, i) => `
    <li class="seq-item">
      <div class="seq-num">${i + 1}</div>
      <div class="seq-text">${step}</div>
      <div class="seq-arrows">
        <button class="seq-arrow" data-dir="up" data-i="${i}" ${i === 0 ? "disabled" : ""}>▲</button>
        <button class="seq-arrow" data-dir="down" data-i="${i}" ${i === state.l3.order.length - 1 ? "disabled" : ""}>▼</button>
      </div>
    </li>
  `).join("");
  list.querySelectorAll(".seq-arrow").forEach(btn => {
    btn.addEventListener("click", () => moveL3(parseInt(btn.dataset.i, 10), btn.dataset.dir));
  });
}

function moveL3(i, dir) {
  const j = dir === "up" ? i - 1 : i + 1;
  if (j < 0 || j >= state.l3.order.length) return;
  [state.l3.order[i], state.l3.order[j]] = [state.l3.order[j], state.l3.order[i]];
  renderL3List();
}

function checkL3() {
  const correct = state.data.l3[state.l3.scenarioIndex].steps;
  const allCorrect = state.l3.order.every((s, i) => s === correct[i]);
  if (allCorrect) {
    state.scores[2] = Math.min(20, state.scores[2] + Math.round(20 / state.data.l3.length));
    soundCorrect();
    showFeedback("✅", "Tepat sekali!", "Urutan langkah sudah benar.", () => {
      hideModal("modalFeedback");
      state.l3.scenarioIndex++;
      if (state.l3.scenarioIndex >= state.data.l3.length) gotoNextLevel();
      else initL3Scenario();
    });
  } else {
    soundWrong();
    showFeedback("❌", "Belum tepat / Not yet", "Masih ada langkah yang salah urutan. Coba periksa lagi ya!", () => {
      hideModal("modalFeedback");
      if (!state.wrongLevels.includes(2)) state.wrongLevels.push(2);
    });
  }
}

// ============ LEVEL 4 ============
function renderLevel4() {
  state.l4.qIndex = 0;
  state.l4.correctCount = 0;
  renderL4Question();
  $("#levelNav").innerHTML = "";
}

function renderL4Question() {
  const content = $("#levelContent");
  const q = state.data.l4[state.l4.qIndex];
  const opts = shuffle([q.correct, ...q.distractors]);
  content.innerHTML = `
    <div class="card">
      <div class="level-title">🕵️ Level 4 — Soal ${state.l4.qIndex + 1} dari ${state.data.l4.length}</div>
      <div class="level-instruction">Perhatikan 5 langkah dekomposisi ini. Masalah apa yang sedang dipecahkan?</div>
      <ol class="riddle-steps">
        ${q.steps.map(s => `<li>${s}</li>`).join("")}
      </ol>
      <div class="q-options">
        ${opts.map(o => `<button class="q-option" data-o="${encodeURIComponent(o)}">${o}</button>`).join("")}
      </div>
    </div>
  `;
  content.querySelectorAll(".q-option").forEach(btn => {
    btn.addEventListener("click", () => handleL4Answer(decodeURIComponent(btn.dataset.o), btn));
  });
}

function handleL4Answer(chosen, btn) {
  const q = state.data.l4[state.l4.qIndex];
  const all = $("#levelContent").querySelectorAll(".q-option");
  all.forEach(b => b.disabled = true);
  const isCorrect = chosen === q.correct;
  if (isCorrect) {
    btn.classList.add("correct");
    state.l4.correctCount++;
    state.scores[3] = Math.round(state.l4.correctCount * 20 / state.data.l4.length);
    soundCorrect();
  } else {
    btn.classList.add("wrong");
    all.forEach(b => { if (decodeURIComponent(b.dataset.o) === q.correct) b.classList.add("correct"); });
    soundWrong();
  }
  setTimeout(() => {
    showFeedback(isCorrect ? "✅" : "❌",
      isCorrect ? "Tepat! / Correct!" : "Kurang tepat",
      "Jawaban benar: " + q.correct,
      () => {
        hideModal("modalFeedback");
        state.l4.qIndex++;
        if (state.l4.qIndex >= state.data.l4.length) gotoNextLevel();
        else renderL4Question();
      });
  }, 500);
}

// ============ LEVEL 5 ============
function renderLevel5() {
  state.l5.placements = {};
  state.l5.selectedWord = null;
  state.l5.correctCount = 0;
  renderL5Board();
  $("#levelNav").innerHTML = "";
}

function renderL5Board() {
  const content = $("#levelContent");
  const pattern = state.data.l5.pattern;
  content.innerHTML = `
    <div class="card">
      <div class="level-title">🧠 Level 5 — Pola Dekomposisi</div>
      <div class="level-instruction">Klik kata di <b>word bank</b>, lalu klik kotak kosong yang sesuai. Temukan pola universal dekomposisi!</div>
      <div class="pattern-flow" id="patternFlow">
        ${pattern.map(p => `
          <div class="pattern-slot" data-slot="${p.slot}">
            <div class="slot-num">${p.slot}</div>
            <div class="slot-text empty" id="slotText-${p.slot}">— klik kata di bawah —</div>
          </div>
        `).join("")}
      </div>
      <p style="font-size:13px;color:var(--text-soft);margin-bottom:6px;">Word Bank (klik untuk memilih):</p>
      <div class="word-bank" id="wordBank">
        ${state.data.l5.wordBank.map(w => `<button class="word-btn" data-word="${w}">${w}</button>`).join("")}
      </div>
      <div id="l5Actions" style="margin-top:16px;"></div>
    </div>
  `;
  $("#wordBank").querySelectorAll(".word-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("used")) return;
      $("#wordBank").querySelectorAll(".word-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.l5.selectedWord = btn.dataset.word;
    });
  });
  $("#patternFlow").querySelectorAll(".pattern-slot").forEach(slot => {
    slot.addEventListener("click", () => placeWord(parseInt(slot.dataset.slot, 10)));
  });
  renderL5Actions();
}

function placeWord(slotNum) {
  if (!state.l5.selectedWord) return;
  const slotText = $("#slotText-" + slotNum);
  const previous = state.l5.placements[slotNum];
  if (previous) {
    const oldBtn = Array.from($("#wordBank").querySelectorAll(".word-btn")).find(b => b.dataset.word === previous);
    if (oldBtn) oldBtn.classList.remove("used");
  }
  state.l5.placements[slotNum] = state.l5.selectedWord;
  slotText.textContent = state.l5.selectedWord;
  slotText.classList.remove("empty");
  const chosen = Array.from($("#wordBank").querySelectorAll(".word-btn")).find(b => b.dataset.word === state.l5.selectedWord);
  if (chosen) { chosen.classList.add("used"); chosen.classList.remove("selected"); }
  state.l5.selectedWord = null;
  renderL5Actions();
}

function renderL5Actions() {
  const actions = $("#l5Actions");
  const filled = Object.keys(state.l5.placements).length;
  const total = state.data.l5.pattern.length;
  if (filled === total) {
    actions.innerHTML = `<button id="btnCheckL5" class="btn btn-primary">✓ Periksa / Check</button>`;
    $("#btnCheckL5").addEventListener("click", checkL5);
  } else {
    actions.innerHTML = `<p style="font-size:13px;color:var(--text-soft);text-align:center;">${filled} dari ${total} kotak terisi</p>`;
  }
}

function checkL5() {
  let correct = 0;
  state.data.l5.pattern.forEach(p => {
    const slotText = $("#slotText-" + p.slot);
    const chosen = state.l5.placements[p.slot];
    if (chosen === p.answer) {
      correct++;
      slotText.parentElement.classList.add("filled");
    } else {
      slotText.parentElement.classList.add("wrong");
    }
  });
  state.l5.correctCount = correct;
  state.scores[4] = Math.round(correct * 20 / state.data.l5.pattern.length);
  if (correct === state.data.l5.pattern.length) {
    soundCorrect();
    showFeedback("🏆", "Luar biasa!", "Ternyata semua dekomposisi punya pola yang sama! Inilah Pattern Recognition dalam Computational Thinking.", () => {
      hideModal("modalFeedback");
      gotoNextLevel();
    });
  } else {
    soundWrong();
    showFeedback("❌", "Belum tepat semua", `Kamu benar ${correct} dari ${state.data.l5.pattern.length}. Periksa kotak yang merah ya!`, () => {
      hideModal("modalFeedback");
      if (!state.wrongLevels.includes(4)) state.wrongLevels.push(4);
    });
  }
}

// ============ FEEDBACK MODAL ============
function showFeedback(icon, title, text, onNext) {
  $("#feedbackIcon").textContent = icon;
  $("#feedbackTitle").textContent = title;
  $("#feedbackText").textContent = text;
  showModal("modalFeedback");
  const btn = $("#btnCloseFeedback");
  const fresh = btn.cloneNode(true);
  btn.parentNode.replaceChild(fresh, btn);
  fresh.addEventListener("click", () => { if (onNext) onNext(); });
}

// ============ RESULT ============
function showResult() {
  stopLevelTimer();
  soundFinish();
  $("#progressFill").style.width = "100%";
  const subtotal = state.scores.reduce((a, b) => a + b, 0);
  const total = Math.min(100, subtotal + state.bonusPoints);
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  const min = Math.floor(elapsed / 60);
  const sec = elapsed % 60;

  let stars, message;
  if (total >= 90) { stars = "⭐⭐⭐⭐⭐"; message = "Computational Thinker Hebat!"; }
  else if (total >= 75) { stars = "⭐⭐⭐⭐"; message = "Bagus sekali! / Very good!"; }
  else if (total >= 60) { stars = "⭐⭐⭐"; message = "Terus berlatih ya! / Keep practicing!"; }
  else if (total >= 40) { stars = "⭐⭐"; message = "Coba lagi, kamu bisa! / Try again!"; }
  else { stars = "⭐"; message = "Jangan menyerah, ulangi lagi ya! / Don't give up!"; }

  const breakdown = [
    ["Level 1 — Kenali Keterampilan", state.scores[0], 16],
    ["Level 2 — Analisis Masalah", state.scores[1], 24],
    ["Level 3 — Susun Dekomposisi", state.scores[2], 20],
    ["Level 4 — Tebak Masalah", state.scores[3], 20],
    ["Level 5 — Pola Dekomposisi", state.scores[4], 20]
  ];

  const bonusRow = state.bonusPoints > 0
    ? `<div class="breakdown-row" style="color:var(--accent);font-weight:700;"><span>⚡ Bonus Waktu / Time Bonus</span><span>+${state.bonusPoints}</span></div>`
    : "";

  $("#resultBody").innerHTML = `
    <div class="result-name">👤 ${state.nama}</div>
    <div class="result-stars">${stars}</div>
    <div class="result-score">${total}<span style="font-size:22px;">/100</span></div>
    <div class="result-score-label">Total Skor / Total Score — Mode: ${state.modeTimer === "tantangan" ? "⚡ Tantangan" : "🧘 Latihan"}</div>
    <div class="result-message">${message}</div>
    <div class="breakdown">
      ${breakdown.map(([label, s, max]) => `
        <div class="breakdown-row"><span>${label}</span><span>${s} / ${max}</span></div>
      `).join("")}
      ${bonusRow}
      <div class="breakdown-row"><span>⏱ Waktu / Time</span><span>${min}m ${sec}s</span></div>
    </div>
  `;
  saveScore(state.nama, total);
  showScreen("screen-result");
}

function saveScore(nama, skor) {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    data.push({ nama, skor, tanggal: new Date().toISOString().slice(0, 10) });
    data.sort((a, b) => b.skor - a.skor);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.slice(0, 20)));
  } catch (e) { /* ignore */ }
}

$("#btnPlayAgain").addEventListener("click", () => {
  state.scores = [0, 0, 0, 0, 0];
  state.bonusPoints = 0;
  state.wrongLevels = [];
  state.startTime = Date.now();
  if (state.flow === "free") showScreen("screen-free");
  else startLevel(0);
});

$("#btnRetryWrong").addEventListener("click", () => {
  if (!state.wrongLevels.length) {
    alert("Tidak ada level yang salah. Semua sudah sempurna!");
    return;
  }
  state.wrongLevels.forEach(lvlIdx => state.scores[lvlIdx] = 0);
  const first = state.wrongLevels[0];
  state.wrongLevels = [];
  startLevel(first);
});

$("#btnDownload").addEventListener("click", () => {
  const subtotal = state.scores.reduce((a, b) => a + b, 0);
  const total = Math.min(100, subtotal + state.bonusPoints);
  const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  const refleksi = $("#inputRefleksi").value.trim() || "(belum diisi)";
  const lines = [
    "========================================",
    "  HASIL LKPD — BERPIKIR KOMPUTASIONAL",
    "  Informatika Kelas 8 SMPN 19 Kota Bekasi",
    "========================================",
    "Nama Siswa  : " + state.nama,
    "Tanggal     : " + new Date().toLocaleString("id-ID"),
    "Mode Timer  : " + (state.modeTimer === "tantangan" ? "Tantangan / Challenge" : "Latihan / Practice"),
    "Alur        : " + (state.flow === "adventure" ? "Petualangan / Adventure" : "Bebas / Free"),
    "Durasi      : " + Math.floor(elapsed / 60) + " menit " + (elapsed % 60) + " detik",
    "",
    "SKOR PER LEVEL:",
    "  Level 1 (Kenali 4 Keterampilan) : " + state.scores[0] + " / 16",
    "  Level 2 (4 Pertanyaan Analisis) : " + state.scores[1] + " / 24",
    "  Level 3 (Susun Dekomposisi)     : " + state.scores[2] + " / 20",
    "  Level 4 (Tebak Masalah)         : " + state.scores[3] + " / 20",
    "  Level 5 (Pola Dekomposisi)      : " + state.scores[4] + " / 20",
    "  Bonus Waktu                     : +" + state.bonusPoints,
    "",
    "TOTAL SKOR  : " + total + " / 100",
    "",
    "REFLEKSI SISWA:",
    refleksi,
    "",
    "========================================"
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Hasil_LKPD_" + state.nama.replace(/\s+/g, "_") + "_" + Date.now() + ".txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// ============ LEADERBOARD ============
$("#btnShowLeaderboard").addEventListener("click", () => {
  const list = $("#leaderboardList");
  let data = [];
  try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch(e) {}
  if (!data.length) {
    list.innerHTML = `<li class="lb-empty">Belum ada skor tersimpan / No scores yet</li>`;
  } else {
    list.innerHTML = data.slice(0, 5).map((d, i) =>
      `<li><span>${i + 1}. ${d.nama}</span><span><b>${d.skor}</b> • ${d.tanggal}</span></li>`
    ).join("");
  }
  showScreen("screen-leaderboard");
});
$("#btnCloseLeaderboard").addEventListener("click", () => showScreen("screen-result"));

// ============ TEACHER MODE (dengan sandi) ============
const TEACHER_PASSWORD = atob("MTkxOQ==");  // ⚙️ [TUNABLE] ganti sandi di sini
const TEACHER_AUTH_KEY = "lkpd_teacher_authed";

// Handler tombol Mode Guru
$("#btnTeacher").addEventListener("click", () => {
  // Jika sudah login di sesi browser ini, langsung masuk
  if (sessionStorage.getItem(TEACHER_AUTH_KEY) === "yes") {
    openTeacherScreen();
    return;
  }
  // Tampilkan modal password
  $("#inputPassword").value = "";
  $("#passwordError").style.display = "none";
  showModal("modalPassword");
  setTimeout(() => $("#inputPassword").focus(), 100);
});

// Fungsi coba login
function tryTeacherLogin() {
  const input = $("#inputPassword").value.trim();
  if (input === TEACHER_PASSWORD) {
    // Sukses
    sessionStorage.setItem(TEACHER_AUTH_KEY, "yes");
    hideModal("modalPassword");
    openTeacherScreen();
    soundCorrect();
  } else {
    // Gagal
    $("#passwordError").style.display = "block";
    $("#inputPassword").value = "";
    $("#inputPassword").focus();
    soundWrong();
    // Animasi getar
    const box = document.querySelector("#modalPassword .modal-box");
    box.style.animation = "none";
    void box.offsetWidth; // trigger reflow
    box.style.animation = "popIn 250ms ease, shake 400ms";
  }
}

// Fungsi buka layar guru
function openTeacherScreen() {
  const saved = localStorage.getItem(CUSTOM_KEY);
  if (saved) $("#teacherJSON").value = saved;
  showScreen("screen-teacher");
}

// Tombol Submit
$("#btnSubmitPassword").addEventListener("click", tryTeacherLogin);

// Tombol Batal
$("#btnCancelPassword").addEventListener("click", () => {
  hideModal("modalPassword");
  $("#inputPassword").value = "";
  $("#passwordError").style.display = "none";
});

// Tekan Enter di input password = submit
$("#inputPassword").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    tryTeacherLogin();
  }
});

// Tombol keluar dari layar guru → hapus sesi login
$("#btnCloseTeacher").addEventListener("click", () => {
  sessionStorage.removeItem(TEACHER_AUTH_KEY);  // logout
  showScreen("screen-welcome");
  $("#topbar").classList.add("hidden");
});

$("#btnTeacherSample").addEventListener("click", () => {
  const sample = {
    level1: [{ term: "Contoh Istilah (Example Term)", def: "Contoh definisi (example definition)" }],
    level2: [{
      scenario: "Contoh skenario masalah.",
      question: "Pertanyaan analisis?",
      options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
      answer: 0,
      explanation: "Penjelasan jawaban benar."
    }],
    level3: [{
      title: "Contoh Judul Masalah (Example Problem Title)",
      steps: ["Langkah 1", "Langkah 2", "Langkah 3", "Langkah 4", "Langkah 5"]
    }],
    level4: [{
      steps: ["Langkah 1", "Langkah 2", "Langkah 3", "Langkah 4", "Langkah 5"],
      correct: "Jawaban Benar (Correct Answer)",
      distractors: ["Pengecoh 1", "Pengecoh 2", "Pengecoh 3"]
    }],
    level5: {
      pattern: [
        { slot: 1, answer: "kumpulkan", en: "gather" },
        { slot: 2, answer: "pilah/bagi", en: "sort" },
        { slot: 3, answer: "kerjakan bertahap", en: "do gradually" },
        { slot: 4, answer: "periksa", en: "check" },
        { slot: 5, answer: "selesaikan", en: "finish" }
      ],
      wordBank: ["kumpulkan", "pilah/bagi", "kerjakan bertahap", "periksa", "selesaikan", "abaikan"]
    }
  };
  $("#teacherJSON").value = JSON.stringify(sample, null, 2);
  showTeacherStatus("Contoh dimuat. Klik 'Validasi' untuk cek.", "ok");
});

function showTeacherStatus(msg, type) {
  const el = $("#teacherStatus");
  el.textContent = msg;
  el.className = "teacher-status show " + (type || "ok");
}

function parseTeacherJSON() {
  const raw = $("#teacherJSON").value.trim();
  if (!raw) return { ok: false, err: "JSON kosong." };
  try {
    const obj = JSON.parse(raw);
    return { ok: true, data: obj };
  } catch (e) {
    return { ok: false, err: "JSON tidak valid: " + e.message };
  }
}

$("#btnTeacherValidate").addEventListener("click", () => {
  const res = parseTeacherJSON();
  if (!res.ok) { showTeacherStatus("❌ " + res.err, "err"); return; }
  const issues = [];
  if (res.data.level1 && !Array.isArray(res.data.level1)) issues.push("level1 harus array");
  if (res.data.level2 && !Array.isArray(res.data.level2)) issues.push("level2 harus array");
  if (res.data.level3 && !Array.isArray(res.data.level3)) issues.push("level3 harus array");
  if (res.data.level4 && !Array.isArray(res.data.level4)) issues.push("level4 harus array");
  if (res.data.level5 && typeof res.data.level5 !== "object") issues.push("level5 harus object");
  if (issues.length) { showTeacherStatus("⚠ " + issues.join("; "), "warn"); return; }
  showTeacherStatus("✅ JSON valid! Level yang diisi: " +
    ["level1","level2","level3","level4","level5"].filter(k => res.data[k]).join(", "), "ok");
});

$("#btnTeacherSave").addEventListener("click", () => {
  const res = parseTeacherJSON();
  if (!res.ok) { showTeacherStatus("❌ " + res.err, "err"); return; }
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(res.data));
  applyCustomData(res.data);
  showTeacherStatus("✅ Tersimpan di browser. Game akan memakai soal kustom ini.", "ok");
});

$("#btnTeacherClear").addEventListener("click", () => {
  if (!confirm("Yakin hapus soal kustom? Game akan kembali ke soal default.")) return;
  localStorage.removeItem(CUSTOM_KEY);
  $("#teacherJSON").value = "";
  applyCustomData(null);
  showTeacherStatus("🗑 Soal kustom dihapus. Kembali ke default.", "warn");
});

$("#btnTeacherShare").addEventListener("click", () => {
  const res = parseTeacherJSON();
  if (!res.ok) { showTeacherStatus("❌ " + res.err, "err"); return; }
  try {
    const jsonStr = JSON.stringify(res.data);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const url = location.origin + location.pathname + "#soal=" + b64;
    $("#shareURL").value = url;
    $("#shareBox").classList.remove("hidden");
    showTeacherStatus("🔗 URL dibuat. Copy dan kirim ke siswa!", "ok");
  } catch (e) {
    showTeacherStatus("❌ Gagal membuat URL: " + e.message, "err");
  }
});

$("#btnCopyShare").addEventListener("click", () => {
  const el = $("#shareURL");
  el.select();
  el.setSelectionRange(0, 99999);
  try {
    document.execCommand("copy");
    showTeacherStatus("📋 URL tercopy ke clipboard!", "ok");
  } catch (e) {
    showTeacherStatus("Silakan copy manual (Ctrl+C).", "warn");
  }
});

// ============ APPLY CUSTOM DATA ============
function applyCustomData(custom) {
  state.data = {
    l1: (custom && Array.isArray(custom.level1) && custom.level1.length) ? custom.level1 : LEVEL1_DATA,
    l2: (custom && Array.isArray(custom.level2) && custom.level2.length) ? custom.level2 : LEVEL2_DATA,
    l3: (custom && Array.isArray(custom.level3) && custom.level3.length) ? custom.level3 : LEVEL3_DATA,
    l4: (custom && Array.isArray(custom.level4) && custom.level4.length) ? custom.level4 : LEVEL4_DATA,
    l5: (custom && custom.level5 && custom.level5.pattern && custom.level5.wordBank) ? custom.level5 : LEVEL5_DATA
  };
}

function loadFromURL() {
  const hash = location.hash || "";
  const match = hash.match(/#soal=([A-Za-z0-9+/=]+)/);
  if (!match) return false;
  try {
    const jsonStr = decodeURIComponent(escape(atob(match[1])));
    const obj = JSON.parse(jsonStr);
    applyCustomData(obj);
    return true;
  } catch (e) { return false; }
}

// ============ INIT ============
document.addEventListener("DOMContentLoaded", () => {
  // Muat prioritas: URL → localStorage → default
  if (loadFromURL()) {
    showScreen("screen-welcome");
    setTimeout(() => {
      const banner = document.createElement("div");
      banner.className = "teacher-info";
      banner.style.margin = "0 0 12px 0";
      banner.innerHTML = "📥 <b>Soal kustom dari guru sudah dimuat!</b> Silakan isi nama dan mulai bermain.";
      const welcome = $("#screen-welcome .card");
      if (welcome) welcome.insertBefore(banner, welcome.firstChild);
    }, 100);
  } else {
    const saved = localStorage.getItem(CUSTOM_KEY);
    if (saved) {
      try { applyCustomData(JSON.parse(saved)); } catch (e) {}
    }
    showScreen("screen-welcome");
  }
});
