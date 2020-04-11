"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PageViewTracker = /** @class */ (function () {
    function PageViewTracker(provider) {
        this._provider = provider;
    }
    PageViewTracker.prototype.getTrackerName = function () {
        return PageViewTracker.trackerName;
    };
    PageViewTracker.prototype.start = function () {
        this.track();
    };
    PageViewTracker.prototype.trackExecute = function () {
        var event = {
            tracker: this.getTrackerName(),
            type: 'pageview',
            name: window.location.origin,
            value: window.location.pathname,
            detail: {}
        };
        this._provider.record(event);
    };
    PageViewTracker.prototype.track = function () {
        var _this = this;
        var originalPushState = window.history.pushState;
        window.history.pushState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            originalPushState.apply(window.history, args);
            _this.trackExecute();
        };
        var originalReplaceState = window.history.replaceState;
        window.history.replaceState = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            originalReplaceState.apply(window.history, args);
            _this.trackExecute();
        };
        window.addEventListener('popstate', function () { return _this.trackExecute(); });
        this.trackExecute();
    };
    PageViewTracker.trackerName = 'PageView';
    return PageViewTracker;
}());
exports.PageViewTracker = PageViewTracker;
;
