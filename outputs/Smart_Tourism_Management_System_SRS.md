# Smart Tourism Management System - Software Requirements Specification

**Version:** 1.0  |  **Project type:** Agile course MVP  |  **Date:** 2026-08-04

This companion mirrors the DOCX SRS in a machine-friendly form. The DOCX is the formatted academic submission.

SOFTWARE REQUIREMENTS SPECIFICATION
Smart Tourism Management System
IEEE-style SRS with Agile Delivery Plan
Purpose
This specification defines an implementable, course-scale Smart Tourism Management System. It deliberately prioritizes a usable MVP, traceable requirements, iterative delivery, and demonstrable Agile artifacts over live commercial integrations.
# Document Revision History
# Table of Contents
- 1. Introduction
- 2. Overall Description
- 3. Stakeholders, Personas, Vision and Scope
- 4. Functional Requirements
- 5. Non-functional Requirements
- 6. Agile Requirements: User Stories, Backlog and Sprints
- 7. Use Cases
- 8. Architecture, Data Model and APIs
- 9. Business Rules and Data Dictionary
- 10. UI, Security, Testing and Risk Management
- 11. Future Enhancements, Glossary and Appendices
# 1. Introduction
## 1.1 Purpose
The Smart Tourism Management System (STMS) helps travelers discover destinations and attractions, build an itinerary, estimate trip cost, save plans, and optionally request local-guide or accommodation reservations. It provides administrators with tools to curate destination content and oversee requests. This SRS is both an academic submission and an implementation contract for a Codex-built web MVP.
## 1.2 Scope
- In scope: authenticated tourist accounts; destination and attraction catalog; search/filter; wishlist; trip creation; editable day-wise itinerary; budget estimation; reviews; booking/request workflow; admin content management; responsive interface.
- Out of scope for MVP: real payment capture, airline/train ticketing, guaranteed live inventory, emergency dispatch, and production-grade AI. Integrations may be represented by mocks or links.
- Primary deployment assumption: India-first content and INR currency, with an architecture that supports internationalization later.
## 1.3 Definitions and References
# 2. Overall Description
## 2.1 Product Perspective
STMS is a standalone, responsive web application using a browser client, REST API, relational database, and optional map/weather/recommendation adapters. The MVP must continue to work when optional external services are unavailable by showing seeded data and clear status messages.
## 2.2 Product Functions
- Register, authenticate, and manage user profile.
- Browse, search, filter, and view destinations and attractions.
- Save destinations/attractions to a wishlist.
- Create trips and generate/edit day-wise itineraries.
- Estimate a budget from selected components and track planned versus estimated total.
- Submit reviews and booking requests; track request status.
- Allow administrators to manage catalog content and moderate reviews/requests.
## 2.3 User Classes
## 2.4 Operating Environment
- Modern Chromium, Firefox, Safari, or Edge browser; mobile viewport >= 360px.
- Node.js/TypeScript web stack recommended: React/Next.js or equivalent client; Express/NestJS or Next API routes; PostgreSQL/SQLite for development.
- HTTPS in deployed environments; local development may use HTTP.
## 2.5 Assumptions and Constraints
# 3. Stakeholders, Personas, Vision and Scope
## 3.1 Stakeholders
## 3.2 Personas
## 3.3 Product Vision
For travelers who need a simple, reliable way to plan a trip, STMS is a web platform that combines destination discovery, itinerary building, and practical cost visibility. Unlike fragmented tourism websites, it maintains a single personal trip workspace and a curator-managed catalog.
## 3.4 Success Measures
- A new tourist can create an account, find a destination, add two attractions, create a 2-3 day trip, and see an estimate in under 10 minutes during usability testing.
- At least 80% of defined MVP acceptance criteria pass before final demo.
- Each sprint ends with a running increment and retrospective actions.
# 4. Functional Requirements
# 5. Non-functional Requirements
# 6. Agile Requirements
## 6.1 User Stories and Acceptance Criteria
## 6.2 Product Backlog
## 6.3 Five-Sprint Plan
## 6.4 Ceremonies and Definition of Done
- Sprint planning: select prioritized stories, estimate in story points, identify test tasks and a sprint goal.
- Daily stand-up: yesterday, today, blockers (or an asynchronous equivalent for student schedules).
- Review: demo working software against acceptance criteria; collect feedback.
- Retrospective: record one improvement action and track it in the next sprint.
- Definition of Done: code reviewed by teammate where possible; lint/build pass; tests for changed core logic; acceptance criteria demonstrated; no critical known defect; documentation/backlog updated.
# 7. Use Cases
# 8. System Architecture, Data Model and APIs
## 8.1 Logical Architecture
Browser UI (React/Next.js) -> REST API / application services -> relational database. Optional adapters isolate Map, Weather, and Recommendation sources. Authentication middleware protects user/admin routes; role authorization happens in the API, never solely in the UI.
## 8.2 Database Schema
## 8.3 Entity Relationship Summary
User 1..* Trips; Destination 1..* Attractions; Trip 1..* ItineraryDays 1..* ItineraryItems; Trip 1..* BudgetItems; User 1..* Wishlist/Reviews/BookingRequests. A destination may have many reviews and may be referenced by many trips or saved items.
## 8.4 REST API Specification
## 8.5 API Conventions
- JSON request/response; ISO 8601 dates; INR amounts as integer paise or decimal numbers consistently chosen by the team.
- Success uses 200/201/204; validation uses 400/422; unauthenticated 401; unauthorized 403; absent resource 404; duplicate unique resource 409.
- List endpoints use page, limit, sort and filter query parameters where pagination is implemented.
- Error envelope: { "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "..." } } }.
# 9. Business Rules and Data Dictionary
## 9.1 Business Rules
## 9.2 Data Dictionary (selected)
# 10. UI Requirements, Security, Testing and Risks
## 10.1 UI Requirements
## 10.2 Security and Privacy Requirements
- Hash passwords with Argon2id or bcrypt; never log passwords/tokens.
- Use secure, HttpOnly, SameSite cookies for browser sessions where applicable; enforce HTTPS in deployment.
- Validate types, ranges, ownership, and allowlisted enum values server-side; parameterize database queries; encode untrusted rendered content.
- Apply RBAC on every protected endpoint; do not rely on hidden buttons or client role checks.
- Rate limit sign-in/register endpoints in deployment; return generic authentication failures.
- Keep API keys only in server environment variables; commit an .env.example without secrets.
- Provide a Privacy Notice placeholder and an account/profile update path; retain only course-project data needed for the demo.
## 10.3 Testing Strategy
## 10.4 Risk Analysis
# 11. Future Enhancements, Glossary and Appendices
## 11.1 Future Enhancements
- Live provider integrations for availability, verified bookings and payments through a compliant gateway.
- LLM-assisted natural-language itinerary generation with citations, guardrails, and human-editable output.
- Real-time weather, transport disruption alerts, offline itinerary, multilingual content, and accessibility ratings.
- Partner portal for hotels/guides, analytics dashboard, verified reviews, social sharing, and group collaborative planning.
- Advanced optimization for routes, carbon-aware suggestions, and calendar synchronization.
## 11.2 Glossary
## Appendix A - Requirement Traceability
## Appendix B - Sample Recommendation Rule
For each published destination, initialize score = 0. Add 3 points for each matching interest, 2 if indicative daily cost is within budget/day, 2 if selected travel style/suitability matches, and 1 if season matches. Sort descending by score, then rating. Return up to five results with human-readable reason tags such as “Matches beaches and food interests” and “Within your daily budget”. This is transparent and sufficient for the MVP; it is not represented as machine intelligence or a guarantee.
## Appendix C - Implementation Handoff Checklist
- Create migrations and seed at least 8 destinations and 25 attractions spanning categories.
- Implement RBAC and owner checks before building admin pages.
- Build vertical slices per sprint; write test cases from acceptance criteria.
- Maintain README: prerequisites, environment variables, migration/seed commands, test commands, demo credentials and known limitations.
- Capture sprint board, review feedback, retrospective action, screenshots, and test evidence for course submission.

**Table 1**

| Document control | Value |
| --- | --- |
| Version | 1.0 |
| Status | Baseline for course project |
| Prepared for | Agile Development Process course |
| Product type | Responsive web application / MVP |
| Date | 2026-08-04 |

**Table 2**

| Version | Date | Author | Change |
| --- | --- | --- | --- |
| 1.0 | 2026-08-04 | Project Team | Initial SRS baseline for backlog refinement and sprint planning |

**Table 3**

| Term | Meaning |
| --- | --- |
| MVP | Minimum Viable Product delivered within the course timeline. |
| Tourist | Authenticated end user planning or managing a trip. |
| Itinerary | A dated/day-wise plan containing selected attractions and travel notes. |
| Booking request | Non-payment request for a hotel or guide; it can be confirmed, rejected, or cancelled. |
| Admin | Authorized user who moderates content and booking requests. |

**Table 4**

| Class | Description | Access |
| --- | --- | --- |
| Guest | Unregistered visitor exploring public content. | Browse/search only. |
| Tourist | Registered traveler. | Personal trips, wishlists, reviews and requests. |
| Admin | Course-project administrator/content curator. | Catalog, moderation, dashboard and request management. |
| Guide/Hotel partner (future) | Provider responding to requests. | Not required in MVP; represented through admin workflow. |

**Table 5**

| Type | Item |
| --- | --- |
| Assumption | Destination, attraction, hotel, and guide seed data are accurate enough for a demo but not a commercial inventory feed. |
| Assumption | One student/team acts as Admin during demo. |
| Constraint | Five short sprints; features must be independently demonstrable. |
| Constraint | No live financial transaction or collection of card data. |
| Constraint | Map/weather/AI providers are optional and must be mockable. |
| Constraint | Personal data is limited to account and travel-planning data required by the MVP. |

**Table 6**

| Stakeholder | Interest / responsibility |
| --- | --- |
| Tourists | Fast discovery, credible information, clear planning and cost visibility. |
| Project team | Build, test, demonstrate, and maintain a course-scale MVP. |
| Faculty/evaluator | Assess Agile process, requirements traceability, quality, and working increments. |
| Tourism content administrator | Maintain destinations/attractions and manage user-generated content. |
| Local providers | Potential future recipients of guide/hotel requests. |
| External service providers | Optional map, weather, and recommendation data suppliers. |

**Table 7**

| Persona | Goals | Pain points | Needs |
| --- | --- | --- | --- |
| Aarav, 21, student traveler | Plan a 3-day low-cost trip with friends. | Information is fragmented; budgets become unclear. | Filters, itinerary, transparent estimate. |
| Meera, 34, family traveler | Find family-friendly places and stays. | Unsafe/irrelevant suggestions; little time. | Accessible details, ratings, simple planning. |
| Ravi, 29, solo explorer | Discover local experiences and a guide. | Generic lists and uncertain local contacts. | Interest-based discovery and request tracking. |
| Nisha, content admin | Keep listings trustworthy. | Outdated content and abusive reviews. | CRUD, moderation, status visibility. |

**Table 8**

| ID | Requirement |
| --- | --- |
| FR-01 Authentication | The system shall allow a guest to register using name, email, and password; email must be unique. |
| FR-02 Session management | The system shall authenticate registered users and allow logout; protected resources shall reject unauthenticated access. |
| FR-03 Profile | The system shall allow a tourist to view and update display name, phone (optional), preferences, and default budget range. |
| FR-04 Destination catalog | The system shall list published destinations with name, region, category, summary, image, rating, and indicative daily cost. |
| FR-05 Search and filters | The system shall search destinations/attractions by keyword and filter by category, interest, budget range, suitability, and rating. |
| FR-06 Destination details | The system shall show description, attractions, seasonality, hours/fees when available, map coordinates, and reviews. |
| FR-07 Wishlist | The system shall let a tourist add/remove a destination or attraction from their private wishlist. |
| FR-08 Trip creation | The system shall create a trip with title, destination, start/end date, traveler count, budget, and travel style. |
| FR-09 Itinerary | The system shall create one itinerary day per trip date and let tourists add, remove, reorder, and annotate activities. |
| FR-10 Recommendation | The system shall propose destinations/attractions based on interests, budget, days, and travel style using deterministic rules in MVP. |
| FR-11 Budget estimate | The system shall calculate and display estimated stay, transport, activity, food, and total costs; users may override component values. |
| FR-12 Reviews | The system shall allow a tourist with a verified account to submit one 1-5 rating and text review per destination; admin can hide reviews. |
| FR-13 Booking requests | The system shall allow a tourist to submit/cancel a non-payment hotel or guide request and view its status. |
| FR-14 Admin content management | The system shall allow an admin to create, edit, publish/unpublish, and delete destination and attraction records. |
| FR-15 Admin moderation | The system shall allow an admin to approve/hide reviews and update booking-request status with a note. |
| FR-16 Error handling | The system shall present actionable validation/errors without exposing stack traces or sensitive data. |

**Table 9**

| ID | Requirement |
| --- | --- |
| NFR-01 Performance | 95% of catalog/list API requests shall complete within 2 seconds with the course demo dataset on a local/deployed environment. |
| NFR-02 Availability | Optional integrations shall fail gracefully; core catalog/trip functions remain usable with local seed data. |
| NFR-03 Usability | Core tasks shall be reachable within three primary navigation levels; forms shall provide inline validation. |
| NFR-04 Accessibility | Target WCAG 2.1 AA essentials: semantic labels, keyboard access, visible focus, contrast >= 4.5:1, meaningful alt text. |
| NFR-05 Responsiveness | All core screens shall support 360px to desktop widths without horizontal scrolling. |
| NFR-06 Security | Passwords shall be salted/hashed; authorization shall be enforced server-side; input shall be validated and output encoded. |
| NFR-07 Privacy | Only necessary personal data shall be stored; users can edit their profile; secrets never appear in client source or logs. |
| NFR-08 Maintainability | Code shall use modular components/services, linting, documented environment variables, and a seeded development database. |
| NFR-09 Reliability | Mutating requests shall return clear success/failure states and avoid duplicate booking requests where practical. |
| NFR-10 Auditability | Admin moderation/status changes shall store actor, timestamp, old/new status where feasible. |

**Table 10**

| ID | User story | Acceptance criteria |
| --- | --- | --- |
| US-01 | As a guest, I want to register and sign in so that I can save travel plans. | Given valid unique credentials, when I register, then an account is created and I can sign in; duplicate email is rejected. |
| US-02 | As a tourist, I want to search and filter destinations so that I can shortlist relevant places. | Given catalog data, when I apply keyword/filters, then only matching published records appear and filters are visible. |
| US-03 | As a tourist, I want to view destination details so that I can decide whether to visit. | Given a published destination, when I open it, then I see summary, attractions, estimate, suitability, and available reviews. |
| US-04 | As a tourist, I want to save places so that I can revisit them. | When signed in and I save/remove a place, then the wishlist updates and remains correct after refresh. |
| US-05 | As a tourist, I want to create a dated trip so that I can organize my journey. | When dates and required fields are valid, then a trip is created with one itinerary day per date. |
| US-06 | As a tourist, I want to edit itinerary activities so that the plan fits my preferences. | When I add/reorder/remove an activity, then the day view and saved trip reflect the new order. |
| US-07 | As a tourist, I want a cost estimate so that I can stay within budget. | When trip inputs change, then component totals and total recalculate; overrides are clearly distinguished. |
| US-08 | As a tourist, I want recommendations so that I can find suitable places faster. | When I supply preferences, then ranked suggestions explain at least one matching reason. |
| US-09 | As a tourist, I want to submit a review so that I can share my experience. | Given a rating 1-5 and valid text, when submitted, then it is visible as pending/approved according to policy. |
| US-10 | As a tourist, I want to request a hotel or guide so that I can express interest without paying online. | When required request fields are valid, then a request is created as Pending and can later be cancelled. |
| US-11 | As an admin, I want to manage catalog entries so that tourist information stays current. | When admin publishes/unpublishes content, then public catalog visibility changes accordingly. |
| US-12 | As an admin, I want to moderate reviews/requests so that content and workflow stay trustworthy. | When I change status with an optional note, then the user sees the current status and the action is logged. |

**Table 11**

| ID | Backlog item | Stories | Priority | SP |
| --- | --- | --- | --- | --- |
| PB-01 | Authentication & roles | US-01 | Must | 8 |
| PB-02 | Catalog + search/filter | US-02,03 | Must | 13 |
| PB-03 | Wishlist | US-04 | Should | 5 |
| PB-04 | Trip & itinerary | US-05,06 | Must | 13 |
| PB-05 | Budget estimator | US-07 | Must | 8 |
| PB-06 | Rule-based recommendations | US-08 | Should | 8 |
| PB-07 | Reviews | US-09 | Should | 5 |
| PB-08 | Booking request workflow | US-10 | Could | 8 |
| PB-09 | Admin CMS + moderation | US-11,12 | Must | 13 |
| PB-10 | Responsive/a11y/testing/deploy | NFRs | Must | 13 |

**Table 12**

| Sprint / Goal | Selected scope | Increment | Review evidence |
| --- | --- | --- | --- |
| Sprint 1: Foundation | PB-01, initial PB-02 | Project setup, schema, auth, role guard, seeded catalog, CI/lint. | Sign-in and public catalog demo. |
| Sprint 2: Discovery | Remaining PB-02, PB-03 | Search/filter, detail page, wishlist, responsive navigation. | Tourist discovers and saves places. |
| Sprint 3: Planning | PB-04, PB-05 | Trip CRUD, itinerary days/activities, estimator, validation. | Tourist builds a costed itinerary. |
| Sprint 4: Smart workflow | PB-06, PB-07, PB-08 | Rule recommendations, reviews, booking requests and status. | Personalized suggestion and request demo. |
| Sprint 5: Operations & quality | PB-09, PB-10 | Admin CRUD/moderation, security hardening, accessibility, tests, deploy/demo. | End-to-end release candidate. |

**Table 13**

| ID / Name | Actor | Goal | Main flow | Postcondition |
| --- | --- | --- | --- | --- |
| UC-01 Register / Sign in | Guest | Create an account or start a session. | Guest submits valid registration or login form. | Account/session created; errors identify invalid fields. |
| UC-02 Discover destination | Guest/Tourist | Find suitable destination. | User searches/filter catalog, opens details. | Matching published results and detail shown. |
| UC-03 Plan trip | Tourist | Create editable trip plan. | Tourist supplies trip details, adds/reorders activities. | Saved trip has valid dated itinerary. |
| UC-04 Estimate budget | Tourist | Understand likely costs. | Tourist views/edits components. | Totals are recalculated and retained. |
| UC-05 Submit request | Tourist | Request guide/hotel contact. | Tourist selects provider and date range, submits. | Pending request and confirmation shown. |
| UC-06 Manage content | Admin | Curate catalog. | Admin creates/edits/publishes destination/attraction. | Published content is searchable by tourists. |
| UC-07 Moderate | Admin | Control review/request quality. | Admin changes review/request status. | Status and audit detail update. |

**Table 14**

| Layer | Responsibilities | Suggested implementation |
| --- | --- | --- |
| Presentation | Responsive pages, forms, state, accessibility. | React + TypeScript, component library/CSS. |
| API / Controller | Validation, HTTP status, auth boundary. | Next API routes / Express / NestJS. |
| Domain services | Trip planner, budget calculator, recommendation rules, moderation. | Typed service modules with unit tests. |
| Persistence | Transactions, indexes, migrations, seed data. | PostgreSQL (SQLite acceptable for demo). |
| External adapters | Map, weather, image/recommendation integrations; fallbacks. | Provider interface + mock implementation. |

**Table 15**

| Entity | Key fields / relationships |
| --- | --- |
| users | id PK, name, email UQ, password_hash, role, phone?, preferences_json, created_at |
| destinations | id PK, name, slug UQ, city, state, category, summary, daily_cost, latitude?, longitude?, status, image_url? |
| attractions | id PK, destination_id FK, name, category, description, entry_fee, duration_min, opening_hours, suitability_json, status |
| trips | id PK, user_id FK, destination_id FK, title, start_date, end_date, travelers, budget, style, status |
| itinerary_days | id PK, trip_id FK, day_date, day_number, notes |
| itinerary_items | id PK, itinerary_day_id FK, attraction_id FK?, title, start_time?, duration_min?, sequence, estimated_cost, notes |
| budget_items | id PK, trip_id FK, category, amount, source, is_override |
| wishlists | id PK, user_id FK, destination_id FK?, attraction_id FK?, created_at |
| reviews | id PK, user_id FK, destination_id FK, rating, body, status, created_at |
| booking_requests | id PK, user_id FK, trip_id FK?, provider_type, provider_name, start_date, end_date, guests, note, status, admin_note, created_at |
| audit_logs | id PK, actor_id FK, entity_type, entity_id, action, old_value_json?, new_value_json?, created_at |

**Table 16**

| Method | Endpoint | Auth | Purpose | Responses |
| --- | --- | --- | --- | --- |
| POST | /api/auth/register | Guest | Create account | 201 / 400 / 409 |
| POST | /api/auth/login | Guest | Start session / return token | 200 / 401 |
| GET | /api/destinations | Public | List/search/filter published catalog | 200 |
| GET | /api/destinations/:slug | Public | Destination detail | 200 / 404 |
| GET, POST | /api/wishlist | Tourist | List/add saved items | 200 / 201 |
| DELETE | /api/wishlist/:id | Tourist | Remove saved item | 204 / 404 |
| GET, POST | /api/trips | Tourist | List/create own trips | 200 / 201 |
| GET, PATCH, DELETE | /api/trips/:id | Owner/Admin | Read/edit/delete trip | 200 / 204 / 403 |
| POST | /api/trips/:id/itinerary-items | Owner | Add activity | 201 / 422 |
| PATCH | /api/itinerary-items/:id | Owner | Reorder/edit activity | 200 / 403 |
| POST | /api/trips/:id/budget/calculate | Owner | Return budget components/total | 200 |
| POST | /api/recommendations | Public/Tourist | Rule-based suggestions | 200 |
| GET, POST | /api/reviews | Public/Tourist | List approved / submit review | 200 / 201 |
| GET, POST | /api/booking-requests | Tourist | List/create own requests | 200 / 201 |
| PATCH | /api/admin/destinations/:id | Admin | Manage catalog status/content | 200 / 403 |
| PATCH | /api/admin/reviews/:id | Admin | Moderate review | 200 / 403 |
| PATCH | /api/admin/booking-requests/:id | Admin | Update request status | 200 / 403 |

**Table 17**

| ID | Rule |
| --- | --- |
| BR-01 | Only published destinations and attractions are visible to guests/tourists. |
| BR-02 | Email is unique and passwords are never stored in plaintext. |
| BR-03 | Only a trip owner or Admin may read/modify that trip; only the owner may delete it unless policy says otherwise. |
| BR-04 | Trip end date must be on/after start date; itinerary day count equals inclusive date range. |
| BR-05 | A user may submit at most one active review per destination; rating is an integer 1-5. |
| BR-06 | A booking request begins Pending; allowed transitions are Pending -> Confirmed/Rejected/Cancelled, and Confirmed -> Cancelled only before start date. |
| BR-07 | Cancelled requests cannot be edited; Admin status updates require a status and optional user-safe note. |
| BR-08 | Budget total equals sum of budget-item amounts; a manual override is flagged rather than silently replacing a calculation. |
| BR-09 | Recommendation ranking uses explainable match scores; it must not claim live availability or a guaranteed price. |
| BR-10 | Content delete is blocked or soft-deleted when referenced by a trip/review; use unpublish to remove public visibility. |

**Table 18**

| Field | Type / range | Definition |
| --- | --- | --- |
| users.email | string, 5-254 | Required, lowercased unique email. |
| users.role | enum | TOURIST \| ADMIN; default TOURIST. |
| destinations.status | enum | DRAFT \| PUBLISHED \| ARCHIVED. |
| attractions.entry_fee | decimal >= 0 | Indicative per-person price in INR. |
| trips.start_date/end_date | date | Required; end >= start. |
| trips.budget | decimal >= 0 | User target budget in INR. |
| itinerary_items.sequence | integer >= 1 | Unique within itinerary day; controls display order. |
| budget_items.category | enum | TRANSPORT \| STAY \| FOOD \| ACTIVITY \| OTHER. |
| reviews.rating | integer | Required integer from 1 through 5. |
| reviews.status | enum | PENDING \| APPROVED \| HIDDEN. |
| booking_requests.status | enum | PENDING \| CONFIRMED \| REJECTED \| CANCELLED. |

**Table 19**

| Screen / area | Required behavior |
| --- | --- |
| Global | Top navigation: Explore, Trips, Wishlist, profile; Admin link only for Admin. Responsive mobile menu; footer with privacy/help placeholder. |
| Home/Explore | Hero search, interest/category chips, destination cards, sorting/filter drawer, empty/error states. |
| Destination detail | Overview, gallery placeholder, attraction list, season/budget/suitability, reviews, save/create-trip CTAs. |
| Trip workspace | Trip summary, date tabs, day timeline, activity edit/reorder, budget panel, save status. |
| Authentication | Clear labels, show/hide password, inline errors, no account enumeration in reset/login messages. |
| Admin | Content table, create/edit form, publish toggle, review/request queue with filter and confirmation feedback. |

**Table 20**

| Level | Coverage | Method |
| --- | --- | --- |
| Unit | Budget calculator, date/day generation, recommendation scoring, validation, authorization predicates. | Vitest/Jest or equivalent; deterministic fixtures. |
| Integration/API | Auth, authorization, CRUD, validation errors, status transitions. | Supertest/API client against test database. |
| UI/component | Forms, filter behavior, empty/error/loading states, keyboard interactions. | React Testing Library or equivalent. |
| End-to-end | Guest discovery; tourist trip creation; admin publishing/moderation. | Playwright/Cypress smoke suite or scripted demo checklist. |
| Accessibility | Keyboard-only navigation, labels, contrast, headings, focus and responsive checks. | Lighthouse/axe plus manual pass. |
| Acceptance | Every user-story criterion verified at sprint review and final demo. | Traceability matrix / test report. |

**Table 21**

| ID | Risk | Impact | Likelihood | Mitigation |
| --- | --- | --- | --- | --- |
| R-01 | Scope creep | High | High | Freeze MVP Must items after Sprint 1; move extras to backlog. |
| R-02 | External API outage/cost | Medium | Medium | Adapter interfaces, seeded data, graceful fallback. |
| R-03 | Data is inaccurate | Medium | Medium | Show “indicative” labels; admin source/date field; demo dataset review. |
| R-04 | Security mistake | High | Medium | Use proven auth library; server auth tests; secret scan. |
| R-05 | Schedule/team availability | High | Medium | Small vertical stories, pair ownership, daily blocker visibility. |
| R-06 | Complex itinerary UI | Medium | Medium | Deliver simple day lists first; defer drag/drop to enhancement. |
| R-07 | Poor mobile usability | Medium | Medium | Test at 360px each sprint; build responsive components early. |

**Table 22**

| Term | Definition |
| --- | --- |
| Acceptance criterion | Observable condition proving a user story is complete. |
| Backlog | Ordered list of all known product work. |
| Epic | Large capability split into user stories. |
| Increment | Working, potentially demonstrable product outcome at the end of a sprint. |
| RBAC | Role-Based Access Control; authorization based on assigned role. |
| Soft delete | Record remains stored but is marked unavailable instead of physically removed. |
| Story point | Relative effort/complexity estimate used by the team, not a time promise. |

**Table 23**

| Requirements | Stories | Backlog | Sprint | Verification |
| --- | --- | --- | --- | --- |
| FR-01/02/03 | US-01 | PB-01 | Sprint 1 | Auth/API/UI tests |
| FR-04/05/06 | US-02/03 | PB-02 | Sprints 1-2 | Catalog/filter tests |
| FR-07 | US-04 | PB-03 | Sprint 2 | Wishlist tests |
| FR-08/09 | US-05/06 | PB-04 | Sprint 3 | Trip/itinerary tests |
| FR-11 | US-07 | PB-05 | Sprint 3 | Calculator tests |
| FR-10 | US-08 | PB-06 | Sprint 4 | Recommendation tests |
| FR-12/13 | US-09/10 | PB-07/08 | Sprint 4 | Workflow tests |
| FR-14/15 | US-11/12 | PB-09 | Sprint 5 | Admin/RBAC tests |
| NFR-01..10 | Cross-cutting | PB-10 | All / Sprint 5 | Quality checklist |