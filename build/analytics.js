"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analytics = /** @class */ (function () {
    /**
     * initialize Analytics
     */
    function Analytics() {
        this._config = {};
        this._trackers = [];
    }
    /**
     * configure Analytics
     *
     * @param {IAnalyticsConfig} config
     */
    Analytics.prototype.configure = function (config) {
        if (!config)
            return this._config;
        this._config = Object.assign({}, this._config, config);
        return this._config;
    };
    /**
     * add an Analytics provider
     *
     * @param {IAnalyticsProvider} provider
     */
    Analytics.prototype.setProvider = function (provider) {
        this._provider = provider;
    };
    /**
     * get provider name
     */
    Analytics.prototype.getProviderName = function () {
        return this._provider.getProviderName();
    };
    /**
     * add tracker
     */
    Analytics.prototype.addTracker = function (tracker) {
        this._trackers.push(tracker);
    };
    /**
     * start analytics collection
     */
    Analytics.prototype.start = function () {
        var event = {
            tracker: '',
            type: 'analytics',
            name: 'initialize',
            value: '',
            detail: this._config.metadata || {}
        };
        this._provider.record(event);
        this.startTrackers();
    };
    /**
     * start trackers
     */
    Analytics.prototype.startTrackers = function () {
        this._trackers.forEach(function (tracker) { return tracker.start(); });
    };
    return Analytics;
}());
exports.default = Analytics;
