import { ConsoleProvider } from '../';
import { BatchedEventBuffer } from '../BatchedEventBuffer';

import { IAnalyticsProvider } from '../../types';

const MOCK_EVENT = new Event('test');

jest.useFakeTimers();

describe('BatchedEventBuffer >', () => {
    let provider: IAnalyticsProvider = new ConsoleProvider();;
    let providerSpy;
    let batchedEventBuffer: BatchedEventBuffer;
    beforeEach(() => {
        providerSpy = jest.spyOn(ConsoleProvider.prototype, 'send');
        batchedEventBuffer = new BatchedEventBuffer(provider, {});
    });
    test('is defined', () => {
        expect(batchedEventBuffer).toBeDefined();
    });
    test('put event adds event to _batchedEvents', () => {
        batchedEventBuffer.putEvent(MOCK_EVENT);
        expect(batchedEventBuffer.getBatchedEvents()).toEqual([MOCK_EVENT]);
    });
    test('flush events clears all batched events', () => {
        batchedEventBuffer.putEvent(MOCK_EVENT);
        expect(batchedEventBuffer.getBatchedEvents()).toEqual([MOCK_EVENT]);
        batchedEventBuffer.flushEvents();
        expect(batchedEventBuffer.getBatchedEvents()).toEqual([]);
    });
    test('sendBatchedEvents calls provider with array of batched events and flushes batched events', () => {
        batchedEventBuffer.putEvent(MOCK_EVENT);
        batchedEventBuffer.sendBatchedEvents();

        expect(providerSpy).toHaveBeenCalledWith(batchedEventBuffer.getBatchedEvents());
    });
    test('putEvent triggers a sendBatchedEvents after 1 second', () => {
        batchedEventBuffer.putEvent(MOCK_EVENT);

        jest.advanceTimersByTime(1000);
        expect(providerSpy).toHaveBeenCalledWith(batchedEventBuffer.getBatchedEvents());
    });
    test('window beforeunload event triggers sendBatchedEvents', () => {
        batchedEventBuffer.putEvent(MOCK_EVENT);
        window.dispatchEvent(new Event('beforeunload'));

        expect(providerSpy).toHaveBeenCalledWith(batchedEventBuffer.getBatchedEvents());
    });
});