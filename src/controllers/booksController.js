import { prisma } from "../db.js";

export const initialBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", price: 35, available: true },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", price: 42, available: true },
  { id: 3, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", price: 50, available: false },
  { id: 4, title: "You Don't Know JS", author: "Kyle Simpson", price: 28, available: true }
];

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const book = await prisma.book.create({
      data: req.body
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = await prisma.book.update({
      where: { id },
      data: req.body
    });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.book.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};