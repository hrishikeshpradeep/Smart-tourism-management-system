# SmartYatra — Claude Project Handoff

## Purpose

This document gives Claude the full working context for the **SmartYatra / Smart Tourism Management System** course project. Treat it as the source of truth for the product direction, current technical setup, visual rules, and past decisions.

Do not expose, print, commit, or request secrets from `.env`.

---

## Project identity

- Product name: **SmartYatra**
- Full academic title: **Smart Tourism Management System**
- Context: Agile Development Process course project
- Main goal: a polished tourism-planning web application for Indian destinations.
- Core experience: browse destinations, open place details, save wishlists, build a trip estimate, choose alternatives, save trips, and view saved trips.

## Repository and working folder

- GitHub: `https://github.com/hrishikeshpradeep/Smart-tourism-management-system`
- Production branch: `main`
- Local project folder: `C:\Users\hrish\Documents\Codex\2026-08-04\project`
- Latest deployed-code commit at the time of this handoff: `9fcfc3a — Serve tourism videos from Supabase Storage`

## Technology currently used

- Frontend: plain HTML, CSS, JavaScript
- Backend code: Node.js / Express / Prisma exists in the repository, but backend work is intentionally paused.
- Database: PostgreSQL migrated to Supabase.
- Authentication direction: Supabase Auth with email OTP. Do not reintroduce Twilio phone OTP unless explicitly requested.
- Deployment target: Vercel
- API testing tool used earlier: Postman, but do not depend on Postman for normal frontend work.

## Important files

- `index.html` — page structure
- `styles.css` — all responsive and visual styling
- `app.js` — destinations, modal details, video behavior, trip estimate, local wishlist/trips UI
- `assets/` — local images and original local videos
- `prisma/seed.ts` — seeded destination data
- `.env` — private local configuration only; never commit
- `.gitignore` — intentionally excludes all MP4 files

---

## Current video hosting setup (critical)

The background tourism videos are **not in GitHub**. They are stored in a public Supabase Storage bucket:

- Bucket: `tourism-videos`
- Public base URL:
  `https://rajxgulcgxjxzxjgbpzo.supabase.co/storage/v1/object/public/tourism-videos`

`app.js` contains:

```js
const hostedVideoBase = 'https://rajxgulcgxjxzxjgbpzo.supabase.co/storage/v1/object/public/tourism-videos';
const hostedVideoUrl = file => `${hostedVideoBase}/${encodeURIComponent(file)}`;
```

The site must continue using `hostedVideoUrl(...)` for hero and planner videos. Do not change it back to `assets/*.mp4`, because Vercel does not receive the local video files.

The locally optimized videos were trimmed to 30 seconds, muted, and compressed below 50 MB each for Supabase Free plan upload. The 24 hosted filenames are:

```text
andaman.mp4
coorg.mp4
darjeeling.mp4
goa.mp4
hampi.mp4
hero-goa.mp4
hero-himalaya.mp4
hero-jaipur.mp4
hero-kashmir.mp4
hero-ladakh.mp4
hero-manali.mp4
hero-munnar.mp4
hero-varanasi.mp4
india-tourism-hero.mp4
jaipur.mp4
kashmir.mp4
ladakh.mp4
manali.mp4
munnar.mp4
ooty.mp4
pondicherry.mp4
rishikesh.mp4
udaipur.mp4
varanasi.mp4
```

The original MP4 files and local optimized copies remain intentionally ignored by Git:

```text
assets/*.mp4
assets/**/*.mp4
```

Do not add large video files to ordinary Git history. If video storage ever needs changing, prefer Supabase Storage or another CDN rather than GitHub.

---

## Current UI and behavioral requirements

### Branding

- Product name must be `SmartYatra` everywhere.
- `Yatra` is green in standard brand text.
- In the hero eyebrow above the main heading, highlight only `YATRA` in green.
- Keep the custom transparent SmartYatra logo at `assets/smartyatra-logo.png`.
- Do not replace the logo with generic iconography.

### Home / hero layer

- The first layer is a full-screen travel video hero, not a side video.
- Video order begins with Jaipur, Varanasi, Manali, Goa, Ladakh, then the other destinations.
- The hero uses two video elements and a smooth opacity crossfade.
- Hero text changes with the visible place.
- Keep the professional tourism wording and CTA: `Unleash your dream destination`.
- Avoid visible delays between text changes and video changes.

### Destination explorer cards

- Keep the card text/layout in the original neutral style before a user clicks a place.
- Include at least the current 15 Indian destinations with appropriate pricing, season, category, ratings, and famous-place imagery.
- Images must match their actual destination. Important examples:
  - Jaipur: Hawa Mahal
  - Ooty: Nilgiri train / green landscape
  - Kashmir: snow landscape
  - Coorg: hills
  - Hampi: temple/heritage
  - Munnar: tea hills
- Clicking either a destination image or **View details** must open the same detail modal.
- Do not remove the **View details** button.
- The heart button must add/remove a destination from the wishlist.

### Destination details modal

- Modal must scroll internally on small and large screens. Users previously could not reach content below the fold; never reintroduce that bug.
- The detail view can use a destination-specific, light, professional palette **only after a place is selected**.
- Do not make the catalog cards fancy or recolor them by place before clicking.
- Keep the Google Maps link/button for each destination.
- Keep daily budget, ideal season, suggested experiences, plan-trip action, wishlist action, and link to wishlist area.
- Use rounded/lightly structured cards and professional styling, not opaque plain-white popups.
- Place image crop should be centered, slightly upward (`object-position: center 60%`).

