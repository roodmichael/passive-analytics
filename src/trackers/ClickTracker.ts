import { buildLeafNodeIdentifier, buildConcatenatedIdentifier } from '../lib';

import {
    IAnalyticsProvider,
    IAnalyticsTracker,
    IAnalyticsElementTrackerConfig,
    IEvent
} from '../types';

const defaultClickTrackerConfig: IAnalyticsElementTrackerConfig = {
    idAttribute: 'id'
};

export class ClickTracker implements IAnalyticsTracker {
    static trackerName: string = 'Click';

    private _provider: IAnalyticsProvider;

    private _config: IAnalyticsElementTrackerConfig;

    constructor(provider) {
        this._provider = provider;
        this._config = defaultClickTrackerConfig;
    }

    public configure(config: IAnalyticsElementTrackerConfig) {
        this._config = config;
    }

    public getTrackerName(): string {
        return ClickTracker.trackerName;
    }

    public start(): void {
        this.track();
    }

    public stop(): void {
        this.untrack();
    }

    private trackExecute(clickTarget: Element): void {
        const name = buildLeafNodeIdentifier(clickTarget, this._config.idAttribute);
        const value = buildConcatenatedIdentifier(clickTarget, this._config.idAttribute);
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'click',
            name,
            value,
            detail: {
                className: clickTarget.className,
                id: clickTarget.getAttribute(this._config.idAttribute),
                tagName: clickTarget.tagName,
                textContent: clickTarget.textContent
            }
        };
        this._provider.record(event);
    };

    /* local variable for addEventListener and removeEventListener */
    _trackExecute = (event: Event) => this.trackExecute(event.target as Element);

    private track(): void {
        document.querySelector('body').addEventListener('click', this._trackExecute);
    }

    private untrack(): void {
        document.querySelector('body').removeEventListener('click', this._trackExecute);
    }
};