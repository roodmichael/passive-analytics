export type IEvent = {
    tracker: string;
    type: string;
    name: string;
    value: any;
    detail: any;
};

export type IRecordEvent = {
    timestamp: number;
    event: IEvent;
};
