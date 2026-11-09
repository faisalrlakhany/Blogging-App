# 📝 Blogging App — Firebase Authentication Demo

A minimal **full-stack blogging application** built with **Firebase Authentication**, **Firestore**, and **vanilla JavaScript** (ES modules). Users can sign up, log in, log out, and manage their blog posts — all with role-based access (anonymous vs authenticated users).

![Firebase](https://img.shields.io/badge/Firebased-DDCAFF?style=for-the-badge&logo=firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Project Type

| | |
|---|---|
| **Category** | Full-stack BaaS (Backend-as-a-Service) demo |
| **Type** | Multi-page web app with Firebase Auth + Firestore |
| **Purpose** | Demonstrate user authentication, role-based routing, and CRUD operations on Firestore |
| **Files** | `index.html`, `login.html`, `register.html`, `dashboard.html`, `scripts/` |
| **Dependencies** | Firebase JS SDK 12.x (CDN), FirebaseUI (optional) |
| **Build Tools** | None — open `.html` files in a browser |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (5 pages: login, register, dashboard, etc.) |
| Styling | Custom CSS (inline or `scripts/` — check each page) |
| Logic | Vanilla JavaScript (ES modules), Firebase Auth SDK |
| Database | Cloud Firestore — `collection/posts` with doc-based CRUD |
| Auth | Firebase Auth — Email/Password, signInWithEmailAndPassword, createUserWithEmailAndPassword |
| Hosting | Any static host (GitHub Pages, Netlify, Vercel) — Firestore rules required |

---

## 🧩 Pages

| Page | URL | Key Features |
|---|---|---|
| **Login** | `login.html` | Email/password login, "Forgot password" flow, role redirect |
| **Register** | `register.html` | Sign-up form, auto-login after createUserWithEmailAndPassword |
| **Dashboard** | `dashboard.html` | Protected page — only visible if `user.uid` exists; shows user's posts |
| **Index** | `index.html` | Entry point — checks auth state, redirects logged-in users to dashboard |
| **Logout** | Handled client-side via `signOut()` |

---

## ✨ Features

- 🔐 **Email/Password Authentication** — register, login, and password reset
- 🛡️ **Role-based UI** — anonymous users see login/register; authenticated users see dashboard
- 📝 **Firestore CRUD** — create, read, update, and delete blog posts
- 🔄 **Real-time state** — `onAuthStateChanged` redirects based on login status
- 📱 **Responsive** — mobile-friendly layout for all pages
- 🔒 **Security rules** — placeholder Firestore rules recommended for production

---

## ⚙️ How It Works

### Auth state check (in `index.html`)

```js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in → show dashboard, hide login/register
    document.querySelectorAll("[data-auth-required]").forEach((el) => el.style.display = "none");
    document.querySelectorAll("[data-auth-optional]").forEach((el) => el.style.display = "block");
  } else {
    // User is logged out → show login/register, hide dashboard
    document.querySelectorAll("[data-auth-required]").forEach((el) => el.style.display = "block");
    document.querySelectorAll("[data-auth-optional]").forEach((el) => el.style.display = "none");
  }
});
```

### Creating a post (in `dashboard.html`)

```js
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const postsRef = collection(db, "posts");

async function addPost(title, content) {
  await addDoc(postsRef, {
    title,
    content,
    author: user.uid,
    createdAt: serverTimestamp(),
  });
}
```

### Logging out

```js
import { signOut } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

signOut(auth)
  .then(() => {
    // Redirect or show login page
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("Logout error:", error);
  });
```

---

## 📁 Project Structure

```
Blogging-App/
├── index.html          # Entry point — checks auth state
├── login.html          # Login form + password reset
├── register.html       # Sign-up form
├── dashboard.html      # Protected — user's posts + add new post
├── scripts/
│   ├── auth.js         # onAuthStateChanged + redirect logic
│   └── firestore.js    # CRUD helpers for posts collection
└── README.md           # This file
```

---

## 🚀 Getting Started

No installation required.

```bash
# 1️⃣ Clone the repo
git clone https://github.com/faisalrlakhany/Blogging-App.git
cd Blogging-App

# 2️⃣ Open any page in your browser
open index.html      # macOS
# or
start index.html     # Windows

# 3️⃣ Or use VS Code Live Server
# - Right‑click index.html → "Open with Live Server"

# 4️⃣ Firebase setup (one-time)
# - Go to console.firebase.google.com
# - Create a new project
# - Enable Email/Password auth
# - Create a Firestore database (start in test mode)
# - Copy your web app config
# - Replace the placeholder config in `scripts/firebase-config.js` (if present)
```

**Customize:**
- Add your own Firebase project config.
- Extend the post model (add `tags`, `image`, `likes`).
- Implement Firestore Security Rules for read/write permissions.
- Add a navigation bar or side menu between pages.
- Connect to a custom domain or deploy to Firebase Hosting.

---

## ⚠️ Known Issues / Next Steps

- **Firestore Security Rules** — currently in test mode; lock down read/write access before going live.
- No backend — all data lives in Firestore; consider persistence and backups.
- Authentication is email/password only; add Google/GitHub OAuth if needed.
- The dashboard currently shows a placeholder; populate it with real post rendering.
- Add loading spinners and error handling for network failures.
- Deploy to Firebase Hosting with Functions for a fully hosted experience.

---

## 🧠 Concepts Practiced

- Firebase Auth integration (Email/Password, signOut, onAuthStateChanged)
- Firestore data model (`collection`, `addDoc`, `serverTimestamp`)
- Client-side routing based on auth state
- Modular ES‑module imports from CDN
- Multi-page app structure without a full SPA router
- Form validation and error handling

---

## 👨‍💻 Author

**Muhammad Faisal Lakhany**
GitHub: [@faisalrlakhany](https://github.com/faisalrlakhany)