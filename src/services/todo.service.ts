import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject, combineLatest, map, Observable} from 'rxjs';
import {FilterStorageKey} from '../models/filter-storage-key.enum';
import {FilterTypes} from '../models/filter-types.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = JSON.parse(localStorage.getItem(FilterStorageKey.Todos) || '[]');
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  private filterSubject = new BehaviorSubject<FilterTypes>(FilterTypes.All);

  filter$ = this.filterSubject.asObservable();

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
    const newTodo: Todo = {id: Date.now(), text: taskText, completed: false};
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
  }

  toggleTodoCompletion(todo: Todo): void {
    const task = this.todos.find((t) => t.id === todo.id);
    if (task) task.completed = !task.completed;
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos)
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
  }

  deleteCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
  }

  getActiveTasksCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }


  private saveToLocalStorage(): void {
    localStorage.setItem(FilterStorageKey.Todos, JSON.stringify(this.todos));
  }
}
