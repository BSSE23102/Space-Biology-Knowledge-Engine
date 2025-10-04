import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div class="app-container">
      <header>
        <h1>Space Biology Knowledge Engine</h1>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `:host { display:block; font-family: Arial, Helvetica, sans-serif; margin: 16px; }
     header h1 { margin: 0 0 16px 0; }
    `
  ]
})
export class AppComponent {}
