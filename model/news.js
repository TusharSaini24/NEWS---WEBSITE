const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    url_to_image: {
      type: String,
      required: true,
      trim: true,
    },
    published_at: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);
