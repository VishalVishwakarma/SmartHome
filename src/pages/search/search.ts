import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {

  searchQuery: string = "";
  WooCommerce: any;
  products: any[];
  page: number = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
  private WP: WoocommerceProvider) {
        console.log(this.navParams.get("searchQuery"));
    this.searchQuery = this.navParams.get("searchQuery");

    this.WooCommerce = WP.init();

    this.products = [];
    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then((searchData)=>{
      console.log(JSON.parse(searchData.body).products);
      this.products = JSON.parse(searchData.body).products;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

  loadMoreProducts(event){
    this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then((searchData)=>{
      console.log(JSON.parse(searchData.body).products);
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if(JSON.parse(searchData.body).products.length < 10){
        event.enable(false);

        this.toastCtrl.create({
          message: "No more products!",
          duration: 3000
        }).present();
      }

      event.complete();
      this.page ++;
    });
  }

}
