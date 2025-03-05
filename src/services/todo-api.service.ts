import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {Observable} from 'rxjs';
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

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
  }

  deleteTodo(todoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${todoId}`);
  }

  deleteCompletedTodos(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/completed`);
  }

}
