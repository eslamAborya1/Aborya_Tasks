# 📌 Angular CRUD App --- JSONPlaceholder

**Task 6 --- NTG Clarity Academy**

## Overview

This project is a complete CRUD (Create, Read, Update, Delete)
application built using **Angular 17** with **standalone components**.\
The app communicates with the public API **JSONPlaceholder** to manage
posts in a simulated environment.

The purpose of this task is to demonstrate the ability to work with
Angular routing, services, HTTP communication, forms, and component
interaction while following clean structure and maintainable code
practices.

## Features

-   Display a list of posts (Read All)\
-   Display a single post with full details (Read One)\
-   Create a new post using a reactive form\
-   Edit an existing post\
-   Delete a post\
-   Full routing system with navigation\
-   Service layer using HttpClient for API communication\
-   Standalone Angular components (no NgModule)\
-   Clean UI and easy navigation

> Note: JSONPlaceholder is a mock API, so create/update/delete
> operations return a simulated success response without actually
> modifying the remote data.

## Technologies Used

-   Angular 17\
-   TypeScript\
-   HTML / CSS\
-   Angular Router\
-   HttpClient\
-   Reactive Forms\
-   JSONPlaceholder API

## API Endpoint

    https://jsonplaceholder.typicode.com/posts

## Project Structure

    src/
     ├── app/
     │   ├── models/
     │   │   └── post.ts
     │   ├── services/
     │   │   └── post.service.ts
     │   ├── app-root/
     │   │   └── app-root.component.ts
     │   ├── components/
     │   │   ├── post-list/
     │   │   ├── post-form/
     │   │   └── post-detail/
     │   └── routes.ts
     └── main.ts

## CRUD Implementation

### Create

-   Add a new post through `/posts/create`\
-   Uses a reactive form with validation\
-   HTTP Method: POST

### Read

-   List all posts in `/posts`\
-   View a single post in `/posts/:id`\
-   HTTP Method: GET

### Update

-   Edit an existing post through `/posts/edit/:id`\
-   HTTP Method: PUT

### Delete

-   Remove a post from the list\
-   HTTP Method: DELETE

## Installation & Running the Project

### 1. Clone the repository

    git clone <repository-url>
    cd crud-jsonplaceholder

### 2. Install dependencies

    npm install

### 3. Run the development server

    ng serve --open

The project will open automatically at:

    http://localhost:4200

## Notes

-   JSONPlaceholder is a fake REST API, so data does not persist.\
-   The UI reflects local changes after create/update/delete.\
-   This task demonstrates Angular architecture and CRUD operations, not
    backend persistence.

## Task Purpose

This project was completed as Task 6 (Final Task) for NTG Clarity
Academy.
