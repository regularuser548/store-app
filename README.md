# ShopHub

This is a ShopHub online store repository.

## Installation

**1. Get the app**:

Clone repo:

```bash
git clone https://github.com/regularuser548/store-app.git
```

**2. Install Dependencies**:

```bash
cd store-app/
composer install
npm install
```

**3. Configure the environment**:

> The `.env` file is in the app's [root directory](https://laravel.com/docs/11.x/configuration#environment-configuration).

- Initialize .env (quickly: `cp .env.example .env && php artisan key:generate`.
- Create a database for your application or use sqlite.
- add the DB credentials to the `.env` file.
- If running on localhost you must change `APP_URL` to `http://localhost:8000`

**4. Install Database**:

Run this command:

```bash
php artisan migrate --seed
```

**5. Link Storage**:

Run this command:

```bash
php artisan storage:link
```

**6. Open the application**:

- Run backend with `php artisan serve` or `php -S localhost:8000 -t public` if you have problems.
- Run fronted with `npm run dev`.

Site URL: http://127.0.0.1:8000

The app has a default admin user with Email: **admin@mail.com** and password: **admin**. 

**You should change the password in production.**

Products are not seeded so open the CRM panel first to add some products.
