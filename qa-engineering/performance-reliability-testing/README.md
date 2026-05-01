# পারফরম্যান্স ও রিলায়েবিলিটি টেস্টিং

## Core Principle

"Fast" হওয়াই লক্ষ্য না; expected load-এ SLO meet করে ধারাবাহিকভাবে stable থাকা জরুরি।

---

## NFR Baseline

| Metric | Target | কেন দরকার |
|---|---|---|
| API p95 latency | < 300ms | user experience |
| API p99 latency | < 800ms | tail performance control |
| Error Rate | < 1% | reliability |
| Availability | >= 99.9% | release confidence |

---

## Workload Model

1. Normal Load
- দৈনন্দিন average traffic

2. Peak Load
- campaign/office-hour spike

3. Burst Load
- sudden surge (2x-5x)

4. Soak
- long run (2h-8h) memory leak detect করার জন্য

---

## Example: k6 Threshold-based Script

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    ramp: {
      executor: 'ramping-vus',
      startVUs: 10,
      stages: [
        { duration: '2m', target: 100 },
        { duration: '3m', target: 100 },
        { duration: '2m', target: 20 }
      ]
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300', 'p(99)<800']
  }
};

export default function () {
  const res = http.get('https://example.com/api/orders');
  check(res, { 'status 200': (r) => r.status === 200 });
}
```

---

## Reliability Scenario

- dependency timeout (DB/cache/third-party)
- retry storm behavior
- queue backlog growth
- graceful degradation

---

## রিপোর্ট টেমপ্লেট

- test profile: normal/peak/burst/soak
- threshold met নাকি breached
- top bottleneck (DB query, lock contention, external API)
- release recommendation with risk level (Low/Medium/High)
