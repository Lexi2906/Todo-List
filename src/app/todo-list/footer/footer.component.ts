import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Subscription} from 'rxjs';
import {Todo} from '../../../models/todo';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  pendingTasks = 0;
  filter: string = 'all';
  private todosSubscription: Subscription | null = null;

  @Output() filterChanged = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getTodos().subscribe((todos) => {
      this.pendingTasks = todos.filter((todo) => !todo.completed).length;
    });
  }

  ngOnDestroy(): void {
    if (this.todosSubscription) {
      this.todosSubscription.unsubscribe();
    }
  }

  cleanCompleted(): void {
    this.todoService.deleteCompletedTodos();
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.todoService.setFilter(filter);
  }
}
