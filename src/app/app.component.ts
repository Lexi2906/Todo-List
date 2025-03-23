import {Component} from '@angular/core';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Todo-List';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
}
