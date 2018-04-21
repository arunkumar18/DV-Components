import { Component, OnInit, OnDestroy } from '@angular/core';
import { DVNotificationService, Notification, NotificationType } from './dv-notification.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'dv-notification',
  templateUrl: './dv-notification.component.html',
  styleUrls: ['./dv-notification.component.scss']
})
export class DvNotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  timeout = 5000; // need to be added in configuration
  private notificationSubscription: Subscription;

  constructor(private notificationService: DVNotificationService) { }

  ngOnInit() {
    // subscription to notification service
    this.notificationSubscription = this.notificationService.emitNotification.subscribe((notification: Notification) => {
      if (!this.validateNotification(notification)) {
        return;
      }
      // add notification to array
      this.notifications.push(notification);
      // set the timeout to close the notifications
      setTimeout(() => {
        if (this.notifications) {
          if (this.notifications.indexOf(notification) > -1) {
            this.removeNotification(notification);
          }
        }
      }, this.timeout);
    });
  }

  private validateNotification(notification: Notification) {
    // check for notification type and message
    if (notification) {
      if (notification.message !== '' && notification.type in NotificationType) {
        return true;
      }
    }
    return false;
  }

  // close alert
  public removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}
