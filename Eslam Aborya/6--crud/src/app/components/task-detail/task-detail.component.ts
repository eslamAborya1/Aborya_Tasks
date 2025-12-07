import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

        <!-- Content -->
        <ng-container *ngIf="task; else notFound">
          <div class="bg-white rounded-lg shadow-lg p-8 border-l-4" [ngClass]="getPriorityBorderColor()">
            <!-- Header -->
            <div class="mb-8">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h1 class="text-4xl font-bold text-gray-900">{{ task.title }}</h1>
                  <p class="text-gray-500 mt-2">Task ID: {{ task.id }}</p>
                </div>
                <div class="text-right">
                  <span
                    class="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                    [ngClass]="getStatusBadgeClass()"
                  >
                    {{ task.status | titlecase }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Main Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <!-- Left Column -->
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <p class="text-gray-600 leading-relaxed text-lg">{{ task.description }}</p>
                </div>

                <div class="border-t pt-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    Priority Level
                  </label>
                  <div
                    class="inline-block px-4 py-2 rounded-lg font-semibold text-lg"
                    [ngClass]="getPriorityClass()"
                  >
                    {{ task.priority | titlecase }}
                  </div>
                </div>
              </div>

              <!-- Right Column -->
              <div class="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Due Date
                  </label>
                  <p class="text-gray-900 text-lg font-semibold">
                    {{ task.dueDate | date: 'MMM dd, yyyy' }}
                  </p>
                </div>

                <div class="border-t pt-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Created Date
                  </label>
                  <p class="text-gray-900 text-lg font-semibold">
                    {{ task.createdAt | date: 'MMM dd, yyyy' }}
                  </p>
                </div>

                <div class="border-t pt-6">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Current Status
                  </label>
                  <p class="text-gray-900 text-lg font-semibold">{{ task.status | titlecase }}</p>
                </div>
              </div>
            </div>

            <!-- Info Cards -->
            <div class="grid grid-cols-3 gap-4 my-8 p-6 bg-gray-100 rounded-lg">
              <div class="text-center">
                <div class="text-sm text-gray-600 mb-1">Days Until Due</div>
                <div class="text-2xl font-bold text-blue-600">
                  {{ daysUntilDue }}
                </div>
              </div>
              <div class="text-center border-l border-r border-gray-300">
                <div class="text-sm text-gray-600 mb-1">Task Age</div>
                <div class="text-2xl font-bold text-purple-600">
                  {{ taskAge }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-sm text-gray-600 mb-1">Task ID</div>
                <div class="text-2xl font-bold text-gray-900">
                  #{{ task.id }}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 mt-8 pt-8 border-t">
              <button
                [routerLink]="['/edit', task.id]"
                class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Edit Task
              </button>
              <button
                (click)="deleteTask()"
                class="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
              >
                Delete Task
              </button>
            </div>
          </div>
        </ng-container>

        <!-- Not Found -->
        <ng-template #notFound>
          <div class="bg-white rounded-lg shadow-lg p-12 text-center">
            <div class="text-6xl mb-4">🔍</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h1>
            <p class="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
            <button
              routerLink="/"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Back to Dashboard
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  task: Task | null = null;
  daysUntilDue = 0;
  taskAge = 0;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(parseInt(id)).subscribe(task => {
        this.task = task || null;
        if (task) {
          this.calculateDates();
        }
      });
    }
  }

  calculateDates(): void {
    if (!this.task) return;

    const today = new Date();
    const dueDate = new Date(this.task.dueDate);
    const createdDate = new Date(this.task.createdAt);

    const diffTime = dueDate.getTime() - today.getTime();
    this.daysUntilDue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const ageTime = today.getTime() - createdDate.getTime();
    this.taskAge = Math.floor(ageTime / (1000 * 60 * 60 * 24));
  }

  deleteTask(): void {
    if (!this.task) return;

    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(this.task.id).subscribe(success => {
      if (success) {
        alert('Task deleted successfully');
        window.location.href = '/';
      } else {
        alert('Failed to delete task');
      }
    });
  }

  getStatusBadgeClass(): string {
    if (!this.task) return '';
    const baseClass = 'px-4 py-2 rounded-full text-sm font-semibold';
    switch (this.task.status) {
      case 'completed':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'in-progress':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'pending':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      default:
        return baseClass;
    }
  }

  getPriorityBorderColor(): string {
    if (!this.task) return '';
    switch (this.task.priority) {
      case 'high':
        return 'border-red-500';
      case 'medium':
        return 'border-yellow-500';
      case 'low':
        return 'border-green-500';
      default:
        return 'border-gray-300';
    }
  }

  getPriorityClass(): string {
    if (!this.task) return '';
    switch (this.task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
