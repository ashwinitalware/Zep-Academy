import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  mobile: any;
  cust_id1: any;
  user_id1: any;
  dataService: any;
  name: any;



  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  ionViewWillEnter() {
    this.url.presentLoading();
    this.get_user();
    this.url.dismiss();
  }

  async initializeApp() {
    this.storage.create();
    this.platform.ready().then(() => {
      this.storage.get('member').then(async (res) => {
        this.cust_id1 = parseInt(res.id, 10);
        this.get_user();
        if (
          this.cust_id1 !== '' &&
          this.cust_id1 !== 'undefined' &&
          this.cust_id1 !== undefined
        ) {
          this.router.navigate(['/dashboard']);         
        } else {
          this.router.navigate(['/login']);
        }
      });

      this.platform.backButton.subscribeWithPriority(-1, () => {
        if (
          (window.location + '').includes('localhost/dashboard') ||
          (window.location + '').includes(
            'localhost' + this.dataService.directNavigate
          ) ||
          (window.location + '').includes('localhost/login')
        ) {
          App.exitApp();
        }
      });

    });
  }
  update_data(arg0: string, update_data: any) {
    throw new Error('Method not implemented.');
  }

  logout() {
        this.storage.remove('member').then(() => {
      this.storage.clear();
      this.router.navigateByUrl('/login');
    });
    this.url.presentToast('Logout Successfully.');
  }

  get_user() {
    this.storage.get('member').then((res1) => {
      this.user_id1 = parseInt(res1.id, 10);
      // alert(this.user_id1);
      this.url.presentLoading();
  
      const requestData = {
        id: this.user_id1,
      };
  
      this.http.post(`${this.url.serverUrl}get_user`, requestData).subscribe(
        (res: any) => {
          if (res.status && res.data.length > 0) {
            console.log(res);
            this.name = res.data[0].name;
            this.mobile = res.data[0].mobile;
          } else {
            this.url.presentToast('You Have no Profile.');
          }
          this.url.dismiss();
        },
        (err) => {
          // Handle errors if needed
          this.url.dismiss();
        }
      );
    });
  }
  

  // get_user() {
  //   this.storage.get('member').then((res1) => {
  //     this.user_id1 = parseInt(res1.id, 10);
  //     alert(this.user_id1);
  //     this.url.presentLoading();
  //     this.url.dismiss();
  //     this.http
  //       .get(`${this.url.serverUrl}get_user?id=${this.user_id1}`)
  //       .subscribe(
  //         (res: any) => {
  //           if (res === 0) {
  //             this.url.presentToast('You Have no Profile.');
  //           } else {
  //             console.log(res);
  //             this.member_Name = res.data[0].member_Name;
  //             this.Contact_No = res.data[0].Contact_No;
  //           }
  //         },
  //         (err) => {
  //         }
  //       );
  //   });
  // }
}
