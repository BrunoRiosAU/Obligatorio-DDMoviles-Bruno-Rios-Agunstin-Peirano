import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const RegisterInsumos = ({ navigation }) => {
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');


  const clearData = () => {
    setNombreInsumo("");
    setCantidad("");

  };

  const registerInsumos = () => {
    console.log("states", nombreInsumo, cantidad);
    debugger;
    if (!nombreInsumo.trim()) {
      Alert.alert("Ingrese el nombre del insumo");
      return;
    }

    if (!cantidad.trim()) {
      Alert.alert("Ingrese la cantidad");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO insumos(nombreInsumo, cantidad) VALUES (?, ?)`,
        [nombreInsumo, cantidad],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Insumo registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeInsumos"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar el Insumo");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre"
                onChangeText={setNombreInsumo}
                style={styles.input}
                value={nombreInsumo}
              />

              <MyInputText
                placeholder="Cantidad"
                onChangeText={setCantidad}
                style={styles.input}
                value={cantidad}
              />

              <MySingleButton
                title="Guardar Insumo"
                customPress={registerInsumos}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterInsumos;

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
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    padding: 15,
    textAlignVertical: "top",
  },
});
