import { BaseTracker } from './BaseTracker';

import {
    IAnalyticsTracker,
    IPagePerformanceTrackerConfig,
    IEvent
} from '../types';

export const defaultPagePerformanceTrackerConfig: IPagePerformanceTrackerConfig = {
    entryTypeNames: ['paint']
};

export class PagePerformanceTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName = 'PagePerformance';

    private _config: IPagePerformanceTrackerConfig;

    constructor() {
        super();
        this._config = defaultPagePerformanceTrackerConfig;
    }

    /**
     * configure page performance tracker
     */
    public configure(config?: IPagePerformanceTrackerConfig): IPagePerformanceTrackerConfig {
        if (!config) return this._config;

        this._config = Object.assign({}, this._config, config);

        return this._config;
    }

    /**
     * get tracker name
     */
    public getTrackerName(): string {
        return PagePerformanceTracker.trackerName;
    }

    /**
     * starts the tracker
     */
    public start(): void {
        this.track();
    }

    /**
     * track page performance metrics
     */
    private track(): void {
        if (!window.PerformanceObserver) return;

        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const event: IEvent = {
                    tracker: this.getTrackerName(),
                    type: entry.entryType,
                    name: entry.name,
                    value: '',
                    detail: entry.toJSON()
                };

                if (entry.entryType === 'paint') {
                    event.value = entry.startTime;
                } else if (entry.entryType.match(/^(resource|longtask)$/)) {
                    event.value = entry.duration;
                }

                this._record(event);
            });
        });
        observer.observe({ entryTypes: this._config.entryTypeNames });
    }
}