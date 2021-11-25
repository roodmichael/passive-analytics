import { IEvent, SupportedPagePerformanceEntryTypes } from '../types';

const PagePerformanceTrackerEntryPaintTiming = (trackerName: string, entry: PerformancePaintTiming): IEvent => ({
    tracker: trackerName,
    type: entry.entryType,
    name: entry.name,
    value: entry.startTime,
    detail: entry.toJSON()
});

const PagePerformanceTrackerEntryResourceTiming = (trackerName: string, entry: PerformanceResourceTiming): IEvent => ({
    tracker: trackerName,
    type: entry.entryType,
    name: entry.name,
    value: entry.duration,
    detail: entry.toJSON()
});

const PagePerformanceTrackerEntryEventTiming = (trackerName: string, entry: PerformanceEventTiming): IEvent => ({
    tracker: trackerName,
    type: entry.entryType,
    name: entry.name,
    value: entry.duration,
    detail: entry.toJSON()
});

export const pagePerformanceTrackerEntryTypes = {
    [SupportedPagePerformanceEntryTypes.PAINT]: PagePerformanceTrackerEntryPaintTiming,
    [SupportedPagePerformanceEntryTypes.RESOURCE]: PagePerformanceTrackerEntryResourceTiming,
    [SupportedPagePerformanceEntryTypes.EVENT]: PagePerformanceTrackerEntryEventTiming
};