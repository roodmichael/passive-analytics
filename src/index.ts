import Analytics from './Analytics';
import { ConsoleProvider, CustomProvider } from './providers/';
import { ClickTracker, ErrorTracker, InputTracker, PageViewTracker, PagePerformanceTracker } from './trackers/';

export {
    Analytics,
    ConsoleProvider,
    CustomProvider,
    ClickTracker,
    ErrorTracker,
    InputTracker,
    PageViewTracker,
    PagePerformanceTracker
};

if (window) {
    (window as any).pa = {
        Analytics,
        ConsoleProvider,
        CustomProvider,
        ClickTracker,
        ErrorTracker,
        InputTracker,
        PageViewTracker,
        PagePerformanceTracker
    }
}