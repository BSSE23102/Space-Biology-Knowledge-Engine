import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  loading = false;
  error: string | null = null;
  searchQuery = '';
  isSearchMode = false;
  currentPage = 1;
  pageSize = 20;
  totalCount = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles() {
    this.loading = true;
    this.error = null;
    this.api.getArticles(this.pageSize, (this.currentPage - 1) * this.pageSize).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.articles = res;
          this.totalCount = res.length;
        } else {
          this.articles = res.articles || [];
          this.totalCount = res.total_count || 0;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load articles';
        console.error(err);
        this.loading = false;
      }
    });
  }

  searchArticles() {
    if (!this.searchQuery.trim()) {
      this.clearSearch();
      return;
    }

    this.loading = true;
    this.error = null;
    this.isSearchMode = true;
    this.currentPage = 1;

    this.api.searchArticles(this.searchQuery, this.pageSize, 0).subscribe({
      next: (res) => {
        if (res.articles) {
          this.articles = res.articles;
          this.totalCount = res.total_count || 0;
        } else {
          this.articles = Array.isArray(res) ? res : [];
          this.totalCount = this.articles.length;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Search failed. Please try again.';
        console.error(err);
        this.loading = false;
      }
    });
  }

  clearSearch() {
    this.searchQuery = '';
    this.isSearchMode = false;
    this.currentPage = 1;
    this.loadArticles();
  }

  viewArticle(id: number) {
    console.log('View article:', id);
    // Implement navigation to article details
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.isSearchMode) {
        this.searchArticles();
      } else {
        this.loadArticles();
      }
    }
  }

  nextPage() {
    this.currentPage++;
    if (this.isSearchMode) {
      this.searchArticles();
    } else {
      this.loadArticles();
    }
  }
}
