import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PlanetsScreen from "./PlanetsScreen";
import DetailPlanet from "./DetailPlanet";
const ListaPlanetsNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="planets">
            <Stack.Screen
                name="planets"
                component={PlanetsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="planetdetail" component={DetailPlanet} />
        </Stack.Navigator>
    );
};

export default ListaPlanetsNavigator;
