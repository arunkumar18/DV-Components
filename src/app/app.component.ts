import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { DVNotificationService, NotificationType } from '../app/components/dv-notification/dv-notification.service';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  suggestionBoxInput:any[];
  title = 'DV- Components';
  isValid:boolean;
  selectedValue: string;
  placeholder: string = "Select";
  constructor(public notificationService: DVNotificationService) {
    this.suggestionBoxInput = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'One',
      'Two',
      'Three',
      'Four',
      'Five'
     ];
  }

  openSnackBar(type: string, message: string, timeout: number= 0) {
    console.log(this.selectedValue);
    switch (type) {
      case 'Success':
        this.notificationService.displayNotification(NotificationType.Success, message, timeout);
        break;
      case 'Error':
        this.notificationService.displayNotification(NotificationType.Error, message, timeout );
        break;
      case 'Info':
        this.notificationService.displayNotification(NotificationType.Info, message, timeout);
        break;
      case 'Warning':
        this.notificationService.displayNotification(NotificationType.Warning, message, timeout);
        break;
    }
  }
}
