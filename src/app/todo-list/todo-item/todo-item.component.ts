import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '../../../models/todo';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './todo-item.component.html',
  standalone: true,
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }

  onDelete(): void {
    this.delete.emit();

  }
}
