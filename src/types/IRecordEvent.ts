export type IEvent = {
    tracker: string;
    type: string;
    name: string;
    value: any;
    detail: any;
};

export type IRecordEvent = {
    session: string;
    timestamp: number;
    event: IEvent;
};
