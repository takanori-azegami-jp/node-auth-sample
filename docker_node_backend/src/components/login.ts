import * as express from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../entity/user";
import * as bcrypt from "bcrypt";
import { jwtHelper } from "../utils/jwtHelepr";
import ms = require("ms");

const router = express.Router();
//レポジトリを取得（データの格納先のエンティティを指定する）
const userRepository = AppDataSource.getRepository(User);
router.post("/", async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.email || !user.password) {
      throw new Error("USERS_INVALID_VALUE");
    }

    //DBからユーザー情報を取得
    const result = await userRepository.findOne({
      where: { mail: user.email },
    });

    //既に登録済みのアドレスかチェック
    if (!result) {
      throw new Error("USERS_NOT_EXISTS_USER");
    }

    //リクエストされたパスワードとDBのパスワード（暗号化されたパスワード）を比較
    const match = await bcrypt.compare(user.password, result.password);
    if (match) {
      //パスワードが同じの場合、jsonWebTokenを作成
      const jwtToken = jwtHelper.createToken();
      res
        .cookie("jwtToken", jwtToken, {
          //webサーバーのみがアクセス可能
          httpOnly: true,
          //cookieの有効期限は2日間に設定
          expires: new Date(Date.now() + ms("2d")),
        })
        .json({
          user: {
            id: result.id,
          },
        });
    } else {
      throw new Error("SERVER_ERROR");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
});

export default router;