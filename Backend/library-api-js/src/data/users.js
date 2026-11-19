export let users = [
    { id: 1, name: "Bold", email: "bold@ufe.edu.mn", password: "secretpassword1" },
    { id: 2, name: "Tuya", email: "tuya@ufe.edu.mn", password: "secretpassword2" }
];

let nextId = 3;

export function findUserById(id) {
    return users.find(u => u.id === id);
}

export function findUserByEmail(email) {
    return users.find(u => u.email === email);
}

export function addUser(input) {
    const user = {
        id: nextId++,
        ...input
    };
    users.push(user);
    return user;
}

export function updateUser(id, changes) {
    const user = findUserById(id);
    if (!user) return null;
    if (changes.id) delete changes.id;
    Object.assign(user, changes);
    return user;
}

export function removeUser(id) {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}