import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public serverUrl: string;

  constructor() {
    this.serverUrl = window['_config'].serverUrl;
  }
}

declare global {
    interface Window {
        _config: any;
    }
  }
