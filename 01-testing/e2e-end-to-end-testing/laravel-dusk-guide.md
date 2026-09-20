# Laravel Dusk E2E Guide

## ৩. Laravel Dusk — Laravel-এর নিজস্ব ব্রাউজার টেস্টিং
### সেটআপ
```bash
# Dusk ইনস্টল
composer require laravel/dusk --dev

# Dusk সেটআপ
php artisan dusk:install

# Chrome driver আপডেট
php artisan dusk:chrome-driver --detect

# .env.dusk.local তৈরি করুন
cp .env .env.dusk.local
```

```env
# .env.dusk.local
APP_URL=http://localhost:8001
DB_DATABASE=testing_db
SESSION_DRIVER=file
```

#### প্রজেক্ট স্ট্রাকচার

```
tests/
└── Browser/
    ├── LoginTest.php
    ├── CheckoutTest.php
    ├── BkashPaymentTest.php
    ├── Pages/                  # Page Object Model
    │   ├── LoginPage.php
    │   └── CheckoutPage.php
    ├── Components/             # পুনরায় ব্যবহারযোগ্য কম্পোনেন্ট
    │   └── DatePicker.php
    └── screenshots/            # ব্যর্থ টেস্টের স্ক্রিনশট
```

#### মৌলিক Dusk API

```php
<?php

namespace Tests\Browser;

use App\Models\User;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ProductTest extends DuskTestCase
{
    /**
     * প্রোডাক্ট পেজ পরীক্ষা
     */
    public function test_user_can_view_products(): void
    {
        $user = User::factory()->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                    ->visit('/products')
                    ->assertSee('সকল প্রোডাক্ট')
                    ->assertPresent('.product-card')
                    ->screenshot('products-page');
        });
    }

    /**
     * প্রোডাক্ট সার্চ পরীক্ষা (বাংলা)
     */
    public function test_user_can_search_in_bangla(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/products')
                    ->type('#search', 'মোবাইল ফোন')
                    ->keys('#search', '{enter}')
                    ->waitForText('অনুসন্ধান ফলাফল')
                    ->assertSee('মোবাইল')
                    ->assertDontSee('কোনো ফলাফল নেই');
        });
    }

    /**
     * ফর্ম ফিলআপ পরীক্ষা
     */
    public function test_form_operations(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/register')
                    // type() — ইনপুটে টাইপ করা
                    ->type('name', 'মোহাম্মদ আলী')
                    ->type('email', 'ali@example.com')
                    ->type('phone', '01712345678')
                    // select() — ড্রপডাউন সিলেক্ট
                    ->select('district', 'dhaka')
                    // check() — চেকবক্স
                    ->check('#terms')
                    // click() — বাটন ক্লিক
                    ->click('@submit-btn')  // dusk="submit-btn"
                    // assertSee() — টেক্সট দেখা যাচ্ছে কিনা
                    ->assertSee('রেজিস্ট্রেশন সফল হয়েছে')
                    // assertPathIs() — URL যাচাই
                    ->assertPathIs('/dashboard');
        });
    }
}
```

#### Screenshots ও Console Logs

```php
public function test_with_debugging(): void
{
    $this->browse(function (Browser $browser) {
        $browser->visit('/checkout')
                ->screenshot('checkout-step-1')   // স্ক্রিনশট নেওয়া
                ->type('#address', 'মিরপুর, ঢাকা')
                ->screenshot('checkout-step-2')
                ->click('#next')
                ->storeConsoleLog('checkout-logs') // কনসোল লগ সংরক্ষণ
                ->storeSource('checkout-source');  // HTML সোর্স সংরক্ষণ
    });
}
```

#### Chrome Driver কাস্টমাইজেশন

```php
// tests/DuskTestCase.php
protected function driver(): RemoteWebDriver
{
    $options = (new ChromeOptions)->addArguments([
        '--disable-gpu',
        '--headless=new',
        '--window-size=1920,1080',
        '--lang=bn',                    // বাংলা ভাষা
        '--accept-lang=bn-BD,bn',
    ]);

    return RemoteWebDriver::create(
        'http://localhost:9515',
        DesiredCapabilities::chrome()->setCapability(
            ChromeOptions::CAPABILITY_W3C, $options
        )
    );
}
```

---
