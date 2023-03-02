const News = require("../model/news");

exports.getNews = async (req, res) => {
  try {
    if (req.body.author === undefined || req.body.title === undefined) {
      res.status(400).json({
        success: false,
        message: "Bad Request",
        error: "Field are not present",
      });
    }

    const { author, title, limit, offset } = req.body;
    let finalParam = {};
    let authorParam = {};
    let titleParam = {};

    if (author !== "") {
      authorParam["author"] = { $regex: `${author}`, $options: "i" };
    }
    if (title !== "") {
      titleParam["title"] = { $regex: `${title}`, $options: "i" };
    }

    if (author !== "" && title !== "") {
      finalParam["$and"] = [authorParam, titleParam];
    } else if (author !== "" && title === "") {
      finalParam = authorParam;
    } else {
      finalParam = titleParam;
    }

    const newsResp = await News.find(finalParam)
      .sort({ published_at: 0 })
      .skip(Number(offset))
      .limit(Number(limit));

    if (newsResp.length > 0) {
      res.status(200).json({
        success: true,
        message: "fetch successfully",
        data: newsResp,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "no data found",
        data: [],
      });
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};
