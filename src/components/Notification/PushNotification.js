import { Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// Set default notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const PushNotification = ({body}) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  // Define function to send a notification
  const sendNotification = async (body) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Asistec",
        body: "Tienes un evento cercano: ", body, // Include the provided body in the notification
      },
      trigger: null,
    });
  };

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // Add a listener for notifications received while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Send a notification using the provided body
    sendNotification(body);

    // Cleanup listeners when component unmounts
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Function to register the device for push notifications
  async function registerForPushNotificationsAsync() {

    // Set up notification channel for Android devices
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Check if device is supported and has notification permissions
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return null;
  }

}

export default PushNotification;
