import { v1 as uuid } from 'uuid';

import { IAnalyticsProvider, IRecordEvent } from '../types';

export class ConsoleProvider implements IAnalyticsProvider {
    static providerName: string = 'Console';

    private _config;
    private _sessionId: string;
    private _sessionStartTimestamp: number;

    constructor(config?) {
        this._sessionId = this._sessionId || uuid();
        this._sessionStartTimestamp = new Date().getTime();
    }

    /**
     * get provider name
     */
    getProviderName(): string {
        return ConsoleProvider.providerName;
    }

    /**
     * record event
     */
    public async record(event: IRecordEvent) {
        /* tslint:disable-next-line no-console */
        console.log(event);

        return true;
    }
}