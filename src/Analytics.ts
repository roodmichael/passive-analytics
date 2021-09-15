import { IAnalyticsConfig, IAnalyticsProvider, IAnalyticsTracker, IEvent } from './types';

export default class Analytics {

    private _config: IAnalyticsConfig;

    private _provider: IAnalyticsProvider;

    private _trackers: Array<IAnalyticsTracker>;

    /**
     * initialize Analytics
     */
    constructor() {
        this._config = {};
        this._trackers = [];

        return this;
    }

    /**
     * configure Analytics
     *
     * @param {IAnalyticsConfig} config 
     */
    public configure(config?: IAnalyticsConfig): IAnalyticsConfig {
        if (!config) return this._config;

        this._config = Object.assign({}, this._config, config);

        return this._config;
    }

    /**
     * add an Analytics provider
     * 
     * @param {IAnalyticsProvider} provider 
     */
    public setProvider(provider: IAnalyticsProvider): Analytics {
        this._provider = provider;

        return this;
    }

    /**
     * get provider name
     */
    public getProviderName(): string {
        return this._provider.getProviderName();
    }

    /**
     * add tracker
     */
    public addTracker(tracker: IAnalyticsTracker): Analytics {
        tracker.setRecord((event: IEvent) => this._provider.record(event));
        this._trackers.push(tracker);

        return this;
    }

    /**
     * start analytics collection
     */
    public start(): void {
        const event: IEvent = {
            tracker: '',
            type: 'analytics',
            name: 'initialize',
            value: '',
            detail: this._config.metadata || {}
        };
        this._provider.record(event);

        this.startTrackers();
    }

    /**
     * start trackers
     */
    private startTrackers(): void {
        this._trackers.forEach((tracker) => tracker.start());
    }
}