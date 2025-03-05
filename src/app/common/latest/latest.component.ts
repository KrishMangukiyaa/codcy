import { Component, OnInit } from '@angular/core';
import { LatestService } from '../../service/latest/latest.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-latest',
  imports: [CommonModule],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent implements OnInit{

  latestViews: any[] = [];

  constructor(private latestService: LatestService) {}

  ngOnInit(): void {
    this.latestService.getLatestViewed().subscribe((data) => {
      this.latestViews = data;
      // console.log(this.latestViews)
    });
  }
}
