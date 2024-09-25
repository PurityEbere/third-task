const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('node:fs/promises');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(bodyParser.json());

const getBooks = async () => {
  const data = await readFile('./books.json', 'utf8');
  return JSON.parse(data);
  res.writeHead(200, { 'Content-Type': "application/json" });
  res.end(content);
};

const saveBooks = async (books) => {
  await writeFile('./books.json', JSON.stringify(books, null, 2), 'utf8');
};

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const books = await getBooks();
    res.status(200).json({
      status: "success",
      message: "Books fetched successfully",
      data: BOOKS_ARRAY
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { title, author } = req.body;

    
    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const books = await getBooks();

    const newBook = {
      id: uuidv4(),
      title: "Third Task",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: "Purity Udeh"
    };


    books.push(newBook);

    await saveBooks(books);

    res.status(201).json({
      status: "success",
      message: "Book added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
});


app.use('/books', router);

app.get("/", (req, res) => res.send("Hello express"))
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
