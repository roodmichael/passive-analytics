import { PagePerformanceTracker, defaultPagePerformanceTrackerConfig } from '../';
import { MockPerformanceObserver, MOCK_PERFORMANCE_ENTRIES } from '../__mocks__';

import { IAnalyticsTracker, IEvent } from '../../types';

describe('Page Performance Tracker >', () => {
    describe('supported browsers', () => {
        let tracker: IAnalyticsTracker;
        let trackerSpy;
        let recordSpy;
        beforeEach(() => {
            // @ts-ignore
            window.PerformanceObserver = MockPerformanceObserver;
            trackerSpy = jest.spyOn(window.PerformanceObserver.prototype, 'observe');
            recordSpy = jest.fn();

            tracker = new PagePerformanceTracker();
            tracker.setRecord((event) => recordSpy(event));
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        test('is defined', () => {
            expect(tracker).toBeDefined();
        });
        test('Performance Observer is called with default entry types', () => {
            const initialConfiguration = tracker.configure();
            tracker.start();
            expect(initialConfiguration).toStrictEqual(defaultPagePerformanceTrackerConfig);
            expect(trackerSpy).toHaveBeenCalledWith({ entryTypes: defaultPagePerformanceTrackerConfig.entryTypeNames });
        });
        test('Performance Observer is called with custom entry types', () => {
            const initialEntryTypes = ['paint'];
            const initialConfiguration = tracker.configure({ entryTypeNames: initialEntryTypes });
            tracker.start();
            expect(initialConfiguration).toStrictEqual({ entryTypeNames: initialEntryTypes });
            expect(trackerSpy).toHaveBeenCalledWith({ entryTypes: initialEntryTypes });
        });
        test('Provider is called correct number of times', () => {
            tracker.start();
            expect(recordSpy).toHaveBeenCalledTimes(MOCK_PERFORMANCE_ENTRIES.length);
        });
    });
    describe('unsupported browsers', () => {
        let tracker: IAnalyticsTracker;
        let recordSpy;
        beforeEach(() => {
            window.PerformanceObserver = undefined;
            recordSpy = jest.fn();

            tracker = new PagePerformanceTracker();
            tracker.setRecord((event: IEvent) => recordSpy(event));
        });
        test('Provider is not called', () => {
            tracker.start();
            expect(recordSpy).toHaveBeenCalledTimes(0);
        });
    });
});