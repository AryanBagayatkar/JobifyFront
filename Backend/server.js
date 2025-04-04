const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const JobRoutes = require("../Backend/routes/jobRoutes")
const PostRoutes = require('./routes/postRoutes')
const authRoutes = require("./routes/authRoutes");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const MONGO_URI = "mongodb+srv://midhun10:2023HE0511@cluster1.acpvjxf.mongodb.net/";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/jobs", JobRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/auth", authRoutes);


// ✅ Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

//Serve uploaded files
app.use("/uploads", express.static(uploadDir));

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//API Route for File Upload
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ fileUrl: `/uploads/${req.file.filename}` });
});

// Store connected users (userId -> socketId)
const users = {};

io.on("connection", (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  // Register users
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`✅ User ${userId} registered as ${socket.id}`);
  });

  // ✅ Handle incoming messages
  socket.on("message", (msg) => {
    console.log("📩 Message received:", msg);

    const { senderId, receiverId, text, fileUrl } = msg;
    const messageData = { senderId, receiverId, text, fileUrl };

    if (users[receiverId]) {
      io.to(users[receiverId]).emit("message", messageData);
    }

    io.to(socket.id).emit("message", messageData);
  });

  //  Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        console.log(`Removed user ${userId}`);
      }
    }
  });
});



// Start server
server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
