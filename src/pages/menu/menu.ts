import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage
    this.categories = [];

    this.WooCommerce = WC({
      url: "http://smarthome.vishaltalks.com",
      consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
      consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b"
    });

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i = 0; i<temp.length; i++){
        if(temp[i].parent == 0){

          if(temp[i].slug == "accessories"){
            temp[i].icon = "hammer";
          }
          if(temp[i].slug == "hoodies"){
            temp[i].icon = "american-football";
          }
          if(temp[i].slug == "tshirts"){
            temp[i].icon = "shirt";
          }
          if(temp[i].slug == "general"){
            temp[i].icon = "flower";
          }

          this.categories.push(temp[i]);
        }
      }

    },(err) => {
      console.log(err)
    }
  )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){

    this.childNavCtrl.push(ProductsByCategoryPage, {"category": category});

  }

}
