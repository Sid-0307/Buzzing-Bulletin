const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://siddharthshankar03:Magilam304@cluster0.rgteyqh.mongodb.net/`;
const client = new MongoClient(uri);

//Register
app.post("/register", (req, res) => {
  client.connect();
  console.log("Connected", req.body);
  const collection = client.db("News-App").collection("Users");
  let user = collection.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      console.log("User", user);
      res.json({ message: "Email already exists", status: 400 });
    } else {
      collection.insertOne(req.body);
      console.log("Record Inserted Successfully");
      res.json({ message: "Inserted", status: 200 });
    }
  });
});

//Authenticate User
app.post("/login", (req, res) => {
  console.log("hi");
  client.connect();
  const collection = client.db("News-App").collection("Users");
  const { email, password } = req.body;
  collection.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password == password) {
        console.log("User Validated");
        res.json({
          check: "Authenticated",
          name: user.name,
          email: user.email,
        });
      } else {
        res.json({ check: "Wrong Password" });
      }
    } else {
      res.json({ check: "User does not exist" });
    }
  });
});

app.get("/api", (req, res) => {
  fetch(
    "https://newsdata.io/api/1/news?apikey=pub_278000ffd5507ee154cf50e92df024421e867&category=sports&language=en"
  )
    .then((res) => res.json())
    .then((json) => res.json(json));
});

// Create a new blog
app.post("/api/blogs", async (req, res) => {
  try {
    const collection = client.db("News-App").collection("Blogs");
    collection.insertOne(req.body);
    console.log("Record Inserted Successfully");
    res.json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the blog." });
  }
});

app.get("/api/blogs", async (req, res) => {
  const collection = client.db("News-App").collection("Blogs");
  docs = await collection.find().toArray();
  docs.reverse();
  res.json(docs);
});

app.get("/api/blogs/:name", async (req, res) => {
  const userName = req.params.name;
  try {
    const collection = client.db("News-App").collection("Blogs");
    docs = await collection.find({ name: userName }).toArray();
    console.log(docs);
    docs.reverse();
    res.json(docs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
