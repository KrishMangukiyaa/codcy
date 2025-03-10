import { Component } from '@angular/core';
import { CatagoryComponent } from "../../catagory/catagory.component";
import { CatagorysComponent } from "../catagorys/catagorys.component";
import { CategoryBlogsComponent } from "../category-blogs/category-blogs.component";

@Component({
  selector: 'app-main',
  imports: [CatagorysComponent, CategoryBlogsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
