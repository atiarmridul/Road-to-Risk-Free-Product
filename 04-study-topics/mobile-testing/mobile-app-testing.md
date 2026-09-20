# মোবাইল অ্যাপ টেস্টিং (Mobile App Testing Basics)

> **সহজভাবে / In simple words:** Mobile testing checks an app across devices, operating systems, networks, permissions, and interruptions.
>
> **কেন গুরুত্বপূর্ণ / Why it matters:** Phones vary widely and change state more often than desktop computers.


## কেন mobile testing আলাদা

Web testing-এর তুলনায় mobile testing-এ environment variability অনেক বেশি:
- device fragmentation
- OS version difference
- permission model
- network instability
- app lifecycle interruption

## Mobile Testing Types (প্রাথমিক ধারণা)

- Functional testing
- Usability testing
- Compatibility testing
- Performance testing
- Interrupt testing
- Installation/upgrade testing

## 1) Device Fragmentation Strategy

সব device test করা সম্ভব না। representative matrix বানাতে হবে।

### Example matrix
- Android: low-end, mid-range, high-end
- iOS: latest major + previous major version
- Screen: ছোট, medium, বড় resolution bucket

## 2) App Lifecycle Testing

States:
- foreground
- background
- app killed
- relaunch

Test করুন:
- background থেকে ফিরে data stale কি না
- long idle পরে session behavior
- relaunch এ user state ঠিক আছে কি না

## 3) Network Condition Testing

সব user fast Wi-Fi use করবে না।

Validate:
- offline mode behavior
- slow network spinner/retry UX
- network drop হলে graceful error
- reconnect হলে sync recovery

## 4) Permission Testing

Permissions:
- camera
- location
- notifications
- storage

Test scenarios:
- প্রথমবার deny করলে app কী করে
- পরে settings থেকে allow করলে flow recover করে কি না
- permission না দিলেও app fallback path দেয় কি না

## 5) Push Notification Testing

Check করুন:
- notification payload valid?
- tap করলে ঠিক screen open?
- logged-out state-এ expected behavior?
- duplicate notification issue আছে?

## 6) Deep Link Testing

Test matrix:
- app installed
- app not installed
- logged in
- logged out

Expected:
- correct routing
- security check bypass না হওয়া

## 7) Mobile Performance Basics

Measure:
- app startup time
- scroll jank
- crash rate
- battery drain pattern
- network usage abnormality

## 8) Common Mobile Defects

- keyboard open হলে CTA button hide
- orientation change এ layout break
- app resume এ পুরনো data
- OTP auto-read inconsistent
- background upload fail silently

## 9) Release Checklist (QA ব্যবহারযোগ্য)

- critical path crash-free
- login + checkout + payment pass
- push + deep link validated
- permission fallback verified
- offline/poor network behavior acceptable
- analytics events firing

## Practical Scenario: Ride Booking App

Critical tests:
1. location permission deny -> manual location flow
2. booking request during network drop -> retry path
3. driver assigned push tap -> trip details screen
4. app background থেকে ফিরে fare update consistency

## Interview Questions

1. Mobile fragmentation handle করার strategy কী?
2. Permission deny scenario-তে expected QA checks কী?
3. Deep link testing কেন security-sensitive?
4. Mobile app-এ flaky issue reproduce কীভাবে করবেন?

## Revision Summary

- Mobile QA = device + OS + network + lifecycle awareness
- শুধুমাত্র functional pass হলেই quality complete না
- interruption এবং recovery flow-এ defect বেশি পাওয়া যায়

## Cross-Topic Practice Questions (Other Folders থেকে)

1. Mobile app-এ API failure case-এ contract testing insight কীভাবে apply করবেন? (`01-testing/contract-testing`)
2. Mobile E2E flow-এর জন্য minimum critical path suite কী হবে? (`01-testing/e2e-end-to-end-testing`)
3. Flaky mobile automation reduce করতে কোন stabilization technique নেবেন? (`02-qa-engineering/flaky`)
4. Device/browser matrix-এর বদলে mobile OS matrix কীভাবে design করবেন? ([testing foundations](../../01-testing/testing-foundations.md))
5. Performance testing mindset mobile startup latency-তে কীভাবে use করবেন? (`01-testing/performance-testing`)
6. Security testing হিসেবে rooted/jailbroken behavior validate করবেন কীভাবে? (`02-qa-engineering/security-testing-for-qa`)
7. Test data/environment mismatch mobile defect reproducibility-তে কী impact ফেলে? (`02-qa-engineering/test-data-environment-management`)
8. Release readiness gate-এ mobile crash rate threshold কীভাবে define করবেন? (`02-qa-engineering/quality-gate-release-readiness`)
9. Visual regression চিন্তা mobile UI layout break detect-এ কীভাবে সাহায্য করে? (`01-testing/visual-regression-testing-ui`)
10. Interview scenario: production mobile incident হলে QA হিসেবে first 30 minutes action plan কী? (`03-interview/question-bank/selise-questions.md`)
