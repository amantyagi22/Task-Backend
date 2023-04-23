const Data = require("../models/Data");
const { getRequestPipeline } = require("../utils/helper");

const router = require("express").Router();

router.get("/:requestId", async (req, res, next) => {
  const { requestId } = req.params;
  try {
    if (requestId == 5) {
      const data = await Data.find();
      return res.status(200).send(data);
    }
    const data = await Data.aggregate(getRequestPipeline[requestId]);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

module.exports = router;
