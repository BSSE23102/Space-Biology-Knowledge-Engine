import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesListComponent } from './features/articles/articles-list.component';
import { SearchComponent } from './features/search/search.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar.component';
import { HeroComponent } from './shared/hero/hero.component';

@NgModule({
  // No declarations needed; all components are standalone
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NavbarComponent,
    DashboardComponent,
    ArticlesListComponent,
    SearchComponent,
    FooterComponent,
    HeroComponent
  ],
  providers: [],
})
export class AppModule {}
