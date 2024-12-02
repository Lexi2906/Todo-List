import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [ThemeSwitcherComponent],
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
