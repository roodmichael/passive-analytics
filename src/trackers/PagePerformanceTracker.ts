import { BaseTracker } from './BaseTracker';
import { pagePerformanceTrackerEntryTypes } from './PagePerformanceTrackerEntries';

import {
    IAnalyticsTracker,
    IPagePerformanceTrackerConfig,
    IEvent,
    SupportedPagePerformanceEntryTypes
} from '../types';

export const defaultPagePerformanceTrackerConfig: IPagePerformanceTrackerConfig = {
    entryTypeNames: [SupportedPagePerformanceEntryTypes.PAINT, SupportedPagePerformanceEntryTypes.RESOURCE]
};

export class PagePerformanceTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName = 'PagePerformance';

    private _config: IPagePerformanceTrackerConfig;

    constructor(config?: IPagePerformanceTrackerConfig) {
        super();
        this._config = config || defaultPagePerformanceTrackerConfig;
    }

    public configure(config?: IPagePerformanceTrackerConfig): IPagePerformanceTrackerConfig {
        if (!config) return this._config;

        this._config = Object.assign({}, this._config, config);

        return this._config;
    }

    public getTrackerName(): string {
        return PagePerformanceTracker.trackerName;
    }

    public start(): void {
        this.track();
    }

    private track(): void {
        if (!window.PerformanceObserver) return;

        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const performanceTrackerEntry = pagePerformanceTrackerEntryTypes[entry.entryType];
                const event: IEvent = new performanceTrackerEntry(this.getTrackerName(), entry);

                this._record(event);
            });
        });
        observer.observe({ entryTypes: this._config.entryTypeNames });
    }
}