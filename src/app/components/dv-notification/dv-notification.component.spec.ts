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
        message: 'notification message',
        timeout: 5000
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

    it('should create notification component', () => {
        expect(component).toBeTruthy();
    });

    it('dispalyNotification function should create notification', () => {
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message, notificationObj.timeout);
        expect(component.notifications.length === 1).toBeTruthy();
    });

    it('multiple tyes of notification should be added to notification list', () => {
        dvNotificationService.displayNotification(NotificationType.Success, notificationObj.message, notificationObj.timeout);
        dvNotificationService.displayNotification(NotificationType.Error, notificationObj.message, notificationObj.timeout);
        dvNotificationService.displayNotification(NotificationType.Info, notificationObj.message, notificationObj.timeout);
        dvNotificationService.displayNotification(NotificationType.Warning, notificationObj.message, notificationObj.timeout);
        expect(component.notifications.length === 4).toBeTruthy();
    });

    it('validate notification message and type ', () => {
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message, notificationObj.timeout);

        expect(component.notifications.length === 1).toBeTruthy();
        expect(component.notifications[0].type).toBe(notificationObj.type);
        expect(component.notifications[0].message).toBe(notificationObj.message);
    });

    it('removeNotification function should remove notification', () => {
        // add notificationObj to notification array
        component.notifications.push(notificationObj);
        expect(component.notifications.length === 1).toBeTruthy();

        component.removeNotification(notificationObj);
        expect(component.notifications.indexOf(notificationObj) === -1).toBeTruthy();

    });

    it('notification should not be closed by itself when timeout is 0', fakeAsync(() => {
        component.notifications = [];
        // add notification
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message, 0);
        expect(component.notifications.length === 1).toBeTruthy();
        tick(5000);
        // notification without timeout is tested here
        expect(component.notifications.indexOf(notificationObj) === -1).toBeTruthy();
    }));

    it('timeout on notification should closed the notification bar', fakeAsync(() => {
        component.notifications = [];
        // add notification

        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message, 5000);
        expect(component.notifications.length === 1).toBeTruthy();
        tick(5000);
        // timeout functionality is tested here
        expect(component.notifications.indexOf(notificationObj) === -1).toBeTruthy();
    }));

    it('notification should not be displayed when notification message is empty', () => {
        dvNotificationService.displayNotification(notificationObj.type, '', 0);
        expect(component.notifications.length === 0).toBeTruthy();
    });

    it('notification should not be displayed when notification type is invalid', () => {
        dvNotificationService.displayNotification(notificationObj.type, '', 0);
        expect(component.notifications.length === 0).toBeTruthy();
    });

    it('notification should not be displayed when notification is invalid', () => {
        dvNotificationService.displayNotification(10, '', 0);
        expect(component.notifications.length === 0).toBeTruthy();
     });
});
