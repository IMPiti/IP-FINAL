import { Component, OnInit } from '@angular/core';

import { MytoastService } from 'src/app/services/toastService.service';
import { FirebaseService } from 'src/app/services/FirebaseService.service';

import { UyeModel } from 'src/app/models/uyeModel';
import { Result } from 'src/app/models/Result';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(    
    public fbs: FirebaseService,
    public htoast: HotToastService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    
  }
  OturumAc(kullaniciEmail: string, kullaniciSifre: string) {
    this.fbs.OturumAc(kullaniciEmail, kullaniciSifre)
      .pipe(
        this.htoast.observe({
          success: 'Oturum Açıldı',
          loading: 'Oturum Açılıyor...',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }
}
