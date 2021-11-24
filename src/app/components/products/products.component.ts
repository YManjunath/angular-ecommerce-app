import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  constructor(
    private api: ApiService,
    private cartService: CartService
    ) { }

  ngOnInit(): void {

    this.api.getAllProducts()
    .subscribe((res)=>{
      console.log('response 11', res)
      this.productList = res;
      this.filterCategory = res

      this.productList.forEach((x: any)=> {
        if(x.category === "women's clothing" || x.category === "men's clothing") {
          x.category = 'fashion';
        }
        Object.assign(x, {quantity:1, total: x.price});
      });
    })


    /// search service 
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  addToCart(item: any){
    console.log('item', item)
    this.cartService.addToCart(item)
  }

  // filter for different categories
  filter(category: any) {
    this.filterCategory = this.productList.filter((x: any) => {
      if(x.category === category || category === ''){
          return x;
      }
    })
  }

}
