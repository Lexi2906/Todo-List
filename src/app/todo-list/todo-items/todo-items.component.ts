import { Component } from '@angular/core';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-todo-items',
  imports: [TodoItemComponent, FooterComponent],
  templateUrl: './todo-items.component.html',
  standalone: true,
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent {

}
