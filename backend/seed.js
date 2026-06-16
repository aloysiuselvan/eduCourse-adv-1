require("dotenv").config();
const prisma = require("./config/db");

async function main() {
  const kategori = await prisma.kategoriKelas.create({
    data: {
      namaKategori: "Pemrograman Web",
      deskripsi: "Belajar membuat website dari nol",
    },
  });

  const tutor = await prisma.tutor.create({
    data: {
      nama: "Budi Santoso",
      email: "budi@educourse.com",
      bio: "Senior Fullstack Developer",
    },
  });

  await prisma.kelas.create({
    data: {
      kategoriId: kategori.id,
      tutorId: tutor.id,
      judul: "Belajar ReactJS untuk Pemula",
      deskripsi: "Materi lengkap React dari dasar hingga mahir.",
      harga: 150000,
      thumbnail: "react_thumb.jpg",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
