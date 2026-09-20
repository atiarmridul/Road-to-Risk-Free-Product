# Advanced Integration Environments and CI

## ৫. WebSocket Connection Testing
রিয়েল-টাইম ফিচার (চ্যাট, লাইভ নোটিফিকেশন, অর্ডার ট্র্যাকিং) টেস্ট করার জন্য WebSocket ইন্টিগ্রেশন টেস্ট প্রয়োজন।

```javascript
// tests/integration/websocket.test.js
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const app = require("../../src/app");

describe("WebSocket Integration — Order Tracking", () => {
  let io, httpServer, clientSocket;
  const PORT = 4001;

  beforeAll((done) => {
    httpServer = createServer(app);
    io = new Server(httpServer);

    // WebSocket event handlers register
    require("../../src/websocket/handlers")(io);

    httpServer.listen(PORT, () => done());
  });

  beforeEach((done) => {
    clientSocket = Client(`http://localhost:${PORT}`, {
      auth: { token: "valid_test_token" },
    });
    clientSocket.on("connect", done);
  });

  afterEach(() => {
    if (clientSocket.connected) clientSocket.disconnect();
  });

  afterAll(() => {
    io.close();
    httpServer.close();
  });

  it("should receive real-time order status updates", (done) => {
    const orderId = "ORD-12345";

    clientSocket.emit("subscribe:order", { orderId });

    clientSocket.on("order:status-updated", (data) => {
      expect(data.orderId).toBe(orderId);
      expect(data.status).toBe("shipped");
      expect(data.message).toBe("Your order has been shipped");
      expect(data.timestamp).toBeDefined();
      done();
    });

    // সার্ভার সাইড থেকে স্ট্যাটাস আপডেট trigger
    setTimeout(() => {
      io.to(`order:${orderId}`).emit("order:status-updated", {
        orderId,
        status: "shipped",
        message: "Your order has been shipped",
        timestamp: new Date().toISOString(),
      });
    }, 100);
  });

  it("should handle authentication failure", (done) => {
    const unauthClient = Client(`http://localhost:${PORT}`, {
      auth: { token: "invalid_token" },
    });

    unauthClient.on("connect_error", (err) => {
      expect(err.message).toBe("Authentication failed");
      unauthClient.disconnect();
      done();
    });
  });

  it("should handle multiple simultaneous room subscriptions", (done) => {
    const receivedUpdates = [];

    clientSocket.emit("subscribe:order", { orderId: "ORD-001" });
    clientSocket.emit("subscribe:order", { orderId: "ORD-002" });

    clientSocket.on("order:status-updated", (data) => {
      receivedUpdates.push(data);
      if (receivedUpdates.length === 2) {
        expect(receivedUpdates.map((u) => u.orderId)).toEqual(
          expect.arrayContaining(["ORD-001", "ORD-002"]),
        );
        done();
      }
    });

    setTimeout(() => {
      io.to("order:ORD-001").emit("order:status-updated", {
        orderId: "ORD-001",
        status: "processing",
      });
      io.to("order:ORD-002").emit("order:status-updated", {
        orderId: "ORD-002",
        status: "delivered",
      });
    }, 100);
  });
});
```

---

### ৬. Docker Compose দিয়ে Full Stack Test Environment

সম্পূর্ণ সিস্টেমের ইন্টিগ্রেশন টেস্ট চালানোর জন্য Docker Compose ব্যবহার করে পুরো ইনফ্রাস্ট্রাকচার সেটআপ করা যায়।

```yaml
# docker-compose.integration-test.yml
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.test
    environment:
      - APP_ENV=testing
      - DB_HOST=test-mysql
      - DB_DATABASE=app_test
      - REDIS_HOST=test-redis
      - QUEUE_CONNECTION=redis
      - CACHE_DRIVER=redis
    depends_on:
      test-mysql:
        condition: service_healthy
      test-redis:
        condition: service_healthy
    volumes:
      - ./tests:/app/tests
    command: ["php", "artisan", "test", "--testsuite=Integration"]

  test-mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: app_test
      MYSQL_ROOT_PASSWORD: secret
    tmpfs:
      - /var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 3s
      timeout: 3s
      retries: 15

  test-redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 3s
      timeout: 3s
      retries: 10

  test-minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 5s
      timeout: 3s
      retries: 10
```

```bash
#!/bin/bash
# scripts/run-integration-tests.sh

set -e

echo "🔧 Integration test environment চালু হচ্ছে..."
docker compose -f docker-compose.integration-test.yml up -d test-mysql test-redis test-minio

echo "⏳ সার্ভিস healthy হওয়ার অপেক্ষা..."
docker compose -f docker-compose.integration-test.yml up --wait test-mysql test-redis

