# Laravel Environment Setup (PHP & Composer Installation)

## ✅ Step 1: Install PHP

Laravel requires PHP (minimum version 8.1 for Laravel 10).

### 1.1 Download PHP

If you don't have PHP installed, download it from:  
[🔗 Windows PHP Downloads](https://windows.php.net/download/)

Recommended Version: PHP 8.2

- Use Non-thread safe version if using Apache/XAMPP.
- Use Thread Safe version for CLI.
- Choose Windows x64 ZIP (Thread Safe).

### 1.2 Install PHP

1. Extract the downloaded ZIP file to C:\php (or any preferred location).
2. Rename the extracted folder to just php.

### 1.3 Configure PHP in Environment Variables

1. Open System Properties:
   - Press Win + R, type sysdm.cpl, and press Enter.
2. Go to "Advanced" → "Environment Variables".
3. Under "System Variables", find Path → Click "Edit".
4. Click "New" and add the PHP installation path:
   - Example: C:\php
5. Click OK to save and exit.

### 1.4 Verify PHP Installation

1. Open Command Prompt (cmd) or PowerShell and type:

   powershell
   php -v

2. If PHP is installed correctly, you should see an output similar to:

   PHP 8.2.x (cli) (built: ...)

3. If you get "command not found", restart your PC and try again.

---

## ✅ Step 2: Install Composer

### 2.1 Download Composer

Go to the [🔗 Composer Download Page](https://getcomposer.org/download/).  
Download Composer-Setup.exe (Windows Installer).

### 2.2 Install Composer

1. Run the Installer (Composer-Setup.exe).
2. Select PHP Executable:
   - Browse to C:\php\php.exe.
3. Enable Composer in System PATH (should be selected automatically).
4. Complete the installation.

### 2.3 Verify Composer Installation

1. Open Command Prompt or PowerShell and run:

   powershell
   composer -V

2. Expected output:

   Composer version 2.x.x

## ✅ Step 3: Setup Database

## Option 2: Connect Directly to Hostinger MySQL (For Live Development)

If you prefer to develop directly on Hostinger's MySQL database, follow these steps:

1️⃣ Get Your Hostinger MySQL Database Details

    - Log in to Hostinger.
    - Go to Hosting → Databases → MySQL Databases.
    - Find your Database Name, Host, Username, and Password.

2️⃣ Connect to MySQL Database

> For Prod

        Example:
        makefile
        Copy
        Edit
        DB_NAME: envo_care_db
        DB_USER: tin
        DB_PASS: 3W+vbh2@$
        DB_HOST: mysql.hostinger.com
        DB_CONNECTION=mysql

         DB_CONNECTION=mysql
         DB_HOST=auth-db1001.hstgr.io
         DB_PORT=3306
         DB_DATABASE=u809801411_envo_care_db
         DB_USERNAME=u809801411_tin
         DB_PASSWORD=3W+vbh2@$

> For local

        DB_DATABASE=envo_care_db
        DB_USERNAME=root
        DB_PASSWORD=
        DB_HOST=localhost

         DB_CONNECTION=mysql
         DB_HOST=localhost
         DB_PORT=3306
         DB_DATABASE=envo_care_db
         DB_USERNAME=root
         DB_PASSWORD=

## Clear and Cache Configurations

      php artisan config:clear
      php artisan cache:clear
      php artisan config:cache

## Run Migrations to Set Up Database Tables

      php artisan migrate

✅ Step 1: Set Up Laravel Backend

1.1 Install Laravel

1.  Create a New Laravel Project
    Run the following command to create a new Laravel project:

          composer create-project --prefer-dist laravel/laravel cms-backend

Replace cms-backend with your desired project name.

2.  Navigate to the Project Directory
    Move into the project folder:

          cd cms-backend

3.  Generate Application Key
    Run the following command to generate a unique application key:

         php artisan key:generate

1.2 Set Up Database

1.  Create a MySQL Database

         Create a new database (e.g., cms_db) using phpMyAdmin or your preferred MySQL client.

2.  Update .env File

         Open the .env file and update the database credentials:

            env
            Copy
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=cms_db
            DB_USERNAME=root
            DB_PASSWORD=

3.  Run Migrations

Create a database in your local MySQL server and update the .env file with your database credentials. Then, run the following

create database cms_envo;

Execute the default migrations to create the necessary tables:

         php artisan migrate

1.3 Install Filament for Admin Panel

1.  Install Filament
    Run the following command to install Filament:

        composer require filament/filament:"^3.3" -W

2.  Publish Filament Assets

    Publish Filament's configuration and assets:

            php artisan filament:install --panels

3.  Create an Admin User

        Create the first admin user for the Filament panel:

             php artisan make:filament-user

    Provide the following details when prompted:

         Name: admin
         Email: admin@gmail.com
         Password: admin@123

4.  Access Filament Admin Panel

        Start the Laravel development server:
             php artisan route:list

         check route to access for admin panel:
             php artisan serve

    Visit the Filament admin panel at:

    http://127.0.0.1:8000/admin/login
    Log in with the admin credentials you just created.
