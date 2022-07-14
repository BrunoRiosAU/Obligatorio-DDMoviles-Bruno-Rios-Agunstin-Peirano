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

const UpdateInusmos = () => {
  const [nombreInsumoSearch, setNombreInsumoSearch] = useState("");
  const [cantidad, setCantidad] = useState("");


  const searchInusmos = () => {
    console.log("searchInusmos");

    if (!nombreInsumoSearch.trim()) {
      Alert.alert("El nombre del insumo es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM insumos WHERE nombreInsumo = ?",
        [nombreInsumoSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setCantidad(results.rows.item(0).cantidad);
          } else {
            Alert.alert("Inusmo no encontrado");
          }
        }
      );
    });
  };

  const updateInsumos = () => {
    console.log("updateInsumos");

    if (!cantidad.trim()) {
      Alert.alert("La cantidad no puede estar vacia");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE insumos SET cantidad = ? WHERE nombreInsumo = ?",
        [cantidad, nombreInsumoSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Insumo actualizado");
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
              <MyText text="Buscar Insumos" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el nombre del Insumo"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreInsumoSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchInusmos} />

              <MyInputText
                placeholder="Ingrese la cantidad"
                value={cantidad}
                onChangeText={(text) => setCantidad(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateInsumos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateInusmos;

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
