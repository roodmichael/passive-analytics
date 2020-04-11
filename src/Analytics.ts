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
    public setProvider(provider: IAnalyticsProvider) {
        this._provider = provider;
    }

    /**
     * get provider name
     */
    public getProviderName() {
        return this._provider.getProviderName();
    }

    /**
     * add tracker
     */
    public addTracker(tracker: IAnalyticsTracker) {
        this._trackers.push(tracker);
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