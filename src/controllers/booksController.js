import { prisma } from "../db.js";

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body,
      include: { author: true },
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};