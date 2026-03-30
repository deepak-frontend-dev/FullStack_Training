const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const prisma = require("./prisma");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  // TODO: fix this - no try/catch if token is broken
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", phase: "phase-1-to-phase-4-mix" });
});

// PHASE 1 style dummy endpoint
app.get("/api/movies/dummy", (req, res) => {
  res.json([
    { id: 1, title: "Dummy Movie 1", year: 2022 },
    { id: 2, title: "Dummy Movie 2", year: 2021 }
  ]);
});

app.get("/api/movies", async (req, res) => {
  // TODO: add pagination
  const movies = await prisma.movie.findMany({
    orderBy: { createdAt: "desc" }
  });

  res.status(200).json(movies);
});

app.post("/api/movies", async (req, res) => {
  // TODO: fix this - no validation
  const movie = await prisma.movie.create({
    data: {
      title: req.body.title,
      year: Number(req.body.year),
      genre: req.body.genre,
      description: req.body.description
    }
  });

  // BUG: should probably return 201 always for create, but it is inconsistent elsewhere
  res.status(200).json(movie);
});

app.put("/api/movies/:id", async (req, res) => {
  try {
    const movie = await prisma.movie.update({
      where: { id: Number(req.params.id) },
      data: {
        title: req.body.title,
        year: Number(req.body.year),
        genre: req.body.genre,
        description: req.body.description
      }
    });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Could not update movie" });
  }
});

app.delete("/api/movies/:id", async (req, res) => {
  await prisma.movie.delete({
    where: { id: Number(req.params.id) }
  });

  // BUG: wrong status code for delete
  res.status(201).json({ message: "Deleted" });
});

app.post("/api/movies/sync", async (req, res) => {
  // TODO: move this logic out of route
  const keyword = req.body.keyword || "batman";
  const apiKey = process.env.OMDB_API_KEY || "demo";
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}`;
  const externalResponse = await fetch(url);
  const externalData = await externalResponse.json();
  const list = externalData.Search || [];

  // BUG: this may cause duplicate insert
  // BUG: missing await means request can finish before insert is done
  prisma.movie.createMany({
    data: list.map((item) => ({
      title: item.Title,
      year: Number(item.Year),
      genre: "Unknown",
      externalId: item.imdbID,
      description: "Synced from OMDb"
    }))
  });

  res.status(200).json({
    message: "Sync started",
    insertedMaybe: list.length
  });
});

app.post("/api/auth/register", async (req, res) => {
  // TODO: fix this - password stored as plain text
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  });

  res.status(201).json({ id: user.id, email: user.email });
});

app.post("/api/auth/login", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });

  if (!user) {
    // BUG: incorrect status code, should be 401/404
    return res.status(201).json({ message: "User not found" });
  }

  if (user.password !== req.body.password) {
    return res.status(200).json({ message: "Wrong password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1d"
  });

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
});

app.get("/api/auth/me", auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  });

  if (!user) {
    return res.status(404).json({ message: "User missing" });
  }

  res.json({ id: user.id, name: user.name, email: user.email });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
