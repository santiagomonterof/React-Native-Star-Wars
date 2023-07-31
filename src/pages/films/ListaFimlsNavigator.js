import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FilmsScreen from "./FilmsScreen";
import DetailFilm from "./DetailFilm";
const ListaFilmsNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="films">
            <Stack.Screen
                name="films"
                component={FilmsScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="filmdetail" component={DetailFilm} />
        </Stack.Navigator>
    );
};

export default ListaFilmsNavigator;
