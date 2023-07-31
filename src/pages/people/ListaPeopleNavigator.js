import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import PeopleScreen from "./PeopleScreen";
import DetailPerson from "./DetailPerson";
const ListaPeopleNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen
                name="home"
                component={PeopleScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="persondetail" component={DetailPerson} />
        </Stack.Navigator>
    );
};

export default ListaPeopleNavigator;
