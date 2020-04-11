import { IAnalyticsTracker, IEvent } from '../types';

export class ErrorTracker implements IAnalyticsTracker {
    static trackerName: string = 'Error';

    private _provider;

    constructor(provider) {
        this._provider = provider;
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
            value: message,
            detail: { lineno, colno, error }
        };
        this._provider.record(event);
    }

    private track(): void {

        window.onerror = (...args) => {
            this.trackExecute(...args);
        };
    }
};