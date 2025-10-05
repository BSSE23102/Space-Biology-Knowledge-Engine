import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Article } from '../../core/models/article.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;
  searchTimeout: any;
  
  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.error = null;
    const offset = (this.currentPage - 1) * this.pageSize;
    
    this.api.getArticles(this.pageSize, offset).subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.articles = response;
          this.totalCount = response.length > 0 ? 624 : 0;
        } else if (response.articles) {
          this.articles = response.articles;
          this.totalCount = response.total || response.total_count || 0;
        } else {
          this.articles = [];
          this.totalCount = 0;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles. Please check if the backend is running on port 8000.';
        console.error('API Error:', err);
        this.loading = false;
      }
    });
  }

  searchArticles() {
    if (!this.searchQuery.trim()) {
      this.loadArticles();
      return;
    }

    this.loading = true;
    this.error = null;
    this.currentPage = 1;
    const offset = (this.currentPage - 1) * this.pageSize;
    
    this.api.searchArticles(this.searchQuery.trim(), this.pageSize, offset).subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.articles = response;
          this.totalCount = response.length;
        } else if (response.articles) {
          this.articles = response.articles;
          this.totalCount = response.total || response.total_count || 0;
        } else if (response.results) {
          this.articles = response.results;
          this.totalCount = response.total_count || 0;
        } else {
          this.articles = [];
          this.totalCount = 0;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to search articles';
        console.error('Search Error:', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(query: string) {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.searchQuery = query;
      this.searchArticles();
    }, 400);
  }

  clearSearch() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadArticles();
  }

  viewArticle(articleId: number) {
    const article = this.articles.find(a => a.id === articleId);
    if (article && article.url) {
      window.open(article.url, '_blank');
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.searchQuery.trim()) {
        this.searchArticles();
      } else {
        this.loadArticles();
      }
    }
  }

  nextPage() {
    this.currentPage++;
    if (this.searchQuery.trim()) {
      this.searchArticles();
    } else {
      this.loadArticles();
    }
  }
}
