import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Subscription} from 'rxjs';
import {Todo} from '../../../models/todo';
import {FilterTypes} from '../../../models/filter-types.enum';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  pendingTasks = 0;
  filter: FilterTypes = FilterTypes.All;
  isMobileView: boolean = window.innerWidth <= 768;
  private todosSubscription: Subscription | null = null;


  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 1440;
  }

  @Output() filterChanged = new EventEmitter<Todo[]>();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.todosSubscription = this.todoService.getFilteredTodos().subscribe((todos) => {
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

  setFilter(filterType: FilterTypes): void {
    this.filter = filterType;
    this.todoService.setFilter(filterType);
  }

  protected readonly FilterTypes = FilterTypes;
  protected readonly Component = Component;
}
