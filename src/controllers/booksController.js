import { prisma } from "../db.js";

export async function getBooks(req, res) {
  const books = await prisma.book.findMany();
  res.json(books);
}

export async function getBook(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "ID буруу" });
  }

  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) {
    return res.status(404).json({ message: "Олдсонгүй" });
  }

  res.json(book);
}