import { IAnalyticsTracker, IPagePerformanceTrackerConfig, IRecordEvent, IEvent } from '../types';

const DEFAULT_CONFIG = {
    entryTypeNames: ['paint', 'resource', 'longtask']
};

export class PagePerformanceTracker implements IAnalyticsTracker {
    static trackerName: string = 'PagePerformance';

    private _config;

    private _provider;

    constructor(provider) {
        this._config = DEFAULT_CONFIG;
        this._provider = provider;
        this.track();
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

                const recordEvent: IRecordEvent = {
                    timestamp: Date.now(),
                    event
                };
                this._provider.record(recordEvent);
            });
        });
        observer.observe({ entryTypes: this._config.entryTypeNames });
    }
};