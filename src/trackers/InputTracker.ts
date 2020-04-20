import { buildLeafNodeIdentifier, buildConcatenatedIdentifier } from '../lib';

import { IAnalyticsTracker, IEvent } from '../types';

export class InputTracker implements IAnalyticsTracker {
    static trackerName: string = 'Input';

    private _provider;

    constructor(provider) {
        this._provider = provider;
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
        const name = buildConcatenatedIdentifier(target);
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'onchange',
            name,
            value: target.value,
            detail: {
                className: target.className,
                id: target.id,
                tagName: target.tagName
            }
        };
        this._provider.record(event);
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