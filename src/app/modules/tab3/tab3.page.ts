import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IMAGES } from 'src/app/contants/images';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  items$ = this.http
    .get<any[]>('https://jsonplaceholder.typicode.com/photos')
    .pipe(tap(console.log));

  constructor(private http: HttpClient) {}
}
