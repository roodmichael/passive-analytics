export type IEvent = {
    tracker: string;
    type: string;
    name: string;
    value: string | number;
    detail: string | Record<string, unknown>;
};

export type IRecordEvent = {
    session: string;
    timestamp: number;
    event: IEvent;
};
