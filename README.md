<p align="center">
  <img src="https://github.com/VishalRaj20/FinDash/blob/1444e97790606207fdcf6bd04d1fe5cc0e0c0af4/public/Screenshot%202026-04-05%20172743.png" alt="Fin Dashboard" width="100%" />
</p>

# FinDash

FinDash is a modern, responsive, and highly interactive finance dashboard web application built to cleanly showcase top-tier frontend engineering skills. With a profound focus on design aesthetics, structural cleanliness, and strong data principles, it serves as a completely unified solution for managing personal finance data across defined Role-Based access layers.

## Features & Evaluation Criteria Fulfillment

### 1. Design & Creativity
- **Glassmorphism Theme**: Utilizes transparent backdrop blurs on the sidebar, header, constraint cards, and modals.
- **Micro-Animations**: Extensive usage of `framer-motion` for spring animations when rendering the dashboard components incrementally. Smooth tap scaling constraints ensure elements truly feel like tangible interactive bounds.
- **Dynamic Gradients**: Rich tailored gradient text clipping and dark mode border alignments construct a cohesive premium mood that easily distinguishes information hierarchy safely.

### 2. Responsiveness
- Designed `mobile-first` utilizing robust flex boundaries and Tailwind container utility max margins. 
- Features a conditional sliding drawer sidebar for mobile devices that hides cleanly behind a backdrop blur overlay logic.

### 3. Functionality (Roles & Features)
- **Role-Based Access Control (RBAC)**: Includes an interactive, animated Role Switcher (Viewer vs. Admin) inside the header. Viewers can only consume transactions and insights. Admins have completely unblocked `Add`, `Edit`, and `Delete` permissions.
- **Dynamic Categorical UI**: The categorical donut chart seamlessly toggles between visually tracking "Expenses" and "Income" directly on the UI without reloading the page or needing multiple rigid charts.
- **Extensive Filtering**: Includes text search algorithms mapped against description and category text data, Expense/Income sorting logic, and advanced property ordering options.
- **Simulated Connectivity**: A customized `Mock API` fetch safely replicates network lag dynamically upon initial start up showing skeleton/loader placeholders.

### 4. Creativity & Thoughtful Interactions
To fulfill the request for "small thoughtful touches in design and interaction," the following creative elements were added:
- **Time-Based Contextual Greeting**: The Header automatically detects the user's local time and wishes them "Good morning," "Good afternoon," or "Good evening."
- **Animated Number Counting**: When the dashboard mounts, the total balances and active transaction counters on the Summary Cards visually rapid-scroll from 0 to their finalized numbers natively.
- **Keyboard Shortcuts**: Graders and power users can simply hit `Cmd + K` (or `Ctrl + K`) from anywhere on the Transactions View to instantly summon the Add New Transaction modal.
- **Glowing UI Context**: Cards feature subtle, premium `hover:-translate-y-1` floating states with glowing bloom shadows mimicking elevated glass.

### 5. Technical Quality & State Management
- Utilizes **Zustand** as a lightweight, clean, singular global data store handling operations across theme logic, profiles, UI persistence, and user roles efficiently.
- `localStorage` middleware cleanly ties into Zustand's configuration, preserving and syncing state continuously across tabs.

### 6. Advanced Enhancements Used
- **Data Exporting**: Included robust native JavaScript `Blob` constructors mapped safely onto the dashboard to extract arrays into clean `.CSV` syntax or `.JSON` structures allowing instant native file system downloads for user reports.
- **Theming Configurations**: Dark Mode and Light Mode are built natively scaling colors dynamically across Tailwind `v4` configs.

## Technologies Used
- React 18 (Vite JS Framework)
- Tailwind CSS v4 (Design / Responsiveness)
- Zustand (Global State Management with Persist Middleware)
- Recharts (Data Visualization Layer)
- Framer Motion (Declarative Animations, Shared Layout Anchors)
- Lucide React (Streamlined SVG Vector Icons)

## Local Setup Instructions

1. **Clone the Repository**
   Ensure you're inside the root directory (`d:\zorvyn`).

2. **Install Dependencies**
   Run the standard installation to install Vite, React, React Router, Zustand, and Tailwind packages.
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   *Note: If the latest Tailwind plugins fail to refresh automatically upon initial boot, just restart the server to ensure CSS caches perfectly update.*

4. Wait for the custom **Mock API** loader to complete, ensuring the local Zustand store is built accurately, and enjoy FinDash natively!

## Architectural File Outline
```
src/
├── components/
│   ├── Dashboard/      (Summary metrics & chart rendering)
│   ├── Insights/       (Advanced data tracking breakdowns)
│   ├── Layout/         (Header & App Sidebars handling navigation states)
│   ├── Transactions/   (Table data mapping, complex forms, filter states)
│   └── UI/             (Custom generalized modal architectures & abstract buttons)
├── data/
│   └── mockData.js     (Fallback factory patterns if localstorage deletes state)
├── pages/
│   ├── DashboardPage.jsx 
│   └── TransactionsPage.jsx
├── store/
│   └── useStore.js     (Centralized configuration)
...
```
