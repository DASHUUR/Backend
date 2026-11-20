import { prisma } from "../db.js";

export const initialUsers = [
  { id: 1, name: "Bat-Erdene", email: "bat@example.com", role: "admin", active: true },
  { id: 2, name: "Nomin", email: "nomin@example.com", role: "member", active: true },
  { id: 3, name: "Temuulen", email: "temuulen@example.com", role: "member", active: false },
  { id: 4, name: "Saruul", email: "saruul@example.com", role: "librarian", active: true }
];

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.update({
      where: { id },
      data: req.body
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.user.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};