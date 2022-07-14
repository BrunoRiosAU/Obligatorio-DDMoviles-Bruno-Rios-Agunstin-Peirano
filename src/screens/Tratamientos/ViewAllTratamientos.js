import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, FlatList, Alert } from "react-native";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewAllTratamientos = ({ navigation }) => {
  const [tratamientos, setTratamientos] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM tratamientos`, [], (tx, results) => {
        console.log("results", results);
        if (results.rows.length > 0) {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setTratamientos(temp);
        } else {
          Alert.alert(
            "Mensaje",
            "No hay tratamientos!!!",
            [
              {
                text: "Ok",
                onPress: () => navigation.navigate("HomeTratamientos"),
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
        <MyText text={`Nombre del Insumo: ${item.nombreInsumo}`} style={styles.text} />
        <MyText text={`Nombre del Repuesto: ${item.nombreRepuesto}`} style={styles.text} />
        <MyText text={`Cantidad de Insumos: ${item.cantInsumos}`} style={styles.text} />
        <MyText text={`Cantidad de Repuestos: ${item.cantRepuestos}`} style={styles.text} />
        <MyText text={`Matricula del auto: ${item.auto}`} style={styles.text} />
        <MyText text={`Fecha Inicio: ${item.fechaInicio}`} style={styles.text} />
        <MyText text={`Fecha Fin: ${item.fechaFin}`} style={styles.text} />
        <MyText text={`Costo: ${item.costo}`} style={styles.text} />
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

export default ViewAllTratamientos;

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