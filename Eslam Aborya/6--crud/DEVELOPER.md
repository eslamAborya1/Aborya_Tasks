# Developer Documentation

This guide is for developers who want to contribute to or extend the TaskApp project.

## 📋 Project Overview

TaskApp is a modern Angular 21 application with the following architecture:
- **Standalone Components** - No NgModule dependencies
- **Lazy-Loaded Routes** - Components load on-demand
- **OnPush Change Detection** - Optimized rendering
- **Observable-Based** - RxJS for reactive programming
- **Tailwind CSS** - Utility-first styling

## 🏗️ Architecture

### Directory Structure

```
src/app/
├── components/              # Presentation layer
│   ├── navbar/             # Reusable navigation
│   ├── task-list/          # Dashboard page
│   ├── task-detail/        # Task view page
│   ├── task-form/          # Create/Edit page
│   └── about/              # Info page
├── models/                 # Data types
│   └── task.model.ts
├── services/               # Business logic
│   └── task.service.ts
├── app.routes.ts           # Route definitions
├── app.config.ts           # App configuration
├── app.ts                  # Root component
└── app.html                # Root template
```

### Data Flow

```
Components
    ↓ (dispatch actions)
Services (TaskService)
    ↓ (manage data)
Observable Streams (RxJS)
    ↓ (async pipe in templates)
DOM Updates (Angular rendering)
```

## 🛠️ Development Setup

### Environment Setup

```bash
# Install dependencies
npm install

# Verify tools
node --version      # Should be 18+
npm --version       # Should be 10+
ng version          # Should be 21+
```

### IDE Setup (VS Code)

Recommended Extensions:
- Angular Language Service
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense

### Development Server

```bash
ng serve --port 4300

# With HMR for faster reload
ng serve --hmr

# Debug mode
ng serve --debug
```

## 📝 Code Style Guide

### Component Standards

```typescript
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Template here -->
  `
})
export class ExampleComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialize component
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### Component Rules

1. **Always use OnPush strategy**
   ```typescript
   changeDetection: ChangeDetectionStrategy.OnPush
   ```

2. **Always implement OnDestroy**
   ```typescript
   export class MyComponent implements OnInit, OnDestroy {
     ngOnDestroy(): void { ... }
   }
   ```

3. **Use takeUntil for subscriptions**
   ```typescript
   this.service.getData()
     .pipe(takeUntil(this.destroy$))
     .subscribe(data => {
       this.data = data;
       this.cdr.markForCheck();
     });
   ```

4. **Add trackBy to *ngFor**
   ```html
   <div *ngFor="let item of items; trackBy: trackById">
     {{ item.name }}
   </div>
   ```
   ```typescript
   trackById(index: number, item: Item): number {
     return item.id;
   }
   ```

5. **Use reactive forms**
   ```typescript
   this.form = this.fb.group({
     title: ['', [Validators.required]],
     description: ['', [Validators.required, Validators.minLength(10)]]
   });
   ```

## 🔧 Adding New Features

### Adding a New Component

1. Create component file
   ```bash
   mkdir -p src/app/components/my-feature
   touch src/app/components/my-feature/my-feature.component.ts
   ```

2. Define component
   ```typescript
   import { Component, ChangeDetectionStrategy } from '@angular/core';

   @Component({
     selector: 'app-my-feature',
     standalone: true,
     imports: [CommonModule],
     changeDetection: ChangeDetectionStrategy.OnPush,
     template: ``
   })
   export class MyFeatureComponent {}
   ```

3. Add route (in app.routes.ts)
   ```typescript
   {
     path: 'my-feature',
     loadComponent: () =>
       import('./components/my-feature/my-feature.component')
         .then(m => m.MyFeatureComponent)
   }
   ```

4. Update navigation (navbar.component.ts)
   ```html
   <a routerLink="/my-feature">My Feature</a>
   ```

### Adding a Service Method

