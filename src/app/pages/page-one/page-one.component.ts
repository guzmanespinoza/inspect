import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-one',
  templateUrl: './page-one.component.html',
  styleUrls: ['./page-one.component.scss']
})
export class PageOneComponent implements OnInit {

  dataForTable: any[] = [];
  filter: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.api.getUsers().subscribe(response => {
      console.log(response);
      this.dataForTable = response;
    });
  }
}
