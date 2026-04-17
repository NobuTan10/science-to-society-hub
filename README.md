# Science to Society Hub — Website

A modern, bilingual (English / Japanese) static website for the Science to Society Hub, built for deployment on **GitHub Pages**.

---

## Project Structure

```
science-to-society-hub/
├── index.html          ← Main page (all sections)
├── css/
│   └── style.css       ← Styles (dark theme, responsive)
├── js/
│   └── main.js         ← Language toggle, animations, form
├── images/             ← Place your images here
└── README.md
```

---

## Editing in VS Code

1. Open the `science-to-society-hub/` folder in VS Code.
2. Install the recommended extension: **Live Server** (`ritwickdey.LiveServer`)
3. Right-click `index.html` → **Open with Live Server** to preview changes in real time.

### Key areas to customize

| What to change | Where |
|---|---|
| Organization name / logo | `index.html` — `.logo` section |
| Hero headline & subtitle | `index.html` — `section.hero` |
| Mission text | `index.html` — `section.about` |
| News articles | `index.html` — `section.news` |
| Contact email / location | `index.html` — `section.contact` |
| Stats (50+, 30+, …) | `index.html` — `section.stats-bar` |
| Colors / fonts | `css/style.css` — `:root` variables |

### Adding a new language string

Every translatable element uses two data attributes:

```html
<p data-en="Your English text" data-ja="日本語テキスト">Your English text</p>
```

The JavaScript in `js/main.js` reads these attributes and swaps the text content when the user clicks **EN / JA**.

---

## Publishing to GitHub Pages

### First time setup

1. Create a new repository on GitHub (e.g., `science-to-society-hub`).
2. In VS Code, open the integrated terminal and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/science-to-society-hub.git
git push -u origin main
```

3. On GitHub, go to **Settings → Pages**.
4. Under **Source**, select `Deploy from a branch` → branch: `main` / folder: `/ (root)`.
5. Click **Save**. Your site will be live at:
   `https://YOUR_USERNAME.github.io/science-to-society-hub/`

### Subsequent updates

```bash
git add .
git commit -m "Update: describe your change"
git push
```

GitHub Pages will automatically rebuild within ~1 minute.

---

## Contact Form

The form currently shows a visual confirmation but does not send emails (GitHub Pages is static — no server). To enable real email delivery, replace the `setTimeout` block in `js/main.js` with one of:

- **Formspree** (free tier): `https://formspree.io/` — change the form `action` attribute.
- **EmailJS**: client-side email via JS.
- **Netlify Forms**: if you deploy to Netlify instead.

---

## License

© Science to Society Hub. All rights reserved.
