webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(181);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CartPage = /** @class */ (function () {
    function CartPage(navCtrl, navParams, storage, viewCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.cartItems = [];
        this.showEmptyCartMessage = false;
        this.total = 0.0;
        this.storage.ready().then(function () {
            _this.storage.get("cart").then(function (data) {
                _this.cartItems = data;
                console.log(_this.cartItems);
                if (_this.cartItems.length > 0) {
                    _this.cartItems.forEach(function (item, index) {
                        if (item.variation) {
                            _this.total = _this.total + (parseFloat(item.variation.price) * item.qty);
                        }
                        else {
                            _this.total = _this.total + (item.product.price * item.qty);
                        }
                    });
                }
                else {
                    _this.showEmptyCartMessage = true;
                }
            });
        });
    }
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
    };
    CartPage.prototype.removeFromCart = function (item, i) {
        var _this = this;
        var price;
        if (item.variation) {
            price = item.variation.price;
        }
        else {
            price = item.product.price;
        }
        var qty = item.qty;
        this.cartItems.splice(i, 1);
        this.storage.set("cart", this.cartItems).then(function () {
            _this.total = _this.total - (price * qty);
        });
        if (this.cartItems.length == 0) {
            this.showEmptyCartMessage = true;
        }
    };
    CartPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CartPage.prototype.checkout = function () {
        var _this = this;
        this.storage.get("userLoginInfo").then(function (data) {
            if (data != null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */]);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */], { next: __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */] });
            }
        });
    };
    CartPage.prototype.changeQty = function (item, i, change) {
        var _this = this;
        var price;
        if (!item.variation) {
            price = item.product.price;
        }
        else {
            price = parseFloat(item.variation.price);
        }
        var qty = item.qty;
        if (change < 0 && item.qty == 1) {
            return;
        }
        qty = qty + change;
        item.qty = qty;
        item.amount = qty * price;
        item.price = price;
        this.cartItems[i] = item;
        this.storage.set("cart", this.cartItems).then(function () {
            if (change > 0) {
                _this.total = _this.total + item.price;
            }
            else {
                _this.total = _this.total - item.price;
            }
            _this.toastCtrl.create({
                message: "Cart Updated.",
                duration: 2000,
                showCloseButton: true
            }).present();
        });
    };
    CartPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\cart\cart.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Your Cart</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-card>\n    <ion-grid>\n      <ion-row>\n        <ion-col>Your Cart Description</ion-col>\n      </ion-row>\n      <ion-row [hidden]="!showEmptyCartMessage">\n        <ion-col>There are no products in your cart!</ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <ion-card *ngFor="let item of cartItems; let i = index">\n    <ion-item color="light">\n      <ion-thumbnail item-left>\n        <img [src]="item.product.featured_src" style="width: 60px !important; height: 60px !important;"/>\n      </ion-thumbnail>\n\n      <h2>\n        {{ item.product.title }}\n      </h2>\n      <p *ngIf="item.variation"><span *ngFor="let att of item.variation.attributes">{{ att.option | titlecase }} &nbsp; </span></p>\n      <p>\n        Quantity: {{item.qty}} Price: \n        <span *ngIf="!item.variation">{{ item.product.price }}</span>\n        <span *ngIf="item.variation">{{ item.variation.price }}</span>\n      </p>\n    </ion-item>\n\n    <ion-item class="compact">\n      <ion-row no-padding>\n        <ion-col col-8>\n          <button ion-button icon-only clear color="danger" (click)="changeQty(item, i, -1)">\n            <ion-icon name="remove-circle"></ion-icon>\n          </button>\n          <button ion-button icon-only clear color="danger">\n              {{ item.qty }}\n          </button>\n          <button ion-button icon-only clear color="danger" (click)="changeQty(item, i, 1)">\n              <ion-icon name="add-circle"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col col-4 style="text-align: right; display: flex!important; align-content: center!important; align-items: center!important;">\n          <button ion-button small outline (click)="removeFromCart(item, i)" color="danger" style="width: 64px;">Remove</button>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n  </ion-card>\n\n  <ion-grid>\n    <ion-card>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n\n          </ion-col>\n          <ion-col col-4>\n            <b>TOTAL</b>\n          </ion-col>\n          <ion-col col-3>\n            \n          </ion-col>\n          <ion-col col-3 style="text-align: right;">\n            <b> {{ total }} </b>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button outline block (click)="closeModal()">Back</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="danger" block (click)="checkout()">Checkout</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\cart\cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], CartPage);
    return CartPage;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, toastCtrl, storage, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.username = "";
        this.password = "";
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        this.http.get("http://smarthome.vishaltalks.com/api/auth/generate_auth_cookie/?insecure=cool&username="
            + this.username + "&password=" + this.password).subscribe(function (res) {
            console.log(res.json());
            var response = res.json();
            if (response.error) {
                _this.toastCtrl.create({
                    message: response.error,
                    duration: 3000
                }).present();
                return;
            }
            _this.storage.set("userLoginInfo", response).then(function (data) {
                _this.alertCtrl.create({
                    title: "Login Successful",
                    message: "You have been logged in successfully",
                    buttons: [{
                            text: "OK",
                            handler: function () {
                                if (_this.navParams.get("next")) {
                                    _this.navCtrl.push(_this.navParams.get("next"));
                                }
                                else {
                                    _this.navCtrl.pop();
                                }
                            }
                        }]
                }).present();
            });
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\login\login.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card style="margin: 0px; border: none; width: 100%;">\n    <img src="https://vishaltalks.com/wp-content/uploads/2018/01/vishaltalksLogo-35px.png" style="width:70%; margin:auto; padding: 20px;" />\n  </ion-card>\n\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input type="text" [(ngModel)]="username"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </ion-list>\n    <button ion-button block (click)="login()">Login</button>\n    <button ion-button clear block color="danger">No Account? Sign Up Here</button>\n</ion-content>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 231:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 231;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Menu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__products_by_category_products_by_category__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_woocommerce_woocommerce__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__contact_contact__ = __webpack_require__(341);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var Menu = /** @class */ (function () {
    function Menu(navCtrl, navParams, storage, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.categories = [];
        this.user = {};
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            console.log(JSON.parse(data.body).product_categories);
            var temp = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].parent == 0) {
                    temp[i].icon = "flower";
                    _this.categories.push(temp[i]);
                }
            }
        }, function (err) {
            console.log(err);
        });
    }
    Menu.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    console.log("User Logged In");
                    _this.user = userLoginInfo.user;
                    console.log(_this.user);
                    _this.loggedIn = true;
                }
                else {
                    console.log("User Logged In");
                    _this.user = {};
                    _this.loggedIn = false;
                }
            });
        });
    };
    Menu.prototype.openCategoryPage = function (category) {
        this.childNavCtrl.push(__WEBPACK_IMPORTED_MODULE_5__products_by_category_products_by_category__["a" /* ProductsByCategoryPage */], { "category": category });
    };
    Menu.prototype.openPage = function (pageName) {
        var _this = this;
        if (pageName == "signup") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
        }
        if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
        if (pageName == 'logout') {
            this.storage.remove("userLoginInfo").then(function () {
                _this.user = {};
                _this.loggedIn = false;
            });
        }
        if (pageName == 'cart') {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__cart_cart__["a" /* CartPage */]);
            modal.present();
        }
        if (pageName == 'contact') {
            var modal = this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__contact_contact__["a" /* ContactPage */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], Menu.prototype, "childNavCtrl", void 0);
    Menu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="card-background-page">\n\n    <ion-card no-margin>\n      <img src="http://smarthome.vishaltalks.com/wp-content/uploads/2018/04/Hardware-Store.jpg"/>\n      <div class="card-title">SMART HOME</div>\n      <div class="card-subtitle">YOUR HOME HARDWARE</div>\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let category of categories" text-wrap (click)="openCategoryPage(category)" menuClose>\n        <ion-icon [name]="category.icon" item-left large></ion-icon>\n        <h2>{{ category.name }}</h2>\n        <p>{{ category.description }}</p>\n      </ion-item>\n\n      <ion-item-divider color="danger">Account</ion-item-divider>\n\n      <ion-item (click)="openPage(\'signup\')" menuClose *ngIf="!loggedIn">\n        <ion-icon name="md-clipboard" item-left large></ion-icon>\n        <h2>Sign up</h2>\n        <p>For a new account</p>\n      </ion-item>\n\n      <ion-item (click)="openPage(\'login\')" menuClose *ngIf="!loggedIn">\n        <ion-icon name="log-in" item-left large></ion-icon>\n        <h2>Login</h2>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" menuClose>\n        <ion-icon name="contact" item-left large></ion-icon>\n        <h2>{{ (this.user.firstname == \'\' ? this.user.username : this.user.firstname) || "" }}</h2>\n        <p>{{ this.user.email }}</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'cart\')" menuClose>\n        <ion-icon name="cart" item-left large></ion-icon>\n        <h2>Your Cart</h2>\n        <p>Check items in your cart</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'logout\')" menuClose>\n        <ion-icon name="log-out" item-left large></ion-icon>\n        <h2>Logout</h2>\n        <p>of your Account</p>\n      </ion-item>\n\n      <ion-item (click)="openPage(\'contact\')" menuClose>\n        <ion-icon name="mail" item-left large></ion-icon>\n        <h2>Contact</h2>\n        <p>For queries now</p>\n      </ion-item>\n\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav #content [root]="homePage"></ion-nav>'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], Menu);
    return Menu;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCtrl, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.searchQuery = "";
        this.page = 1;
        this.WooCommerce = WP.init();
        this.loadMoreProducts(null);
        this.WooCommerce.getAsync("products").then(function (data) {
            console.log(JSON.parse(data.body).products);
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        /*setInterval(() => {
    
          if(this.productSlides.getActiveIndex() == this.productSlides.length() -1)
            this.productSlides.slideTo(0);
          else if(this.productSlides.getActiveIndex() !== this.productSlides.length() -1)
          this.productSlides.slideNext();
    
          //console.log(this.productSlides.getActiveIndex());
        }, 3000)*/
    };
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        if (event == null) {
            this.page = 1;
            this.moreProducts = [];
        }
        else
            this.page++;
        this.WooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body).products);
            if (event != null) {
                event.complete();
            }
            if (JSON.parse(data.body).products.length < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "No more products!",
                    duration: 3000
                }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    HomePage.prototype.onSearch = function (event) {
        if (this.searchQuery.length > 0) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* SearchPage */], { "searchQuery": this.searchQuery });
        }
    };
    HomePage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]).present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('productSlides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], HomePage.prototype, "productSlides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Home</ion-title>\n    \n    <ion-buttons right>\n      <button ion-button clear (click)="openCart()" style="padding-right: 15px;">\n        <ion-icon name="cart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-toolbar color="danger">\n    <ion-searchbar [(ngModel)]="searchQuery" (search)="onSearch($event)"></ion-searchbar>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-card>\n   <ion-slides autoplay="3000" pager>\n      <ion-slide *ngFor="let number of [2,3,4]">\n        <img src="http://smarthome.vishaltalks.com/wp-content/uploads/2018/04/{{number}}.jpg"/>\n      </ion-slide>           \n    </ion-slides>\n  </ion-card>\n\n  <img style="margin-top: 10px;" src="http://smarthome.vishaltalks.com/wp-content/uploads/2018/04/banner.jpg" />\n\n  <ion-list>\n    <ion-item *ngFor="let product of moreProducts" text-wrap (click)="openProductPage(product)">\n        <ion-thumbnail item-left>\n          <img [src]="product.featured_src" />\n        </ion-thumbnail>\n        <h2>{{ product.title }}</h2>\n        <p>\n          <span [innerHTML]="product.short_description.substr(0,50) + \'...\'"></span>\n          <span [innerHTML]="product.price_html"></span>\n        </p>\n\n        <button ion-button icon clear item-right>\n          <ion-icon name="arrow-forward"></ion-icon>\n        </button>\n    </ion-item>\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n    <ion-infinite-scroll-content>\n\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(navCtrl, navParams, storage, alertCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.WP = WP;
        this.newOrder = {};
        this.newOrder.billing = {};
        this.newOrder.shipping = {};
        this.billing_shipping_same = false;
        this.paymentMethods = [
            { method_id: "bacs", method_title: "Direct Bank Transfer" },
            { method_id: "cheque", method_title: "Cheque" },
            { method_id: "cod", method_title: "Cash on Delivery" },
            { method_id: "paypal", method_title: "Paypal" }
        ];
        this.WooCommerce = WP.init(true);
        this.storage.get("userLoginInfo").then(function (userLoginInfo) {
            _this.userInfo = userLoginInfo.user;
            var email = userLoginInfo.user.email;
            var id = userLoginInfo.user.id;
            _this.WooCommerce.getAsync("customers/" + id).then(function (data) {
                _this.newOrder = JSON.parse(data.body);
            });
        });
    }
    CheckoutPage.prototype.setBillingShippingSame = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newOrder.shipping = this.newOrder.billing;
        }
    };
    CheckoutPage.prototype.placeOrder = function () {
        var _this = this;
        var orderItems = [];
        var data = {};
        var paymentData = {};
        this.paymentMethods.forEach(function (element, index) {
            if (element.method_id == _this.paymentMethod) {
                paymentData = element;
            }
        });
        data = {
            payment_method: paymentData.method_id,
            payment_method_title: paymentData.method_title,
            billing: this.newOrder.billing,
            shipping: this.newOrder.shipping,
            customer_id: this.userInfo.id || '',
            line_items: orderItems,
            status: "processing"
        };
        if (paymentData.method_id == "paypal") {
        }
        else {
            this.storage.get("cart").then(function (cart) {
                cart.forEach(function (element, index) {
                    if (element.variation) {
                        orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                        ///total = total + (element.variation.price * element.qty);
                    }
                    else {
                        orderItems.push({ product_id: element.product.id, quantity: element.qty });
                        ///total = total + (element.product.price * element.qty);
                    }
                });
                data.line_items = orderItems;
                var orderData = {};
                orderData.order = data;
                _this.WooCommerce.postAsync("orders", orderData.order).then(function (data) {
                    var response = (JSON.parse(data.body));
                    _this.alertCtrl.create({
                        title: "Order Placed Successfully",
                        message: "Your order has been placed successfully. Your order number is " + response.number,
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                            }]
                    }).present();
                    data = [];
                    _this.storage.set("cart", data);
                });
            });
        }
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\checkout\checkout.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Checkout</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    <ion-list>\n        <ion-item-divider color="danger">Personal Details</ion-item-divider>\n        <ion-item>\n          <ion-label>First Name</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.billing.first_name"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Last Name</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.billing.last_name"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Email</ion-label>\n          <ion-input readonly type="email" [(ngModel)]="newOrder.email"></ion-input>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Username</ion-label>\n          <ion-input readonly type="text" [(ngModel)]="newOrder.username"></ion-input>\n        </ion-item>\n  \n        <ion-item-divider color="danger">Billing Details</ion-item-divider>\n  \n        <ion-item>\n          <ion-label>Address Line 1</ion-label>\n          <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing.address_1"></ion-textarea>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Address Line 2</ion-label>\n          <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing.address_2"></ion-textarea>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Country</ion-label>\n          <ion-select [(ngModel)]="newOrder.billing.country">\n            <ion-option value="India" selected="true">India</ion-option>\n          </ion-select>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>State</ion-label>\n          <ion-select [(ngModel)]="newOrder.billing.state">\n            <ion-option value="New Delhi">New Delhi</ion-option>\n            <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n            <ion-option value="Maharashtra">Maharashtra</ion-option>\n            <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n            <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n          </ion-select>\n        </ion-item>\n  \n        <ion-item>\n          <ion-label>City</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.billing.city"></ion-input>        \n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Postal Code</ion-label>\n          <ion-input type="number" clearInput [(ngModel)]="newOrder.billing.postcode"></ion-input>        \n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Phone</ion-label>\n          <ion-input type="tel" clearInput [(ngModel)]="newOrder.billing.phone"></ion-input>        \n        </ion-item>\n  \n        <ion-item>\n          <ion-label>Same Shipping Details</ion-label>\n          <ion-checkbox (ionChange)="setBillingShippingSame()"></ion-checkbox>\n        </ion-item>\n  \n        <ion-item-divider color="danger" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n        \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>First Name</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.shipping.first_name"></ion-input>\n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Last Name</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.shipping.last_name"></ion-input>\n        </ion-item>\n        \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Address Line 1</ion-label>\n          <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping.address_1"></ion-textarea>\n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Address Line 2</ion-label>\n          <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping.address_2"></ion-textarea>\n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Country</ion-label>\n          <ion-select [(ngModel)]="newOrder.shipping.country">\n            <ion-option value="India" selected="true">India</ion-option>\n          </ion-select>\n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>State</ion-label>\n          <ion-select [(ngModel)]="newOrder.shipping.state">\n            <ion-option value="New Delhi">New Delhi</ion-option>\n            <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n            <ion-option value="Maharashtra">Maharashtra</ion-option>\n            <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n            <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n          </ion-select>\n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>City</ion-label>\n          <ion-input type="text" [(ngModel)]="newOrder.shipping.city"></ion-input>        \n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Postal Code</ion-label>\n          <ion-input type="number" clearInput [(ngModel)]="newOrder.shipping.postcode"></ion-input>        \n        </ion-item>\n  \n        <ion-item *ngIf="!billing_shipping_same">\n          <ion-label>Phone</ion-label>\n          <ion-input type="tel" clearInput [(ngModel)]="newOrder.shipping.phone"></ion-input>        \n        </ion-item>\n  \n        <ion-item-divider color="danger">Payment Details</ion-item-divider>\n  \n        <ion-item>\n          <ion-label>Payment Method</ion-label>\n          <ion-select [(ngModel)]="paymentMethod">\n            <ion-option *ngFor="let p of paymentMethods" value="{{p.method_id}}">{{ p.method_title }}</ion-option>\n          </ion-select>\n        </ion-item>\n  \n      </ion-list>\n\n</ion-content>\n<ion-footer>\n  <button ion-button block color="danger" (click)="placeOrder()">Place Order</button>\n</ion-footer>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\checkout\checkout.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]) === "function" && _e || Object])
    ], CheckoutPage);
    return CheckoutPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, toastCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.WP = WP;
        this.searchQuery = "";
        this.page = 2;
        console.log(this.navParams.get("searchQuery"));
        this.searchQuery = this.navParams.get("searchQuery");
        this.WooCommerce = WP.init();
        this.products = [];
        this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then(function (searchData) {
            console.log(JSON.parse(searchData.body).products);
            _this.products = JSON.parse(searchData.body).products;
        });
    }
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    SearchPage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then(function (searchData) {
            console.log(JSON.parse(searchData.body).products);
            _this.products = _this.products.concat(JSON.parse(searchData.body).products);
            if (JSON.parse(searchData.body).products.length < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "No more products!",
                    duration: 3000
                }).present();
            }
            event.complete();
            _this.page++;
        });
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\search\search.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Search: {{ searchQuery }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let product of products" text-wrap  (click)="openProductPage(product)">\n      <ion-thumbnail item-left>\n        <img [src]="product.featured_src" />\n      </ion-thumbnail>\n\n      <h2> {{ product.title }} </h2>\n\n      <p>\n        <span [innerHTML]="product.short_description.substr(0, 50) + \'...\'"></span>\n        <span [innerHTML]="product.price_html"></span>\n        <span *ngIf="product.average_rating >= 1">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 2">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 3">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 4">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 5">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n      </p>\n\n      <button ion-button icon clear item-right>\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\search\search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, toastCtrl, alertCtrl, WP) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.WP = WP;
        this.newUser = {};
        this.newUser.billing_address = {};
        this.newUser.shipping_address = {};
        this.billing_shipping_same = false;
        this.WooCommerce = WP.init();
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newUser.shipping_address = this.newUser.billing_address;
        }
    };
    SignupPage.prototype.checkEmail = function () {
        var _this = this;
        var validEmail = false;
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.newUser.email)) {
            //email looks valid
            this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then(function (data) {
                var res = (JSON.parse(data.body));
                if (res.errors) {
                    validEmail = true;
                    _this.toastCtrl.create({
                        message: "Congratulations, email is valid!",
                        duration: 3000
                    }).present();
                }
                else {
                    validEmail = false;
                    _this.toastCtrl.create({
                        message: "Email already registered. Please check.",
                        showCloseButton: true
                    }).present();
                }
                console.log(validEmail);
            });
        }
        else {
            validEmail = false;
            this.toastCtrl.create({
                message: "Invalid email. Please check.",
                showCloseButton: true
            }).present();
            console.log(validEmail);
        }
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var customerData = {
            customer: {}
        };
        customerData.customer = {
            "email": this.newUser.email,
            "first_name": this.newUser.first_name,
            "last_name": this.newUser.last_name,
            "username": this.newUser.username,
            "password": this.newUser.password,
            "billing_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "company": "",
                "address_1": this.newUser.billing_address.address_1,
                "address_2": this.newUser.billing_address.address_2,
                "city": this.newUser.billing_address.city,
                "state": this.newUser.billing_address.state,
                "postcode": this.newUser.billing_address.postcode,
                "country": this.newUser.billing_address.country,
                "email": this.newUser.email,
                "phone": this.newUser.billing_address.phone
            },
            "shipping_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "company": "",
                "address_1": this.newUser.shipping_address.address_1,
                "address_2": this.newUser.shipping_address.address_2,
                "city": this.newUser.shipping_address.city,
                "state": this.newUser.shipping_address.state,
                "postcode": this.newUser.shipping_address.postcode,
                "country": this.newUser.shipping_address.country
            }
        };
        this.WooCommerce.postAsync('customers', customerData).then(function (data) {
            var response = (JSON.parse(data.body));
            if (response.customer) {
                _this.alertCtrl.create({
                    title: "Account Created",
                    message: "Your account has been created successfully. Please login to proceed.",
                    buttons: [{
                            text: "Login",
                            handler: function () {
                                //TODO
                            }
                        }]
                }).present();
            }
            else if (response.errors) {
                _this.toastCtrl.create({
                    message: response.errors[0].message,
                    showCloseButton: true
                }).present();
            }
        });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\signup\signup.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Signup</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item-divider color="danger">Personal Details</ion-item-divider>\n    <ion-item> \n      <ion-label>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.first_name"></ion-input>\n    </ion-item>\n    <ion-item> \n        <ion-label>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newUser.last_name"></ion-input>\n    </ion-item>\n    <ion-item> \n          <ion-label>Email</ion-label>\n          <ion-input type="email" [(ngModel)]="newUser.email" (blur)="checkEmail()"></ion-input>\n    </ion-item>\n    <ion-item> \n          <ion-label>Username</ion-label>\n          <ion-input type="text" [(ngModel)]="newUser.username"></ion-input>\n    </ion-item>\n    <ion-item> \n        <ion-label>Password</ion-label>\n        <ion-input type="password" [(ngModel)]="newUser.password"></ion-input>\n    </ion-item>\n    <ion-item> \n      <ion-label>Confirm Password</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.confirm_password"></ion-input>\n    </ion-item>\n    <ion-item-divider color="danger">Billing Details</ion-item-divider>\n    <ion-item> \n      <ion-label>Address Line 1</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_1"></ion-textarea>\n    </ion-item>\n    <ion-item> \n      <ion-label>Address Line 2</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_2"></ion-textarea>\n    </ion-item>\n    <ion-item> \n      <ion-label>City</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.billing_address.city"></ion-input>\n    </ion-item>\n    <ion-item> \n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newUser.billing_address.country">\n        <ion-option value="India" selected="true">India</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item> \n      <ion-label>State</ion-label>\n      <ion-select [(ngModel)]="newUser.billing_address.state">\n        <ion-option value="maharashtra" selected="true">Maharashtra</ion-option>\n        <ion-option value="tamil-nadu">Tamil Nadu</ion-option>\n        <ion-option value="gujarat">Gujarat</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item> \n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newUser.billing_address.postcode"></ion-input>\n    </ion-item>\n    <ion-item> \n      <ion-label>Phone Number</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newUser.billing_address.phone"></ion-input>\n    </ion-item>\n    <ion-item> \n      <ion-label>Same Shipping Details</ion-label>\n      <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n    </ion-item>\n\n\n    <ion-item-divider *ngIf="!billing_shipping_same" color="danger">Shipping Details</ion-item-divider>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>Address Line 1</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_1"></ion-textarea>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>Address Line 2</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_2"></ion-textarea>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>City</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.shipping_address.city"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newUser.shipping_address.country">\n        <ion-option value="India" selected="true">India</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same">  \n      <ion-label>State</ion-label>\n      <ion-select [(ngModel)]="newUser.shipping_address.state">\n        <ion-option value="maharashtra">Maharashtra</ion-option>\n        <ion-option value="tamil-nadu">Tamil Nadu</ion-option>\n        <ion-option value="gujarat">Gujarat</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newUser.shipping_address.postcode"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same"> \n      <ion-label>Phone Number</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newUser.shipping_address.phone"></ion-input>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer padding>\n  <button ion-button block color="danger" (click)="signup()">Sign Up</button>\n</ion-footer>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsByCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductsByCategoryPage = /** @class */ (function () {
    function ProductsByCategoryPage(navCtrl, navParams, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.WP = WP;
        this.page = 1;
        this.category = this.navParams.get("category");
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then(function (data) {
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    ProductsByCategoryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductsByCategoryPage');
    };
    ProductsByCategoryPage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.page++;
        console.log("Getting page" + this.page);
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then(function (data) {
            var temp = (JSON.parse(data.body).products);
            _this.products = _this.products.concat(JSON.parse(data.body).products);
            console.log(_this.products);
            event.complete();
            if (temp.length < 10)
                event.enable(false);
        });
    };
    ProductsByCategoryPage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    ProductsByCategoryPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-products-by-category',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\products-by-category\products-by-category.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons left>\n      <button color="danger" ion-button icon menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Products by Category</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n        <ion-item *ngFor="let product of products" text-wrap (click)="openProductPage(product)">\n            <ion-thumbnail item-left>\n              <img [src]="product.featured_src" />\n            </ion-thumbnail>\n            <h2>{{ product.title }}</h2>\n            <p>\n              <span [innerHTML]="product.short_description.substr(0,50) + \'...\'"></span>\n              <span [innerHTML]="product.price_html"></span>\n            </p>\n    \n            <button ion-button icon clear item-right>\n              <ion-icon name="arrow-forward"></ion-icon>\n            </button>\n        </ion-item>\n      </ion-list>\n\n      <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n        <ion-infinite-scroll-content>\n        </ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\products-by-category\products-by-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], ProductsByCategoryPage);
    return ProductsByCategoryPage;
}());

