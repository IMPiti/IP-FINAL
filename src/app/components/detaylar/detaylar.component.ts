import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { DetayYorum } from 'src/app/models/detayYorum';
import { News } from 'src/app/models/news';
import { Result } from 'src/app/models/Result';
import { FirebaseService } from 'src/app/services/FirebaseService.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-detaylar',
  templateUrl: './detaylar.component.html',
  styleUrls: ['./detaylar.component.css']
})
export class DetaylarComponent implements OnInit {
  haberler!: News[];
  haberId: string = "";
  secHaber!: News;
  sonuc: Result = new Result();
  yorum: DetayYorum = new DetayYorum()
  uyeName: string = "";
  uyeAdmin: string = "";
  katId: string = "";
  uyeAdi: string = "";
  modal!: Modal;
  yorumlar: DetayYorum[] = [];
  uye = this.fbs.AktifUyeBilgi
  haber: News = new News();
  modalBaslik: string = "";
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    yorumId: new FormControl(),
    productId: new FormControl(),
    uyeId: new FormControl(),
    name: new FormControl(),
    yorum: new FormControl()
  })
OturumAc() {
  location.href = "login";}

  constructor(
    public fbs: FirebaseService,
    public route: ActivatedRoute,
    public router:Router,
    public toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((p: any) => {
      if (p.haberId) {
        this.haberId = p.haberId;
        this.katId = p.categoryId;

        this.HaberListele(this.katId);
      }
    });
    this.HaberListele(this.katId);
    this.YorumListele();
    this.uye.subscribe((d)=> {
      this.uyeName = d?.displayName as string
      this.uyeAdmin = d?.kullaniciAdminMi as string
    })
  }
  DetayListele() {
    this.fbs.HaberListeleByKatId(this.haberId).subscribe(p => {
      this.haberler = p;
    })
  }
  HaberListele(katId: string) {
    this.fbs.HaberById(this.haberId, katId).subscribe(p => {
      this.haber = p;
    })
  }
  YorumEkle(name:string) {
    let katId = this.katId
    let haberId = this.haberId
    this.yorum = this.frm.value
    this.yorum.name = name;
    this.fbs.YorumEkle(this.yorum, katId, haberId).then(p => {
      this.sonuc.msg = "Yorum Gönderildi!";
      this.toast.success(this.sonuc.msg);
      this.HaberListele(katId);
      this.YorumListele();
    })
  }
  YorumListele() {
    this.fbs.YorumListeleByHaberId(this.haberId, this.katId).subscribe(p => {
      this.yorumlar = p;
    })
  }
  Yorumsil(yorum: DetayYorum) {
    let katId = this.katId
    let haberId = this.haberId
    this.fbs.YorumSil(yorum, katId, haberId).then(p => {
      this.sonuc.msg = "Yorum Silindi!";
      this.toast.success(this.sonuc.msg);
      this.YorumListele();
    })
  }
  OturumKontrol(ad: string) {
    if (localStorage.getItem('adsoyad') == ad) {
      return true
    } else if (localStorage.getItem('admin') == '1') {
      return true
    } else {
      return false
    }
  }
  YorumDuzenle() {
    let katId = this.katId
    let haberId = this.haberId
    var yorum = this.frm.value;
    this.fbs.YorumDuzenle(yorum, katId, haberId).then(d => {
      this.sonuc.msg = "Yorum Düzenlendi!";
      this.toast.success(this.sonuc.msg);
      this.YorumListele();
      this.modal.toggle();
    })
  }
  Duzenle(yorum: DetayYorum, el: HTMLElement) {
    this.frm.patchValue(yorum);
    this.modalBaslik = "Ürün Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  YorumCheck(ad: string){
    if (ad == this.uyeName) {
      return true
    } else if (this.uyeAdmin == '1') {
      return true
    } else {
      return false
    }
  }
}
