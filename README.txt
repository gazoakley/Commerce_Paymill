
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

3. Download the Paymill PHP libraries from GitHub:
   https://api.github.com/repos/Paymill/Paymill-v2-PHP/zipball/
   3c6f2fb1ddae7ad0eed6dff9a6bee051bb894f5f

4. Copy the Paymill-v2-PHP directory to the sites/SITENAME/libraries
   directory.

3. Enable the module and configure admin/settings/commerce-paymill.


POSSIBLE FUTURE FEATURES
------------------------

* Pre-authorization only
* Stored cards
* Client information
