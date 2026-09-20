# WebdriverIO Configuration and Capabilities

Capabilities describe the browser, platform, or device session WebdriverIO should create.

```javascript
export const config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  maxInstances: 4,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless=new', '--window-size=1440,900'],
    },
  }],
  framework: 'mocha',
  reporters: ['spec'],
};
```

Capabilities may select a browser version, platform, mobile device, vendor options, or headless mode. A mismatch between the driver/provider and requested capability can prevent session creation.

Keep environment-specific endpoints and credentials in environment variables or secret stores. Keep stable runner behavior in the version-controlled configuration.
