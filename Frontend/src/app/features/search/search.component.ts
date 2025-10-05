import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  query = '';
  results: any[] = [];
  loading = false;
  error: string | null = null;
  totalResults = 0;
  currentPage = 1;
  pageSize = 20;

  private searchSubject = new Subject<string>();
  
  popularSearches = [
    'microgravity',
    'bone loss', 
    'plant growth',
    'radiation effects',
    'muscle atrophy',
    'cardiovascular',
    'neurological studies',
    'space biology'
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    // Set up live search with debounce
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.performSearch(query))
    ).subscribe();
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }

  onQueryChange() {
    if (this.query.length === 0) {
      this.results = [];
      this.error = null;
      this.totalResults = 0;
      return;
    }
    
    if (this.query.length >= 2) {
      this.searchSubject.next(this.query);
    }
  }

  private performSearch(query: string) {
    if (!query || query.length < 2) {
      this.results = [];
      return of([]);
    }

    this.loading = true;
    this.error = null;

    return this.api.searchArticles(query, this.pageSize, 0).pipe(
      catchError(error => {
        console.error('Search error:', error);
        this.error = 'Search failed. Please try again.';
        this.loading = false;
        return of({ articles: [], total_count: 0 });
      })
    ).pipe(
      switchMap(response => {
        this.loading = false;
        
        if (response && response.articles) {
          this.results = response.articles;
          this.totalResults = response.total_count || 0;
        } else if (Array.isArray(response)) {
          this.results = response;
          this.totalResults = response.length;
        } else {
          this.results = [];
          this.totalResults = 0;
        }

        return of(this.results);
      })
    );
  }

  search() {
    if (!this.query.trim()) return;
    this.searchSubject.next(this.query);
  }

  searchSuggestion(suggestion: string) {
    this.query = suggestion;
    this.search();
  }

  clearSearch() {
    this.query = '';
    this.results = [];
    this.error = null;
    this.totalResults = 0;
  }

  loadMore() {
    this.currentPage++;
    // Implementation for pagination can be added here
  }

  trackByArticleId(index: number, article: any): any {
    return article.id || index;
  }

  viewDetails(article: any) {
    // Navigate to article details or show modal
    console.log('View details for:', article);
    // You can implement navigation to article detail page here
  }
}
