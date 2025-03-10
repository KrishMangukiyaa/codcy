import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../../service/chart/chart.service';
import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../common/header/header.component";
import { LatestComponent } from "../../../common/latest/latest.component";
import { PiChartComponent } from "../../../common/pi-chart/pi-chart.component";
import { UsersTableComponent } from "./users-table/users-table.component";

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [ChartComponent, CommonModule, PiChartComponent, UsersTableComponent],
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {
  chartData: any[] = [];
  categoryViewsData: { labels: string[]; values: number[] } = { labels: [], values: [] };
  categoryLikesData: { labels: string[]; values: number[] } = { labels: [], values: [] };

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.chartService.getAllChartData().subscribe(
      (data) => {
        this.chartData = data;
      },
      (error) => console.error("Error fetching all chart data:", error)
    );

    this.chartService.getChartCategoryData().subscribe(
      (data) => {
        console.log("Processed Data:", data);

        if (data?.labels?.length > 0) {
          this.categoryViewsData = {
            labels: data.labels,
            values: data.values || []
          };

          this.categoryLikesData = {
            labels: data.labels,
            values: data.likes || []
          };
        }

        console.log("Views Data:", this.categoryViewsData);
        console.log("Likes Data:", this.categoryLikesData);
      },
      (error) => console.error("Error fetching category chart data:", error)
    );
  }
}
