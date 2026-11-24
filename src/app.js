import express from "express";
import booksRouter from "./routes/books.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});