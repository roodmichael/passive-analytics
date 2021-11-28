import { CustomLogTracker } from '../';

import { IEvent } from '../../types';

const MOCK_LOG_NAME = 'name';
const MOCK_LOG_VALUE = 'value';
const MOCK_LOG_DETAIL = { 'name': 'value' };
const MOCK_LOG_DETAIL_STRING = 'detail_string';

describe('Custom Log Tracker >', () => {
    let recordSpy;
    let tracker;

    beforeEach(() => {
        global.pa = {};
        recordSpy = jest.fn();

        tracker = new CustomLogTracker();
        tracker.setRecord((event: IEvent) => recordSpy(event));
    })
    afterEach(() => {
        tracker.stop();
        jest.clearAllMocks();
    })
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('CustomLog');
    });
    test('does nothing if not started', () => {
        expect(recordSpy).toHaveBeenCalledTimes(0);
    });
    test('records info with detail', () => {
        tracker.start();
        global.pa.log.info(MOCK_LOG_NAME, MOCK_LOG_VALUE, MOCK_LOG_DETAIL);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "info"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": MOCK_LOG_DETAIL}));
    });
    test('records info without detail', () => {
        tracker.start();
        global.pa.log.info(MOCK_LOG_NAME, MOCK_LOG_VALUE);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "info"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": {}}));
    });
    test('records warn with detail object', () => {
        tracker.start();
        global.pa.log.warn(MOCK_LOG_NAME, MOCK_LOG_VALUE, MOCK_LOG_DETAIL);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "warn"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": MOCK_LOG_DETAIL}));
    });
    test('records warn with detail string', () => {
        tracker.start();
        global.pa.log.warn(MOCK_LOG_NAME, MOCK_LOG_VALUE, MOCK_LOG_DETAIL);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "warn"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": MOCK_LOG_DETAIL}));
    });
    test('records warn without detail', () => {
        tracker.start();
        global.pa.log.warn(MOCK_LOG_NAME, MOCK_LOG_VALUE);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "warn"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": {}}));
    });
    test('records error with detail', () => {
        tracker.start();
        global.pa.log.error(MOCK_LOG_NAME, MOCK_LOG_VALUE, MOCK_LOG_DETAIL);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "error"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": MOCK_LOG_DETAIL}));
    });
    test('records warn without detail', () => {
        tracker.start();
        global.pa.log.error(MOCK_LOG_NAME, MOCK_LOG_VALUE);
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"type": "error"}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": MOCK_LOG_NAME}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"value": MOCK_LOG_VALUE}));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"detail": {}}));
    });
});