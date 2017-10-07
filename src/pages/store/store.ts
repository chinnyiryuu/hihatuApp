import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { AppService, AppGlobal } from './../../app/app.service';

declare var Swiper;
@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  swiper: any;
  selectedItem: any;
  imgs: any;
  categories: any;
  categoriesBystor: Array<any> = [];
  categoriesByStId: any;

  @ViewChild('contentSlides') contentSlides: Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public appService: AppService ) {
    if(this.navParams.get("item").avatar_url == null){
      this.navParams.get("item").avatar_url = "./../assets/img/store.png"
    }
    this.selectedItem = this.navParams.get("item");
    if (this.selectedItem.images) {
      this.imgs = this.selectedItem.images;
    }
    this.getProductsByStore(this.navParams.get('item').id)
  }
  menus: Array<string> = []
  array: Array<string> = []
  getProductsByStore(id) {
    var params = {
      store: id
    }
    this.appService.httpGet(AppGlobal.API.getProducts, params, rs => {
      
      this.categories = rs.data;
      for(var i = 0; i<this.categories.length; i++){
        for(var j=0; j<this.categories[i].categories.length; j++){
          this.array=this.array.concat(this.categories[i].categories[j].name)
        }
      }
      this.menus = this.unique4(this.array);
      var flag = 0;
      console.log(this.menus);
      for (var x = 0; x < this.categories.length; x++) {
        for (var y = 0; y < this.categories[x].categories.length; y++) {
          for (var con = 0; con < this.menus.length; con++) {            
            if(flag == con){
              this.categoriesBystor[con] = new Array();
              flag +=1;
            }           
            let getData = this.categories[x].categories[y].name
            let menData = this.menus[con]
            if(menData == getData){
              this.categoriesBystor[con] =this.categoriesBystor[con].concat(this.categories[x])
              console.log(con+" : "+this.categoriesBystor[con]);
            }
          }
        }
      }
      console.log(this.categoriesBystor);
      this.categoriesByStId = Object(this.categoriesBystor[0])
    })
  }
  // 将相同的值相邻，然后遍历去除重复值  
  unique4(array) {
    array.sort();
    var re = [array[0]];
    for (var i = 1; i < array.length; i++) {
      if (array[i] !== re[re.length - 1]) {
        re.push(array[i]);
      }
    }
    return re;
  }

  getKeys(items) {
    var obj: any
    if(items == null){
      obj = null;
    }else{
      obj = Object.keys(items);
    }
    return obj;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
    this.initSwiper();
  }
  initSwiper() {
    this.swiper = new Swiper('.pageMenuSlides .swiper-container', {
      slidesPerView: 4,
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        320: {
          slidesPerView: 4,
          spaceBetween: 0
        }
      }
    });
  }

  selectPageMenu($event, index) {
    this.setStyle(index);
    this.contentSlides.slideTo(index);
  }
  slideChanged() {
    let index = this.contentSlides.getActiveIndex();
    this.setStyle(index);
    this.swiper.slideTo(index, 300);
  }

  setStyle(index) {
    this.categoriesByStId = Object(this.categoriesBystor[index])
    // for(var k=0;k<this.categoriesByStId.length;k++){
    //   console.log(this.categoriesByStId[k].name);
    //   for(var f=0;f<this.categoriesByStId[k].images.length;f++){
    //     console.log(this.categoriesByStId[k].images[f].src);
    //   }
    // }
    var slides = document.getElementsByClassName('pageMenuSlides')[0].getElementsByClassName('swiper-slide');
    if (index < slides.length) {
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i];
        s.className = "swiper-slide";
      }
      slides[index].className = "swiper-slide bottomLine";
    }
  }

  goDetails(item) {
    this.navCtrl.push('ProductDetailsPage', { item: item });
  }
}
