import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { DvNotificationComponent } from './dv-notification.component';
import { DVNotificationService, Notification, NotificationType } from './dv-notification.service';

describe('DvNotificationComponent', () => {
    let component: DvNotificationComponent;
    let fixture: ComponentFixture<DvNotificationComponent>;
    let dvNotificationService: DVNotificationService;
    // mock notification object
    const notificationObj: Notification = <Notification>{
        type: NotificationType.Success,
        message: 'notification message'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DvNotificationComponent],
            providers: [DVNotificationService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DvNotificationComponent);
        component = fixture.componentInstance;
        dvNotificationService = fixture.debugElement.injector.get(DVNotificationService);
        fixture.detectChanges();
    });

    it('should create notiifcation component', () => {
        expect(component).toBeTruthy();
    });

    it('dispalyNotification function should create notification', () => {
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message);
        expect(component.notifications.length === 1).toBeTruthy();
    });

    it('multiple tyes of nofication should be added to notification list', () => {
        dvNotificationService.displayNotification(NotificationType.Success, notificationObj.message);
        dvNotificationService.displayNotification(NotificationType.Error, notificationObj.message);
        dvNotificationService.displayNotification(NotificationType.Info, notificationObj.message);
        dvNotificationService.displayNotification(NotificationType.Warning, notificationObj.message);
        expect(component.notifications.length === 4).toBeTruthy();
    });

    it('validate notifiaction message and type ', () => {
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message);

        expect(component.notifications.length === 1).toBeTruthy();
        expect(component.notifications[0].type).toBe(notificationObj.type);
        expect(component.notifications[0].message).toBe(notificationObj.message);
    });

    it('removeNotiifcation function should remove notification', () => {
        // add notificationObj to notification array
        component.notifications.push(notificationObj);
        expect(component.notifications.length === 1).toBeTruthy();

        component.removeNotification(notificationObj);
        expect(component.notifications.indexOf(notificationObj) > -1).toBeFalsy();

    });

    it('timeout on notification should closed the notification bar', fakeAsync(() => {
        component.notifications = [];
        const notifyObj: Notification = <Notification>{
            type: NotificationType.Success,
            message: 'data save successfully!'
        };
        // add notification
        dvNotificationService.displayNotification(notifyObj.type, notifyObj.message);
        expect(component.notifications.length === 1).toBeTruthy();
        tick(component.timeout + 5);
        // timeout functionality is tested here
        expect(component.notifications.indexOf(notifyObj) > 0).toBeFalsy();
    }));

    it('notification should not be displayed when notification message is empty', () => {
        dvNotificationService.displayNotification(notificationObj.type, '');
        expect(component.notifications.length === 0).toBeTruthy();
    });

    it('notification should not be displayed when notification type is invalid', () => {
        dvNotificationService.displayNotification(notificationObj.type, '');
        expect(component.notifications.length === 0).toBeTruthy();
    });

    it('notification should not be displayed notification is invalid', () => {
        dvNotificationService.displayNotification(10, '');
        expect(component.notifications.length === 0).toBeTruthy();
     });
});
