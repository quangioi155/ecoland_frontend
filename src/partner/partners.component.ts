import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from '../models/Student';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-Partners',
  templateUrl: './Partners.component.html',
  styleUrls: ['./Partners.component.scss'],
})
export class PartnersComponent implements OnInit {
  public Partners: Partner[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // json-server --watch db.json --port 3000
    // https://www.youtube.com/watch?v=gQZm-UJDT9I&list=PLiNjao7yG414jM-CS3qVGMvlyKU0kDOkz&index=19
    console.log(
      'Video hướng dẫn cài json-server (Fake server): https://www.youtube.com/watch?v=gQZm-UJDT9I&list=PLiNjao7yG414jM-CS3qVGMvlyKU0kDOkz&index=19'
    );
    console.log(
      'Phải cài json-server và chạy lệnh: json-server --watch db.json --port 3000'
    );
    this.loadData();
  }

  private loadData() {
    this.serverHttp.getPartners().subscribe((data) => {
      console.log('getPartners', data);
      this.Partners = data;
      this.common.setTotalPartners(data.length);
    });
  }

  public addPartner() {
    this.router.navigate(['student-form', 0]);
  }

  public deletePartner(studentId) {
    this.serverHttp.deleteStudent(studentId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }

  public editPartners(studentId) {
    this.router.navigate(['student-form', studentId]);
  }

  public sortByCode(dir) {
    if (dir === 'up') {
      this.Partners = _.orderBy(this.Partners, ['code'], ['desc']);
    } else {
      this.Partners = _.orderBy(this.Partners, ['code'], ['asc']);
    }
  }
}
