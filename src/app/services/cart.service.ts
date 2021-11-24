import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartList.push(...product);
    this.productList.next(product);
  }


  // To Add Products to cart list

  addToCart(product: any) {
    this.cartList.push(product);
    this.productList.next(this.cartList);
    this.getTotalPrice()
    console.log('cart-List', this.cartList)
  }

  // To get the price of the product

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartList.map((x: any) => {
      grandTotal += x.total;
    })
    return grandTotal;
  }

  // Remove individual product

  removeCartItem(product: any) {
    this.cartList.map((x: any, index:any)=>{
      if(product.id === x.id){
        this.cartList.splice(index, 1)
      }
    })
    this.productList.next(this.cartList);
  }

  // Remove all products

  removeAllCartItem(){
    this.cartList = [];
    this.productList.next(this.cartList)
  }


}
