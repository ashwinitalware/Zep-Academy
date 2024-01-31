import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-shopping-dash',
  templateUrl: './shopping-dash.page.html',
  styleUrls: ['./shopping-dash.page.scss'],
})
export class ShoppingDashPage implements OnInit {

  allcategory: any;
  allproduct: any;


  images = [
    'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1488229297570-58520851e868',
  ];

  swiperSlideChanged(e: any) {
    console.log('changed: ', e);
  }


  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    public url: DataService,
    private modalCtrl: ModalController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }


  
  ionViewWillEnter() {    
      this.url.presentLoading();
      this.get_category();
      // this.getproducts();
      this.url.dismiss();
  }


  get_category() {
    const requestData = {};
  
    this.http.post(`${this.url.serverUrl}get_category`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data.length > 0) {
          this.allcategory = res.data;
          
          // Assuming you want to fetch products for the first category, change index as needed
          const firstCategoryId = this.allcategory[0].id;
  
          // Call getproducts with the first category_id
          this.getproducts(firstCategoryId);
          
          console.log(res, 80);
        } else {
          this.url.presentToast('You have no Banner added.');
        }
      },
      (err) => {
        // Handle errors if needed
      }
    );
  }
  
  getproducts(category_id: string) {
    const requestData = {
      category_id: category_id,
    };
  
    this.http.post(`${this.url.serverUrl}get_courses_against_category_id`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data.length > 0) {
          this.allproduct = res.data;
          console.log(res, 80);
        } else {
          this.url.presentToast('No products found for this category.');
        }
      },
      (err) => {
        // Handle errors if needed
      }
    );
  }
  


}