//# sourceMappingURL=products-by-category.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = /** @class */ (function () {
    function ContactPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactPage');
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Contact Us</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n    <iframe src="http://smarthome.vishaltalks.com/engineer/" style="height: 100%; width: 100%">\n    </iframe>\n\n</ion-content>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\contact\contact.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(365);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_search_search__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_contact_contact__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_http__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* Menu */],
                __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_contact_contact__["a" /* ContactPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_17__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* Menu */],
                __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetailsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_contact_contact__["a" /* ContactPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* Menu */];
        this.initializeApp();
    }
    ;
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 434:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 436:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 469:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WoocommerceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_woocommerce_api__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WoocommerceProvider = /** @class */ (function () {
    function WoocommerceProvider() {
        this.WooCommerce = __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__({
            url: "http://smarthome.vishaltalks.com",
            consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
            consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b"
        });
        this.WooCommerceV2 = __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__({
            url: "http://smarthome.vishaltalks.com",
            consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
            consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b",
            wpAPI: true,
            version: "wc/v2"
        });
    }
    WoocommerceProvider.prototype.init = function (v2) {
        if (v2 == true) {
            return this.WooCommerceV2;
        }
        else {
            return this.WooCommerce;
        }
    };
    WoocommerceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WoocommerceProvider);
    return WoocommerceProvider;
}());

