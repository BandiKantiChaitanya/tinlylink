# URL Shortener App

A simple URL shortener application (similar to Bitly) built with **React (Vite)** frontend and **Node.js + Express + MongoDB** backend. Users can shorten URLs, view statistics, and manage their links.

---
### [Live Demo](https:/ww)

---

## Features

### Core Features
- **Create Short Links**
  - Input a long URL and optionally a custom short code.
  - Generates a short URL: `<yourwebsite>/<shortCode>`.
  - URL validation to ensure proper HTTP/HTTPS format.
  - Custom short codes are globally unique; duplicate codes return an error.

- **Redirect**
  - Visiting `/<shortCode>` performs a 302 redirect to the original URL.
  - Each redirect increments total clicks and updates “last clicked” timestamp.

- **Delete Link**
  - Users can delete existing links.
  - Deleted links return 404 when accessed.

---

### Frontend Features
- **Dashboard**
  - Lists all links in a table.
  - Columns: Short Code, Original URL, Total Clicks, Last Clicked, Actions (View Stats, Delete, Copy Link).
  - Sortable and responsive design with Bootstrap.
  - Create link modal with form validation.
  - Loading and empty states handled.

- **Stats Page**
  - `/code/:code` shows detailed statistics for a single link:
    - Original URL
    - Total Clicks
    - Last Clicked
    - Creation Date
    - Copy Short Link button

- **UX & Interface**
  - Clean, responsive design using Bootstrap.
  - SweetAlerts for confirmations and notifications.
  - Consistent header and footer.
  - Functional copy buttons for short links.

---

### Backend Features
- **REST API**
  - `POST /api/links` – Create a new link (409 if short code exists)
  - `GET /api/links` – List all links
  - `GET /api/links/:code` – Get stats for a single code
  - `DELETE /api/links/:code` – Delete a link

- **Health Check**
  - `GET /healthz` → Returns `{ ok: true, version: "1.0" }`

- **Validation**
  - Short codes must follow `[A-Za-z0-9]{6,8}`
  - Original URLs must start with `http://` or `https://`





