# WebdriverIO and Appium

WebdriverIO can act as the test client for Appium sessions covering Android and iOS native, hybrid, and mobile-web applications.

## What changes for mobile

- Capabilities identify a platform, automation engine, application, and device.
- Selectors may use accessibility identifiers or platform-specific strategies.
- Gestures, permissions, orientation, and application lifecycle become part of the test design.
- Emulators are fast and scalable; real devices provide confidence about hardware and vendor behavior.

```javascript
capabilities: [{
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android Emulator',
  'appium:app': '/path/to/app.apk',
}]
```

Cloud device providers can broaden coverage, but their latency, data handling, logs, and cost should be included in the strategy.
