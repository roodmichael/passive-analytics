
import { debounce } from '../lib';

export class BatchedEventBuffer {
    private _provider;
    private _batchedEvents = [];
    private _wait = 1000;

    constructor(provider, params) {
        this._provider = provider;

        window.addEventListener('beforeunload', (event) => this.sendBatchedEvents());
    }

    putEvent(event) {
        this._batchedEvents.push(event);
        this.debounceSendEvents();
    }

    flushEvents() {
        this._batchedEvents = [];
    }

    sendBatchedEvents = () => {
        this._provider.send(this._batchedEvents)
            .then(() => this.flushEvents())
            .catch(() => {/* TODO */} );
    }

    debounceSendEvents = debounce(this.sendBatchedEvents, this._wait);
}