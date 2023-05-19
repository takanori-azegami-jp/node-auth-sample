const express = require('express');
const app = express();
const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
// 暗号化につかうキー
const APP_KEY = 'YOUR-SECRET-KEY';

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
app.use(cookieParser());

// ログインしてるかチェック
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else if (req.cookies.remember_me) {
    const [rememberToken, hash] = req.cookies.remember_me.split('|');
    User.findAll({
      where: {
        rememberToken: rememberToken,
      },
    }).then((users) => {
      for (let i in users) {
        const user = users[i];
        const verifyingHash = crypto
          .createHmac('sha256', APP_KEY)
          .update(user.id + '-' + rememberToken)
          .digest('hex');

        console.log('hash:' + hash);
        console.log('verifyingHash:' + verifyingHash);

        if (hash === verifyingHash) {
          return req.login(user, () => {
            // 本来は、自動ログイン後にCookieのトークンは新しく更新する
            console.log('自動リダイレクトしました');
            next();
          });
        }
      }
      res.redirect(302, '/login');
    });
  } else {
    res.redirect(302, '/login');
  }
};

// メインページ
app.get('/', (req, res) => {
  console.log('メインページに遷移します');
  //indexテンプレート呼び出し
  res.render('index', {
    title: 'TOP',
    message: '正常に起動しました',
  });
});

// 5000番ポートで待機
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`${PORT}番のポートで待機中です...`);
});

// ログインフォーム
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error').join('<br>');
  //loginテンプレート呼び出し
  res.render('login/form', {
    errorMessage: errorMessage,
  });
});

// ログイン実行
app.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。',
  }),
  (req, res, next) => {
    if (!req.body.remember) {
      // 次回もログインを省略しない場合
      res.clearCookie('remember_me');
      return next();
    }

    const user = req.user;
    const rememberToken = crypto.randomBytes(20).toString('hex'); // ランダムな文字列
    const hash = crypto
      .createHmac('sha256', APP_KEY)
      .update(user.id + '-' + rememberToken)
      .digest('hex');
    user.rememberToken = rememberToken;
    user.save();
    res.cookie('remember_me', rememberToken + '|' + hash, {
      path: '/',
      maxAge: 5 * 365 * 24 * 60 * 60 * 1000, // 5年
    });
    return next();
  },
  (req, res) => {
    res.redirect('/user');
  }
);

// ログイン成功後のページ
app.get('/user', authMiddleware, (req, res) => {
  const user = req.user;
  console.log('ログイン成功');
  res.send('ログイン完了！');
});

// ログアウト後のページ
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});
