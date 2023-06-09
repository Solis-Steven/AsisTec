import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useData from "./src/hooks/useData";

const InitApp = () => {

  //estado para saber si la app esta lista con los datos del usuario
  const [isReady, setIsReady] = useState(false);
  //estado para guardar los datos del usuario
  const {setEventItems} = useData();




  //funcion para cargar los datos del usuario desde el AsyncStorage
  const LoadData = async() => {

        console.log("Cargando data");
      await AsyncStorage.getItem("storedEvents").then(value => {
  
      if (value !== null) {
 
        setEventItems(JSON.parse(value));
        console.log("Data cargada" + JSON.parse(value));
      }
    }).catch((error) => {
        console.log(error);
        }
    );
  }

  // Se ejecuta la funcion LoadData una vez que la app se inicia
  useEffect(() => {
    LoadData().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <AppLoading />;
  }



  return (

    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
};

export default InitApp;