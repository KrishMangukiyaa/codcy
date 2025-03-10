import { Component } from '@angular/core';
import { CatagoryComponent } from "../../catagory/catagory.component";
import { CatagorysComponent } from "../catagorys/catagorys.component";
import { CategoryBlogsComponent } from "../category-blogs/category-blogs.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [CatagorysComponent, CategoryBlogsComponent, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
