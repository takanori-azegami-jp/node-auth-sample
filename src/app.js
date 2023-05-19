const express = require('express');
const app = express();
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');

// テンプレート
const mustacheExpress = require('mustache-express');
app.engine('mst', mustacheExpress());
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

// ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: 'YOUR-SECRET-STRING',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    // ログインしてるかチェック

    next();
  } else {
    res.redirect(302, '/login');
  }
};

// メインページ
app.get('/', (req, res) => {
  res.send('正常に動作してます');
});

// 5000番ポートで待機
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${PORT}番のポートで待機中です...`);
});

// ログインフォーム
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error').join('<br>');
  res.render('login/form', {
    errorMessage: errorMessage,
  });
});

// ログイン実行
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。',
  })
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req, res) => {
  const user = req.user;
  res.send('ログイン完了！');
});
