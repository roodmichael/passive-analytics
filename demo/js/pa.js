var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define("types/IAnalytics", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/IAnalyticsProvider", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
});
define("types/IAnalyticsTracker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/IAnalyticsTrackerConfig", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/IPagePerformanceTracker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/IRecordEvent", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("types/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Analytics", ["require", "exports"], function (require, exports) {
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
});
define("providers/ConsoleProvider", ["require", "exports", "uuid"], function (require, exports, uuid_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ConsoleProvider = /** @class */ (function () {
        function ConsoleProvider(config) {
            this._config = config;
        }
        /**
         * get provider name
         */
        ConsoleProvider.prototype.getProviderName = function () {
            return ConsoleProvider.providerName;
        };
        /**
         * Generates a record event.
         * @param event event to log
         */
        ConsoleProvider.prototype.generateRecordEvent = function (event) {
            this._sessionId = this._sessionId || uuid_1.v1();
            var timestamp = Date.now();
            return { session: this._sessionId, timestamp: timestamp, event: event };
        };
        /**
         * record event
         */
        ConsoleProvider.prototype.record = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var recordEvent;
                return __generator(this, function (_a) {
                    recordEvent = this.generateRecordEvent(event);
                    /* tslint:disable-next-line no-console */
                    console.log(recordEvent);
                    return [2 /*return*/, true];
                });
            });
        };
        ConsoleProvider.providerName = 'Console';
        return ConsoleProvider;
    }());
    exports.ConsoleProvider = ConsoleProvider;
});
define("providers/index", ["require", "exports", "providers/ConsoleProvider"], function (require, exports, ConsoleProvider_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ConsoleProvider_1);
});
define("lib/Identifiers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildLeafNodeIdentifier = function (element, id) {
        var tagName = element.tagName.toLowerCase();
        if (element.getAttribute(id)) {
            return tagName + "[@" + id + "=\"" + element.getAttribute(id) + "\"]";
        }
        if (element.className) {
            return tagName + "[@class=\"" + element.className + "\"]";
        }
        if (element.textContent) {
            return tagName + "[text()=\"" + element.textContent + "\"]";
        }
        return tagName;
    };
    exports.buildConcatenatedIdentifier = function (element, id, isParent) {
        if (element === document.body) {
            return '';
        }
        var identifier = exports.buildLeafNodeIdentifier(element, id);
        if (isParent) {
            identifier = element.getAttribute(id) ? element.getAttribute(id) + ":" : '';
        }
        return exports.buildConcatenatedIdentifier(element.parentElement, id, true) + identifier;
    };
});
define("lib/index", ["require", "exports", "lib/Identifiers"], function (require, exports, Identifiers_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(Identifiers_1);
});
define("trackers/ClickTracker", ["require", "exports", "lib/index"], function (require, exports, lib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultClickTrackerConfig = {
        idAttribute: 'id'
    };
    var ClickTracker = /** @class */ (function () {
        function ClickTracker(provider) {
            var _this = this;
            /* local variable for addEventListener and removeEventListener */
            this._trackExecute = function (event) { return _this.trackExecute(event.target); };
            this._provider = provider;
            this._config = defaultClickTrackerConfig;
        }
        ClickTracker.prototype.configure = function (config) {
            this._config = config;
        };
        ClickTracker.prototype.getTrackerName = function () {
            return ClickTracker.trackerName;
        };
        ClickTracker.prototype.start = function () {
            this.track();
        };
        ClickTracker.prototype.stop = function () {
            this.untrack();
        };
        ClickTracker.prototype.trackExecute = function (clickTarget) {
            var name = lib_1.buildLeafNodeIdentifier(clickTarget, this._config.idAttribute);
            var value = lib_1.buildConcatenatedIdentifier(clickTarget, this._config.idAttribute);
            var event = {
                tracker: this.getTrackerName(),
                type: 'click',
                name: name,
                value: value,
                detail: {
                    className: clickTarget.className,
                    id: clickTarget.getAttribute(this._config.idAttribute),
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
});
define("trackers/ErrorTracker", ["require", "exports"], function (require, exports) {
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
});
define("trackers/InputTracker", ["require", "exports", "lib/index"], function (require, exports, lib_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultInputTrackerConfig = {
        idAttribute: 'id'
    };
    var InputTracker = /** @class */ (function () {
        function InputTracker(provider) {
            var _this = this;
            /* local variable for addEventListener and removeEventListener */
            this._trackExecute = function (event) { return _this.trackExecute(event.target); };
            this._provider = provider;
            this._config = defaultInputTrackerConfig;
        }
        InputTracker.prototype.configure = function (config) {
            this._config = config;
        };
        InputTracker.prototype.getTrackerName = function () {
            return InputTracker.trackerName;
        };
        InputTracker.prototype.start = function () {
            this.track();
        };
        InputTracker.prototype.stop = function () {
            this.untrack();
        };
        InputTracker.prototype.trackExecute = function (target) {
            var name = lib_2.buildConcatenatedIdentifier(target, this._config.idAttribute);
            var event = {
                tracker: this.getTrackerName(),
                type: 'onchange',
                name: name,
                value: target.value,
                detail: {
                    className: target.className,
                    id: target.getAttribute(this._config.idAttribute),
                    tagName: target.tagName
                }
            };
            this._provider.record(event);
        };
        InputTracker.prototype.track = function () {
            document.querySelector('body').addEventListener('change', this._trackExecute);
        };
        InputTracker.prototype.untrack = function () {
            document.querySelector('body').removeEventListener('change', this._trackExecute);
        };
        InputTracker.trackerName = 'Input';
        return InputTracker;
    }());
    exports.InputTracker = InputTracker;
    ;
});
define("trackers/PagePerformanceTracker", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultPagePerformanceTrackerConfig = {
        entryTypeNames: ['paint', 'resource']
    };
    var PagePerformanceTracker = /** @class */ (function () {
        function PagePerformanceTracker(provider) {
            this._config = exports.defaultPagePerformanceTrackerConfig;
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
});
define("trackers/PageViewTracker", ["require", "exports"], function (require, exports) {
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
});
define("trackers/index", ["require", "exports", "trackers/ClickTracker", "trackers/ErrorTracker", "trackers/InputTracker", "trackers/PagePerformanceTracker", "trackers/PageViewTracker"], function (require, exports, ClickTracker_1, ErrorTracker_1, InputTracker_1, PagePerformanceTracker_1, PageViewTracker_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ClickTracker_1);
    __export(ErrorTracker_1);
    __export(InputTracker_1);
    __export(PagePerformanceTracker_1);
    __export(PageViewTracker_1);
});
define("index", ["require", "exports", "Analytics", "providers/index", "trackers/index"], function (require, exports, Analytics_1, providers_1, trackers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Analytics = Analytics_1.default;
    exports.ConsoleProvider = providers_1.ConsoleProvider;
    exports.ClickTracker = trackers_1.ClickTracker;
    exports.ErrorTracker = trackers_1.ErrorTracker;
    exports.InputTracker = trackers_1.InputTracker;
    exports.PageViewTracker = trackers_1.PageViewTracker;
    exports.PagePerformanceTracker = trackers_1.PagePerformanceTracker;
});
