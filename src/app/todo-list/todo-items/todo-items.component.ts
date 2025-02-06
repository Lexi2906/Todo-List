import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TodoItemComponent} from '../todo-item/todo-item.component';
import {FooterComponent} from '../footer/footer.component';
import {Todo} from '../../../models/todo';
import {TodoService} from '../../../services/todo.service';
import {NgForOf} from '@angular/common';
import {Subscription} from 'rxjs';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-items',
  imports: [TodoItemComponent, FooterComponent, CdkDropList, CdkDrag],
  templateUrl: './todo-items.component.html',
  standalone: true,
  styleUrl: './todo-items.component.scss'
})
export class TodoItemsComponent implements OnInit, OnDestroy {
  @Input() todos: Todo[] = [];
  private todosSubscription: Subscription | null = null;

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getFilteredTodos().subscribe((todos) => {
      this.todos = todos;
    });
    }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  toggleTaskCompletion(todo: Todo): void {
    this.todoService.toggleTodoCompletion(todo);
  }

  deleteTask(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }


  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  trackByFn(index: number, item: Todo): number {
    return item.id;
  }
}
