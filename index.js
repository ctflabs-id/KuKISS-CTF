const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(express.static('public'));

app.get('/', (req, res) => {
  let user = req.cookies.user;

  if (!user) {
    user = 'guest';
    res.cookie('user', 'guest', {
      httpOnly: false,
      sameSite: 'Lax',
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    });
  }

  // Gunakan template HTML penuh
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Cookies Store Announcement</title>
      <style>
        :root {
          --background: #fdfaf6;
          --card-bg: #ffffff;
          --text-color: #2e2e2e;
          --accent: #d3a577;
          --accent-dark: #a66a3d;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

          body, html {
    height: 100%;
    font-family: 'Segoe UI', sans-serif;
    background: url('/cookie-bg.avif') no-repeat center center fixed;
    background-size: cover;
  }

        .page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 1rem;
        }

        .announcement {
          background-color: var(--card-bg);
          border: 2px solid var(--accent);
          border-radius: 16px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
        }

        .announcement h1 {
          font-size: 2rem;
          color: var(--accent-dark);
          margin-bottom: 1rem;
        }

        .announcement p {
          color: var(--text-color);
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .guest-info {
          font-weight: 500;
          background-color: #f3e5d0;
          color: var(--accent-dark);
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          display: inline-block;
        }

        @media (max-width: 600px) {
          .announcement h1 {
            font-size: 1.5rem;
          }

          .announcement p {
            font-size: 0.95rem;
          }

          .guest-info {
            font-size: 0.95rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="announcement">
          <h1>KuKiSS 🍪</h1>
          <p>
            ${user === 'admin'
              ? `Wihh kamu berhasil menemukan celahnya!<br><strong>CTFL{COOKIE_STORE_CTF}</strong>`
              : `Website ini masih dalam pengembangan.<br>
                   Hanya akun administrator yang bisa mengakses fitur rahasia`}
          </p>
          <div class="guest-info">${user === 'admin' ? 'Logged Sebagai Admin' : 'Halo Guest, kamu belum cukup manis untuk masuk 😋'}</div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`CTF Cookie Store running at http://localhost:${PORT}`);
});
