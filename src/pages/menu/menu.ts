import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category'
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

  homePage: any;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
    public modalCtrl: ModalController, private WP: WoocommerceProvider) {
    this.homePage = HomePage
    this.categories = [];
    this.user = {};

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync("products/categories").then((data) => {
      console.log(JSON.parse(data.body).product_categories);

      let temp: any[] = JSON.parse(data.body).product_categories;

      for(let i = 0; i<temp.length; i++){
        if(temp[i].parent == 0){

          temp[i].icon = "flower";

          this.categories.push(temp[i]);
        }
      }

    },(err) => {
      console.log(err)
    }
  )

  }

  ionViewDidEnter() {
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo)=>{
        if(userLoginInfo != null){
          console.log("User Logged In");
          this.user = userLoginInfo.user;
          console.log(this.user);
          this.loggedIn = true;
        } else{
          console.log("User Logged In");
          this.user = {};
          this.loggedIn = false;
        }
      })
    })
  }

  openCategoryPage(category){

    this.childNavCtrl.push(ProductsByCategoryPage, {"category": category});

  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push(SignupPage);
    }
    if(pageName == "login"){
      this.navCtrl.push(LoginPage);
    }
    
    if (pageName == 'logout') {
      this.storage.remove("userLoginInfo").then(() => {
        this.user = {};
        this.loggedIn = false;
      })
    }
    if (pageName == 'cart') {
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }
    if (pageName == 'contact') {
      let modal = this.navCtrl.push(ContactPage);
    }

  }

}
