import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2">
              <div class="text-2xl font-bold text-white">✓</div>
              <span class="text-xl font-bold text-white">TaskApp</span>
            </a>
          </div>

          <!-- Navigation Links -->
          <div class="flex items-center space-x-6">
            <a
              routerLink="/"
              routerLinkActive="text-white"
              class="text-gray-200 hover:text-white transition-colors font-medium"
            >
              Dashboard
            </a>
            <a
              routerLink="/create"
              routerLinkActive="text-white"
              class="text-gray-200 hover:text-white transition-colors font-medium"
            >
              New Task
            </a>
            <a
              routerLink="/about"
              routerLinkActive="text-white"
              class="text-gray-200 hover:text-white transition-colors font-medium"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {}
