import { Component } from '@angular/core';
import {TodoItemComponent} from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-items',
  imports: [TodoItemComponent],
  templateUrl: './todo-items.component.html',
  standalone: true,
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {

}
