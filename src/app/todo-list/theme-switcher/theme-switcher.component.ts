import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.component.html',
  standalone: true,
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent {
  isDarkMode: boolean = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const bodyElement = document.body;

    if (this.isDarkMode) {
      bodyElement.classList.add('dark-mode');
    } else {
      bodyElement.classList.remove('dark-mode');
    }
  }


}
