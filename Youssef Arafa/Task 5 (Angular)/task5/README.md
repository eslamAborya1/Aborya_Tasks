# 📌 Angular Portfolio Project

**Task 5 --- NTG Clarity Academy**

## Overview

This task focuses on converting a previously built **HTML / CSS /
JavaScript portfolio** (Task 2) into a full Angular project.\
The goal is to understand project setup, component structure, Angular
routing, asset organization, and how to migrate a static website into a
scalable Angular application.

## Task Objectives

-   Create a new Angular project using Angular CLI\
-   Convert all portfolio sections (Home, About, Skills, Projects,
    Contact) into separate Angular components\
-   Configure routing for all portfolio pages\
-   Move assets (images, icons, styles) into the Angular assets folder\
-   Apply component-based architecture instead of a single static HTML
    file\
-   Ensure the portfolio design and functionality match the original
    version\
-   Maintain responsive layout exactly like the original static website

------------------------------------------------------------------------

## Technologies Used

-   **Angular 17**\
-   **TypeScript**\
-   **Standalone Components**\
-   **Angular Router**\
-   **HTML / SCSS**\
-   **Responsive Web Design**

------------------------------------------------------------------------

## Project Structure

    src/
     ├── app/
     │   ├── components/
     │   │   ├── home/
     │   │   ├── about/
     │   │   ├── skills/
     │   │   ├── projects/
     │   │   └── contact/
     │   ├── app-root/
     │   │   └── app-root.component.ts
     │   └── app.routes.ts
     ├── assets/
     │   ├── images/
     │   └── css/
     └── main.ts

------------------------------------------------------------------------

## What Was Converted

### 1. **HTML**

The static HTML sections were separated into Angular components, each
responsible for its own UI.

### 2. **CSS**

All styles were migrated into component-level SCSS files, plus global
styles where needed.

### 3. **JavaScript**

Simple animations or interactions were transformed into Angular logic
using TypeScript when needed.

------------------------------------------------------------------------

## Routing

The Angular Router was set up to navigate between the portfolio pages:

    /home
    /about
    /skills
    /projects
    /contact

Each path loads a standalone component.

------------------------------------------------------------------------

## Commands Used During the Task

### Generate project:

    ng new portfolio-angular --standalone

### Generate components:

    ng generate component components/home --standalone
    ng generate component components/about --standalone
    ng generate component components/skills --standalone
    ng generate component components/projects --standalone
    ng generate component components/contact --standalone

### Run project:

    ng serve --open

------------------------------------------------------------------------

## Notes

-   The layout and styling match the original Task 2 portfolio.\
-   Code is organized using Angular component-based architecture.\
-   Assets such as images and icons were placed in the `/assets`
    folder.\
-   Navigation was handled using Angular routing instead of HTML anchor
    links.

------------------------------------------------------------------------

## Task Purpose

This task demonstrates the ability to migrate static front-end work into
a framework-based architecture using Angular.\
It shows understanding of Angular CLI, routing, components, TypeScript,
and project structure---forming the foundation for more advanced Angular
work in later tasks.
