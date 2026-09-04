# staybnb

A fully functional frontend clone of an Airbnb-style stays search page, focused on Bali, Indonesia.

![staybnb screenshot](https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80)

## Features

- **Search bar** with location, date range picker, and guest counter
- **Interactive filters** (Pool, Wifi, Beachfront, Pet friendly, Free cancellation, Kitchen, etc.)
- **Sort** by price or rating
- **Responsive listing cards** with images, ratings, prices, and wishlist (hearts persist via localStorage)
- **Interactive map** powered by Leaflet + Carto tiles with custom markers
- **Listing detail modal** with description and “Reserve” button (demo)
- **Mobile-friendly** layout with collapsible map

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- [Leaflet](https://leafletjs.com/) for the map
- Unsplash images for properties
- No build step required – pure static site

## Live Demo

Open `index.html` in any modern browser, or deploy the folder to any static host (GitHub Pages, Netlify, Vercel, etc.).

## Local Development

```bash
# Simply open the file
open index.html

# Or serve with any static server
npx serve .
# or
python -m http.server 8000
```

## GitHub Pages

1. Push this repo
2. Go to Settings → Pages → Source: Deploy from a branch → `main` / root
3. Your site will be available at `https://<username>.github.io/staybnb`

## Project Structure

```
staybnb/
├── index.html      # Main page
├── styles.css      # All styles
├── app.js          # Data + interactivity
└── README.md
```

## License

MIT – feel free to use and modify.