echo "🗃️  Database migration চালানো হচ্ছে..."
docker compose -f docker-compose.integration-test.yml run --rm app php artisan migrate --force

echo "🧪 Integration tests চালানো হচ্ছে..."
docker compose -f docker-compose.integration-test.yml run --rm app php artisan test \
    --testsuite=Integration \
    --parallel \
    --processes=4

EXIT_CODE=$?

echo "🧹 পরিষ্কার করা হচ্ছে..."
docker compose -f docker-compose.integration-test.yml down -v

exit $EXIT_CODE
```

---

### ৭. Parallel Test Execution — সমান্তরাল টেস্ট চালানো

বড় টেস্ট সুইটের জন্য parallel execution অপরিহার্য — ১০ মিনিটের টেস্ট ২-৩ মিনিটে শেষ হতে পারে।

#### Laravel Parallel Testing

```php
// phpunit.xml — parallel configuration
<phpunit>
    <testsuites>
        <testsuite name="Integration">
            <directory>tests/Feature</directory>
        </testsuite>
    </testsuites>
</phpunit>
```

```bash
# Laravel parallel testing (artisan)
php artisan test --parallel --processes=4

# অথবা Paratest দিয়ে সরাসরি
./vendor/bin/paratest -p 4 --testsuite=Integration
```

```php
<?php
// tests/TestCase.php — parallel-safe base class

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\ParallelTesting;

abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // প্রতিটি parallel process এর জন্য আলাদা DB
        // Laravel স্বয়ংক্রিয়ভাবে app_test_1, app_test_2, ... তৈরি করে
        ParallelTesting::setUpProcess(function (int $token) {
            // প্রতিটি process শুরুতে একবার চলে
            config(['database.connections.mysql.database' => "app_test_{$token}"]);
        });

        ParallelTesting::setUpTestCase(function (int $token, TestCase $testCase) {
            // প্রতিটি test class শুরুতে চলে
        });
    }
}
```

#### Jest Parallel Testing (Node.js)

```javascript
// jest.config.js
module.exports = {
  // Jest ডিফল্টভাবে parallel চালায়
  // worker সংখ্যা নিয়ন্ত্রণ
  maxWorkers: "50%",

  // Integration tests আলাদা project হিসেবে
  projects: [
    {
      displayName: "integration",
      testMatch: ["<rootDir>/tests/integration/**/*.test.js"],
      // প্রতিটি worker-এর জন্য আলাদা setup
      globalSetup: "<rootDir>/tests/setup/globalSetup.js",
      globalTeardown: "<rootDir>/tests/setup/globalTeardown.js",
      setupFilesAfterFramework: ["<rootDir>/tests/setup/perWorker.js"],
    },
  ],
};
```

```javascript
// tests/setup/perWorker.js
const workerId = process.env.JEST_WORKER_ID;

// প্রতিটি worker আলাদা ডাটাবেস ব্যবহার করে
process.env.DB_DATABASE = `app_test_${workerId}`;
process.env.REDIS_DB = workerId;

// বিচ্ছিন্নতা নিশ্চিত করতে port offset
process.env.TEST_PORT = 3000 + parseInt(workerId);
```

---

### ৮. CI/CD Integration Test Pipeline

#### GitHub Actions Pipeline

```yaml
# .github/workflows/integration-tests.yml
name: Integration Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  integration-tests-laravel:
    runs-on: ubuntu-latest

    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_DATABASE: app_test
          MYSQL_ROOT_PASSWORD: secret
        ports:
          - 3306:3306
        options: >-
          --health-cmd="mysqladmin ping -h localhost"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd="redis-cli ping"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: "8.3"
          extensions: pdo_mysql, redis, gd
          coverage: xdebug

      - name: Install dependencies
        run: composer install --no-interaction --prefer-dist

      - name: Run migrations
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: app_test
          DB_USERNAME: root
          DB_PASSWORD: secret
        run: php artisan migrate --force

      - name: Run Integration Tests
        env:
          DB_HOST: 127.0.0.1
          DB_DATABASE: app_test
          DB_USERNAME: root
          DB_PASSWORD: secret
          REDIS_HOST: 127.0.0.1
        run: |
          php artisan test --testsuite=Integration \
            --parallel --processes=4 \
            --coverage-clover=coverage.xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: coverage.xml
          flags: integration

  integration-tests-node:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: app_test
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_pass
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5

      redis:
        image: redis:7
        ports:
          - 6379:6379

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci

      - name: Run Integration Tests
        env:
          DATABASE_URL: postgres://test_user:test_pass@localhost:5432/app_test
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test
        run: npx jest --testPathPattern=integration --forceExit --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---
