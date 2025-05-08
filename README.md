### S!Dealers Ecommerce App

Here are some screenshots of the app:

<p align="center">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/splashscreen.jpg" alt="Splash Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/Main%20screen.jpg" alt="Main Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/cart.jpg" alt="Cart Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/checkout.jpg" alt="Checkout Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/orderconfirm.jpg" alt="Order Confirmation Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/tracking.jpg" alt="Order Tracking Screen" width="200">
  <img src="https://github.com/Simonwachira7318/SDealers_APP/blob/main/sdealer-client/assets/support.jpg" alt="Support Screen" width="200">
</p>

Expo Setup and Run Commands

1.  Install Expo CLI:

    ```bash
    npm install -g expo-cli
    ```

2.  Create a New Expo Project:

    ```bash
    expo init sdealers
    cd sdealers
    ```

    (Choose the "blank" template)

3.  Install Dependencies:

    ```bash
    npm install -D tailwindcss-react-native-classnames
    npm install react-native-vector-icons @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer react-native-gesture-handler react-native-reanimated react-native-safe-area-context
    npm install react-redux @reduxjs/toolkit
    npx tailwindcss-react-native-classnames init
    ```

4.  Run Your App:

    Android:

    ```bash
    expo start --android
    ```

    iOS:

    ```bash
    expo start --ios
    ```

    * **Web**

        ```bash
        expo start --web
        ```

5.  View Your App:

    Install the Expo Go app on your Android or iOS device. Scan the QR code from the Expo Developer Tools (opened by expo start) with the Expo Go app.
