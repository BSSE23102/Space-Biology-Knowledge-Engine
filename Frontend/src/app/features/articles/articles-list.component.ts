import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: false,
  templateUrl: './articles-list.component.html'
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error: string | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.error = null;
    this.api.getArticles(20, 0).subscribe({
      next: (res) => {
        this.articles = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles';
        console.error(err);
        this.loading = false;
      }
    });
  }
}
