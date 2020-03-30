import { IAnalyticsTracker } from '../types';

export class PagePerformanceTracker implements IAnalyticsTracker {
    static trackerName: string = 'PagePerformance';

    private _provider;

    constructor(provider) {
        this._provider = provider;
    }

    /**
     * get tracker name
     */
    public getTrackerName(): string {
        return PagePerformanceTracker.trackerName;
    }
};