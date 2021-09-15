import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from '../models/product';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class productsComponent implements OnInit {
  public products: product[] = [];

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
    this.serverHttp.getproducts().subscribe((data) => {
      console.log('getproducts', data);
      this.students = data;
      this.common.setTotalproducts(data.length);
    });
  }

  public addproduct() {
    this.router.navigate(['product-form', 0]);
  }

  public deleteproduct(productId) {
    this.serverHttp.deleteproduct(productId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }

  public editproduct(studentId) {
    this.router.navigate(['product-form', productId]);
  }

  public sortByCode(dir) {
    if (dir === 'up') {
      this.products = _.orderBy(this.products, ['code'], ['desc']);
    } else {
      this.products = _.orderBy(this.products, ['code'], ['asc']);
    }
  }
}
