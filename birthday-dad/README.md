# Birthday Website for Dad 🎂

A silent, scrapbook-style birthday surprise. Plain HTML + CSS + JavaScript. No audio, no backend, nothing to install.

## 1. Replace the photos
Open `assets/photos/` and replace each file with your own photo, **keeping the same file name**:
`photo1.jpg` … `photo5.jpg` (Memories page) and `final.jpg` (last surprise).
Landscape photos work best (about 4:3). Keep each under ~500 KB so the site loads fast.

## 2. Replace the text (everything is in `index.html`)
Search for these placeholders (Ctrl+F):
- `[PHOTO CAPTION 1]` … `[PHOTO CAPTION 5]`, `[FINAL PHOTO CAPTION]` - captions under photos
- `[PERSONAL MESSAGE` - your own lines in the letter (add or delete `<p class="line">` lines freely)
- `[YOUR NAME]` - the letter signature
- Heading/greeting lines such as "Papa" or "Pitaji" - change to his nickname
- The six "Things we love" cards: edit the text, or add inside jokes and memories

Colors are at the top of `style.css` (`:root`). 

## 3. Run locally
Double-click `index.html`. Or, for a local server: `python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## 4. Put it online (free)
- **Netlify Drop**: go to app.netlify.com/drop and drag this whole folder in. You get a link immediately.
- **GitHub Pages**: upload the folder to a new repo, then Settings → Pages → deploy from `main`.
- **Vercel**: `vercel` in this folder, or import the repo.
Send Dad the link (best opened on a phone or laptop).

## Notes
- The gift, cake and envelope are drawn in CSS/SVG, so there are no `gift.png`, `cake.png` or `envelope.png` files to manage.
- Photos open bigger when tapped. Press Esc to close.
