
CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Possible future features


INTRODUCTION
------------

Current Maintainer: Gareth Oakley <gaz at gazoakley dot com>

This repository contains a basic Drupal Commerce payment module for the Paymill
payment service: http://www.paymill.com/

**Warning: This is not ready for production!** Please keep an eye out and let
me know if you find issues.


INSTALLATION
------------

1. This module requires the Curl PHP extension.
   In most cases, you can simply run "apt-get install php5-curl".

2. Copy the Commerce_Paymill/ directory to your sites/SITENAME/modules
   directory.

3. Create a libraries directory under sites/SITENAME if it does not exist.

4. Create a paymill directory under sites/SITENAME/libraries.

5. Download the Paymill PHP libraries from GitHub:
   https://github.com/Paymill/Paymill-PHP/archive/master.zip

6. Copy the contents of the zip file into sites/SITENAME/libraries/paymill
   README.md should exist in this directory

7. Enable the module and configure admin/settings/commerce-paymill.


POSSIBLE FUTURE FEATURES
------------------------

* Pre-authorization only
* Stored cards
* Client information
