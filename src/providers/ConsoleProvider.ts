import { v1 as uuid } from 'uuid';

import { IAnalyticsProvider, IEvent, IRecordEvent } from '../types';

export class ConsoleProvider implements IAnalyticsProvider {
    static providerName: string = 'Console';

    private _config;
    private _sessionId: string;

    constructor(config?) {
        this._config = config;
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
    public async record(event: IEvent) {
        const recordEvent: IRecordEvent = this.generateRecordEvent(event);

        /* tslint:disable-next-line no-console */
        console.log(recordEvent);

        return true;
    }
}