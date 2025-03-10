import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../../service/chart/chart.service';

@Component({
  selector: 'app-pi-chart',
  imports: [],
  templateUrl: './pi-chart.component.html',
  styleUrl: './pi-chart.component.scss',
})
export class PiChartComponent implements AfterViewInit {
  @ViewChild('viewsChart') viewsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('likesChart') likesChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit(): void {
    this.chartService.getChartCategoryData().subscribe(data => {
      this.createPieChart(this.viewsChartRef.nativeElement, data.labels, data.values, 'Views',data.colors);
      this.createPieChart(this.likesChartRef.nativeElement, data.labels, data.likes, 'Likes', data.colors);
    });
  }

  createPieChart(canvas: HTMLCanvasElement, labels: string[], data: number[], title: string, colors: string[]): void {
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: 'var(--theme-text)',
          borderWidth: 3,
          hoverBackgroundColor: colors,
          hoverBorderWidth: 7,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: title }
        }
      }
    });
  }
}