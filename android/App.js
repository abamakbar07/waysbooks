import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { AppContextProvider } from "./src/components/context/globalContext";

import Home from "./src/pages/Home/index";
import Details from "./src/pages/BookDetail/index";
import Landingpage from "./src/pages/LandingPage/index";
import Dashboard from "./src/pages/components/Dashboard";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Landingpage"
          component={Landingpage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: "Book Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