### Planner / itinerary

- Clicking **Plan trip** should go to the `Build a practical itinerary` section and preselect the destination.
- Planner background must be full-width video, not a small side panel.
- When user changes destination in the dropdown, use that selected destination's hosted video.
- Planner uses sequential 5-second sections from that destination video and two video elements for a smooth crossfade.
- Keep the destination-specific planner background/palette.
- The form labels/text must remain dark black/near-black for legibility for every selected destination.
- Keep the translucent, curved glass form style.
- Do not use the old orange solid drop-shadow behind the form.
- Preserve form fields: destination, travel style, start/end dates, travellers, budget, and interests.

### Estimate / recommendation section

- Generate a practical estimate based on chosen destination, duration, travellers, budget, and interests.
- Show the selected place plus alternatives.
- Alternatives must be clickable. Selecting one changes the chosen destination/estimate.
- Include **Save Trip**, which redirects to / updates **My trips**.
- The heading should use an aesthetic, professional phrase instead of the old `EXPLAINABLE SUGGESTIONS` wording. Current wording: `CURATED FOR YOU`.

### Wishlist and My Trips

- Wishlist must work without backend dependency using local state/localStorage if API is unavailable.
- Wishlisted items should appear in the dedicated wishlist view.
- Saved trips should appear after refresh using `localStorage('smartYatraSavedTrips')`.
- Do not show raw `Failed to fetch` messages. Use the current friendly empty state:
  `Every great journey begins with a plan. Your saved adventures will be ready here when you are.`
- Keep the user menu behavior: clicking the username opens a dropdown; it must not sign the user out.
- The dropdown includes Account, My Trips, Saved Places, and Sign out. Account reveals change username/password options only when clicked.

### Reviews and authentication UI

- Include the existing verified traveller reviews section.
- Login/create-account UI includes visual Google, Facebook, email options; icons should be correct.
- Intended authentication approach is email OTP via Supabase, but backend work is paused. Do not claim actual social/phone login works unless it is implemented.

---

## Responsive rules

The website was made responsive in `styles.css`.

- Preserve desktop design.
- Grids should collapse from 3 columns to 2 columns to 1 column.
- Forms must stack on phone screens.
- Modals must fit and scroll on small devices.
- Navigation/account controls must remain reachable on phones.
- Do not remove or simplify features just to make a mobile layout work.

## Performance note / known issue

The website can still lag on slower networks or lower-powered devices because it uses background travel videos.

Reasons:

- Hero and planner each use two video elements for crossfades.
- Planner videos can start loading before the planner is visible.
- The optimized hosted MP4 set totals approximately 320 MB.
- The browser changes video clips every five seconds and prepares the next clip.

If asked to improve performance, do **not** change the visual design first. Prefer:

1. Lazy-load planner video only when the planner enters the viewport or is opened.
2. Keep only one next video clip preloaded.
3. Use 1080p web encodes for mobile/slow connections while keeping the desktop experience attractive.
4. Retain the existing fade/crossfade interaction.

---

## Data and Supabase notes

- Supabase PostgreSQL tables migrated earlier include `Attraction`, `BookingRequest`, `BudgetItem`, `Destination`, `ItineraryDay`, `ItineraryItem`, `Review`, `Trip`, `User`, and `Wishlist`.
- Database and Storage are separate. The current frontend can operate with localStorage for wishlist and trip display when backend is stopped.
- The Supabase Storage bucket is public for video playback. Do not add public write policies.
- A temporary `SUPABASE_SERVICE_ROLE_KEY` may exist in the local `.env` from upload work. It is not needed by the frontend runtime and should remain private. Never put it into frontend JavaScript, Vercel client variables, GitHub, or Claude project knowledge.

---

## Explicit content/design constraints from the owner

- Do not change unrelated details when asked for a focused change.
- Keep the visual tone professional, light, clean, and tourism-focused.
- Avoid overly fancy or dark destination detail palettes.
- Keep light/glass modal and planner form treatment.
- Preserve text/brand placement unless specifically asked to alter it.
- Never remove buttons or existing features merely because a new interaction is added.
- Do not re-add removed academic/prototype disclaimers such as:
  - `Smart Tourism Management System · Agile Development Process course project`
  - `Prototype data is illustrative; costs and availability are not live.`
  - `Recommendations use clear preference matching...`
  - `Demo only: no payment or live booking is collected.`

## Safe workflow for Claude

1. Read `index.html`, `styles.css`, and `app.js` before proposing changes.
2. Preserve the public Supabase video URL setup.
3. Make focused changes only; state which files will change.
4. Test JavaScript syntax (`node --check app.js`) after JavaScript edits.
5. Do not commit `.env`, MP4 files, local database backups, `node_modules`, or generated temporary files.
6. If changes are intended for Vercel, commit and push only source code, styles, small images, and configuration safe for Git.

## Useful request prompt for Claude

> Read `CLAUDE_HANDOFF.md` first. Work only on the change I request. Preserve SmartYatra branding, the Supabase-hosted video setup, responsive behavior, and all existing functionality. Do not expose secrets or add MP4 files to Git.

