# QA-এর জন্য সিকিউরিটি টেস্টিং

## QA Security Mindset

Security testing penetration testing-এর বিকল্প না; বরং release regression-এর অংশ হিসেবে predictable security check institutionalize করা।

---

## Minimum Security Regression Pack

- access control: user isolation, admin boundary
- auth/session: token expiry, refresh token misuse
- input handling: SQLi/XSS payload probe
- file upload: extension/mime/size validation
- brute-force এবং rate-limit check

---

## Abuse-case Suite

1. Horizontal Privilege Escalation

- user A যেন user B resource দেখতে/পরিবর্তন করতে না পারে

2. Token Replay

- revoked/expired token reuse block হওয়া উচিত

3. Validation Bypass

- malformed JSON / oversized payload graceful reject হওয়া উচিত

4. Upload Abuse

- executable extension upload block হওয়া উচিত

---

## OWASP Mapping (Practical)

- Broken Access Control
- Cryptographic Failures (transport/session handling)
- Injection
- Security Misconfiguration
- Identification and Authentication Failures

---

## CI Integration

1. PR

- critical auth-boundary test

2. Main

- security regression suite + dependency scan

3. Nightly

- DAST baseline scan (OWASP ZAP) + report archive

Example command:

```bash
docker run --rm -t owasp/zap2docker-stable zap-baseline.py -t https://staging.example.com -m 5
```

---

## Release Gate

- unresolved critical vulnerability থাকলে release block
- high severity vulnerability থাকলে mitigation + owner + due date বাধ্যতামূলক
- accepted risk item release memo-তে স্পষ্টভাবে উল্লেখ করতে হবে
