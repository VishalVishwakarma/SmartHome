import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, ModalController} from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { SearchPage } from '../search/search';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  page: number;
  moreProducts: any[];
  searchQuery: string = "";

  @ViewChild('productSlides') productSlides : Slides;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public modalCtrl: ModalController, private WP: WoocommerceProvider) {

    this.page = 1;

    this.WooCommerce = WP.init();

    this.loadMoreProducts(null);

    this.WooCommerce.getAsync("products").then((data) => {
      console.log(JSON.parse(data.body).products);
      this.products = JSON.parse(data.body).products;
    }, (err) => {
      console.log(err)
    })

  }

  ionViewDidLoad(){
    /*setInterval(() => {

      if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
        this.productSlides.slideTo(0);
      else if(this.productSlides.getActiveIndex() !== this.productSlides.length() -1)
      this.productSlides.slideNext();

      //console.log(this.productSlides.getActiveIndex());
    }, 3000)*/
  }

  loadMoreProducts(event){

    if(event == null)
    {  
      this.page = 1;
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

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product": product});
  }

  onSearch(event){
    if(this.searchQuery.length > 0){
      this.navCtrl.push(SearchPage, {"searchQuery": this.searchQuery});
    }
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }
}
