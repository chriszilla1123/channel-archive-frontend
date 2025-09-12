import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  API_URL = (window as any).env?.API_URL || 'localhost:8080';
  DEMO = (window as any).env?.DEMO || 'true';
}