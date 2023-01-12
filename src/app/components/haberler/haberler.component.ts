import { FormControl, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { News } from 'src/app/models/news';
import { Result } from 'src/app/models/Result';
import { FirebaseService } from 'src/app/services/FirebaseService.service';
import { MytoastService } from 'src/app/services/toastService.service';
import { Categories } from 'src/app/models/Categories';
import { ActivatedRoute } from '@angular/router';
import { UyeModel } from 'src/app/models/uyeModel';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.css']
})
export class HaberlerComponent implements OnInit {
  haberler!: News[];
  kategoriler!: Categories[];
  uye = this.fbs.AktifUyeBilgi;
  result: Result = new Result();
  
 
  secHaber!: News;

  //secKat!: Categories;
  modalTitle: string = "";
  modalBaslik: string = "";
  modal!: Modal;

  admin: string = "";
  katId: string = "";
  secKat: Categories = new Categories();
  // seciliHaber!: News[];
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    haberYazan: new FormControl(),
    haberBasligi: new FormControl(),
    haberId: new FormControl(),
    categoryId: new FormControl(),
    haberManseti: new FormControl(),
    haberResim: new FormControl(),
    haberYazisi: new FormControl(),
    haberKayitTarihi: new FormControl(),
    haberDuzenlemeTarihi: new FormControl(),
    //haberResim: new FormControl()
  });


  constructor(
    public fbs: FirebaseService,
    public toast: MytoastService,
    public route: ActivatedRoute,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    
    this.fbs.AktifUyeBilgi;
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.KategoriListele();
    this.HaberListele();
    this.uye.subscribe((d) => {
      this.admin = d?.kullaniciAdminMi as string
    })
    
  }
  KatSec(katId: string) {
    this.katId = katId;
    this.KategoriGetir();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({
      categoryId: this.katId
    });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Haber Ekle";
    this.modal.show();
  }
  Duzenle(haber: News, el: HTMLElement) {
    this.frm.patchValue(haber);
    this.modalBaslik = "Haberi Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(haber: News, el: HTMLElement) {
    this.secHaber = haber;
    this.modalBaslik = "Haberi Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
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
  
  HaberEkleDuzenle() {
    var haber: News = this.frm.value
    var tarih = new Date();
    if (!haber.haberId) {
      var filtre = this.haberler.filter(s => s.haberBasligi == haber.haberBasligi);
      if (filtre.length > 0) {
        this.result.process = false;
        this.result.msg = "Bu haber mevcut...";
        this.htoast.error(this.result.msg)
      } else {
        haber.haberDuzenlemeTarihi = tarih.getTime().toString();
        haber.haberKayitTarihi = tarih.getTime().toString();
        this.fbs.HaberEkle(haber).then(d => {
          this.result.process = true;
          this.result.msg = "Haber Eklendi";
          this.htoast.success(this.result.msg)
          this.HaberListele();
          this.modal.toggle();
        });
      }
    } else {
      haber.haberDuzenlemeTarihi = tarih.getTime().toString();
      this.fbs.HaberDuzenle(haber).then(d => {
        this.result.process = true;
        this.result.msg = "Haber Düzenlendi";
        this.htoast.success(this.result.msg)
        this.HaberListele();
        this.modal.toggle();
      });
    }

  }
 HaberSil() {
    this.fbs.HaberSil(this.secHaber).then((d) => {
      this.result.process = true;
      this.result.msg = 'Kategori Silindi';
      this.toast.ToastUygula(this.result);
      this.HaberListele();
      this.modal.toggle();
    });
  }

}
