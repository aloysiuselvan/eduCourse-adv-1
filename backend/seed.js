require("dotenv").config();
const prisma = require("./config/db");

async function main() {
  await prisma.kelasSaya.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.pembayaran.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.material.deleteMany({});
  await prisma.modulKelas.deleteMany({});
  await prisma.pretest.deleteMany({});
  await prisma.kelas.deleteMany({});
  await prisma.tutor.deleteMany({});
  await prisma.kategoriKelas.deleteMany({});

  const categoriesData = [
    { namaKategori: "Bisnis Manajemen", deskripsi: "Belajar manajemen bisnis, akuntansi, dan keuangan" },
    { namaKategori: "Pemasaran", deskripsi: "Belajar digital marketing, SEO, dan branding" },
    { namaKategori: "Desain", deskripsi: "Belajar UI/UX, desain grafis, dan figma" },
    { namaKategori: "Digital & Teknologi", deskripsi: "Belajar pemrograman, data science, dan teknologi" },
    { namaKategori: "Pengembangan Diri", deskripsi: "Belajar leadership, public speaking, dan karir" }
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const created = await prisma.kategoriKelas.create({ data: cat });
    categories[cat.namaKategori] = created.id;
  }

  const tutorsData = [
    { nama: "Jenna Ortega", email: "jenna@educourse.com", bio: "Senior Accountant di Gojek", fotoProfil: "https://i.pravatar.cc/150?img=11" },
    { nama: "Adam Smith", email: "adam@educourse.com", bio: "CMO at Tokopedia", fotoProfil: "https://i.pravatar.cc/150?img=33" },
    { nama: "Sarah Tan", email: "sarah@educourse.com", bio: "Product Designer at Traveloka", fotoProfil: "https://i.pravatar.cc/150?img=5" },
    { nama: "Michael Doe", email: "michael@educourse.com", bio: "CFO at Startup", fotoProfil: "https://i.pravatar.cc/150?img=60" },
    { nama: "John Code", email: "john@educourse.com", bio: "Frontend Lead", fotoProfil: "https://i.pravatar.cc/150?img=10" },
    { nama: "Emily Blunt", email: "emily@educourse.com", bio: "CEO", fotoProfil: "https://i.pravatar.cc/150?img=44" },
    { nama: "Alex Art", email: "alex@educourse.com", bio: "Art Director", fotoProfil: "https://i.pravatar.cc/150?img=20" },
    { nama: "Dr. Data", email: "data@educourse.com", bio: "Data Scientist", fotoProfil: "https://i.pravatar.cc/150?img=12" },
    { nama: "Lisa Social", email: "lisa@educourse.com", bio: "Influencer", fotoProfil: "https://i.pravatar.cc/150?img=21" }
  ];

  const tutors = {};
  for (const tut of tutorsData) {
    const created = await prisma.tutor.create({ data: tut });
    tutors[tut.nama] = created.id;
  }

  const coursesData = [
    {
      judul: "Big 4 Auditor Financial Analyst",
      kategoriName: "Bisnis Manajemen",
      tutorName: "Jenna Ortega",
      harga: 300000,
      thumbnail: "/src/assets/card_image/card-1.jpg",
      deskripsi: "Materi analisis finansial komprehensif bagi calon auditor kantor akuntan publik ternama."
    },
    {
      judul: "Digital Marketing Strategy 2024",
      kategoriName: "Pemasaran",
      tutorName: "Adam Smith",
      harga: 250000,
      thumbnail: "/src/assets/card_image/card-2.jpg",
      deskripsi: "Strategi digital marketing terkini untuk melipatgandakan performa pemasaran digital Anda."
    },
    {
      judul: "UI/UX Design Mastery for Beginners",
      kategoriName: "Desain",
      tutorName: "Sarah Tan",
      harga: 400000,
      thumbnail: "/src/assets/card_image/card-3.jpg",
      deskripsi: "Belajar mendesain UI/UX yang estetik, intuitif, dan ramah pengguna dari nol."
    },
    {
      judul: "Financial Modeling for Startups",
      kategoriName: "Bisnis Manajemen",
      tutorName: "Michael Doe",
      harga: 350000,
      thumbnail: "/src/assets/card_image/card-4.jpg",
      deskripsi: "Buat pemodelan keuangan yang kuat dan profesional untuk meyakinkan para investor."
    },
    {
      judul: "Mastering React & Tailwind CSS",
      kategoriName: "Digital & Teknologi",
      tutorName: "John Code",
      harga: 500000,
      thumbnail: "/src/assets/card_image/card-5.jpg",
      deskripsi: "Bangun web app modern menggunakan ReactJS dan styling cepat dengan utility-first Tailwind CSS."
    },
    {
      judul: "Business Leadership Essentials",
      kategoriName: "Pengembangan Diri",
      tutorName: "Emily Blunt",
      harga: 450000,
      thumbnail: "/src/assets/card_image/card-6.jpg",
      deskripsi: "Kuasai seni kepemimpinan, negosiasi, dan pengambilan keputusan di dunia bisnis profesional."
    },
    {
      judul: "Graphic Design Fundamentals",
      kategoriName: "Desain",
      tutorName: "Alex Art",
      harga: 280000,
      thumbnail: "/src/assets/card_image/card-7.jpg",
      deskripsi: "Prinsip dasar komposisi visual, warna, tipografi, dan perancangan grafis yang efektif."
    },
    {
      judul: "Data Science for Business",
      kategoriName: "Digital & Teknologi",
      tutorName: "Dr. Data",
      harga: 600000,
      thumbnail: "/src/assets/card_image/card-8.jpg",
      deskripsi: "Pahami pengolahan data dan analisis prediktif untuk menunjang keputusan bisnis perusahaan."
    },
    {
      judul: "Personal Branding on Social Media",
      kategoriName: "Pemasaran",
      tutorName: "Lisa Social",
      harga: 150000,
      thumbnail: "/src/assets/card_image/card-9.jpg",
      deskripsi: "Membangun personal branding yang autentik dan menarik di berbagai platform sosial media."
    },
    {
      judul: "Advanced Business Negotiation",
      kategoriName: "Pengembangan Diri",
      tutorName: "Emily Blunt",
      harga: 380000,
      thumbnail: "/src/assets/card_image/card-1.jpg",
      deskripsi: "Latihan negosiasi tingkat lanjut untuk mencapai kesepakatan terbaik dengan klien maupun partner bisnis."
    },
    {
      judul: "Copywriting for Beginners",
      kategoriName: "Pemasaran",
      tutorName: "Lisa Social",
      harga: 200000,
      thumbnail: "/src/assets/card_image/card-2.jpg",
      deskripsi: "Tingkatkan konversi penjualan produk Anda lewat kata-kata persuasif dan copywriting yang memikat."
    },
    {
      judul: "Introduction to Python Programming",
      kategoriName: "Digital & Teknologi",
      tutorName: "John Code",
      harga: 320000,
      thumbnail: "/src/assets/card_image/card-3.jpg",
      deskripsi: "Dasar pemrograman Python untuk kebutuhan automasi, analisis data, maupun pengembangan web."
    }
  ];

  for (const course of coursesData) {
    await prisma.kelas.create({
      data: {
        judul: course.judul,
        deskripsi: course.deskripsi,
        harga: course.harga,
        thumbnail: course.thumbnail,
        kategoriId: categories[course.kategoriName],
        tutorId: tutors[course.tutorName]
      }
    });
  }

  console.log("Seeding 12 dummy courses completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
