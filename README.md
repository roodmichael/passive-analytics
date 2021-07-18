# Passive Analytics

> A lightweight pluggable framework for collecting web application usage.

Passive Analytics is a personal project to explore passive metrics collection patterns that do not pollute the codebase with metrics related code. Because this is a side project, I make no promises and do not recommend using it for any serious purposes.

## Purpose

The goal of this project is to eliminate explicit metrics related code from web applications, especially code like click handlers on components, analytics code in React lifecycle methods, and wrappers around your API library.

For example, below is a common pattern for logging a button click. In trivial examples like this, logging custom events in the component onClick handler seems reasonable. At scale, however, polluting your code with these analytics logs becomes both difficult to maintain and difficult to grok.

```js
import React from 'react';
import Analytics from 'some-analytics-library';

const ContactForm = () => (
  <form>
    <button
      onClick={() => {
        Analytics.logCustom({ name: 'submit-form', value: 'submit-button' });
      }}
    >
      Submit
    </button>
  </form>
);
```

Issues I've seen with this pattern in production include:

* Pollutes codebase with analytics logs and attributes
* Attribute naming becomes inconsistent over time
* Anchor tags will need to actually be Javascript links if they also need to log an event
* The analytics library needs to be mocked during unit tests

Instead, this library proposes that a global click handler be running in the background that tracks clicks to any element (or whitelisted elements). Then builds an ID based on the ID attribute, a custom attribute, class, or some other identifying information. For example, the above toy example would become:

```js
import React from 'react';

const ContactForm = () => (
  <form id="contact-form">
    <button id="submit"
    >
      Submit
    </button>
  </form>
);
```

The following click event would be produced from the above element. Note the value of the button click event includes "contact-form". Concatenating parent IDs allows us to namespace events for easier identification of reusable components.

```json
{
  "event": {
    "tracker": "Click",
    "type": "click",
    "name": "button[@id='submit']",
    "value": "contact-form:submit:button[@id='submit']",
    "detail": {
      "className": "",
      "id": "submit",
      "tagName": "button",
      "textContent": "Submit"
    }
  },
  "session": "uuid",
  "timestamp": 1587310932364
}
```

## Features / Trackers

The following trackers are available:

* [Clicks](src/trackers/ClickTracker.ts) - Record clicks to any element on the page
* [Errors](src/trackers/ErrorTracker.ts) - Records all Javascript errors
* [Inputs](src/trackers/InputTracker.ts) - Record change events from input, textarea, and select elements
* [Performance](src/trackers/PagePerformanceTracker.ts) - Record [paint](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming) and [resource](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming), events from the [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
* [Page Views](src/trackers/PageViewTracker.ts) - Record pageviews using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

## Reasons Not to Use

A few reasons why you might not want to use this library.

* You require support
* You do not want a comprehensive analytics solution (This library, although configurable, assumes you want comprehensive analytics)
* You do not have hooks into the front-end framework you are using

## Installation

```sh
npm install passive-analytics --save
```

## Usage example

Somewhere in your app, configure passive-analytics with your desired provider and trackers.

```js
import Analytics, {
  ConsoleProvider,
  PagePerformanceTracker,
  PageViewTracker,
  ErrorTracker,
  ClickTracker
} from 'passive-analytics';

const analytics = new Analytics();
const analyticsProvider = new ConsoleProvider();
const pagePerformanceTracker = new PagePerformanceTracker();
const pageViewTracker = new PageViewTracker();
const errorTracker = new ErrorTracker();
const clickTracker = new ClickTracker();
analytics.setProvider(analyticsProvider);
analytics.addTracker(pagePerformanceTracker);
analytics.addTracker(pageViewTracker);
analytics.addTracker(errorTracker);
analytics.addTracker(clickTracker);
analytics.start();
```

That's it! Once you've configured Analytics, events will start flowing in the background.

## Development setup

1. Install passive-analytics locally.

```sh
npm install
npm run test
npm run build
```

2. Uninstall local module from your applications folder if applicable.

```sh
npm un passive-analytics
```

3. Create a link from your passive-analytics module folder.

```sh
npm link
```

4. From your applications folder, use the link you created.

```sh
npm link passive-analytics
```

## Release History

* 0.0.1
  * Work in progress

## Meta

Distributed under the MIT license. See ``LICENSE`` for more information.

[https://github.com/roodmichael](https://github.com/roodmichael)

## Contributing

I welcome contributions to passive-analytics in the form of questions, issue reporting, and bug fixes.

1. Fork it (<https://github.com/roodmichael/passive-analytics>)
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Added a cool new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a new Pull Request
