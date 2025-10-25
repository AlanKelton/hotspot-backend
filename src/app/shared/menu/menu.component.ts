// src/app/shared/menu.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="bg-gray-800 text-white p-4 w-64 h-full fixed">
      <ul class="space-y-2">
        <li><a routerLink="/home" class="block p-2 hover:bg-gray-700 rounded">Home</a></li>
        <li><a routerLink="/invites" class="block p-2 hover:bg-gray-700 rounded">My Invites</a></li>
        <li><a routerLink="/settings" class="block p-2 hover:bg-gray-700 rounded">Settings</a></li>
      </ul>
    </div>
  `
})
export class MenuComponent {}
