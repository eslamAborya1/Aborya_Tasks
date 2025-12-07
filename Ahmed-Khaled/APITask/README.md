🛒 REST API Product Testing Tool
A modern, interactive web application for testing RESTful API operations on products using the Fake Store API. This tool provides a clean interface to perform CRUD (Create, Read, Update, Delete) operations with manual data editing capabilities.

🌟 Live Demo
View Live Demo [Add your live URL here]

https://screenshot.png

🚀 Features
Full CRUD Operations: GET (All & By ID), POST, PUT, DELETE

Interactive Forms: Manual data input for all operations

Real-time Feedback: Visual notifications for success/error states

Responsive Design: Works perfectly on desktop, tablet, and mobile

Beautiful UI: Modern gradient design with smooth animations

No Dependencies: Pure HTML, CSS, and JavaScript

Data Formatting: Well-formatted JSON responses with syntax highlighting

📋 Supported Operations
GET All Products - Retrieve all products without ID

GET Product by ID - Retrieve single product with ID input

POST Product - Create new product with form data

PUT Product - Update existing product with form data

DELETE Product - Remove product by ID

🛠️ Technologies Used
HTML5 - Semantic markup

CSS3 - Modern styling with gradients and animations

Vanilla JavaScript - No frameworks or libraries

XMLHttpRequest - For API calls

Fake Store API - Backend service (https://fakestoreapi.com)

🚀 Getting Started
Option 1: Direct Use (Easiest)
Download the index.html file

Open it directly in any modern web browser

Start testing immediately!

Option 2: Web Hosting
Upload the index.html file to any web server

Access via your domain or server IP

No additional setup required

Option 3: Local Development
Clone or download the project files

Open index.html in your browser

No server needed - works directly from file system

🎯 API Endpoints Used
The tool connects to Fake Store API (https://fakestoreapi.com):

Operation	Endpoint	Method
GET All Products	/products	GET
GET Single Product	/products/{id}	GET
POST Product	/products	POST
PUT Product	/products/{id}	PUT
DELETE Product	/products/{id}	DELETE
🎨 User Interface Components
Dashboard
Two-column layout on desktop, single column on mobile

Service card with all operation buttons

Visual indicators for each operation type

Forms
Dynamic forms that appear based on operation

Input validation with required fields

Cancel button to close forms

Auto-close after successful operations

Output Panel
Formatted JSON responses

Syntax highlighting for better readability

Clear button to reset output

Collapsible items for GET All results

Clickable cards to expand details

Notifications
Success notifications (green)

Error notifications (red)

Auto-dismiss after 3 seconds

Smooth animations for appearance

🔧 Usage Guide
1. GET All Products
text
📋 GET All Products
No form required

Click button to retrieve all products

Results display as collapsible cards

Click any card to expand details

2. GET Product by ID
text
🔍 GET Product by ID
Click button

Enter Product ID (1-20)

Click "Get Product"

View single product details

3. POST Product (Create)
text
➕ POST Product
Click button

Fill in form:

Title (required)

Price (required)

Category (required)

Description (optional)

Click "Create Product"

View created product response

4. PUT Product (Update)
text
✏️ PUT Product
Click button

Enter Product ID (1-20)

Fill fields to update:

Title (optional)

Price (optional)

Category (optional)

Click "Update Product"

View updated product response

5. DELETE Product
text
🗑️ DELETE Product
Click button

Enter Product ID (1-20)

Click "Delete Product"

View deletion confirmation

🎨 Color Scheme
css
Primary Gradient: #667eea → #764ba2
Success: #4CAF50
Info: #2196F3
Warning: #FF9800
Danger: #F44336
Get All: #2E7D32
Get by ID: #4CAF50
Background: #f8f9fa
Text: #333333
📱 Responsive Design
Breakpoints:
Desktop: ≥ 768px (2-column layout)

Tablet: 480px - 767px (single column)

Mobile: < 480px (optimized for small screens)

Mobile Features:
Hamburger-style form toggles

Touch-friendly buttons

Optimized spacing for touch

Vertical scrolling for output

🔍 Code Structure
Main Classes:
HttpClient - Generic HTTP request handler

ProductService - Specific product API operations

Key Functions:
getAllProducts() - Fetch all products

showProductForm() - Display appropriate form

handleProductSubmit() - Process form submissions

showOutput() - Display API responses

showNotification() - Show feedback messages

Event Handlers:
Form submissions

Button clicks

Detail toggles

Form cancellations

🚨 Error Handling
The tool includes comprehensive error handling:

Network Errors
Connection failures

Timeout detection

Server unavailability

API Errors
Invalid IDs (404)

Validation errors (400)

Server errors (500)

User Errors
Invalid form inputs

Missing required fields

Invalid data types

🎯 Performance Features
Lazy Loading - Only load data when needed

Caching - Reuse HTTP client instances

Optimized DOM - Minimal re-renders

Efficient Event Handlers - Delegated events

CSS Animations - Hardware accelerated