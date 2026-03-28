const authRouter = require("./auth.routes")
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ ADD THIS

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser()); // ✅ ADD THIS (VERY IMPORTANT)

// Routes
app.use("/api/auth", authRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server!" });
});

module.exports = app;