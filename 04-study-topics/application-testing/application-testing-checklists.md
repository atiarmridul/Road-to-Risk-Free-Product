# Web and Mobile Application Testing Checklists

> **সহজভাবে / In simple words:** A checklist reminds testers about common web and mobile risks.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** It supports thinking but must be adapted to the actual users and product.


Use checklists as risk prompts, not as substitutes for product-specific test design.

## Web application checklist

- Critical user journeys and business rules
- Forms, validation, navigation, links, and error recovery
- Authentication, authorization, session timeout, and logout
- Supported browsers, viewport sizes, zoom, keyboard, and accessibility
- API failures, slow networks, caching, and interrupted requests
- Cookies, privacy, sensitive-data exposure, and common security risks
- Performance of critical pages and high-traffic operations
- Analytics, logging, monitoring, and production smoke readiness

## Mobile application checklist

- Supported OS versions, devices, screen sizes, and orientations
- Install, upgrade, uninstall, first launch, and data migration
- Gestures, navigation, deep links, keyboard, and accessibility
- Permissions: deny, allow, revoke, and limited access
- Background/foreground transitions, interruptions, and app termination
- Offline, weak network, network switching, and retry behavior
- Battery, memory, storage, temperature, and long-session behavior
- Notifications, time zones, localization, and device settings
- Store build, signing, privacy disclosures, analytics, crash reporting, and rollback

## Prioritization

Start with revenue, safety, data integrity, authentication, and frequently used flows. Add platform-specific checks based on analytics and supported-market commitments rather than testing every combination equally.

## Sources

- [Web Application Testing Checklist](<../../07-resources/CheckList/Checklists%20for%20testing%20of%20Web%20Application!!.pdf>)
- [Mobile Application Testing Checklist](<../../07-resources/CheckList/Checklists%20for%20testing%20of%20Mobile%20Application!!.pdf>)
