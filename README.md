# React E-Commerce Mini-App

A fully functional React e-commerce frontend built as a proof of work. It features mock authentication, product browsing, and a fully persistent shopping cart.

## Tech Stack
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **State Management:** Context API
* **Styling:** CSS Modules
* **Data Fetching:** Axios (via DummyJSON API)

## Setup Instructions
[cite_start]To run this project locally, follow these steps[cite: 65]:

1. Clone the repository:
   ```bash
   git clone [https://github.com/SageJatin/react-ecommerce-assignment.git](https://github.com/SageJatin/react-ecommerce-assignment.git)
   ```

2. Navigate into the project directory:
   ```bash
   cd react-ecommerce-web
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

**Test Credentials for Login:**
* **Username:** `emilys`
* **Password:** `emilyspass`

---

## State Management Choice: Context API
[cite_start]For this application, I chose to implement the Context API combined with standard React Hooks (`useState`, `useEffect`) rather than a heavier library like Redux Toolkit or Zustand[cite: 66].

### Why Context API?

* **Scope and Scale:** The global state requirements for this mini-app are limited exclusively to authentication status (tokens) and the shopping cart array. [cite_start]Redux would introduce unnecessary boilerplate for a state tree of this size[cite: 66].
* [cite_start]**Native Integration:** Context is built directly into React, requiring zero additional dependencies, which keeps the bundle size lightweight and build times fast[cite: 66].
* [cite_start]**Seamless Persistence:** By tying the Context state to `localStorage` via a `useEffect` hook, we achieve the required cart persistence natively without needing external persist-gate libraries[cite: 59].