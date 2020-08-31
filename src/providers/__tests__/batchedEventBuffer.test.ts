import { ConsoleProvider } from '../';
import { BatchedEventBuffer } from '../BatchedEventBuffer';

import { IAnalyticsProvider } from '../../types';

describe('BatchedEventBuffer >', () => {
    let provider: IAnalyticsProvider = new ConsoleProvider();
    let batchedEventBuffer: BatchedEventBuffer;
    beforeEach(() => {
        batchedEventBuffer = new BatchedEventBuffer(provider, {});
    });
    test('is defined', () => {
        expect(batchedEventBuffer).toBeDefined();
    });
});