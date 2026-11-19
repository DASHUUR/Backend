import { users, findUserById, findUserByEmail, addUser, updateUser, removeUser } from "../data/users.js";

export function list(req, res) {
    const safeUsers = users.map(({ password, ...rest }) => rest);
    res.json({
        count: safeUsers.length,
        data: safeUsers
    });
}

export function getOne(req, res) {
    const id = Number(req.params.id);
    const user = findUserById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
}

export function create(req, res) {
    const { name, email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "email is required" });
    }

    if (findUserByEmail(email)) {
        return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = addUser({ name, email, password });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
}

export function update(req, res) {
    const id = Number(req.params.id);
    
    if (req.body.email) {
        const isEmailExist = findUserByEmail(req.body.email);
        if (isEmailExist && isEmailExist.id !== id) {
            return res.status(409).json({ message: "Email already exists" });
        }
    }

    const updated = updateUser(id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
}

export function remove(req, res) {
    const id = Number(req.params.id);
    const ok = removeUser(id);
    if (!ok) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
}
