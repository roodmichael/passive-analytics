import { IAnalyticsBaseTracker, IEvent } from '../types';

export class BaseTracker implements IAnalyticsBaseTracker {
    protected _record: (event: IEvent) => void;

    public setRecord(recordFunction: (event: IEvent) => void): void {
        this._record = recordFunction;
    }
}