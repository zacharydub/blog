const express = require("express");
const mongoose = require("mongoose");
const { find } = require("./models/article");
const Article = require("./models/article");
const articleRouter = require("./routes/articles.js");
const app = express();

mongoose.connect("mongodb://localhost/sampleDatabase", {
  usenewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  //res.send("hey there");
  //res.render("index", { text: "hello" });
  //const articles = [
  //  { title: "test title1", createdAt: new Date(), description: "test descr1" },
  //  { title: "test title2", createdAt: new Date(), description: "test descr2" },
  //];
  const articles = await Article.find().sort({ createdAt: "descending" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.listen(5000);
