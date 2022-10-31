# Manual for Parallel Test Scripts

By: [jate-koh](https://github.com/jate-koh)

The following use script files to run parallel emulator at once. Please refer to this document regarding it setup and usage

## Running Test Script

- Manually you can run just a file name to run a script, use `cd` into this folder, then run to see if `Hello Test! If you see this, the script is working!` is echo out:

```
$PWD/test
```

- **Recommended** method is to use `package.json` as script for running, so that you don't have to manually run command above all times. Insert following statement into `scripts` section of your `package.json`

```json
"script": { 
    "<desired name>": "chmod ug+x $PWD/simulator/test & $PWD/simulator/test"
}
```

Then run it using yarn/npm/npx/expo/etc.


## Running Actual Script

### Requirement

It is required for you to acquire all your device simulator id and put it in simulator array to run.
> For XCode user, refer to [this article](https://stackoverflow.com/questions/53924934/can-i-run-my-expo-app-on-multiple-ios-simulators-at-once
)

Then put all your simulator id you want to run in the script and declare it, refer to this example.

```sh
#!/bin/bash

declare -a simulators=(first_id, second_id, third_id, ...)

```

### Running 

Similar to running Test Script, you add following line into `package.json` in `scripts` section

```json
"script": { 
    "<desired name>": "chmod ug+x $PWD/simulator/ios-parallel-test & $PWD/simulator/ios-parallel-test",
    "<desired name>": "chmod ug+x $PWD/simulator/ios-parallel-prep & $PWD/simulator/ios-parallel-prep"
}
```

Then run it with yarn/npm/npx/expo/etc.


## Troubleshooting
- No permission - if the script files doesn't have execute permission, please use chmod, sudo,
or run following script as administrator.
