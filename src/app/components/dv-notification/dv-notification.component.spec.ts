import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { DvNotificationComponent } from './dv-notification.component';
import { DVNotificationService, Notification, NotificationType } from './dv-notification.service';

describe('DvNotificationComponent', () => {
    let component: DvNotificationComponent;
    let fixture: ComponentFixture<DvNotificationComponent>;
    let dvNotificationService: DVNotificationService;
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
        dvNotificationService = fixture.debugElement.injector.get(DVNotificationService)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('removeAlert function should remove notifyObj', () => {
        let notifyObj: Notification = <Notification>{
            type: NotificationType.Success,
            message: 'data save successfully!'
        };
        component.notifications.push(notifyObj);
        expect(component.notifications.length == 1).toBeTruthy();

        component.removeAlert(notifyObj);
        expect(component.notifications.indexOf(notifyObj) > -1).toBeFalsy();

    });

    it('create alert should create notification', () => {
        component.notifications = [];
        let notifyObj: Notification = <Notification>{
            type: NotificationType.Success,
            message: 'data save successfully!'
        };
        dvNotificationService.pushNotification(notifyObj.type, notifyObj.message);
        expect(component.notifications.length == 1).toBeTruthy();
        tick(6000);
        expect(component.notifications.indexOf(notifyObj) > 0).toBeFalsy();

    });

});
