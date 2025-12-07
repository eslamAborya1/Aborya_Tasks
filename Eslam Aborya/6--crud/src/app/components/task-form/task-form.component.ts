import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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

        <!-- Form Container -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            {{ isEditMode ? 'Edit Task' : 'Create New Task' }}
          </h1>
          <p class="text-gray-600 mb-8">
            {{ isEditMode ? 'Update task details' : 'Add a new task to your list' }}
          </p>

          <!-- Loading State -->
          <div *ngIf="isLoading" class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p class="text-gray-600 mt-4">Loading task...</p>
          </div>

          <!-- Form -->
          <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" *ngIf="!isLoading">
            <!-- Title -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                formControlName="title"
                placeholder="Enter task title"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div
                *ngIf="taskForm.get('title')?.invalid && taskForm.get('title')?.touched"
                class="text-red-600 text-sm mt-2"
              >
                Title is required
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                formControlName="description"
                placeholder="Enter detailed description"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              ></textarea>
              <div
                *ngIf="taskForm.get('description')?.invalid && taskForm.get('description')?.touched"
                class="text-red-600 text-sm mt-2"
              >
                Description is required
              </div>
            </div>

            <!-- Grid Layout for Other Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Status -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  formControlName="status"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div
                  *ngIf="taskForm.get('status')?.invalid && taskForm.get('status')?.touched"
                  class="text-red-600 text-sm mt-2"
                >
                  Status is required
                </div>
              </div>

              <!-- Priority -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Priority *
                </label>
                <select
                  formControlName="priority"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div
                  *ngIf="taskForm.get('priority')?.invalid && taskForm.get('priority')?.touched"
                  class="text-red-600 text-sm mt-2"
                >
                  Priority is required
                </div>
              </div>
            </div>

            <!-- Due Date -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                formControlName="dueDate"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <div
                *ngIf="taskForm.get('dueDate')?.invalid && taskForm.get('dueDate')?.touched"
                class="text-red-600 text-sm mt-2"
              >
                Due date is required
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                [disabled]="taskForm.invalid || isSubmitting"
                class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task' }}
              </button>
              <button
                type="button"
                (click)="resetForm()"
                class="flex-1 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-lg"
              >
                Reset
              </button>
              <button
                type="button"
                routerLink="/"
                class="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold text-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <!-- Info Box -->
        <div class="mt-8 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h3 class="font-semibold text-blue-900 mb-2">💡 Tips</h3>
          <ul class="text-blue-800 text-sm space-y-1">
            <li>• Set clear and descriptive titles for your tasks</li>
            <li>• Provide detailed descriptions to avoid confusion</li>
            <li>• Choose appropriate priority levels to manage workload</li>
            <li>• Set realistic due dates to keep your schedule on track</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSubmitting = false;
  taskId: number | null = null;
  originalTask: Task | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = parseInt(id);
      this.loadTask();
    }
  }

  initializeForm(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  loadTask(): void {
    if (!this.taskId) return;

    this.isLoading = true;
    this.cdr.markForCheck();
    this.taskService.getTaskById(this.taskId).subscribe({
      next: task => {
        if (task) {
          this.originalTask = task;
          this.populateForm(task);
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        alert('Failed to load task');
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  populateForm(task: Task): void {
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Please fill in all required fields correctly');
      return;
    }

    this.isSubmitting = true;
    this.cdr.markForCheck();
    const formValue = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      // Update existing task
      this.taskService.updateTask(this.taskId, formValue).subscribe({
        next: updatedTask => {
          if (updatedTask) {
            alert('Task updated successfully');
            this.router.navigate(['/']);
          }
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
        error: () => {
          alert('Failed to update task');
          this.isSubmitting = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      // Create new task
      this.taskService.createTask(formValue).subscribe({
        next: newTask => {
          alert('Task created successfully');
          this.router.navigate(['/']);
          this.isSubmitting = false;
          this.cdr.markForCheck();
        },
        error: () => {
          alert('Failed to create task');
          this.isSubmitting = false;
          this.cdr.markForCheck();
        }
      });
    }
  }

  resetForm(): void {
    if (this.isEditMode && this.originalTask) {
      this.populateForm(this.originalTask);
    } else {
      this.taskForm.reset({
        status: 'pending',
        priority: 'medium'
      });
    }
  }
}
