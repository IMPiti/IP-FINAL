import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Result } from '../models/Result';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService

  ) { }
  ToastUygula(result: Result) {

    if (result.process) {
      this.toast.success(result.msg, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
        }
      });
    } else {
      this.toast.error(result.msg, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
        }
      });
    }
  }
}
