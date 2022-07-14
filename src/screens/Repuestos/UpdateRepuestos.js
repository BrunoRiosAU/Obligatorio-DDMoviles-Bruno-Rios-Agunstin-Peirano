import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const UpdateRepuestos = () => {
  const [nombreRepuestoSearch, setNombreRepuestoSearch] = useState("");
  const [cantidad, setCantidad] = useState("");


  const searchRepuestos = () => {
    console.log("searchRepuestos");

    if (!nombreRepuestoSearch.trim()) {
      Alert.alert("El nombre del repuesto es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM repuestos WHERE nombreRepuesto = ?",
        [nombreRepuestoSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setCantidad(results.rows.item(0).cantidad);
          } else {
            Alert.alert("Repuesto no encontrado");
          }
        }
      );
    });
  };

  const updateRepuestos = () => {
    console.log("updateRepuestos");

    if (!cantidad.trim()) {
      Alert.alert("La cantidad no puede estar vacia");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE repuestos SET cantidad = ? where nombreRepuesto = ?",
        [cantidad, nombreRepuestoSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Repuesto actualizado");
          } else {
            Alert.alert("No se pudo actualizar el insumo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardView}
            >
              <MyText text="Buscar Repuestos" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el nombre del Repuesto"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreRepuestoSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchRepuestos} />

              <MyInputText
                placeholder="Ingrese la cantidad"
                value={cantidad}
                onChangeText={(text) => setCantidad(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateRepuestos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateRepuestos;

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
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
  inputStyle: {
    padding: 15,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
});
