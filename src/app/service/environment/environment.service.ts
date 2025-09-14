import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  API_URL: string = (window as any).env?.API_URL || 'http://localhost:8080';
  DEMO: boolean = ((window as any).env?.DEMO === 'true') || false;
}