# Company CMS - Project Overview

## Vision

Build a reusable Company CMS for small businesses that allows owners to
manage website content without editing code.

## Target Users

-   Small businesses
-   Freelancers
-   Agencies
-   Startups

## Core Tech Stack

### Frontend

-   React
-   React Router
-   Tailwind CSS
-   Axios
-   TanStack Query
-   React Hook Form
-   Zod

### Backend

-   Node.js
-   Express.js
-   JWT
-   bcrypt
-   Multer
-   Cloudinary
-   Nodemailer

### Database

-   MongoDB + Mongoose

### Deployment

-   Frontend: Vercel
-   Backend: Railway
-   Database: MongoDB Atlas
-   Media: Cloudinary

## Architecture

Visitor -\> React Website -\> Express REST API -\> MongoDB

Admin -\> Login -\> Dashboard -\> Express REST API -\> MongoDB

## Main Modules

1.  Authentication
2.  Dashboard
3.  Pages (Home, About)
4.  Services
5.  Gallery
6.  Team
7.  Testimonials
8.  FAQ
9.  Blog
10. Contact Messages
11. Media Library
12. Settings
13. SEO

## MVP

-   Login
-   Dashboard
-   Home editor
-   About editor
-   Services CRUD
-   Gallery CRUD
-   Contact form
-   Settings

## Development Phases

### Phase 1 - Planning

-   Vision
-   Features
-   Roadmap
-   Wireframes
-   Database design
-   API design

### Phase 2 - Setup

-   GitHub repository
-   Folder structure
-   Backend
-   Frontend
-   Environment variables

### Phase 3 - Authentication

-   Login
-   JWT
-   Protected routes
-   Roles

### Phase 4 - Dashboard

-   Sidebar
-   Navbar
-   Layout

### Phase 5 - Core Modules

Implement CRUD for: - Pages - Services - Gallery - Team - Blog - FAQ -
Testimonials

### Phase 6 - Public Website

Consume API and render dynamic content.

### Phase 7 - Security

-   Validation
-   Rate limiting
-   Helmet
-   CORS
-   Password hashing

### Phase 8 - Testing & Deployment

-   Manual testing
-   Bug fixing
-   Deploy
-   Documentation

## Suggested Folder Structure

    company-cms/
    ├── assets/
    ├── client/
    ├── design/
    ├── docs/
    ├── server/
    ├── README.md
    ├── ROADMAP.md
    └── CHANGELOG.md

## Backend Structure

    server/src/
    ├── config
    ├── constants
    ├── controllers
    ├── errors
    ├── middlewares
    ├── models
    ├── routes
    ├── services
    ├── utils
    └── validators

## Suggested 8 Week Roadmap

  Week   Focus
  ------ --------------------------------
  1      Planning, docs, DB, API
  2      Setup, Auth, Dashboard
  3      Pages, Settings, Services
  4      Gallery, Team, Media
  5      Blog, FAQ, Messages, SEO
  6      Public website integration
  7      Security, Performance, Testing
  8      Deployment & Documentation

## First Tasks

-   Create GitHub repository
-   Create folder structure
-   Write VISION.md
-   Write FEATURES.md
-   Write ROADMAP.md
-   Create GitHub Project Board

## Guiding Principle

Build this as a real product, not just a learning project. Prioritize
clean architecture, scalability, reusable components, documentation, and
maintainable code.

## Future Expansion

-   Multi-tenant SaaS
-   Multi-language
-   Theme system
-   Analytics
-   Booking
-   E-commerce
-   Role-based permissions
-   Audit logs
