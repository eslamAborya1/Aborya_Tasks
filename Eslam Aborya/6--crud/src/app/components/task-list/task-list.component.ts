import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
          <p class="text-gray-600">Manage and track your tasks efficiently</p>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Search by ID -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Search by Task ID
              </label>
              <div class="flex gap-2">
                <input
                  type="number"
                  [(ngModel)]="searchId"
                  placeholder="Enter task ID..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  (click)="findById()"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Find
                </button>
                <button
                  (click)="clearSearch()"
                  class="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Clear
                </button>
              </div>
            </div>

            <!-- Filter by Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                [(ngModel)]="selectedStatus"
                (change)="filterByStatus()"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-2xl font-bold text-blue-600">{{ totalTasks }}</div>
            <p class="text-gray-600 text-sm mt-2">Total Tasks</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-2xl font-bold text-green-600">{{ completedCount }}</div>
            <p class="text-gray-600 text-sm mt-2">Completed</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-2xl font-bold text-yellow-600">{{ inProgressCount }}</div>
            <p class="text-gray-600 text-sm mt-2">In Progress</p>
          </div>
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="text-2xl font-bold text-red-600">{{ pendingCount }}</div>
            <p class="text-gray-600 text-sm mt-2">Pending</p>
          </div>
        </div>

        <!-- Task Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ng-container *ngIf="displayedTasks.length > 0; else noTasks">
            <div
              *ngFor="let task of displayedTasks; trackBy: trackByTaskId"
              class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4"
              [ngClass]="getPriorityBorderColor(task.priority)"
            >
              <!-- Task Header -->
              <div class="flex justify-between items-start mb-4">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg font-bold text-gray-900">{{ task.title }}</h3>
                    <span
                      class="px-3 py-1 rounded-full text-xs font-semibold"
                      [ngClass]="getStatusBadgeClass(task.status)"
                    >
                      {{ task.status | titlecase }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">ID: {{ task.id }}</p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ task.description }}</p>

              <!-- Priority and Dates -->
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Priority:</span>
                  <span
                    class="font-semibold"
                    [ngClass]="getPriorityTextColor(task.priority)"
                  >
                    {{ task.priority | titlecase }}
                  </span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Due Date:</span>
                  <span class="font-semibold text-gray-900">{{ task.dueDate }}</span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-2">
                <button
                  [routerLink]="['/edit', task.id]"
                  class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Edit
                </button>
                <button
                  (click)="deleteTask(task.id)"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </ng-container>

          <ng-template #noTasks>
            <div class="col-span-full text-center py-12">
              <div class="text-6xl mb-4">📭</div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">No Tasks Found</h3>
              <p class="text-gray-600">Try adjusting your search or filters</p>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  displayedTasks: Task[] = [];
  searchId: number | null = null;
  selectedStatus: string = '';
  totalTasks = 0;
  completedCount = 0;
  inProgressCount = 0;
  pendingCount = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAllTasks();
  }

  loadAllTasks(): void {
    this.taskService.getAllTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasks = tasks;
        this.displayedTasks = tasks;
        this.updateStats();
        this.cdr.markForCheck();
      });
  }

  findById(): void {
    if (!this.searchId || this.searchId <= 0) {
      alert('Please enter a valid task ID');
      return;
    }

    this.taskService.getTaskById(this.searchId).subscribe(task => {
      if (task) {
        this.displayedTasks = [task];
      } else {
        alert(`Task with ID ${this.searchId} not found`);
        this.displayedTasks = [];
      }
    });
  }

  filterByStatus(): void {
    if (!this.selectedStatus) {
      this.displayedTasks = this.tasks;
    } else {
      this.taskService.getTasksByStatus(this.selectedStatus as any).subscribe(tasks => {
        this.displayedTasks = tasks;
      });
    }
  }

  deleteTask(id: number): void {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(id).subscribe(success => {
      if (success) {
        alert('Task deleted successfully');
        this.loadAllTasks();
      } else {
        alert('Failed to delete task');
      }
    });
  }

  clearSearch(): void {
    this.searchId = null;
    this.selectedStatus = '';
    this.loadAllTasks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }

  updateStats(): void {
    this.totalTasks = this.tasks.length;
    this.completedCount = this.tasks.filter(t => t.status === 'completed').length;
    this.inProgressCount = this.tasks.filter(t => t.status === 'in-progress').length;
    this.pendingCount = this.tasks.filter(t => t.status === 'pending').length;
  }

  getStatusBadgeClass(status: string): string {
    const baseClass = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
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

  getPriorityBorderColor(priority: string): string {
    switch (priority) {
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

  getPriorityTextColor(priority: string): string {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  }
}
