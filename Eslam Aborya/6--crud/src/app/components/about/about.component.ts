import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back Button -->
        <button
          routerLink="/"
          class="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Dashboard
        </button>

        <!-- About Content -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">About TaskApp</h1>

          <div class="space-y-6 text-gray-600">
            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">Welcome to TaskApp</h2>
              <p class="leading-relaxed">
                TaskApp is a modern, efficient task management application built with Angular 21 and Tailwind CSS.
                Designed to help you organize, track, and complete your tasks with ease.
              </p>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">Key Features</h2>
              <ul class="space-y-2 list-disc list-inside">
                <li>Create, read, update, and delete tasks</li>
                <li>Search tasks by ID for quick access</li>
                <li>Filter tasks by status (Pending, In Progress, Completed)</li>
                <li>Organize by priority levels (Low, Medium, High)</li>
                <li>Track task creation and due dates</li>
                <li>Beautiful, responsive UI design</li>
                <li>Real-time task statistics on dashboard</li>
              </ul>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">Technology Stack</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-blue-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-blue-900">Angular 21</h3>
                  <p class="text-sm text-blue-700">Frontend Framework</p>
                </div>
                <div class="bg-green-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-green-900">Tailwind CSS</h3>
                  <p class="text-sm text-green-700">Styling</p>
                </div>
                <div class="bg-purple-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-purple-900">RxJS</h3>
                  <p class="text-sm text-purple-700">Reactive Programming</p>
                </div>
                <div class="bg-pink-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-pink-900">TypeScript</h3>
                  <p class="text-sm text-pink-700">Language</p>
                </div>
                <div class="bg-yellow-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-yellow-900">Reactive Forms</h3>
                  <p class="text-sm text-yellow-700">Form Handling</p>
                </div>
                <div class="bg-orange-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-orange-900">Standalone</h3>
                  <p class="text-sm text-orange-700">Components</p>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">Navigation Guide</h2>
              <div class="space-y-2">
                <div class="border-l-4 border-blue-600 pl-4 py-2">
                  <h3 class="font-semibold text-gray-900">Dashboard</h3>
                  <p class="text-sm">View all tasks, search by ID, and filter by status</p>
                </div>
                <div class="border-l-4 border-green-600 pl-4 py-2">
                  <h3 class="font-semibold text-gray-900">New Task</h3>
                  <p class="text-sm">Create a brand new task with all details</p>
                </div>
                <div class="border-l-4 border-purple-600 pl-4 py-2">
                  <h3 class="font-semibold text-gray-900">Edit Task</h3>
                  <p class="text-sm">Click on a task card to view details and edit</p>
                </div>
              </div>
            </section>

            <section>
              <h2 class="text-2xl font-semibold text-gray-900 mb-3">Getting Started</h2>
              <ol class="space-y-2 list-decimal list-inside">
                <li>Navigate to the Dashboard to see all tasks</li>
                <li>Use the search feature to find tasks by ID</li>
                <li>Click on any task card to view detailed information</li>
                <li>Click the Edit button to modify task details</li>
                <li>Use the New Task button to create a new task</li>
                <li>Delete tasks when no longer needed</li>
              </ol>
            </section>

            <section class="bg-blue-50 p-6 rounded-lg">
              <h2 class="text-xl font-semibold text-blue-900 mb-2">💡 Pro Tips</h2>
              <ul class="space-y-2 text-blue-800 text-sm">
                <li>• Set priorities appropriately to focus on important tasks first</li>
                <li>• Keep task descriptions detailed for future reference</li>
                <li>• Regularly update task status to track progress</li>
                <li>• Use due dates to plan your schedule effectively</li>
              </ul>
            </section>
          </div>

          <!-- Contact Section -->
          <div class="mt-8 pt-8 border-t">
            <p class="text-center text-gray-600">
              Built with ❤️ using Angular 21 and Tailwind CSS
            </p>
            <p class="text-center text-gray-500 text-sm mt-2">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {}
