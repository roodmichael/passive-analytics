import { IAnalyticsTracker, IPagePerformanceTrackerConfig, IRecordEvent, IEvent } from '../types';

export const DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG = {
    entryTypeNames: ['paint', 'resource', 'longtask']
};

export class PagePerformanceTracker implements IAnalyticsTracker {
    static trackerName: string = 'PagePerformance';

    private _config;

    private _provider;

    constructor(provider) {
        this._config = DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG;
        this._provider = provider;
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
                    detail: entry
                };

                if (entry.entryType === 'paint') {
                    event.value = entry.startTime;
                } else if (entry.entryType.match(/^(resource|longtask)$/)) {
                    event.value = entry.duration;
                }

                this._provider.record(event);
            });
        });
        observer.observe({ entryTypes: this._config.entryTypeNames });
    }
};