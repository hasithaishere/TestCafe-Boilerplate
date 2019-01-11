# TestCafe-Seed

This is seed project for TestCafe E2E testing, this seed rich with lots of features (ex- Data Handling, Config Handling and etc) which helps engineers to continue their tasks easily.

We use [TestCafe](https://github.com/DevExpress/testcafe) as our UI automation framework.


#### _Code/Folder Structure_

This testcafe project contains following code/folder structure.
* `components/` - contains all the reusable entities
  * `components/` - all the reusable test-case components, eg - _loginComponent.js_
  * `components/BaseComponent.js` - abstract class which provide the blueprint for reusable component. This always extends in all child components.
* `config/` - contains all the configurations, each environment include separate configuration file.
* `libs/helpers/` - contains all reusable helper classes
  * `libs/helpers/configHelper.js` - contains all the methods which use for handling configurations
  * `libs/helpers/dataHelper.js` - include methods which use for handling data from remote data resource(eg - Google Spreadsheet)
* `login/` - contains login related all the test-case files
* `uiObjects/` - include all the Uiobjects which stored as json files


Initially clone the project from this repository.
```sh
$ git clone https://github.com/hasithaishere/TestCafe-Seed.git
```

Then go in to the to the cloned directory and install dependencies and build the project by running the following commands
```sh
$ cd TestCafe-Seed
$ npm install
```

you can install TestCafe globally using following command.
```sh
$ npm install -g testcafe
```

After installation you can execute following command to run end-to-end(E2E) test in all browsers.
```sh
$ npm run e2e
```

If you only need to run in specific browser please execute with browser name as following command.

##### For Chrome
```sh
$ BROWSER=chrome npm run e2e
```

##### For Firefox
```sh
$ BROWSER=firefox npm run e2e
```
##### For Chrome Mobile Emulators
```sh
$ BROWSER="chrome:emulation:device=iphone 6" npm run e2e
```
If you are unable to execute npm commands, you can execute TestCafe directly.
```sh
$ node node_modules/testcafe/bin/testcafe.js $BROWSER tests/e2e/**/index.spec.js
```

##### Mobile and Remote Device Execution

If you need to run test cases in mobile or remote devices please execute following command, it will generate QR code then you can scan that and run test in your mobile device.
```sh
$ npm run e2e-remote
```
E2E  tests are powered with <img src="http://mherman.org/assets/img/blog/testcafe.png" alt="TestCafe" width="100">

<br>
