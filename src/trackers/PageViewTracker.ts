import { IAnalyticsTracker, IEvent, IRecordEvent } from '../types';

export class PageViewTracker implements IAnalyticsTracker {
    static trackerName: string = 'PageView';

    private _provider;

    constructor(provider) {
        this._provider = provider;
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
        this._provider.record(event);
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