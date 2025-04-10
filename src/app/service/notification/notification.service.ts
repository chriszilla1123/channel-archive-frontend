import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {NotificationLevel} from "../../enum/notification-level.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorResponse} from "../../model/error-response.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private messageService: MessageService) {
  }

  notify(level: NotificationLevel, title: string, message: string, duration = 3000): void {
    this.messageService.add({severity: level, summary: title, detail: message, life: duration});
  }

  notifySticky(level: NotificationLevel, title: string, message: string): void {
    this.messageService.add({severity: level, summary: title, detail: message, sticky: true});
  }

  clear(): void {
    this.messageService.clear();
  }

  notifyHttpErrorResponse(response: HttpErrorResponse): void {
    const errorResponse: ErrorResponse = response.error;
    this.notify(NotificationLevel.ERROR, "Error", errorResponse.message);
    console.error(errorResponse);
  }
}