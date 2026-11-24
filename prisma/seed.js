import { prisma } from "../src/db.js";

async function main() {
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();

  const bat = await prisma.author.create({
    data: { name: "Бат" }
  });

  const saraa = await prisma.author.create({
    data: { name: "Сараа" }
  });

  const bold = await prisma.author.create({
    data: { name: "Болд" }
  });

  await prisma.book.createMany({
    data: [
      { title: "Node.js Basics", price: 4500, authorId: bat.id, isAvailable: true },
      { title: "Clean JS", price: 32000, authorId: bat.id, isAvailable: true },
      { title: "SQL for Kids", price: 25000, authorId: saraa.id, isAvailable: true },
      { title: "SQL Joins", price: 27000, authorId: saraa.id, isAvailable: false },
      { title: "REST API Design", price: 39000, authorId: saraa.id, isAvailable: true },
      { title: "Prisma Guide", price: 62000, authorId: bold.id, isAvailable: true },
      { title: "Express Security", price: 66000, authorId: bold.id, isAvailable: true },
      { title: "Prisma Relations", price: 48000, authorId: bold.id, isAvailable: true },
      { title: "Node Streams", price: 72000, authorId: bold.id, isAvailable: false }
    ]
  });

  console.log("Seed completed: 3 authors, 9 books");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });