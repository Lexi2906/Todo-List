import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {FilterStorageKey} from '../enums/filter-storage-key.enum';
import {FilterTypes} from '../enums/filter-types.enum';

import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';
  private todos: Todo[] = JSON.parse(localStorage.getItem(FilterStorageKey.Todos) || '[]');
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  private filterSubject = new BehaviorSubject<FilterTypes>(FilterTypes.All);

  filter$ = this.filterSubject.asObservable();

  constructor(private http: HttpClient) {}

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
            return todos.filter(todo => !todo.completed);
          case FilterTypes.Completed:
            return todos.filter(todo => todo.completed);
          default:
            return todos;
        }
      })
    );
  }

  addTodo(taskText: string): void {
    const newTodo: Todo = { id: Date.now(), text: taskText, completed: false, order: this.todos.length + 1 };
    this.todos.unshift(newTodo);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
    this.http.post<Todo>(this.apiUrl, newTodo).subscribe();
  }

  toggleTodoCompletion(todo: Todo): void {
    const task = this.todos.find((t) => t.id === todo.id);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
      this.todosSubject.next(this.todos);
      this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, task).subscribe();
    }
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
    this.http.delete(`${this.apiUrl}/${todo.id}`).subscribe();
  }

  deleteCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
    this.http.delete(`${this.apiUrl}/completed`).subscribe();
  }

  getActiveTasksCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  updateTodoOrder(updatedTodos: Todo[]): void {
    this.todos = updatedTodos;
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);

    updatedTodos.forEach(todo => {
      this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo).subscribe();
    });
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(FilterStorageKey.Todos, JSON.stringify(this.todos));
  }
}
