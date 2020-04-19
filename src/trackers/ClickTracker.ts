import { buildLeafNodeIdentifier, buildConcatenatedIdentifier } from '../lib';

import { IAnalyticsTracker, IEvent } from '../types';

export class ClickTracker implements IAnalyticsTracker {
    static trackerName: string = 'Click';

    private _provider;

    constructor(provider) {
        this._provider = provider;
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
        const name = buildLeafNodeIdentifier(clickTarget);
        const value = buildConcatenatedIdentifier(clickTarget);
        const event: IEvent = {
            tracker: this.getTrackerName(),
            type: 'click',
            name,
            value,
            detail: {
                className: clickTarget.className,
                id: clickTarget.id,
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