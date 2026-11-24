import { prisma } from "../db.js";

export const initialUsers = [
  { id: 1, name: "Bat-Erdene", email: "bat@example.com", role: "admin" },
  { id: 2, name: "Nomin", email: "nomin@example.com", role: "member" },
  { id: 3, name: "Temuulen", email: "temuulen@example.com", role: "member" },
  { id: 4, name: "Saruul", email: "saruul@example.com", role: "librarian" }
];

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id тоо байх ёстой" });
    }
    const user = await prisma.user.update({
      where: { id },
      data: req.body
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "id тоо байх ёстой" });
    }
    await prisma.user.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};