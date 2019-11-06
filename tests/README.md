# Running Tests


To run tests you can use the command `npm test` this will execute all tests in the `./tests` folder
For the integration test a live TeamSpeak Server will be needed.
The best way is to setup a TeamSpeak Server on the local development environment.

In order to specify username / password / host etc you can use environment variables
Following environment variables are possible

Name              | Type   | Default
------------------|--------|------------------
TS3_HOST          | string | `"127.0.0.1"`
TS3_SERVERPORT    | number | `9987`
TS3_USERNAME      | string | `"serveradmin"`
TS3_PASSWORD      | string | `"abc123"`
TS3_QUERYPORT_RAW | number | `"10011"`
TS3_QUERYPORT_SSH | number | `"10022"`

so for example if you only want to define a password use following command

`TS3_PASSWORD=foo npm test`