import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-elements";

const DetailFilm = ({ route, navigation }) => {
    const film = route.params;
    const [characters, setCharacters] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [starships, setStarships] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [species, setSpecies] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false,
            });
        }

        navigation.setOptions({ title: film.name });
        loadCharacters();
        loadPlanets();
        loadStarships();
        loadVehicles();
        loadSpecies();
    }, []);

    const loadCharacters = () => {
        const promises = film.characters.map((character) => {
            return axios
                .get(character)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const characters = response.map((character) => character.data);
                setCharacters(characters);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadPlanets = () => {
        const promises = film.planets.map((planet) => {
            return axios
                .get(planet)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const planets = response.map((planet) => planet.data);
                setPlanets(planets);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadStarships = () => {
        const promises = film.starships.map((starship) => {
            return axios
                .get(starship)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const starships = response.map((starship) => starship.data);
                setStarships(starships);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadVehicles = () => {
        const promises = film.vehicles.map((vehicle) => {
            return axios
                .get(vehicle)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const vehicles = response.map((vehicle) => vehicle.data);
                setVehicles(vehicles);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadSpecies = () => {
        const promises = film.species.map((species) => {
            return axios
                .get(species)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
        });
        Promise.all(promises)
            .then((response) => {
                const species = response.map((species) => species.data);
                setSpecies(species);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>{film.title}</Card.Title>
                <Card.Divider />
                <Text style={styles.subtitle}>Episode:</Text>
                <Text style={styles.infoText}>{film.episode_id}</Text>
                <Text style={styles.subtitle}>Director:</Text>
                <Text style={styles.infoText}>{film.director}</Text>
                <Text style={styles.subtitle}>Producer:</Text>
                <Text style={styles.infoText}>{film.producer}</Text>
                <Text style={styles.subtitle}>Release Date:</Text>
                <Text style={styles.infoText}>{film.release_date}</Text>
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Characters</Card.Title>
                <Card.Divider />
                {characters.map((character) => (
                    <Text key={character.name} style={styles.cardText}>
                        {character.name}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Planets</Card.Title>
                <Card.Divider />
                {planets.map((planet) => (
                    <Text key={planet.name} style={styles.cardText}>
                        {planet.name}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Starships</Card.Title>
                <Card.Divider />
                {starships.map((starship) => (
                    <Text key={starship.name} style={styles.cardText}>
                        {starship.name}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Vehicles</Card.Title>
                <Card.Divider />
                {vehicles.map((vehicle) => (
                    <Text key={vehicle.name} style={styles.cardText}>
                        {vehicle.name}
                    </Text>
                ))}
            </Card>

            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>Species</Card.Title>
                <Card.Divider />
                {species.map((specie) => (
                    <Text key={specie.name} style={styles.cardText}>
                        {specie.name}
                    </Text>
                ))}
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "black",
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#777777",
        borderRadius: 5,
        shadowColor: "white",
    },
    cardTitle: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    subtitle: {
        fontWeight: "bold",
        marginTop: 8,
        color: "black",
    },
    infoText: {
        backgroundColor: "#DDDDDD",
        padding: 8,
        marginVertical: 4,
        color: "black",
        borderRadius: 5,
    },
    cardText: {
        color: "black",
        backgroundColor: "#DDDDDD",
        padding: 8,
        marginVertical: 4,
        borderRadius: 5,
    },
});

export default DetailFilm;
