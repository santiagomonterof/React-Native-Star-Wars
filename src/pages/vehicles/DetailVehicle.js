import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-elements";

const DetailVehicle = ({ route, navigation }) => {
    const vehicle = route.params;

    const [films, setFilms] = useState([]);
    const [pilots, setPilots] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false, // Ocultar el header en el DrawerNavigator
            });
        }

        navigation.setOptions({ title: vehicle.name });
        loadFilms();
        loadPilots();
    }, []);

    const loadFilms = () => {
        const promises = vehicle.films.map((film) => {
            return axios
                .get(film)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const films = response.map((film) => film.data);
                setFilms(films);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadPilots = () => {
        const promises = vehicle.pilots.map((pilot) => {
            return axios
                .get(pilot)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const pilots = response.map((pilot) => pilot.data);
                setPilots(pilots);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>{vehicle.name}</Card.Title>
                <Card.Divider />
                <Text style={styles.subtitle}>Model:</Text>
                <Text style={styles.text}>{vehicle.model}</Text>
                <Text style={styles.subtitle}>Manufacturer:</Text>
                <Text style={styles.text}>{vehicle.manufacturer}</Text>
                <Text style={styles.subtitle}>Cost in Credits:</Text>
                <Text style={styles.text}>{vehicle.cost_in_credits}</Text>
                <Text style={styles.subtitle}>Length:</Text>
                <Text style={styles.text}>{vehicle.length}</Text>
                <Text style={styles.subtitle}>Max Atmosphering Speed:</Text>
                <Text style={styles.text}>{vehicle.max_atmosphering_speed}</Text>
                <Text style={styles.subtitle}>Crew:</Text>
                <Text style={styles.text}>{vehicle.crew}</Text>
                <Text style={styles.subtitle}>Passengers:</Text>
                <Text style={styles.text}>{vehicle.passengers}</Text>
                <Text style={styles.subtitle}>Cargo Capacity:</Text>
                <Text style={styles.text}>{vehicle.cargo_capacity}</Text>
                <Text style={styles.subtitle}>Consumables:</Text>
                <Text style={styles.text}>{vehicle.consumables}</Text>
                <Text style={styles.subtitle}>Vehicle Class:</Text>
                <Text style={styles.text}>{vehicle.vehicle_class}</Text>
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title>Films</Card.Title>
                <Card.Divider />
                {films.map((film) => (
                    <Text key={film.title} style={styles.text}>
                        {film.title}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title>Pilots</Card.Title>
                <Card.Divider />
                {pilots.map((pilot) => (
                    <Text key={pilot.name} style={styles.text}>
                        {pilot.name}
                    </Text>
                ))}
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#000",
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#666",
    },
    cardTitle: {
        color: "#000",
    },
    subtitle: {
        fontWeight: "bold",
        marginTop: 8,
        padding: 8,
        marginVertical: 8,
    },
    text: {
        backgroundColor: "#eee",
        padding: 8,
        marginVertical: 8,
        color: "#000",
    },
});

export default DetailVehicle;
