const prisma = require("../config/db");

const kelasService = {
  getAllKelas: async (query = {}) => {
    const { filter, search, sortBy, order } = query;

    const where = {};

    if (filter) {
      where.kategoriId = parseInt(filter);
    }

    if (search) {
      where.judul = { contains: search };
    }

    const orderBy = {};
    if (sortBy) {
      orderBy[sortBy] = order === "desc" ? "desc" : "asc";
    }

    return await prisma.kelas.findMany({
      where,
      orderBy: sortBy ? orderBy : undefined,
      include: {
        kategori: true,
        tutor: true,
      },
    });
  },

  getKelasById: async (id) => {
    return await prisma.kelas.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        kategori: true,
        tutor: true,
        modul: true,
      },
    });
  },

  createKelas: async (data) => {
    return await prisma.kelas.create({
      data: {
        kategoriId: parseInt(data.kategoriId),
        tutorId: parseInt(data.tutorId),
        judul: data.judul,
        deskripsi: data.deskripsi,
        harga: parseFloat(data.harga),
        thumbnail: data.thumbnail,
      },
    });
  },

  updateKelas: async (id, data) => {
    return await prisma.kelas.update({
      where: {
        id: parseInt(id),
      },
      data: {
        kategoriId: data.kategoriId ? parseInt(data.kategoriId) : undefined,
        tutorId: data.tutorId ? parseInt(data.tutorId) : undefined,
        judul: data.judul,
        deskripsi: data.deskripsi,
        harga: data.harga ? parseFloat(data.harga) : undefined,
        thumbnail: data.thumbnail,
      },
    });
  },

  deleteKelas: async (id) => {
    return await prisma.kelas.delete({
      where: {
        id: parseInt(id),
      },
    });
  },
};

module.exports = kelasService;
