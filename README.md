# Smart Tourism Management System

A responsive front-end MVP for an Agile Development Process course project. It is based on the submitted SRS and intentionally avoids claiming live availability, real prices, payments, or bookings.

## Included features

- Destination catalogue with search, travel-style filters, and daily-budget filters
- Destination details, seasonal information, indicative costs, ratings, and suggested attractions
- Wishlist stored in the browser using `localStorage`
- Trip-planning form with dates, travelers, budget, and interests
- Explainable rule-based recommendations and a transparent cost estimate
- Mobile-friendly layout and accessible labels, focusable controls, and semantic headings

## Run it locally

### Option A: easiest (Visual Studio Code + Live Server)

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. In VS Code, install the **Live Server** extension by Ritwick Dey.
3. Open this folder: `C:\Users\hrish\Documents\Codex\2026-08-04\referenced-chatgpt-conversation-this-is-an`.
4. Open `index.html`.
5. Click **Go Live** in the bottom-right of VS Code.
6. The site opens in your browser, normally at `http://127.0.0.1:5500`.

### Option B: no extension (Node.js)

1. Install the current [Node.js LTS](https://nodejs.org/).
2. Open a terminal in this project folder.
3. Run:

```powershell
npx serve .
```

4. Open the local URL printed in the terminal.

### Option C: Python (if already installed)

```powershell
python -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and accessible content |
| `styles.css` | Responsive design and visual styling |
| `app.js` | Destination data, filtering, wishlist, planner, recommendation logic |
| `Smart_Tourism_Management_System_SRS.docx` | Full project requirements specification |

## Demonstration checklist

1. Search for **Goa**; the catalogue should show one matching destination.
2. Filter by **Mountain**; Manali and Munnar should appear.
3. Save a place with the heart button and open **saved** in the header.
4. Select a destination, dates, travelers, and interests in **Trip planner**.
5. Click **Create my estimate** and review the suggested destinations and cost message.

## Important MVP limitation

This is a front-end prototype. The data is seeded in `app.js`, and the wishlist is stored only in the current browser. To turn it into a full-stack submission, add an API, database, real authentication, server-side role checks, admin dashboard, and tests as described in the SRS.
