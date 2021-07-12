import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss']
})
export class PageTwoComponent implements OnInit {

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
