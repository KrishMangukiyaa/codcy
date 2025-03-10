import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @Input() chartData: any[] = [];
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  chartInstance!: Chart | null;

  ngOnChanges(): void {
    if (this.chartData && this.chartData.length > 0) {
      this.renderChart();
    }
  }

  renderChart(): void {
    if (!this.chartCanvas) return;

    // Destroy previous instance if exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = this.chartData.map(
      (item) => `${item._id.year}-${item._id.month}-${item._id.day}`
    );
    const viewsData = this.chartData.map((item) => item.totalViews);
    const likesData = this.chartData.map((item) => item.totalLikes);

    this.chartInstance = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total Views',
            data: viewsData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 7,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Total Likes',
            data: likesData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 7,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest', // Show tooltip for the nearest point
          intersect: false,
        },
        plugins: {
          tooltip: {
            enabled: true, // Enable tooltip
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (context.parsed.y !== null) {
                  label += `: ${context.parsed.y}`;
                }
                return label;
              },
            },
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        onHover: (event) => {
          const canvas = event?.native?.target;
          if (canvas instanceof HTMLCanvasElement) {
            canvas.style.cursor = 'crosshair';
            canvas.style.fontFamily = 'var(--title-font)';
            canvas.style.fontWeight= 'var(--title-font-weight-extra)';
            canvas.style.backgroundColor = 'transparent';
          }
        }
      },
    });
  }
}
