import { IAnalyticsTracker } from '../types';

export class PageViewTracker implements IAnalyticsTracker {
    static trackerName: string = 'PageView';

    private _provider;

    constructor(provider) {
        this._provider = provider;
    }

    public getTrackerName(): string {
        return PageViewTracker.trackerName;
    }

    start(): void {
        // TODO
    }
};