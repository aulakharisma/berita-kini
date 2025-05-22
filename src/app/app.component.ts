import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule],
  template: `<router-outlet />`,
  // templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'berita-kini';
}
