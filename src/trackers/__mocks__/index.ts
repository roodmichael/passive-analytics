export const MOCK_PERFORMANCE_ENTRIES = [
    { name: 'first-paint', entryType: 'paint', startTime: 0 },
    { name: 'https://some.url', entryType: 'resource', duration: 0 }
];

export class MockPerformanceObserver {
    private _callback;

    constructor(callback: any) {
        this._callback = callback;
    }

    public observe(options: any) {
        return this._callback({ getEntries: () => MOCK_PERFORMANCE_ENTRIES });
    }
};