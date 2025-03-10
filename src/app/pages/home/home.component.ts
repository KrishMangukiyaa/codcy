import { Component } from '@angular/core';
import { CatagorysComponent } from './catagorys/catagorys.component';
import { MainComponent } from './main/main.component';
import { CategoryBlogsComponent } from './category-blogs/category-blogs.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
