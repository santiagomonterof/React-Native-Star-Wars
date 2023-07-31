import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card } from "react-native-elements";

const DetailSpecie = ({ route, navigation }) => {
    const specie = route.params;
    const [films, setFilms] = useState([]);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false, // Ocultar el header en el DrawerNavigator
            });
        }

        navigation.setOptions({ title: specie.name });
        loadFilms();
        loadCharacters();
    }, []);

    const loadFilms = () => {
        const promises = specie.films.map((film) => {
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

    const loadCharacters = () => {
        const promises = specie.people.map((character) => {
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

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}>{specie.name}</Card.Title>
                <Card.Divider />
                <Text style={styles.subtitle}>Classification:</Text>
                <Text style={styles.text}>{specie.classification}</Text>
                <Text style={styles.subtitle}>Designation:</Text>
                <Text style={styles.text}>{specie.designation}</Text>
                <Text style={styles.subtitle}>Average Height:</Text>
                <Text style={styles.text}>{specie.average_height}</Text>
                <Text style={styles.subtitle}>Skin Colors:</Text>
                <Text style={styles.text}>{specie.skin_colors}</Text>
                <Text style={styles.subtitle}>Hair Colors:</Text>
                <Text style={styles.text}>{specie.hair_colors}</Text>
                <Text style={styles.subtitle}>Eye Colors:</Text>
                <Text style={styles.text}>{specie.eye_colors}</Text>
                <Text style={styles.subtitle}>Average Lifespan:</Text>
                <Text style={styles.text}>{specie.average_lifespan}</Text>
                <Text style={styles.subtitle}>Homeworld:</Text>
                <Text style={styles.text}>{specie.homeworld}</Text>
                <Text style={styles.subtitle}>Language:</Text>
                <Text style={styles.text}>{specie.language}</Text>
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
                <Card.Title>People</Card.Title>
                <Card.Divider />
                {characters.map((character) => (
                    <Text key={character.name} style={styles.text}>
                        {character.name}
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

export default DetailSpecie;
