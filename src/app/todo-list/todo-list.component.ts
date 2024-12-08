import { Component } from '@angular/core';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {TodoInputComponent} from './todo-input/todo-input.component';
import {TodoItemsComponent} from './todo-items/todo-items.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [ThemeSwitcherComponent, TodoInputComponent, TodoItemsComponent],
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
