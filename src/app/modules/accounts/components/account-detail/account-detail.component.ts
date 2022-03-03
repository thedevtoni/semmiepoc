import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { map, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services';
import { AccountQuery, AccountStore } from 'src/app/store/account';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('lineChart')
  lineChart: ElementRef<HTMLCanvasElement>;

  account$ = this.accountQuery.selectEntity(this.accountId);

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private accountQuery: AccountQuery,
    private accountStore: AccountStore
  ) {}

  get accountId() {
    const { id } = this.route.snapshot.params;
    return id;
  }

  ngOnInit(): void {
    this.accountService
      .getAccount(this.accountId)
      .pipe(
        take(1),
        map(({ account }) => account)
      )
      .subscribe((account) =>
        this.accountStore.upsert(account.id, { ...account })
      );

    this.accountService
      .getAccountGoal(this.accountId)
      .pipe(take(1))
      .subscribe((goal) =>
        this.accountStore.upsert(this.accountId, (entity) => ({
          ...entity,
          goal,
        }))
      );
  }

  ngAfterViewInit(): void {
    this.createBarChart();
  }

  createBarChart() {
    this.accountService
      .getAccountPerformance(this.accountId)
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
