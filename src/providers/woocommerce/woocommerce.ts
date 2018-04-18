import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WoocommerceProvider {

  WooCommerce: any;
  WooCommerceV2: any;

  constructor() {

    this.WooCommerce = WC({
      url: "http://smarthome.vishaltalks.com",
      consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
      consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b"
    });

    this.WooCommerceV2 = WC({
      url: "http://smarthome.vishaltalks.com",
      consumerKey: "ck_e2375f55ae5a234ee7c756b7f424b211f59e7d31",
      consumerSecret: "cs_2a35ef3f5990263fe30189f3c83a912b41c3096b",
      wpAPI: true,
      version: "wc/v2"
    });

  }

  init(v2?: boolean){

    if(v2 == true){
      return this.WooCommerceV2;
    } else {
      return this.WooCommerce;
    }
  }

}
