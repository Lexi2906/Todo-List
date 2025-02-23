import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TodoService} from '../../../services/todo.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-todo-input',
  imports: [
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './todo-input.component.html',
  standalone: true,
  styleUrl: './todo-input.component.scss',
})
export class TodoInputComponent {
  taskText: string = '';

  constructor(private todoService: TodoService) {
  }

  addItem(): void {
    if (this.taskText.trim()) {
      this.todoService.addTodo(this.taskText.trim());
      this.taskText = '';
    }
  }
}
