import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-elements";

const DetailPlanet = ({ route, navigation }) => {
    const planet = route.params;
    const [films, setFilms] = useState([]);
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false, // Ocultar el header en el DrawerNavigator
            });
        }

        navigation.setOptions({ title: planet.name });
        loadFilms();
        loadResidents();
    }, []);

    const loadFilms = () => {
        const promises = planet.films.map((film) => {
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

    const loadResidents = () => {
        const promises = planet.residents.map((resident) => {
            return axios
                .get(resident)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const residents = response.map((resident) => resident.data);
                setResidents(residents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title>{planet.name}</Card.Title>
                <Card.Divider />
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Rotation Period:</Text>
                    <Text style={styles.value}>{planet.rotation_period}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Orbital Period:</Text>
                    <Text style={styles.value}>{planet.orbital_period}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Diameter:</Text>
                    <Text style={styles.value}>{planet.diameter}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Climate:</Text>
                    <Text style={styles.value}>{planet.climate}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Gravity:</Text>
                    <Text style={styles.value}>{planet.gravity}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Terrain:</Text>
                    <Text style={styles.value}>{planet.terrain}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Surface Water:</Text>
                    <Text style={styles.value}>{planet.surface_water}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.subtitle}>Population:</Text>
                    <Text style={styles.value}>{planet.population}</Text>
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
                <Card.Title>Residents</Card.Title>
                <Card.Divider />
                {residents.map((resident) => (
                    <Text key={resident.name} style={styles.sectionInfo}>
                        {resident.name}
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

export default DetailPlanet;
