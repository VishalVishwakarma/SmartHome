import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  page: number;
  moreProducts: any[];

  @ViewChild('productSlides') productSlides : Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

    this.page = 2;

    this.WooCommerce = WC({
      url: "http://smarthome.vishaltalks.com",
      consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
      consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b"
    });

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then((data) => {
      
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    setInterval(() => {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);
      else if(this.productSlides.getActiveIndex() !== this.productSlides.length() -1)
      this.productSlides.slideNext();

      //console.log(this.productSlides.getActiveIndex());
    }, 3000)
  }

  loadMoreProducts(event){

    if(event == null)
    {  
      this.page = 2;
      this.moreProducts = [];
    }
    else 
      this.page ++;

    this.WooCommerce.getAsync("products?page=" + this.page).then((data) => {
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if (event != null)
      {
        event.complete();
      }

      if(JSON.parse(data.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 3000
        }).present();
      }

     

    }, (err) => {
      console.log(err)
    })
  }

}
