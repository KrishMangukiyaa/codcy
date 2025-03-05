import { Component } from '@angular/core';
import { CatagoryComponent } from '../catagory/catagory.component';
import { CatagorysComponent } from './catagorys/catagorys.component';
import { LatestComponent } from '../../common/latest/latest.component';
import { MainComponent } from './main/main.component';
import { CategoryBlogsComponent } from './category-blogs/category-blogs.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    MainComponent,
    CatagorysComponent,
    CategoryBlogsComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
