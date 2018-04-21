import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DVNotificationService {
    private subject = new Subject<Notification>();
    public emitNotification = this.subject.asObservable();

    // call notification component to create notifications
    displayNotification(type: NotificationType, message: string) {
        this.subject.next(<Notification>{ type: type, message: message });
    }
}

// models
export class Notification {
    type: NotificationType;
    message: string;
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning
}
