import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {BehaviorSubject, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
  private todosSubject = new BehaviorSubject<Todo[]>(this.todos);
  private filterSubject = new BehaviorSubject<string>('all');

  filter$ = this.filterSubject.asObservable();

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  setFilter(filter: string): void {
    this.filterSubject.next(filter);
  }

  getFilteredTodos(): Observable<Todo[]> {
    return this.filter$.pipe(
      map((filter) => {
        if (filter === 'active') {
          return this.todos.filter((todo) => !todo.completed);
        } else if (filter === 'completed') {
          return this.todos.filter((todo) => todo.completed);
        } else {
          return this.todos; // All
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
    console.log('todo', this.todos)
    this.todosSubject.next(this.todos);
  }

  deleteCompletedTodos(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveToLocalStorage();
    this.todosSubject.next(this.todos);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
