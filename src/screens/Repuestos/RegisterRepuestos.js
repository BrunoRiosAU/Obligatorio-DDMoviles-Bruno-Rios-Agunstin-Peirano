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

const RegisterRepuestos = ({ navigation }) => {
  const [nombreRepuesto, setNombreRepuesto] = useState('');
  const [cantidad, setCantidad] = useState('');


  const clearData = () => {
    setNombreRepuesto("");
    setCantidad("");

  };

  const registerRepuestos = () => {
    console.log("states", nombreRepuesto, cantidad);
    debugger;
    if (!nombreRepuesto.trim()) {
      Alert.alert("Ingrese el nombre del repuesto");
      return;
    }

    if (!cantidad.trim()) {
      Alert.alert("Ingrese la cantidad");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO repuestos(nombreRepuesto, cantidad) VALUES (?, ?)`,
        [nombreRepuesto, cantidad],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Repuesto registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeRepuestos"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar el Repuesto");
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
                onChangeText={setNombreRepuesto}
                style={styles.input}
                value={nombreRepuesto}
              />

              <MyInputText
                placeholder="Cantidad"
                onChangeText={setCantidad}
                style={styles.input}
                value={cantidad}
              />

              <MySingleButton
                title="Guardar Repuesto"
                customPress={registerRepuestos}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterRepuestos;

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
