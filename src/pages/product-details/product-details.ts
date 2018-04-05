import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  WooCommerce: any;
  reviews: any[] =[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toastCtrl: ToastController) {
  
    this.product = this.navParams.get("product");
    console.log(this.product);

    this.WooCommerce = WC({
      url: "http://smarthome.vishaltalks.com",
      consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
      consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b"
    });

    this.WooCommerce.getAsync('products/'+this.product.id +'/reviews').then((data) => {
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);
    }, (err) =>{
      console.log(err);
    } )
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  addToCart(product){
    this.storage.get("cart").then((data) =>{
      if(data == null || data.length == 0){

        data = [];
        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        })

      } else {
        let added = 0;

        for (let i=0; i<data.length; i++){

          if(product.id == data[i].product.id){
            console.log("Product already added!");
            let qty = data[i].qty;
            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

        }

        if(added == 0){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          })
        }
      }

      this.storage.set("cart", data).then(() => {
        console.log("Cart updated");
        console.log(data);
        this.toastCtrl.create({
          message: "Cart Updated",
          duration: 3000
        }).present();
      })

    });
  }

}
