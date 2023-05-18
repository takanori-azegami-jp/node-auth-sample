import * as express from "express";
import login from "./login";
import signUp from "./signUp";
import logout from "./logout";
import home from "./home";

const router = express.Router();

//認証前ページからのデータ処理のルーティング
router.use("/sign-up", signUp);
router.use("/login", login);
router.use("/logout", logout);

//jwtトークンの検証
router.get("/tokenVerification", (req, res, next) => {
  let token = "";
  if (req.cookies.jwtToken) {
    token = req.cookies.jwtToken;
  } else {
    //cookieにjwtトークンがない場合は、認証不可
    return res.status(200).json({ isAuthenticated: false });
  }

  //  リクエストされたjwtトークンを検証
  const decode = jwtHelper.verifyToken(token);
  if (decode) {
    //検証がOKであれば、jwtトークンを再作成
    const token = jwtHelper.createToken();
    res.cookie("jwtToken", token, {
      httpOnly: true,
      expires: new Date(Date.now() + ms("2d")),
    });
    res.status(200).json({ isAuthenticated: true });
  }
});

//認証後ページからのデータ処理のルーティング
router.use("/home", home);

export default router;
