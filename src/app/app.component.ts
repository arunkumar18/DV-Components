import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DVNotificationService, NotificationType } from '../app/components/dv-notification/dv-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DV- Components';
  constructor(public notificationService: DVNotificationService) { }  

  openSnackBar(type, message) {
    switch (type) {
      case "Success":
        this.notificationService.pushNotification(NotificationType.Success, message)
        break;
      case "Error":
        this.notificationService.pushNotification(NotificationType.Error, message)
        break;
      case "Info":
        this.notificationService.pushNotification(NotificationType.Info, message)
        break;
      case "Warning":
        this.notificationService.pushNotification(NotificationType.Warning, message)
        break;
    }
  }
}
