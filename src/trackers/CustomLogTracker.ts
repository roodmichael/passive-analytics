
import { BaseTracker } from './BaseTracker';

import {
    IAnalyticsTracker,
    IEvent
} from '../types';

export class CustomLogTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName = 'CustomLog';

    constructor() {
        super();
    }

    public getTrackerName(): string {
        return CustomLogTracker.trackerName;
    }

    private trackExecute(type: string, name: string, value: string | number, detail: string | Record<string, unknown> = {}) {
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type,
            name,
            value,
            detail
        };
        this._record(event);
    }

    public info(name: string, value: string | number, detail: string | Record<string, unknown> = {}): void {
        this.trackExecute('info', name, value, detail);
    }

    public warn(name: string, value: string | number, detail: string | Record<string, unknown> = {}): void {
        this.trackExecute('warn', name, value, detail);
    }

    public error(name: string, value: string | number, detail: string | Record<string, unknown> = {}): void {
        this.trackExecute('error', name, value, detail);
    }

    public start(): void {
        this.track();
    }

    public stop(): void {
        this.untrack();
    }

    private track(): void {
        global.pa.log = this;
    }

    private untrack(): void {
        global.pa.log = undefined;
    }
}