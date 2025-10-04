import { Component } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SearchComponent {
  query = '';
  results: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  search() {
    if (!this.query.trim()) return;
    this.loading = true;
    this.api.searchArticles(this.query).subscribe({
      next: (res) => {
        this.results = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Search failed';
        this.loading = false;
      }
    });
  }
}
