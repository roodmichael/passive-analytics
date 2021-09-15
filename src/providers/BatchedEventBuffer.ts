import { IAnalyticsProvider, IRecordEvent } from '../types';
import { debounce } from '../lib';

export class BatchedEventBuffer {
    private _provider: IAnalyticsProvider;
    private _batchedEvents: IRecordEvent[] = [];
    private _wait = 1000;

    constructor(provider: IAnalyticsProvider) {
        this._provider = provider;

        window.addEventListener('beforeunload', () => this.sendBatchedEvents());
    }

    putEvent(event: IRecordEvent): void {
        this._batchedEvents.push(event);
        this.debounceSendEvents();
    }

    getBatchedEvents(): IRecordEvent[] {
        return this._batchedEvents;
    }

    flushEvents(): void {
        this._batchedEvents = [];
    }

    sendBatchedEvents = (): void => {
        this._provider.send(this._batchedEvents)
            .then(() => this.flushEvents())
            .catch(() => {/* TODO */} );
    }

    debounceSendEvents = debounce(this.sendBatchedEvents, this._wait);
}