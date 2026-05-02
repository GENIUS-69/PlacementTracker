# Implementation Plan - PPTracker

## Phase 1: Backend Foundation
- [ ] Initialize Node.js/Express server
- [ ] Configure MongoDB connection
- [ ] Define Mongoose Models:
    - `Roadmap` (Nested structure for Topics/Subtopics)
    - `ProgressLog` (Flat history of updates)
    - `StudySession` (Timer logs)
    - `Test` (Self-test results)
- [ ] Create JSON Seed Data (Extracted from roadmap.sh images)
- [ ] Implement Seeder Script

## Phase 2: Backend API Development
- [ ] Roadmap APIs (Get, Update Status)
- [ ] Analytics APIs (Aggregated stats for Dashboard)
- [ ] Study Timer APIs (Log session, Get stats)
- [ ] Test APIs (Create, Get results)

## Phase 3: Frontend Foundation
- [ ] Initialize React app with Vite
- [ ] Set up Tailwind CSS
- [ ] Set up Zustand for state management
- [ ] Set up Axios for API communication

## Phase 4: Frontend Components & Pages
- [ ] Layout & Navigation (Sidebar/Navbar)
- [ ] Dashboard Page:
    - [ ] Countdown Component
    - [ ] Recharts (Pie, Bar, Circular progress)
- [ ] Roadmap Page:
    - [ ] Tree/Accordion view
    - [ ] Checkbox logic (Pending -> In Progress -> Completed)
- [ ] Study Timer Component (Pomodoro style)
- [ ] Test Module Page

## Phase 5: Polish & DevOps
- [ ] UI/UX Enhancements (Transitions, Dark mode)
- [ ] Dockerize the application
- [ ] Final testing and verification
