to resolve gradle error in eas build:
- remove node_modules. ```rm -rf node_modules```
- ```yarn add expo```
- ```yarn add uuid@latest```
- repeat last step for every suspected package.
- ```npx expo install```
- check if the app still works. ```npx expo```
- ```eas build -p android --profile preview2```
