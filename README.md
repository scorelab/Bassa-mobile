# Bassa Mobile

[![Join the chat at https://gitter.im/scorelab/Bassa-mobile](https://badges.gitter.im/scorelab/Bassa-mobile.svg)](https://gitter.im/scorelab/Bassa-mobile?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A cross-platform mobile client for [Bassa](https://github.com/scorelab/Bassa)

![Splash Screen](https://user-images.githubusercontent.com/15249242/42421797-1ff2632e-82f9-11e8-8338-7d603d965a85.png)

![Bassa Platform](https://user-images.githubusercontent.com/15249242/40108561-e8abc11c-5918-11e8-92b9-f59f64b2478c.png)


## Get Started
 - Clone this repository with either ```git clone --recurse-submodules https://github.com/scorelab/Bassa-mobile.git``` or ```git clone --recurse-submodules git@github.com:scorelab/Bassa-mobile.git```, if you are using SSH.
 - Navigate to the Bassa folder inside the cloned local repository and follow the instructions given [here](https://github.com/scorelab/Bassa) to start the Bassa back-end.
 - Navigate back to the root of the cloned repository.
 - run ```yarn``` or ```npm install```.
 - run ```react-native run-android``` or ```react-native run-ios```.

## Tests
 - run ```yarn test``` or ```npm test```.

## Lint
 - run ```yarn run lint``` or ```npm run lint```.

 ## Known Issues
 - Socket.io connection between the Bassa-mobile app and Bassa-backend can have issues sometimes. Hence, functionalities that depend on the Socket.io connection such as Push Notifications, Download Progress Circle, Redux Refresh Handlers may not work sometimes.
 - iOS version of the Bassa mobile app has not been tested.
