import { buildConcatenatedIdentifier } from '../lib';
import { BaseTracker } from './BaseTracker';

import {
    IAnalyticsTracker,
    IAnalyticsElementTrackerConfig,
    IEvent
} from '../types';

const defaultInputTrackerConfig: IAnalyticsElementTrackerConfig = {
    idAttribute: 'id'
};

export class InputTracker extends BaseTracker implements IAnalyticsTracker {
    static trackerName: string = 'Input';

    private _config: IAnalyticsElementTrackerConfig;

    constructor() {
        super();
        this._config = defaultInputTrackerConfig;
    }

    public configure(config: IAnalyticsElementTrackerConfig) {
        this._config = config;
    }

    public getTrackerName(): string {
        return InputTracker.trackerName;
    }

    public start(): void {
        this.track();
    }

    public stop(): void {
        this.untrack();
    }

    private trackExecute(target: HTMLInputElement): void {
        const name = buildConcatenatedIdentifier(target, this._config.idAttribute);
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'onchange',
            name,
            value: target.value,
            detail: {
                className: target.className,
                id: target.getAttribute(this._config.idAttribute),
                tagName: target.tagName
            }
        };
        this._record(event);
    }

    /* local variable for addEventListener and removeEventListener */
    _trackExecute = (event: Event) => this.trackExecute(event.target as HTMLInputElement);

    private track(): void {
        document.querySelector('body').addEventListener('change', this._trackExecute);
    }

    private untrack(): void {
        document.querySelector('body').removeEventListener('change', this._trackExecute);
    }
};