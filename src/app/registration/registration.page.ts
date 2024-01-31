import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
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

  user_id1: any;

  constructor(
    public url: DataService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController,
  ) { }  

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }


  user_registration(f: NgForm) {
      if (
        f.value.zep_id !== '' &&
        f.value.sponcer_code !== '' &&
        f.value.name !== '' &&
        f.value.email !== '' &&
        f.value.address !== '' &&
        f.value.pincode !== '' &&
        f.value.area !== '' &&
        f.value.city !== '' &&
        f.value.state !== '' &&
        f.value.password !== '' 
      ) {
        this.storage.get('member').then((res1) => {
          this.user_id1 = parseInt(res1.user_id, 10);
          const rf = new FormData();
          rf.append('user_id', this.user_id1);
          rf.append('zep_id', f.value.zep_id);
          rf.append('sponcer_code', f.value.sponcer_code);
          rf.append('name', f.value.name);
          rf.append('email', f.value.email);
          rf.append('address', f.value.address);
          rf.append('pincode', f.value.pincode);
          rf.append('area', f.value.area);
          rf.append('city', f.value.city);
          rf.append('state', f.value.state);
          rf.append('password', f.value.password);
          console.log(rf);
          this.url.presentLoading();
          this.http.post(`${this.url.serverUrl}user_registration`, rf).subscribe(
            (res: any) => {
              console.log(res);
              {
                f.resetForm();
                this.url.presentToast('Your registration has been successfully done !');
                this.router.navigate(['/login']);
                // this.complaint_data = res;
              }
              this.url.dismiss();
              // this.router.navigate(['/complaint']);
            },
            (err) => {
              this.url.dismiss();
              // this.loader_visibility = false;
              //this.func.presentToast("Server Error. Please try after some time.");
            }
          );
        });
      } else {
        this.url.presentToast('Please Fill All Data.');
      }
   
  }


}
