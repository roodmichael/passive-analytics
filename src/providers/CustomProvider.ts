import { v1 as uuid } from 'uuid';

import { BatchedEventBuffer } from './BatchedEventBuffer';

import { IAnalyticsProvider, IEvent, IRecordEvent } from '../types';

export class CustomProvider implements IAnalyticsProvider {
    static providerName: string = 'CustomProvider';

    private _customCallback;
    private _config;
    private _sessionId: string;
    private _buffer: BatchedEventBuffer;

    constructor(_customCallback, _config?) {
        this._customCallback = _customCallback;
        this._config = _config;
        this._buffer = new BatchedEventBuffer(this, { wait: 1000 });
    }

    /**
     * get provider name
     */
    public getProviderName(): string {
        return CustomProvider.providerName;
    }

    /**
     * get session id
     */
    public getSessionId(): string {
        return this._sessionId;
    }

    /**
     * sets session id used by provider
     * @param sessionId session id
     */
    public setSessionId(sessionId: string) {
        if (!sessionId) {
            return;
        }

        this._sessionId = sessionId;
    }

    /**
     * record event
     */
    public record(event: IEvent) {
        const recordEvent: IRecordEvent = this.generateRecordEvent(event);

        this._buffer.putEvent(recordEvent);
    }

    /**
     * Call custom callback provided
     * @param recordEvent recordEvent returned to customer
     */
    public async send(recordEvents: IRecordEvent[]) {
        return this._customCallback(this._config.path, { events: recordEvents } );
    }

    /**
     * Generates a record event.
     * @param event event to log
     */
    generateRecordEvent(event: IEvent): IRecordEvent {
        this._sessionId = this._sessionId || uuid();
        const timestamp = Date.now();

        return { session: this._sessionId, timestamp, event };
    }
}