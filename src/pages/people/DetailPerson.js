import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "react-native-elements";

const DetailPerson = ({ route, navigation }) => {
    const person = route.params;
    const [planeta, setPlaneta] = useState({});
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
            parentNavigation.setOptions({
                headerShown: false, // Ocultar el header en el DrawerNavigator
            });
        }

        navigation.setOptions({ title: person.name });
        loadPlaneta();
        loadFilms();
    }, []);

    const loadPlaneta = () => {
        axios
            .get(person.homeworld)
            .then((response) => {
                setPlaneta(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadFilms = () => {
        const promises = person.films.map((film) => {
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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{person.name}</Text>
            <Card containerStyle={styles.card}>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Height:</Text>
                    <Text style={styles.value}>{person.height}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Mass:</Text>
                    <Text style={styles.value}>{person.mass}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Hair Color:</Text>
                    <Text style={styles.value}>{person.hair_color}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Skin Color:</Text>
                    <Text style={styles.value}>{person.skin_color}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Eye Color:</Text>
                    <Text style={styles.value}>{person.eye_color}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Birth Year:</Text>
                    <Text style={styles.value}>{person.birth_year}</Text>
                </View>
            </Card>

            <Card containerStyle={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Homeworld:</Text>
                    <Text style={styles.sectionInfo}>{planeta.name}</Text>
                </View>
            </Card>

            <Card containerStyle={styles.card}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Films:</Text>
                    {films.map((film) => (
                        <Text key={film.title} style={styles.sectionInfo}>
                            {film.title}
                        </Text>
                    ))}
                </View>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#FFFFFF",
        textAlign: "center",
    },
    card: {
        marginBottom: 16,
        backgroundColor: "#777777",
        borderRadius: 5,
        shadowColor: "#FFFFFF",
    },
    infoContainer: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 8,
        color: "black",
        backgroundColor: "#DDDDDD",
        padding: 8,
        borderRadius: 5,
    },
    value: {
        fontSize: 16,
        color: "black",
        backgroundColor: "#CCCCCC",
        padding: 8,
        borderRadius: 5,
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "black",
    },
    sectionInfo: {
        fontSize: 16,
        color: "black",
        backgroundColor: "#CCCCCC",
        padding: 8,
        marginBottom: 8,
        borderRadius: 5,
    },
});

export default DetailPerson;
