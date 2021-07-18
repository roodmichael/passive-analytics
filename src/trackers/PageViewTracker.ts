import { BaseTracker } from './BaseTracker';

import { IAnalyticsTracker, IEvent, IRecordEvent } from '../types';

export class PageViewTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName: string = 'PageView';

    private _provider;

    constructor() {
        super();
    }

    public getTrackerName(): string {
        return PageViewTracker.trackerName;
    }

    public start(): void {
        this.track();
    }

    private trackExecute(): void {
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'pageview',
            name: window.location.origin,
            value: window.location.pathname,
            detail: {}
        };
        this._record(event);
    }

    private track(): void {

        const originalPushState = window.history.pushState;
        window.history.pushState = (...args) => {
            originalPushState.apply(window.history, args);
            this.trackExecute();
        };

        const originalReplaceState = window.history.replaceState;
        window.history.replaceState = (...args) => {
            originalReplaceState.apply(window.history, args);
            this.trackExecute();
        }

        window.addEventListener('popstate', () => this.trackExecute());

        this.trackExecute();
    }
};