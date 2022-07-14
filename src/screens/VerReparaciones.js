import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../components/MyText";

import DatabaseConnection from "../database/database-connection";
const db = DatabaseConnection.getConnection();

const VerReparaciones = ({ navigation }) => {
    const [tratamientos, setTratamientos] = useState([]);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(`SELECT T.nombreTratamiento, U.nombre, U.apellido, T.auto, T.fechaInicio, sum(T.cantInsumos) CantIns, sum(T.cantRepuestos) CantRep FROM tratamientos T inner join users U on T.auto = U.matricula group by T.nombreTratamiento, U.nombre, U.apellido, T.auto, T.fechaInicio`, [], (tx, results) => {
                console.log("results", results);
                if (results.rows.length > 0) {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        temp.push(results.rows.item(i));
                        setTratamientos(temp);
                    }
                } else {
                    Alert.alert(
                        "Mensaje",
                        "No hay tratamientos!!!",
                        [
                            {
                                text: "Ok",
                                onPress: () => navigation.navigate("Home"),
                            },
                        ],
                        { cancelable: false }
                    );
                }
            });
        });
    }, []);

    const listItemView = (item) => {
        return (
            <View key={item.id} style={styles.listItemView}>
                <MyText text={`Nombre del Tratamiento: ${item.nombreTratamiento}`} style={styles.text} />
                <MyText text={`Matricula del auto: ${item.auto}`} style={styles.text} />
                <MyText text={`Nombre del Cliente: ${item.nombre}`} style={styles.text} />
                <MyText text={`Apellido del Cliente: ${item.apellido}`} style={styles.text} />
                <MyText text={`Fecha del Tratamiento: ${item.fechaInicio}`} style={styles.text} />
                <MyText text={`Cantidad de Insumos: ${item.CantIns}`} style={styles.text} />
                <MyText text={`Cantidad de Repuestos: ${item.CantRep}`} style={styles.text} />

            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <FlatList
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        data={tratamientos}
                        keyExtractor={(index) => index.toString()}
                        renderItem={({ item }) => listItemView(item)}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default VerReparaciones;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    generalView: {
        flex: 1,
    },
    listView: {
        marginTop: 20,
    },
    listItemView: {
        backgroundColor: "white",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    text: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
    }
});