import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SpacesShipsScreen from "./SpacesShipsScreen";
import DetailSpaceShip from "./DetailSpaceShip";
const ListaSpacesShipsNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="spacesShips">
            <Stack.Screen
                name="spacesShips"
                component={SpacesShipsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="spaceShipdetail" component={DetailSpaceShip} />
        </Stack.Navigator>
    );
};

export default ListaSpacesShipsNavigator;
