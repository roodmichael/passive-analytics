import { CustomProvider } from '../';
import { BatchedEventBuffer } from '../BatchedEventBuffer';

import { IAnalyticsProvider } from '../../types';

jest.useFakeTimers();
jest.mock('../BatchedEventBuffer');

describe('Console Provider >', () => {
    let provider: IAnalyticsProvider;
    let mockSendCallback = jest.fn();
    beforeEach(() => {
        provider = new CustomProvider(mockSendCallback);
    });
    test('is defined', () => {
        expect(provider).toBeDefined();
    });
    test('METHOD getProviderName returns appropriate name', () => {
        expect(provider.getProviderName()).toEqual('CustomProvider');
    });
    test('METHOD record generates a valid record event from an event', () => {
        provider.record({tracker: '', type: '', name: '', value: '', detail: ''});
        expect(BatchedEventBuffer.prototype.putEvent).toHaveBeenCalled();
    });
});