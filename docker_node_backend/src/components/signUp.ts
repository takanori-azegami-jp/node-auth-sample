import * as express from "express";
import { User } from "../entity/user";
import { AppDataSource } from "../../data-source";
import * as bcrypt from "bcrypt";
import ms = require("ms");
import { jwtHelper } from "../utils/jwtHelepr";

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", async (req, res, next) => {
  try {
    const user = await userRepository.findOne({
      where: { mail: req.body.email },
    });

    if (user) {
      throw new Error("USERS_ALREADY_EXISTS_USER");
    }
    //パスワードのハッシュ化
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    if (!hashPassword) {
      throw new Error("SERVER_ERROR");
    }

    //DBに保存
    await userRepository.insert({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mail: req.body.email,
      password: hashPassword,
    });

    //jwtトークンを生成
    const jwtToken = jwtHelper.createToken();

    return res.status(200).cookie("jwtToken", jwtToken, {
      httpOnly: true,
      //トークンの期限を設定
      expires: new Date(Date.now() + ms("2d")),
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;