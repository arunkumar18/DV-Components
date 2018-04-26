import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { DvNotificationComponent } from './dv-notification.component';
import { DVNotificationService, Notification, NotificationType } from './dv-notification.service';

describe('DvNotificationService', () => {
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

    it('should create notification service', () => {
        expect(dvNotificationService).toBeTruthy();
    });

    it('notification should be displayed', () => {
        dvNotificationService.displayNotification(notificationObj.type, notificationObj.message, notificationObj.timeout);
        expect(component.notifications.length === 1).toBeTruthy();
     });

     it('notification should not be displayed when notification is invalid', () => {
        dvNotificationService.displayNotification(10, '', notificationObj.timeout);
        expect(component.notifications.length === 0).toBeTruthy();
     });
});
