"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_PERFORMANCE_ENTRIES = [
    { name: 'first-paint', entryType: 'paint', startTime: 0, toJSON: function () { return {}; } },
    { name: 'https://some.url', entryType: 'resource', duration: 0, toJSON: function () { return {}; } }
];
var MockPerformanceObserver = /** @class */ (function () {
    function MockPerformanceObserver(callback) {
        this._callback = callback;
    }
    MockPerformanceObserver.prototype.observe = function (options) {
        return this._callback({ getEntries: function () { return exports.MOCK_PERFORMANCE_ENTRIES; } });
    };
    return MockPerformanceObserver;
}());
exports.MockPerformanceObserver = MockPerformanceObserver;
;
