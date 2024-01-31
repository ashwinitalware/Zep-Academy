import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  alltermsdata: any[] = [];

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
      this.get_terms_and_conditions();
      this.url.dismiss();
  }

  get_terms_and_conditions() {
    const requestData = {};
    this.url.presentLoading();

    this.http.post(`${this.url.serverUrl}get_terms_and_conditions`, requestData).subscribe(
      (res: any) => {
        if (res.status && res.data && res.data.terms_and_conditions) {
          this.alltermsdata.push(res.data); // Push the object to the array
          console.log(res, 88);
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
