import Analytics from './Analytics';
import { ConsoleProvider, CustomProvider } from './providers/';
import { ClickTracker, CustomLogTracker, ErrorTracker, InputTracker, PageViewTracker, PagePerformanceTracker } from './trackers/';

export {
    Analytics,
    ConsoleProvider,
    CustomProvider,
    ClickTracker,
    CustomLogTracker,
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
        CustomLogTracker,
        ErrorTracker,
        InputTracker,
        PageViewTracker,
        PagePerformanceTracker
    }
}