1. Update the service
   ```typescript
   export class TaskService {
     getCustomData(): Observable<CustomData[]> {
       return this.data$.pipe(
         map(items => items.filter(...)),
         shareReplay(1)
       );
     }
   }
   ```

2. Update the model if needed
   ```typescript
   export interface CustomData {
     id: number;
     // properties
   }
   ```

3. Use in component
   ```typescript
   this.service.getCustomData()
     .pipe(takeUntil(this.destroy$))
     .subscribe(data => {
       this.items = data;
       this.cdr.markForCheck();
     });
   ```

## 🎨 Styling Guidelines

### Tailwind Classes

Use Tailwind utility classes for styling:

```html
<!-- Spacing -->
<div class="px-4 py-2 mb-8">

<!-- Text -->
<h1 class="text-4xl font-bold text-gray-900">

<!-- Colors -->
<span class="bg-blue-600 text-white">

<!-- Responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

<!-- Hover -->
<button class="hover:bg-blue-700 transition-colors">
```

### Component Styles

Minimal component CSS, use Tailwind instead:

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  template: `...`
  // Inline template, no separate CSS file needed
})
```

## 🧪 Testing

### Run Tests

```bash
ng test
```

### Test Structure

```typescript
import { TestBed } from '@angular/core/testing';
import { MyComponent } from './my.component';

describe('MyComponent', () => {
  let component: MyComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    component = TestBed.createComponent(MyComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 📦 Building

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

### Analyze Bundle
```bash
ng build --stats-json
webpack-bundle-analyzer dist/angular-test/stats.json
```

## 🚀 Performance Tips

### Do's ✅

1. **Use OnPush** - Every component
2. **Use TrackBy** - On every *ngFor
3. **Unsubscribe** - With takeUntil()
4. **Lazy Load** - Routes with loadComponent()
5. **Cache** - Observables with shareReplay()
6. **MarkForCheck** - After async operations

### Don'ts ❌

1. **Don't use Default detection** - Causes unnecessary checks
2. **Don't forget trackBy** - Slows down list updates
3. **Don't forget unsubscribe** - Memory leaks
4. **Don't import eagerly** - Always use loadComponent()
5. **Don't subscribe multiple times** - Use shareReplay()
6. **Don't forget ngOnDestroy** - Cleanup resources

## 🔍 Debugging

### Debug Mode
```bash
ng serve --debug
```

### Browser DevTools
1. Open Chrome DevTools (F12)
2. Sources tab - Set breakpoints
3. Angular DevTools extension

### Common Issues

**Issue:** Change detection not working
```typescript
// Solution: Use markForCheck()
this.cdr.markForCheck();
```

**Issue:** Memory leaks in console
```typescript
// Solution: Implement ngOnDestroy
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
```

**Issue:** Slow list rendering
```typescript
// Solution: Add trackBy
<div *ngFor="let item of items; trackBy: trackById">
```

## 📚 Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
# Test locally
# Commit
git add .
git commit -m "feat: add my feature"

# Push
git push origin feature/my-feature

# Create pull request
```

## 🔐 Security Best Practices

1. **Sanitize user input**
   ```typescript
   import { DomSanitizer } from '@angular/platform-browser';
   ```

2. **Use property binding**
   ```html
   <!-- Good -->
   <div [property]="value"></div>
   
   <!-- Avoid -->
   <div [innerHTML]="html"></div>
   ```

3. **Validate forms**
   ```typescript
   this.form.get('email')?.hasError('email')
   ```

## 📖 Resources

- [Angular Style Guide](https://angular.dev/style-guide)
- [RxJS Operators](https://rxjs.dev/api)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Follow code style guide
2. Maintain OnPush strategy
3. Add trackBy functions
4. Manage subscriptions properly
5. Test locally
6. Write clear commit messages
7. Create descriptive pull requests

## 📞 Support

For questions or issues:
1. Check this documentation
2. Review code comments
3. Check console errors
4. Create an issue

---

**Happy coding! 🚀**