//# sourceMappingURL=woocommerce.js.map

/***/ }),

/***/ 470:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 537:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ProductDetailsPage = /** @class */ (function () {
    function ProductDetailsPage(navCtrl, navParams, storage, toastCtrl, modalCtrl, loadingCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.WP = WP;
        this.reviews = [];
        this.selectedOptions = {};
        this.requireOptions = true;
        this.productVariations = [];
        this.productPrice = 0.0;
        this.product = this.navParams.get("product");
        console.log(this.product);
        this.WooCommerce = WP.init(true);
        this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then(function (data) {
            _this.reviews = JSON.parse(data.body);
            console.log(_this.reviews);
        }, function (err) {
            console.log(err);
        });
        //counting variation attributes options
        var count_ = 0;
        for (var index = 0; index < this.product.attributes.length; index++) {
            if (this.product.attributes[index].variation)
                count_++;
        }
        if (count_ == 0) {
            this.requireOptions = false;
        }
        if (this.product.variations.length == 0) {
            this.productPrice = this.product.price;
        }
    }
    ProductDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductDetailsPage');
    };
    ProductDetailsPage.prototype.addToCart = function (product) {
        var _this = this;
        //counting selected attribute options
        var count = 0;
        for (var k in this.selectedOptions)
            if (this.selectedOptions.hasOwnProperty(k))
                count++;
        //counting variation attributes options
        var count_ = 0;
        for (var index = 0; index < this.product.attributes.length; index++) {
            if (this.product.attributes[index].variation)
                count_++;
        }
        //checking if user selected all the variation options or not
        if (count_ != count || this.requireOptions) {
            this.toastCtrl.create({
                message: "Select Product Options",
                duration: 2000,
                showCloseButton: true
            }).present();
            return;
        }
        this.storage.get("cart").then(function (data) {
            if (data == undefined || data.length == 0) {
                data = [];
                data.push({
                    "product": product,
                    "qty": 1,
                    "amount": parseFloat(product.price)
                });
                if (_this.selectedVariation) {
                    data[0].variation = _this.selectedVariation;
                    data[0].amount = parseFloat(_this.selectedVariation.price);
                }
            }
            else {
                var alreadyAdded = false;
                var alreadyAddedIndex = -1;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].product.id == product.id) {
                        if (_this.productVariations.length > 0) {
                            if (data[i].variation.id == _this.selectedVariation.id) {
                                alreadyAdded = true;
                                alreadyAddedIndex = i;
                                break;
                            }
                        }
                        else {
                            alreadyAdded = true;
                            alreadyAddedIndex = i;
                            break;
                        }
                    }
                }
                if (alreadyAdded == true) {
                    if (_this.selectedVariation) {
                        data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + 1;
                        data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + parseFloat(_this.selectedVariation.price);
                        data[alreadyAddedIndex].variation = _this.selectedVariation;
                    }
                    else {
                        data[alreadyAddedIndex].qty = parseFloat(data[alreadyAddedIndex].qty) + 1;
                        data[alreadyAddedIndex].amount = parseFloat(data[alreadyAddedIndex].amount) + parseFloat(data[alreadyAddedIndex].product.price);
                    }
                }
                else {
                    if (_this.selectedVariation) {
                        data.push({
                            product: product,
                            qty: 1,
                            amount: parseFloat(_this.selectedVariation.price),
                            variation: _this.selectedVariation
                        });
                    }
                    else {
                        data.push({
                            product: product,
                            qty: 1,
                            amount: parseFloat(product.price)
                        });
                    }
                }
            }
            _this.storage.set("cart", data).then(function () {
                console.log("Cart updated");
                console.log(data);
                _this.toastCtrl.create({
                    message: "Cart Updated",
                    duration: 3000
                }).present();
            });
        });
    };
    ProductDetailsPage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* CartPage */]).present();
    };
    ProductDetailsPage.prototype.check = function (justSelectedAttribute) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var loading, count, k, count_, index, _a, _b, _c, i, matchFailed, key, j;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        loading = this.loadingCtrl.create({
                            content: "Getting Product Variations"
                        });
                        count = 0;
                        for (k in this.selectedOptions)
                            if (this.selectedOptions.hasOwnProperty(k))
                                count++;
                        count_ = 0;
                        for (index = 0; index < this.product.attributes.length; index++) {
                            if (this.product.attributes[index].variation)
                                count_++;
                        }
                        if (!(count_ != count)) return [3 /*break*/, 1];
                        this.requireOptions = true;
                        return [2 /*return*/];
                    case 1:
                        this.requireOptions = false;
                        //Get product variations only once when all product variables are selected by the user
                        loading.present();
                        _a = this;
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, this.WooCommerce.getAsync('products/' + this.product.id + '/variations/')];
                    case 2:
                        _a.productVariations = _c.apply(_b, [(_d.sent()).body]);
                        console.log(this.productVariations);
                        _d.label = 3;
                    case 3:
                        i = 0, matchFailed = false;
                        if (this.productVariations.length > 0) {
                            for (i = 0; i < this.productVariations.length; i++) {
                                matchFailed = false;
                                key = "";
                                for (j = 0; j < this.productVariations[i].attributes.length; j++) {
                                    key = this.productVariations[i].attributes[j].name;
                                    console.log(this.selectedOptions[key].toLowerCase() + " " + this.productVariations[i].attributes[j].option.toLowerCase());
                                    if (this.selectedOptions[key].toLowerCase() == this.productVariations[i].attributes[j].option.toLowerCase()) {
                                        //Do nothing
                                    }
                                    else {
                                        console.log(matchFailed);
                                        matchFailed = true;
                                        break;
                                    }
                                }
                                if (matchFailed) {
                                    continue;
                                }
                                else {
                                    //found the matching variation
                                    //console.log(productVariations[i])
                                    this.productPrice = this.productVariations[i].price;
                                    this.selectedVariation = this.productVariations[i];
                                    console.log(this.selectedVariation);
                                    break;
                                }
                            }
                            if (matchFailed == true) {
                                this.toastCtrl.create({
                                    message: "No Such Product Found",
                                    duration: 3000
                                }).present().then(function () {
                                    _this.requireOptions = true;
                                });
                            }
                        }
                        else {
                            this.productPrice = this.product.price;
                        }
                        loading.dismiss();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-details',template:/*ion-inline-start:"F:\Code Decode\GitHub\SmartHome\src\pages\product-details\product-details.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ product.title }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n\n  <ion-fab right top edge (click)="openCart()">\n    <button ion-fab color="danger"><ion-icon name="cart"></ion-icon> </button>\n  </ion-fab>\n\n  <ion-card no-padding>\n    <ion-slides autoplay="3000" pager>\n      <ion-slide *ngFor="let image of product.images">\n        <img [src]="image.src" />\n      </ion-slide>\n    </ion-slides>\n\n    <ion-card-content>\n      <ion-card-title>\n        {{ product.title }} &nbsp;\n        <ion-chip *ngFor="let cat of product.categories" style="margin-left: 5px;">\n          <ion-label color="danger"> {{ cat }} </ion-label>\n        </ion-chip>\n      </ion-card-title>\n      <p>Price: <span [innerHTML]="product.price_html"></span></p>\n      <p [innerHTML]="product.description"></p>\n    </ion-card-content>\n\n  </ion-card>\n\n  <ion-card *ngIf="product.variations.length > 0">\n    <ion-item-divider color="light">Product Options</ion-item-divider>\n    <ng-container *ngFor="let attribute of product.attributes">\n      <ion-item *ngIf="attribute.variation">\n        <ion-label>{{ attribute.name | titlecase }}</ion-label>\n        <ion-select interface="popover" [(ngModel)]="selectedOptions[attribute.name]" (ionChange)="check(attribute.name)">\n          <ion-option *ngFor="let option of attribute.options" [value]="option">{{ option }}</ion-option>\n        </ion-select>\n      </ion-item>\n    </ng-container>\n  </ion-card>\n\n  <ion-card *ngIf="product.attributes.length > 0">\n    <ion-card-content>\n      <ion-card-title>\n        Specification\n      </ion-card-title>\n      <ion-grid>\n        <ion-row *ngFor="let att of product.attributes">\n          <ion-col col-4>{{ att.name }}</ion-col>\n          <ion-col col-8>\n            <span *ngFor="let option of att.options">{{ option }}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngIf="reviews.length > 0">\n    <ion-card-content>\n    <ion-card-title>\n      Reviews\n    </ion-card-title>\n    <ion-grid>\n      <ion-row *ngFor="let review of reviews">\n        <ion-col col-4>\n          <b>{{ review.reviewer_name }}</b><br />\n          <span *ngIf="review.rating >=1">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n          <span *ngIf="review.rating >=2">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n          <span *ngIf="review.rating >=3">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n          <span *ngIf="review.rating >=4">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n          <span *ngIf="review.rating >=5">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n        </ion-col>\n        <ion-col col-8>\n          {{ review.review }}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-card-content>\n  \n  </ion-card>\n\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <button ion-button icon-left block outline color="danger" style="margin-top: 10px;" (click)="addToCart(product)">\n      <ion-icon name="basket"></ion-icon> {{ requireOptions ? \'Select Product Options\' : \'Add to Cart for \' + \'Rs.\' + productPrice}}\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"F:\Code Decode\GitHub\SmartHome\src\pages\product-details\product-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], ProductDetailsPage);
    return ProductDetailsPage;
}());

//# sourceMappingURL=product-details.js.map

/***/ })

},[342]);
//# sourceMappingURL=main.js.map