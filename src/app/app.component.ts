import { Component } from '@angular/core';
import { FirebaseService } from './services/FirebaseService.service';
import { UyeModel } from './models/uyeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uye = this.fbs.AktifUyeBilgi;

 
  title = 'Voronovasya News';
  constructor(public fbs: FirebaseService, public router: Router){ }

  OturumKapat() {
    this.fbs.OturumKapat().subscribe(() => {
      this.router.navigate(['login']);
    });
  }


}
