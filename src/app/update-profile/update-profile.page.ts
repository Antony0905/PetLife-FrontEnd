import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.router.navigate(['tabs/tabs/tab4']);
  }

}
