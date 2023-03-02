const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDb = require("./config/config");
const axios = require("axios");
const News = require("./model/news");
const fetchNewsRoutes = require("./routes/fetchNewsRoutes");

const app = express();
require("dotenv").config();

const newsApiUrl = process.env.NEWS_API_URL;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

async function fetchLatestNew() {
  try {
    const { data } = await axios.get(`${newsApiUrl}`);

    if (data.data.length > 0) {
      let newsObject = [];

      data.data.map((article) => {
        if (
          article.author !== null &&
          article.title !== null &&
          article.description !== null &&
          article.url !== null &&
          article.image !== null &&
          article.published_at !== null
        ) {
          newsObject.push({
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            url_to_image: article.image,
            published_at: new Date(article.published_at),
          });
        }
      });

      const resp = await News.insertMany(newsObject);
    } else {
      console.log("no data found");
    }
  } catch (error) {
    console.error("error", error);
  }
}

setInterval(fetchLatestNew, 86400000);

app.use("/", fetchNewsRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

const PORT = process.env.PORT;

// connecting to db
connectDb();

// listening to port
app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
