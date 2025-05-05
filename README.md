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

