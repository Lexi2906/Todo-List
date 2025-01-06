import {Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeSwitcherComponent} from './theme-switcher/theme-switcher.component';
import {TodoInputComponent} from './todo-input/todo-input.component';
import {TodoItemsComponent} from './todo-items/todo-items.component';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [ThemeSwitcherComponent, TodoInputComponent, TodoItemsComponent],
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit, OnDestroy{
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  private todosSubscription: Subscription | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.filteredTodos = todos;
    });
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  // Obsługuje dodanie nowego zadania
  addNewTask(taskText: string): void {
    this.todoService.addTodo(taskText);
  }

  toggleTaskCompletion(todo: Todo): void {
    this.todoService.toggleTodoCompletion(todo);
  }

  deleteTask(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }
}
