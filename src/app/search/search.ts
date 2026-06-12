import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AddProductService } from '../services/add-product-service';
import { productType } from '../data-type';

@Component({
  selector: 'app-search',
  imports: [RouterLink],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  query : string | undefined
  products : productType[] = []
  constructor(private router : ActivatedRoute,private ps : AddProductService, private cdr: ChangeDetectorRef,private normalRounter:Router){

  }

  ngOnInit() {
  this.router.params.subscribe((params) => {
    this.query = params['query'];
    this.products = []
    this.cdr.detectChanges();
    this.ps.searchProductsButtonQuery(params['query']).subscribe((res) => {
      this.products = res;
      this.cdr.detectChanges();
    });
  });
}

sendOnDetailPage(id:string){
  this.normalRounter.navigate([`/product-detail/${id}`])
}
}
