import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  allaboutdata: any[] = [];
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
      this.get_about_data();
      this.url.dismiss();
  }

  get_about_data() {
    const requestData = {};
    this.url.presentLoading();
  
    this.http.post(`${this.url.serverUrl}get_about_data`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data && res.data.about_us) {
          this.allaboutdata.push(res.data); // Push the object to the array
          console.log(res, 80);
        } else {
          this.url.presentToast('You have no data added.');
        }
  
        this.url.dismiss(); // Dismiss loading here
      },
      (err) => {
        this.url.dismiss(); // Dismiss loading in case of an error
      }
    );
  }
}
