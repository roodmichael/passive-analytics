import { IAnalyticsTracker, IEvent } from '../types';
import { BaseTracker } from './BaseTracker';

export class ErrorTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName = 'Error';

    constructor() {
        super();
    }

    public getTrackerName(): string {
        return ErrorTracker.trackerName;
    }

    public start(): void {
        this.track();
    }

    private trackExecute(message: string | Event, source?: string, lineno?: number, colno?: number, error?: Error): void {
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'error',
            name: source || '',
            value: String(message),
            detail: { lineno, colno, error }
        };
        this._record(event);
    }

    private track(): void {

        window.onerror = (...args) => {
            this.trackExecute(...args);
        };
    }
}