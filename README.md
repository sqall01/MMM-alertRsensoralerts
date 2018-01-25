# Magic Mirror Module alertR Sensors
This module for the [MagicMirror](https://github.com/MichMich/MagicMirror) shows the sensor alerts of the [alertR monitoring and alarm system](https://github.com/sqall01/alertR).

![MagicMirror](pics/magicmirror.jpg)

(The module on the bottom right of the mirror)

# Installation

1. This module needs the alertR Manager Client Database to communicate with the alertR system. Please follow [this tutorial](https://github.com/sqall01/alertR/wiki/Tutorial-ManagerClientDatabase) to install and configure it.

2. This module needs the npm mysql module installed:

```bash
npm install mysql
```

3. Execute the following commands to install the module:

```bash
cd ~/MagicMirror/modules # navigate to module directory of your magic mirror
git clone https://github.com/sqall01/MMM-alertRsensoralerts.git # clone this module
```

4. Add the following into the `modules` section of your `config/config.js` file:

```bash
{
        module: 'MMM-alertRsensoralerts',
        position: 'top_right', // This can be any of the regions
        config: {
            // See 'Configuration options' for more information
        }
},
```

## Configuration options

The following properties can be configured:

| Option                        | Description
| ----------------------------  | -----------
| `host`                        | The host the MySQL server is running on. <br><br> **Example:** `'localhost'`
| `user`                        | The user to connect to the MySQL server. <br><br> **Example:** `'root'`
| `password`                    | The password to connect to the MySQL server.
| `database`                    | The database used by the MySQL server. <br><br> **Example:** `'mm_alertr'`
| `numberSensorAlerts`                     | The maximum number of sensor alerts that are allowed to be displayed. <br><br> **Default value:** `10`

An example configuration could look like this:

```bash
{
        module: 'MMM-alertRsensoralerts',
        position: 'top_right', // This can be any of the regions
        config: {
                host: 'localhost',
                user: 'root',
                password: 'mysqlpassword',
                database: 'mm_alertr',
        }
},
```


# Support

If you like this project you can help to support it by contributing to it. You can contribute by writing tutorials, creating and documenting exciting new ideas to use it, writing code for it, and so on.

If you do not know how to do any of it or do not have the time, you can support me on [Patreon](https://www.patreon.com/sqall).

[![Patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/sqall)