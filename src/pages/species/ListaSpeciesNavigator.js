import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SpeciesScreen from "./SpeciesScreen";
import DetailSpecie from "./DetailSpecie";
const ListaSpeciesNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="species">
            <Stack.Screen
                name="species"
                component={SpeciesScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="speciedetail" component={DetailSpecie} />
        </Stack.Navigator>
    );
};

export default ListaSpeciesNavigator;
