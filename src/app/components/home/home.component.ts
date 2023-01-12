import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/FirebaseService.service';
import { UyeModel } from 'src/app/models/uyeModel';
import { MytoastService } from 'src/app/services/toastService.service';
import { HotToastService } from '@ngneat/hot-toast';
import { News } from 'src/app/models/news';
import { Categories } from 'src/app/models/Categories';
import { Result } from 'src/app/models/Result';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap'
import { Modal } from 'bootstrap'
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  uye = this.fbs.AktifUyeBilgi;
  result: Result = new Result();

  //secKat!: Categories;
  modalTitle: string = "";
  modalBaslik: string = "";
  katId: string = "";
  admin: string = "";
  modal!: Modal;
  secHaber!: News;
  haberler!: News[];
  kategoriler!: Categories[];
  seciliHaber!: News[];
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    haberYazan: new FormControl(),
    haberBasligi: new FormControl(),
    haberId: new FormControl(),
    katId: new FormControl(),
    haberManseti: new FormControl(),
    haberYazisi: new FormControl(),
    haberKayitTarihi: new FormControl(),
    haberDuzenlemeTarihi: new FormControl(),
    //haberResim: new FormControl()
  });

  uyeSec!: UyeModel;
  secKat!: Categories;
  
  constructor(
    public fbs: FirebaseService, 
    public tost:MytoastService,
    public htoast:HotToastService,
    public router: Router,
    public route: ActivatedRoute,
    public toast: MytoastService,)
      { }
      
  OturumAc() {
    location.href = "login";
  }

  ngOnInit() {
      this.fbs.AktifUyeBilgi;
      this.KategoriListele();
      this.HaberListele();
    
      this.route.params.subscribe((p: any) => {
        if (p.katId) {
          this.katId = p.katId;
          this.KategoriGetir();
       
  
        }
      });
      this.uye.subscribe((d) => {
        this.admin = d?.kullaniciAdminMi as string
      })
      
    }
    OturumKapat() {
      this.fbs.OturumKapat().subscribe(() => {
        this.router.navigate(['#']);
      });
    }
 
    KatSec(katId: string) {
      this.katId = katId;
      this.KategoriGetir();
  
    }
   
  HaberListele() {
    this.fbs.HaberListeleByKatId(this.katId).subscribe((d) => {
      this.haberler = d;
    });
  }
  KategoriListele() {
    this.fbs.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.fbs.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.HaberListele();
    });
  }
  
    
  
    
   
  
    adminmi(){
      if (this.admin == '1'){
        return true
      } else {
        return false
      }
    }
    
    // }
}