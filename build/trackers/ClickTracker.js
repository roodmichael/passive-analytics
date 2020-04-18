"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClickTracker = /** @class */ (function () {
    function ClickTracker(provider) {
        var _this = this;
        /* local variable for addEventListener and removeEventListener */
        this._trackExecute = function (event) { return _this.trackExecute(event.target); };
        this._provider = provider;
    }
    ClickTracker.prototype.getTrackerName = function () {
        return ClickTracker.trackerName;
    };
    ClickTracker.prototype.start = function () {
        this.track();
    };
    ClickTracker.prototype.stop = function () {
        this.untrack();
    };
    ClickTracker.prototype.buildLeafNodeIdentifier = function (element) {
        var tagName = element.tagName.toLowerCase();
        if (element.id) {
            return tagName + "[@id=\"" + element.id + "\"]";
        }
        if (element.className) {
            return tagName + "[@class=\"" + element.className + "\"]";
        }
        if (element.textContent) {
            return tagName + "[text()=\"" + element.textContent + "\"]";
        }
        return tagName;
    };
    ClickTracker.prototype.buildConcatenatedIdentifier = function (element) {
        if (element === document.body) {
            return '';
        }
        var identifier = element.id ? element.id + ':' : '';
        return this.buildConcatenatedIdentifier(element.parentElement) + identifier;
    };
    ClickTracker.prototype.trackExecute = function (clickTarget) {
        var name = this.buildLeafNodeIdentifier(clickTarget);
        var value = this.buildConcatenatedIdentifier(clickTarget) + name;
        var event = {
            tracker: this.getTrackerName(),
            type: 'click',
            name: name,
            value: value,
            detail: {
                className: clickTarget.className,
                id: clickTarget.id,
                tagName: clickTarget.tagName,
                textContent: clickTarget.textContent
            }
        };
        this._provider.record(event);
    };
    ;
    ClickTracker.prototype.track = function () {
        document.querySelector('body').addEventListener('click', this._trackExecute);
    };
    ClickTracker.prototype.untrack = function () {
        document.querySelector('body').removeEventListener('click', this._trackExecute);
    };
    ClickTracker.trackerName = 'Click';
    return ClickTracker;
}());
exports.ClickTracker = ClickTracker;
;
