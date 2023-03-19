const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const i18n = require("i18n");

const app = express();

const mockUserDatabase = {
  "test@test.com": "test",
};

const secretKey = "mysecretkey";

// configure i18n middleware
i18n.configure({
  locales: ["en", "fr"],
  defaultLocale: "en",
  directory: __dirname + "/locales",
});
app.use(cors());

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!mockUserDatabase[username] || mockUserDatabase[username] !== password) {
    res.status(401).json({ error: "Invalid username or password" });
    return;
  }

  const token = jwt.sign({ username }, secretKey);
  res.json({ token });
});

app.get("/getFormJson", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    res.status(401).json({ error: "Invalid authorization scheme" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const lang = req.get("accept-language") || "en"; // default to English
    i18n.setLocale(lang);

    const mockJsonConfig = require(`./configurationfile/assignment-configuration.${lang}.json`);
    res.json(mockJsonConfig);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});
app.post("/submit", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    res.status(401).json({ error: "Invalid authorization scheme" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    const submittedData = req.body;
    const fileName = `${authHeader}.json`;
    fs.writeFile(fileName, JSON.stringify(submittedData), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error while saving data");
      } else {
        res.send("Data saved successfully");
      }
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.get("/getdata", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Missing authorization header" });
    return;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme !== "Bearer") {
    res.status(401).json({ error: "Invalid authorization scheme" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);

    const fileName = `${authHeader}.json`;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error while reading data");
      } else {
        const submittedData = JSON.parse(data);
        res.json(submittedData);
      }
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Mock server listening on port 3000");
});
