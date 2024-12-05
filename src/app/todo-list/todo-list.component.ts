import { Component } from '@angular/core';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {TodoInputComponent} from './todo-input/todo-input.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [ThemeSwitcherComponent, TodoInputComponent],
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
