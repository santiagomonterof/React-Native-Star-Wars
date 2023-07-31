import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-elements";

const DetailSpaceShip = ({ route, navigation }) => {
    const spaceShip = route.params;
    const [films, setFilms] = useState([]);
    const [pilots, setPilots] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false, // Ocultar el header en el DrawerNavigator
            });
        }

        navigation.setOptions({ title: spaceShip.name });
        loadFilms();
        loadPilots();
    }, []);

    const loadFilms = () => {
        const promises = spaceShip.films.map((film) => {
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
                const pelis = response.map((film) => film.data);
                setFilms(pelis);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadPilots = () => {
        const promises = spaceShip.pilots.map((pilot) => {
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
                <Card.Title>{spaceShip.name}</Card.Title>
                <Card.Divider />
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Model:</Text>
                    <Text style={styles.value}>{spaceShip.model}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Manufacturer:</Text>
                    <Text style={styles.value}>{spaceShip.manufacturer}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Cost in Credits:</Text>
                    <Text style={styles.value}>{spaceShip.cost_in_credits}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Length:</Text>
                    <Text style={styles.value}>{spaceShip.length}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Max Atmosphering Speed:</Text>
                    <Text style={styles.value}>{spaceShip.max_atmosphering_speed}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Crew:</Text>
                    <Text style={styles.value}>{spaceShip.crew}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Passengers:</Text>
                    <Text style={styles.value}>{spaceShip.passengers}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Cargo Capacity:</Text>
                    <Text style={styles.value}>{spaceShip.cargo_capacity}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Consumables:</Text>
                    <Text style={styles.value}>{spaceShip.consumables}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Hyperdrive Rating:</Text>
                    <Text style={styles.value}>{spaceShip.hyperdrive_rating}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>MGLT:</Text>
                    <Text style={styles.value}>{spaceShip.MGLT}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Starship Class:</Text>
                    <Text style={styles.value}>{spaceShip.starship_class}</Text>
                </View>
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title>Films</Card.Title>
                <Card.Divider />
                {films.map((film) => (
                    <Text key={film.title} style={styles.sectionInfo}>
                        {film.title}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title>Pilots</Card.Title>
                <Card.Divider />
                {pilots.map((pilot) => (
                    <Text key={pilot.name} style={styles.sectionInfo}>
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
        backgroundColor: "black",
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#777777",
        borderRadius: 5,
        shadowColor: "#000000",
    },
    infoContainer: {
        flexDirection: "row",
        marginBottom: 8,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 8,
        borderRadius: 5,
    },
    subtitle: {
        fontWeight: "bold",
        marginRight: 8,
        color: "black",
    },
    value: {
        flex: 1,
        color: "black",
    },
    sectionInfo: {
        backgroundColor: "#DDDDDD",
        padding: 8,
        marginVertical: 4,
        color: "black",
        borderRadius: 5,
    },
});

export default DetailSpaceShip;
