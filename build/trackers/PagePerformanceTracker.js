"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG = {
    entryTypeNames: ['paint', 'resource', 'longtask']
};
var PagePerformanceTracker = /** @class */ (function () {
    function PagePerformanceTracker(provider) {
        this._config = exports.DEFAULT_PAGE_PERFORMANCE_TRACKER_CONFIG;
        this._provider = provider;
    }
    /**
     * configure page performance tracker
     */
    PagePerformanceTracker.prototype.configure = function (config) {
        if (!config)
            return this._config;
        this._config = Object.assign({}, this._config, config);
        return this._config;
    };
    /**
     * get tracker name
     */
    PagePerformanceTracker.prototype.getTrackerName = function () {
        return PagePerformanceTracker.trackerName;
    };
    /**
     * starts the tracker
     */
    PagePerformanceTracker.prototype.start = function () {
        this.track();
    };
    /**
     * track page performance metrics
     */
    PagePerformanceTracker.prototype.track = function () {
        var _this = this;
        if (!window.PerformanceObserver)
            return;
        var observer = new PerformanceObserver(function (list) {
            list.getEntries().forEach(function (entry) {
                var event = {
                    tracker: _this.getTrackerName(),
                    type: entry.entryType,
                    name: entry.name,
                    value: '',
                    detail: entry.toJSON()
                };
                if (entry.entryType === 'paint') {
                    event.value = entry.startTime;
                }
                else if (entry.entryType.match(/^(resource|longtask)$/)) {
                    event.value = entry.duration;
                }
                _this._provider.record(event);
            });
        });
        observer.observe({ entryTypes: this._config.entryTypeNames });
    };
    PagePerformanceTracker.trackerName = 'PagePerformance';
    return PagePerformanceTracker;
}());
exports.PagePerformanceTracker = PagePerformanceTracker;
;
