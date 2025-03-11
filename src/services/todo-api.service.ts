import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {catchError, EMPTY, forkJoin, map, Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  updateTodoOrder(updatedTodos: Todo[]): Observable<void[]> {
    const updateRequests = updatedTodos.map(todo =>
      this.http.put<void>(`${this.apiUrl}/${todo.id}`, {
        id: todo.id,
        text: todo.text,
        status: todo.status,
        order: todo.order
      })
    );

    return forkJoin(updateRequests).pipe(
      catchError(error => {
        console.error('The error while updating the order', error);
        return EMPTY;
      })
    );
  }


  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`);
  }

  deleteCompletedTodos(): Observable<void> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map(todos => todos.filter(todo => todo.status === 'completed')),
      switchMap(completedTodos =>
        forkJoin(completedTodos.map(todo => this.http.delete<void>(`${this.apiUrl}/${todo.id}`)))
      ),
      map(() => {})
    );
  }
}
