import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {TodoService} from '../../../services/todo.service';
import {Subscription} from 'rxjs';
import {Todo} from '../../../models/todo';
import {FilterTypes} from '../../../enums/filter-types.enum';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {

  @HostListener('window:resize')
  onResize() {
    this.isMobileView = window.innerWidth <= 1440;
  }
  @Output() filterChanged = new EventEmitter<Todo[]>();

  pendingTasks = 0;
  filter: FilterTypes = FilterTypes.All;
  filteredTodos: Todo[] = [];
  isMobileView: boolean = window.innerWidth <= 768;
  private subscriptions = new Subscription();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    const filterSub = this.todoService.filter$.subscribe((filter) => {
      this.filter = filter;
    });

    const filteredTodosSub = this.todoService.getFilteredTodos().subscribe((todos) => {
      this.filteredTodos = todos;

      this.pendingTasks = this.todoService.getActiveTasksCount();
    });

    this.subscriptions.add(filterSub);
    this.subscriptions.add(filteredTodosSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cleanCompleted(): void {
    this.todoService.deleteCompletedTodos();
    this.todoService.setFilter(FilterTypes.All);
  }

  setFilter(filterType: FilterTypes): void {
    this.filter = filterType;
    this.todoService.setFilter(filterType);
  }

  protected readonly FilterTypes = FilterTypes;
}
