import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-mobileverify',
  templateUrl: './mobileverify.page.html',
  styleUrls: ['./mobileverify.page.scss'],
})
export class MobileverifyPage implements OnInit {
  showOTP: boolean = false;
  showSecondDiv: boolean = false;
  otp: any;
  mobile: any;
  mobileNumber: any;

  zep_id:any;
  sponcer_code:any;
  name:any;
  email:any;
  address:any;
  pincode:any;
  area:any;
  city:any;
  state:any;
  password:any;

  session_data = {
    user_id: '',
    mobile: '',
  };
  t1: any;
  user_id1: any;
  type_otp: any;
 
  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    public url: DataService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.storage.create();
  }


  generateUniqueId(): void {
    const randomDigits = Math.floor(100 + Math.random() * 900).toString();
    this.zep_id = 'ZEP' + randomDigits;
  }

  showOTPInput(f: NgForm){
    if (f.value.mobile !== '') {
      if (String(f.value.mobile).length !== 10) {
        this.url.presentToast('Please Fill 10 digit mobile Number.');
        return false;
      }
      this.url.presentLoading();
      this.session_data['mobile'] = f.value.mobile;
      this.mobile = f.value.mobile;
      this.http
        .post(`${this.url.serverUrl}send_mobile_verify_otp`, f.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            {
              if (res.data == 'please register yourself') {
                this.url.presentToast(
                  'Please register yourself first from admin panel.'
                );
              } else {
                this.showOTP = true;
                this.otp = res;
                this.mobileNumber = f.value.mobile;
              }
            }
            this.url.dismiss();
          },
          (err) => {
            this.url.dismiss();
          }
        );
    } else {
      this.url.presentToast('Please Fill All Data.');
    }
    return true;
  }


  
  verify_submit(form: NgForm){
    let enteredOTP = form.value.otp;
    // Check if OTP is provided
    if (!enteredOTP) {
      this.presentToast('Please enter the OTP first.');
      return; 
    }
    let apiUrl = `${this.url.serverUrl}check_otp`;
    this.http.post(apiUrl, { otp: enteredOTP }).subscribe(
      (res: any) => {
        if (res.status === true) {
          console.log('OTP is correct. Performing verification...');
          this.showSecondDiv = true;
        } else {
          console.log('Incorrect OTP. Please try again.');
          this.presentToast('Incorrect OTP. Please try again.');
        }
      },
      (error) => {
        console.error('Error during OTP verification:', error);
        this.presentToast('Incorrect OTP. Please try again.');
      }
    );
  }

  register_user(f: NgForm) {
    const update_data = {
      zep_id: f.value.zep_id,
      sponcer_code: f.value.sponcer_code,
      email: f.value.email,
      name: f.value.name,
      address: f.value.address,
      pincode: f.value.pincode,
      area: f.value.area,
      city: f.value.city,
      state: f.value.state,
      password: f.value.password,
      mobile:this.mobileNumber,
    };

    this.url.presentLoading();
    this.url.dismiss();
    console.log(update_data);

    this.http
      .post(`${this.url.serverUrl}user_registration`, update_data)
      .subscribe(
        (res: any) => {
          this.url.dismiss();
          console.log(res);
          this.url.presentToast('Your Account Successfully Registered');
          f.resetForm();
          this.router.navigate(['/login']);
        },
        (err) => {
          this.url.dismiss();
        }
      );
  }


  // user_registration(f: NgForm) {
  //   this.storage.get('member').then((res1) => {
  //     alert();
  //     if (res1 && res1.user_id !== undefined && res1.user_id !== null) {
  //       this.user_id1 = parseInt(res1.user_id, 10);
  //       const rf = new FormData();
  //       rf.append('zep_id', f.value.zep_id);
  //       rf.append('sponcer_code', f.value.sponcer_code);
  //       rf.append('name', f.value.name);
  //       rf.append('email', f.value.email);
  //       rf.append('address', f.value.address);
  //       rf.append('pincode', f.value.pincode);
  //       rf.append('area', f.value.area);
  //       rf.append('city', f.value.city);
  //       rf.append('state', f.value.state);
  //       rf.append('password', f.value.password);
  
  //       if (this.mobileNumber) {
  //         rf.append('mobile', this.mobileNumber);
  //       } else {
  //         console.error('Error: Mobile number is not available.');
  //         // Show a user-friendly error message
  //         this.url.presentToast('Mobile number is not available. Please try again later.');
  //         return;
  //       }
  
  //       console.log(rf);
  //       this.url.presentLoading();
  
  //       this.http.post(`${this.url.serverUrl}user_registration`, rf).subscribe(
  //         (res: any) => {
  //           console.log(res);
  //           f.resetForm();
  //           this.url.presentToast('Your registration has been successfully done!');
  //           this.router.navigate(['/login']);
  //           this.url.dismiss();
  //         },
  //         (err) => {
  //           this.url.dismiss();
  //           console.error('Error during registration:', err);
  //           // Show a user-friendly error message
  //           this.url.presentToast('Registration failed. Please try again later.');
  //         }
  //       );
  //     } else {
  //       console.error('Error: User ID not available or invalid.');
  //       // Show a user-friendly error message
  //       this.url.presentToast('User details are not available or invalid. Please try again later.');
  //     }
  //   });
  // }
  
  

  // verify_submit111(f: NgForm) {
  //   console.log(f.value);
  //   let text = f.value.otp;
  //   this.type_otp = parseInt(text);
  //   if (f.value.otp != '') {
  //     if (this.type_otp == this.otp) {
  //       if (this.mobile != '') {
  //         //alert(f.value.contact_no);
  //         f.value.contact_no = this.mobile;
  //         this.url.presentLoading();
  //         this.http.post(`${this.url.serverUrl}check_otp`, f.value).subscribe(
  //           (res: any) => {
  //             console.log(res);
  //             {
  //               this.showOTP = true;
  //               this.session_data['user_id'] = res.Id;
  //               this.session_data['mobile'] = res.mobile;
  //               this.storage.set('member', this.session_data);
  //               console.log(this.storage.get('member'));

  //               this.storage.get('member').then((res) => {
  //                 this.user_id1 = parseInt(res.user_id) + 1;
  //                 console.log(this.user_id1);
  //               });
  //             }
  //             this.url.dismiss();
  //             this.router.navigate(['/dashboard']);
  //           },
  //           (err) => {
  //             this.url.dismiss();
  //           }
  //         );
  //       } else {
  //         this.url.presentToast('Please Fill OTP.');
  //       }
  //     } else {
  //       if (this.type_otp == '1234') {
  //         if (this.mobile != '') {
  //           //alert(f.value.contact_no);
  //           f.value.contact_no = this.mobile;
  //           this.url.presentLoading();
  //           this.http.post(`${this.url.serverUrl}check_otp`, f.value).subscribe(
  //             (res: any) => {
  //               console.log(res);
  //               // if(res.Name=="200")
  //               {
  //                 this.showOTP = true;
  //                 this.session_data['user_id'] = res.Id;
  //                 this.session_data['mobile'] = res.Name;
  //                 this.storage.set('member', this.session_data);
  //                 console.log(this.storage.get('member'));

  //                 this.storage.get('member').then((res) => {
  //                   this.user_id1 = parseInt(res.user_id) + 1;
  //                   console.log(this.user_id1);
  //                 });
  //               }
  //               this.url.dismiss();
  //               this.router.navigate(['/dashboard']);
  //             },
  //             (err) => {
  //               this.url.dismiss();
  //             }
  //           );
  //         }
  //       } else {
  //         f.resetForm();
  //         this.router.navigate(['/login']);
  //         this.url.presentToast('Invalid OTP.');
  //       }
  //     }
  //   } else {
  //     this.router.navigate(['/login']);
  //     this.url.presentToast('Please Fill OTP.');
  //   }
  // }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom'
    });
    toast.present();
  }
  


}
