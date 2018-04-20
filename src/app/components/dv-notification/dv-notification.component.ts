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
  private timeout: number = 5000;
  private notificationSubscription: Subscription;

  constructor(private notificationService: DVNotificationService) { }

  ngOnInit() {
    // subscription to notification service
    this.notificationSubscription = this.notificationService.emitNotification.subscribe((notification: Notification) => {
      if (!notification) {
        // clear all notifications
        this.notifications = [];
        return;
      }

      // add notification to array
      this.notifications.push(notification);

      // set the timeout to close the notifications
      setTimeout(() => {
        if (this.notifications) {
          if (this.notifications.indexOf(notification) > -1) {
            this.removeAlert(notification);
          }
        }
      }, this.timeout);
    });
  }

  // close alert
  public removeAlert(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}