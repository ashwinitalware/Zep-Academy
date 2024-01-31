import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mobile: any;
  user_id1: any;

  session_data = {
    mobile: '',
    password: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    public url: DataService,
    // private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }

  login_submit(f: NgForm) {
    console.log(f.value);
  
    if (f.value.mobile !== '' && f.value.password !== '') {
      this.url.presentLoading();
  
      const requestData = {
        mobile: f.value.mobile,
        password: f.value.password
      };
  
      this.http.post(`${this.url.serverUrl}user_login`, requestData).subscribe(
        async (res: any) => {
          console.log(res);
          if (res.status === false) {
            this.url.presentToast('User not Registered');
          } else if (res.data && res.data.id) {
            this.session_data['mobile'] = res.data.id;
            await this.storage.set('member', this.session_data);
          
            this.url.presentToast('Login Successfully');
            this.router.navigate(['/dashboard']).then(() => {
              this.dismissLoader(); // Dismiss the loader after navigation
            });
          } else {
            console.error('User data or ID not available in the response:', res);
            // Handle the case when user data or ID is not available
          }
          // if (res.status === false) {
          //   this.url.presentToast('User not Registered');
          // } else {
          //   this.session_data['mobile'] = res.user.id;
          //   await this.storage.set('member', this.session_data);
  
          //   this.url.presentToast('Login Successfully');
          //   this.router.navigate(['/dashboard']).then(() => {
          //     this.dismissLoader(); // Dismiss the loader after navigation
          //   });
          // }
        },
        (err) => {
          this.dismissLoader(); // Dismiss the loader in case of an error
          // Handle the error case
          console.error(err);
        }
      );
    }
  }
  
  dismissLoader() {
    this.url.dismiss();
  }
  // login_submit(f: NgForm) {
  //   console.log(f.value);
  //   if (f.invalid) {
  //     this.presentToast('Please fill in all fields');
  //     return;
  //   }
  
  //   this.session_data['mobile'] = f.value.mobile;
  //   this.session_data['password'] = f.value.password;
  
  //   this.http.post(`${this.url.serverUrl}user_login`, this.session_data)
  //     .subscribe(
  //       async (res: any) => {
  //         console.log(res, 12);
  //         if (res.message === 'data not found') {
  //           this.url.presentToast('User not Registered');
  //         } else {
  //           // Success logic
  //           this.session_data['mobile'] = res.user.mobile;
  //           await this.storage.set('member', this.session_data);
  //           console.log(await this.storage.get('member'));
          
  //           this.user_id1 = parseInt(res.user.id, 10);
  //           console.log(this.user_id1);
          
  //           this.url.presentToast('Login Successfully');
  //           this.router.navigate(['/dashboard']);
  //         }
  //       },
  //       (err) => {
  //         // Handle errors if needed
  //         console.error(err);
  //       }
  //     );
  // }
  

  // async presentToast(message: string) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 2000,
  //     position: 'top',
  //   });
  //   toast.present();
  // }



}
