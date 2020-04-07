import { PagePerformanceTracker, DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG } from '../';
import { ConsoleProvider } from '../../providers';
import { MockPerformanceObserver, MOCK_PERFORMANCE_ENTRIES } from '../__mocks__';

import { IAnalyticsProvider, IAnalyticsTracker } from '../../types';

describe('Page Performance Tracker >', () => {
    describe('supported browsers', () => {
        let provider: IAnalyticsProvider;
        let tracker: IAnalyticsTracker;
        let trackerSpy;
        let providerSpy;
        beforeEach(() => {
            // @ts-ignore
            window.PerformanceObserver = MockPerformanceObserver;
            trackerSpy = jest.spyOn(window.PerformanceObserver.prototype, 'observe');
            providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

            provider = new ConsoleProvider();
            tracker = new PagePerformanceTracker(provider);
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
            expect(initialConfiguration).toStrictEqual(DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG );
            expect(trackerSpy).toHaveBeenCalledWith({ entryTypes: DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG.entryTypeNames });
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
            expect(providerSpy).toHaveBeenCalledTimes(MOCK_PERFORMANCE_ENTRIES.length);
        });
    });
    describe('unsupported browsers', () => {
        let provider: IAnalyticsProvider;
        let tracker: IAnalyticsTracker;
        let providerSpy;
        beforeEach(() => {
            window.PerformanceObserver = undefined;
            providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

            provider = new ConsoleProvider();
            tracker = new PagePerformanceTracker(provider);
        });
        test('Provider is not called', () => {
            tracker.start();
            expect(providerSpy).toHaveBeenCalledTimes(0);
        });
    });
});