import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, TextInput, Image } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const FilmsScreen = ({ navigation }) => {
    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const isFocused = useIsFocused();

    useEffect(() => {
        getFilms();

        if (isFocused) {
            const parentNavigation = navigation.getParent();
            if (parentNavigation) {
                parentNavigation.setOptions({
                    headerShown: true,
                });
            }
        }
    }, [isFocused, navigation]);

    const getFilms = (url) => {
        const apiUrl = url || "https://swapi.dev/api/films/";
        axios
            .get(apiUrl)
            .then((response) => {
                setFilms(response.data.results);
                setFilteredFilms(response.data.results);
                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleNextPage = () => {
        if (nextPage) {
            getFilms(nextPage);
        }
    };

    const handlePreviousPage = () => {
        if (previousPage) {
            getFilms(previousPage);
        }
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filteredData = films.filter((film) =>
            film.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredFilms(filteredData);
    };

    const navigateToDetail = (item) => {
        navigation.navigate("filmdetail", item);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>STARS WARS</Text>
            </View>
            <View style={styles.data}>
                <View style={styles.search}>
                    <TextInput
                        style={styles.search_input}
                        placeholder="Search..."
                        placeholderTextColor="white"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <TouchableOpacity style={styles.search_icon}>
                        <Icon name="search" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.text}>
                    <Text style={styles.subtitle}>List of films</Text>
                </View>
            </View>
            <FlatList
                data={filteredFilms}
                renderItem={({ item, index }) => {
                    const imageSource = require("../../../assets/img1.jpg");
                    return (
                        <View style={styles.element}>
                            <Image source={imageSource} style={styles.image} />
                            <View style={styles.element_text}>
                                <View style={styles.element_title}>
                                    <Text size={12} style={styles.element_title_info}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={styles.element_data}>
                                    <TouchableOpacity
                                        style={styles.element_btn}
                                        onPress={() => navigateToDetail(item)}>
                                        <Icon
                                            name="rocket"
                                            size={12}
                                            color="#76414E"
                                            style={styles.element_icon}
                                        />
                                        <Text size={12} style={styles.element_btn_text}>
                                            DATABANK
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.row}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        // eslint-disable-next-line react-native/no-inline-styles
                        { backgroundColor: previousPage ? "#76414E" : "#C0C0C0" },
                    ]}
                    onPress={handlePreviousPage}
                    disabled={!previousPage}>
                    <Text size={12} style={styles.bottom_btn}>
                        LAST PAGE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={[styles.button, { backgroundColor: nextPage ? "#76414E" : "#C0C0C0" }]}
                    onPress={handleNextPage}
                    disabled={!nextPage}>
                    <Text size={12} style={styles.bottom_btn}>
                        NEXT PAGE
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1E1E1E",
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 20,
    },
    data: {
        padding: 20,
    },
    title: {
        fontSize: "22px",
        color: "white",
    },
    search: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#3A3A3A",
        borderRadius: 5,
    },
    search_input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        color: "white",
    },
    search_icon: {
        padding: 10,
        color: "white",
    },
    text: {
        marginTop: 20,
    },
    subtitle: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#444",
        paddingTop: 10,
        paddingBottom: 10,
        color: "white",
        fontSize: 16,
    },
    element: {
        flexDirection: "row",
        alignItems: "top",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 0,
        marginBottom: 20,
        backgroundColor: "#282727",
        borderRadius: 5,
    },
    image: {
        width: 140,
        height: 140,
        borderRightWidth: 3,
        borderColor: "#76414E",
        paddingRight: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    element_text: {
        marginLeft: 10,
        padding: 10,
    },
    element_title: {
        marginTop: 10,
        marginBottom: 70,
    },
    element_btn: {
        flexDirection: "row",
        alignItems: "center",
    },
    element_icon: {
        marginRight: 5,
    },
    element_title_info: {
        color: "white",
        fontSize: 16,
    },
    element_btn_text: {
        color: "#76414E",
        fontSize: 12,
    },
    next_btn: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    last_btn: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    button_text: {
        color: "white",
    },
    button: {
        margin: 10,
        padding: 10,
        borderRadius: 5,
    },
    bottom_btn: {
        color: "white",
        fontSize: 12,
    },
});

export default FilmsScreen;
