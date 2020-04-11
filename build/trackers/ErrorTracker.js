"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorTracker = /** @class */ (function () {
    function ErrorTracker(provider) {
        this._provider = provider;
    }
    ErrorTracker.prototype.getTrackerName = function () {
        return ErrorTracker.trackerName;
    };
    ErrorTracker.prototype.start = function () {
        this.track();
    };
    ErrorTracker.prototype.trackExecute = function (message, source, lineno, colno, error) {
        var event = {
            tracker: this.getTrackerName(),
            type: 'error',
            name: source || '',
            value: message,
            detail: { lineno: lineno, colno: colno, error: error }
        };
        this._provider.record(event);
    };
    ErrorTracker.prototype.track = function () {
        var _this = this;
        window.onerror = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.trackExecute.apply(_this, args);
        };
    };
    ErrorTracker.trackerName = 'Error';
    return ErrorTracker;
}());
exports.ErrorTracker = ErrorTracker;
;
