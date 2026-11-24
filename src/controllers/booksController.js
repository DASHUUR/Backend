import { prisma } from "../db.js";

export const getBooks = async (req, res, next) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const book = await prisma.book.create({
      data: req.body
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id тоо байх ёстой" });
    }
    const book = await prisma.book.update({
      where: { id },
      data: req.body
    });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id тоо байх ёстой" });
    }
    await prisma.book.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};