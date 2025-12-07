# Getting Started Guide

Welcome to TaskApp! This guide will help you get started quickly.

## 📖 Overview

TaskApp is a task management system that allows you to:
- Create, read, update, and delete tasks
- Search tasks by ID
- Filter tasks by status and priority
- View task statistics and analytics

## 🎯 First Steps

### 1. Installation
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open in Browser
Navigate to `http://localhost:4300`

## 🗺️ Application Routes

### Dashboard (`/`)
The main page where you can:
- See all tasks at a glance
- Search for tasks by ID
- Filter by status
- View statistics (Total, Completed, In Progress, Pending)
- Quickly edit or delete tasks

**Pro Tip:** Use the search box to quickly find a specific task by ID.

### Create Task (`/create`)
Add a new task with the following details:
- **Title:** Short name for your task (required)
- **Description:** Detailed explanation (min 10 characters)
- **Status:** Pending, In Progress, or Completed
- **Priority:** Low, Medium, or High
- **Due Date:** When the task should be completed

**Pro Tip:** Set realistic due dates and choose appropriate priority levels.

### Task Details (`/task/:id`)
View complete information about a task:
- Full task description
- Priority and status badges
- Days until due date
- Task age (how long it's been in the system)
- Options to edit or delete

Click on any task from the dashboard to view full details.

### Edit Task (`/edit/:id`)
Modify an existing task:
- Pre-filled form with current values
- Same fields as create task
- Changes saved with update button

**Pro Tip:** You can change task status from Pending to Completed as work progresses.

### About (`/about`)
Learn about:
- Application features
- Technology stack
- Navigation guide
- Pro tips for using the app

## 🎨 Understanding the UI

### Task Cards
Each task appears as a card showing:
- **Title and Status Badge** - Quick identification
- **Description** - Preview of task details
- **Priority Color** - Left border indicates priority (Red=High, Yellow=Medium, Green=Low)
- **Due Date** - When the task is due
- **Edit/Delete Buttons** - Quick actions

### Status Indicators
- 🟡 **Yellow** - Pending tasks (not started)
- 🔵 **Blue** - In Progress tasks (currently working on)
- 🟢 **Green** - Completed tasks (finished)

### Priority Levels
- 🔴 **High Priority** - Urgent, needs immediate attention
- 🟡 **Medium Priority** - Important, schedule soon
- 🟢 **Low Priority** - Can be done later

## 💡 Helpful Tips

### Organizing Your Tasks
1. Create tasks with clear, descriptive titles
2. Write detailed descriptions to avoid confusion later
3. Set realistic due dates
4. Use appropriate priority levels

### Searching Efficiently
- Use the ID search on dashboard for quick lookups
- Remember task IDs are numbers (1, 2, 3, etc.)
- Filter by status to focus on specific work items

### Task Lifecycle
1. **Create** → Add new task with Pending status
2. **Work** → Change to In Progress when you start
3. **Complete** → Mark as Completed when done
4. **Delete** → Remove from system when no longer needed

## ⚙️ Common Tasks

### How to Create a Task?
1. Click "New Task" button in navbar
2. Fill in all required fields
3. Click "Create Task" button

### How to Find a Task?
1. Use search by ID on dashboard (fastest)
2. Or filter by status and scan the list
3. Click on any task card to view details

### How to Update a Task?
1. Click the task card to view details
2. Click "Edit Task" button
3. Modify the fields
4. Click "Update Task" button

### How to Delete a Task?
1. Click on the task card OR
2. Click "Delete" button on the card
3. Confirm deletion in the popup

## 🔄 Best Practices

### Task Management
- Review tasks regularly (daily or weekly)
- Update status as you work
- Set realistic priorities
- Keep descriptions concise but informative

### Task Titles
✅ Good: "Implement user authentication"
❌ Bad: "Fix stuff", "Work on project"

### Task Descriptions
✅ Good: "Implement JWT-based authentication for user login and session management. Should include forgot password functionality."
❌ Bad: "Add auth"

### Due Dates
✅ Set specific dates
✅ Consider dependencies between tasks
✅ Leave buffer time for unexpected issues
❌ Don't overload tasks on single dates

## 📊 Interpreting Statistics

On the Dashboard, you see:
- **Total Tasks** - All tasks in the system
- **Completed** - Tasks marked as done
- **In Progress** - Currently working on
- **Pending** - Not yet started

**Use this to:**
- Track productivity
- Identify bottlenecks
- Plan workload

## 🐛 Troubleshooting

### I can't find a task
1. Check if you spelled the ID correctly
2. Try filtering by status instead
3. Clear search and view all tasks

### I accidentally deleted a task
Unfortunately, deletions are permanent. Plan future actions carefully.

### Tasks aren't showing up after creating
1. Refresh the page
2. Check the dashboard filters
3. Try searching by the task ID

### Application is running slowly
1. Clear browser cache
2. Close other tabs
3. Restart the server

## 🎓 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Dashboard | `D` or click logo |
| New Task | `N` or click "New Task" |
| Search | `/` to focus search |
| Edit | `E` on task detail page |
| Delete | `X` (with confirmation) |

## 📞 Getting Help

1. **Check this guide** - Most answers are here
2. **Visit About page** - Application features and tips
3. **Review Performance Guide** - Technical details
4. **Check browser console** - Error messages for debugging

## 🚀 Next Steps

1. Create your first task
2. Practice editing and filtering
3. Explore the dashboard features
4. Read about performance optimizations in the Performance Guide

---

**Happy task managing! 🎉**

*For technical details, see PERFORMANCE_GUIDE.ts*
