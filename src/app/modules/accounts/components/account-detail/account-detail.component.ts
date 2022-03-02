import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/services';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements AfterViewInit {
  @ViewChild('lineChart')
  lineChart: ElementRef<HTMLCanvasElement>;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart() {
    const { id } = this.route.snapshot.params;
    this.accountService
      .getAccountPerformance(id)
      .pipe(take(1))
      .subscribe(({ performances }) => {
        new Chart(this.lineChart.nativeElement, {
          type: 'line',
          data: {
            labels: performances.map((p) => p.value),
            datasets: [
              {
                data: performances
                  .filter((p) => p.value !== 0)
                  .map((p) => p.index),
                backgroundColor: '#0daf4b',
                borderColor: '#0daf4b',
                borderWidth: 2.4,
                pointRadius: 0,
                stepped: false,
                fill: false,
                tension: 0,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                display: false,
              },
              x: {
                display: false,
              },
            },
          },
        });
      });
  }
}
