import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {FilterStorageKey} from '../enums/filter-storage-key.enum';
import {FilterTypes} from '../enums/filter-types.enum';

import {TodoApiService} from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private filterSubject = new BehaviorSubject<FilterTypes>(FilterTypes.All);

  filter$ = this.filterSubject.asObservable();

  constructor(private todoApiService: TodoApiService) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoApiService.getTodos().subscribe(todos => {
      this.todos = todos.sort((a, b) => a.order - b.order);
      this.todosSubject.next(this.todos);
    });
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  setFilter(filter: FilterTypes): void {
    this.filterSubject.next(filter);
    localStorage.setItem(FilterStorageKey.Filter, filter);
  }

  getFilteredTodos(): Observable<Todo[]> {
    return combineLatest([this.todosSubject.asObservable(), this.filter$]).pipe(
      map(([todos, filter]) => {
        switch (filter) {
          case FilterTypes.Active:
            return todos.filter(todo => todo.status === 'active');
          case FilterTypes.Completed:
            return todos.filter(todo => todo.status === 'completed');
          default:
            return todos;
        }
      })
    );
  }

  addTodo(taskText: string): void {
    const newTodo: Omit<Todo, 'id'> = {
      text: taskText,
      status: 'active',
      order: this.todos.length + 1
    };

    this.todoApiService.addTodo(newTodo).subscribe((savedTodo: Todo) => {
      this.todos.push(savedTodo);
      this.todosSubject.next(this.todos);
    });
  }

  toggleTodoCompletion(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      status: todo.status === 'active' ? 'completed' : 'active'
    };
    this.todoApiService.updateTodo(updatedTodo).subscribe(() => {
      this.todos = this.todos.map(t => (t.id === todo.id ? updatedTodo : t));
      this.todosSubject.next(this.todos);
    });
  }

  deleteTodo(todo: Todo): void {
    this.todoApiService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
      this.todosSubject.next(this.todos);
    });
  }

  deleteCompletedTodos(): void {
    this.todoApiService.deleteCompletedTodos().subscribe(() => {
      this.todos = this.todos.filter(todo => todo.status !== 'completed');
      this.todosSubject.next(this.todos);
    });
  }

  getActiveTasksCount(): number {
    return this.todos.filter(todo => todo.status === 'active').length;
  }

  updateTodoOrder(updatedTodos: Todo[]): void {
    this.todos = updatedTodos;
    this.todosSubject.next(this.todos);
    this.todoApiService.updateTodoOrder(updatedTodos).subscribe()
  }


}
