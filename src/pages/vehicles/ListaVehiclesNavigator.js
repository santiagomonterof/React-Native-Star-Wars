import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import VehiclesScreen from "./VehiclesScreen";
import DetailVehicle from "./DetailVehicle";
const ListaVehiclesNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="vehicles">
            <Stack.Screen
                name="vehicles"
                component={VehiclesScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="vehicledetail" component={DetailVehicle} />
        </Stack.Navigator>
    );
};

export default ListaVehiclesNavigator;
