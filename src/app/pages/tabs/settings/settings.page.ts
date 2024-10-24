import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
private auth=inject(AuthService) ;
  constructor() { }

  ngOnInit() {
  }

  logout() {
  this.auth.logout() ;
  }
}
