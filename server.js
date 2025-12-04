const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// GET JSON data
app.get("/api/data", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read JSON file" });
        }
        res.json(JSON.parse(data));
    });
});

// UPDATE JSON data
app.post("/api/data", (req, res) => {
    const newData = req.body;
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), "utf8", (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to write JSON file" });
        }
        res.json({ message: "Data updated successfully" });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
