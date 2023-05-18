import * as express from "express";
import ms = require("ms");

const router = express.Router();

router.post("/", (req, res, next) => {
  try {
    return res.status(200).cookie("jwtToken", "", {
      httpOnly: true,
      expires: new Date(Date.now() + ms("1d")),
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;