import { v1 as uuid } from 'uuid';

import { BatchedEventBuffer } from './BatchedEventBuffer';

import { IAnalyticsProvider, IEvent, IRecordEvent } from '../types';

export class ConsoleProvider implements IAnalyticsProvider {
    static providerName: string = 'Console';

    private _config;
    private _sessionId: string;
    private _buffer: BatchedEventBuffer;

    constructor(config?) {
        this._config = config;
        this._buffer = new BatchedEventBuffer(this, { wait: 3000 });
    }

    /**
     * get provider name
     */
    getProviderName(): string {
        return ConsoleProvider.providerName;
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

    /**
     * record event
     */
    public record(event: IEvent) {
        const recordEvent: IRecordEvent = this.generateRecordEvent(event);

        this._buffer.putEvent(recordEvent);
    }

    public async send(recordEvents: IRecordEvent[]) {
        /* tslint:disable-next-line no-console */
        console.log({ events: recordEvents });

        return true;
    }
}