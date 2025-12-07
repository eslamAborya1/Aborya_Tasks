import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskCreateInput } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks$ = new BehaviorSubject<Task[]>([
    {
      id: 1,
      title: 'Design Homepage',
      description: 'Create mockups and design specifications for the homepage',
      status: 'completed',
      priority: 'high',
      dueDate: '2025-12-10',
      createdAt: '2025-01-01'
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Integrate REST API endpoints for user management',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-12-15',
      createdAt: '2025-01-02'
    },
    {
      id: 3,
      title: 'Unit Testing',
      description: 'Write unit tests for core components',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-20',
      createdAt: '2025-01-03'
    },
    {
      id: 4,
      title: 'Database Schema',
      description: 'Design and implement database schema',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-25',
      createdAt: '2025-01-04'
    }
  ]);

  private nextId = 5;
  private taskCache = new Map<number, Observable<Task | undefined>>();
  private searchCache = new Map<string, Observable<Task[]>>();

  constructor() {}

  /**
   * Get all tasks with shareReplay for optimization
   */
  getAllTasks(): Observable<Task[]> {
    return this.tasks$.asObservable().pipe(
      shareReplay(1)
    );
  }

  /**
   * Find task by ID with caching
   */
  getTaskById(id: number): Observable<Task | undefined> {
    if (!this.taskCache.has(id)) {
      const cached = this.tasks$.pipe(
        map(tasks => tasks.find(task => task.id === id)),
        shareReplay(1)
      );
      this.taskCache.set(id, cached);
    }
    return this.taskCache.get(id)!;
  }

  /**
   * Create new task
   */
  createTask(input: TaskCreateInput): Observable<Task> {
    return new Observable(observer => {
      const newTask: Task = {
        ...input,
        id: this.nextId++,
        createdAt: new Date().toISOString().split('T')[0]
      };
      const tasks = this.tasks$.getValue();
      this.tasks$.next([...tasks, newTask]);
      this.clearCache();
      observer.next(newTask);
      observer.complete();
    });
  }

  /**
   * Update existing task
   */
  updateTask(id: number, input: TaskCreateInput): Observable<Task | null> {
    return new Observable(observer => {
      const tasks = this.tasks$.getValue();
      const index = tasks.findIndex(task => task.id === id);

      if (index === -1) {
        observer.next(null);
        observer.complete();
        return;
      }

      const updatedTask: Task = {
        ...input,
        id,
        createdAt: tasks[index].createdAt
      };

      tasks[index] = updatedTask;
      this.tasks$.next([...tasks]);
      this.clearCache();
      observer.next(updatedTask);
      observer.complete();
    });
  }

  /**
   * Delete task by ID
   */
  deleteTask(id: number): Observable<boolean> {
    return new Observable(observer => {
      const tasks = this.tasks$.getValue();
      const filtered = tasks.filter(task => task.id !== id);

      if (filtered.length === tasks.length) {
        observer.next(false);
        observer.complete();
        return;
      }

      this.tasks$.next(filtered);
      this.clearCache();
      observer.next(true);
      observer.complete();
    });
  }

  /**
   * Search tasks by title or description with caching
   */
  searchTasks(query: string): Observable<Task[]> {
    if (!this.searchCache.has(query)) {
      const cached = this.tasks$.pipe(
        map(tasks => {
          const lowerQuery = query.toLowerCase();
          return tasks.filter(
            task =>
              task.title.toLowerCase().includes(lowerQuery) ||
              task.description.toLowerCase().includes(lowerQuery)
          );
        }),
        shareReplay(1)
      );
      this.searchCache.set(query, cached);
    }
    return this.searchCache.get(query)!;
  }

  /**
   * Get tasks by status with caching
   */
  getTasksByStatus(status: Task['status']): Observable<Task[]> {
    const key = `status:${status}`;
    if (!this.searchCache.has(key)) {
      const cached = this.tasks$.pipe(
        map(tasks => tasks.filter(task => task.status === status)),
        shareReplay(1)
      );
      this.searchCache.set(key, cached);
    }
    return this.searchCache.get(key)!;
  }

  /**
   * Clear all caches when data changes
   */
  private clearCache(): void {
    this.taskCache.clear();
    this.searchCache.clear();
  }
}
