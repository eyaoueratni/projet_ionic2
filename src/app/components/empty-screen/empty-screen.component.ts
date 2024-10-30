<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  standalone: true ,
  imports: [CommonModule, IonicModule] ,
})
export class EmptyScreenComponent  implements OnInit {
@Input() model: any; 
  constructor() { }

  ngOnInit() {}

}
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit , Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  standalone: true ,
  imports: [CommonModule, IonicModule] ,
})
export class EmptyScreenComponent  implements OnInit {
@Input() model: any; 
  constructor() { }

  ngOnInit() {}

}
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
