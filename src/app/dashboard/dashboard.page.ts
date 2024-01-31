import { Component, OnInit} from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  rowStyle = {
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #d00681 0%, hsl(242deg 81.37% 71.23%) 100%)',
    
    // Adjust padding as needed
  };
  allslider: any;
  images = [
    'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    'https://images.unsplash.com/photo-1488229297570-58520851e868',
  ];
  user_id1: any;

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
      this.getslider();
      this.url.dismiss();
  }

  // getslider1() {
  //   this.http.post(`${this.url.serverUrl}get_slider`).subscribe(
  //     (res: any) => {
      
  //       if (res.status && res.data.length > 0) {
  //         this.allslider = res.data;
  //         // console.log(res, 80);
  //       } else {
  //         this.url.presentToast('You have no Banner added.');
  //       }
  //     },
  //     (err) => {
  //     }
  //   );
  // }

  getslider() {
    // Assuming you don't need to send any data in the request body for this API endpoint
    const requestData = {};
  
    this.http.post(`${this.url.serverUrl}get_slider`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data.length > 0) {
          this.allslider = res.data;
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
  





}
