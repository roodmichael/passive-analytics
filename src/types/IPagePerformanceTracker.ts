export enum SupportedPagePerformanceEntryTypes {
    PAINT = 'paint',
    RESOURCE = 'resource',
    EVENT = 'event'
}

type IPagePerformanceTrackerConfigSupportedEntryTypes = Array<
      SupportedPagePerformanceEntryTypes.PAINT
    | SupportedPagePerformanceEntryTypes.RESOURCE
    | SupportedPagePerformanceEntryTypes.EVENT>;

export interface IPagePerformanceTrackerConfig {
    /** Supported PerformanceObserver entryTypes **/
    entryTypeNames?: IPagePerformanceTrackerConfigSupportedEntryTypes
}