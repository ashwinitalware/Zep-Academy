import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  allprivacydata: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    public url: DataService,
    private modalCtrl: ModalController,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  ionViewWillEnter() {    
      this.url.presentLoading();
      this.get_privacy_and_policy();
      this.url.dismiss();
  }
 
  
  get_privacy_and_policy() {
    const requestData = {};
    
    this.http.post(`${this.url.serverUrl}get_privacy_and_policy`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data && res.data.privacy_policy) {
          this.allprivacydata.push(res.data);
          console.log(res, 88);
        } else {
          this.url.presentToast('You have no data added.');
        }
      },
      (err) => {
        console.error(err);
        this.url.presentToast('An error occurred.');
      },
      () => {
        // Dismiss the loading overlay here
        this.url.dismiss();
      }
    );
  }
}
