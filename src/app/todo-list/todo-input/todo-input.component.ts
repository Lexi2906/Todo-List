import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../../../services/todo.service';

@Component({
  selector: 'app-todo-input',
  imports: [
    FormsModule
  ],
  templateUrl: './todo-input.component.html',
  standalone: true,
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  taskText: string = '';
  constructor(private todoService: TodoService) {}

  onEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.taskText.trim()) {
      this.todoService.addTodo(this.taskText.trim());
      this.taskText = '';
    }
  }
}
