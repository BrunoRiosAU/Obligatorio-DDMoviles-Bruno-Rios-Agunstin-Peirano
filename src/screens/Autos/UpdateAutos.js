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

const UpdateAutos = () => {
  const [matriculaSearch, setMatriculaSearch] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [serialMotor, setSerialMotor] = useState("");

  const searchAutos = () => {
    console.log("searchAutos");

    if (!matriculaSearch.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM autos WHERE matricula = ?",
        [matriculaSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setMarca(results.rows.item(0).marca);
            setColor(results.rows.item(0).color);
            setSerialMotor(results.rows.item(0).serialMotor);
          } else {
            Alert.alert("Auto no encontrado");
          }
        }
      );
    });
  };

  const updateAutos = () => {
    console.log("updateAutos");

    if (!marca.trim()) {
      Alert.alert("La marca no puede estar vacia");
      return;
    }

    if (!color.trim()) {
      Alert.alert("El color no puede estar vacio");
      return;
    }

    if (!serialMotor.trim()) {
      Alert.alert("El serial no puede estar vacio");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE autos SET marca = ?, color = ?, serialMotor = ? WHERE matricula = ?",
        [marca, color, serialMotor, matriculaSearch],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert("Auto actualizado");
          } else {
            Alert.alert("No se pudo actualizar el auto");
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
              <MyText text="Buscar Autos" style={styles.text} />
              <MyInputText
                placeholder="Ingrese la matricula del Auto"
                style={styles.inputStyle}
                onChangeText={(text) => setMatriculaSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchAutos} />

              <MyInputText
                placeholder="Ingrese la marca"
                value={marca}
                onChangeText={(text) => setMarca(text)}
              />

              <MyInputText
                placeholder="Ingrese el color"
                value={color}
                onChangeText={(text) => setColor(text)}
              />

              <MyInputText
                placeholder="Ingrese el serial del motor"
                value={serialMotor}
                onChangeText={(text) => setSerialMotor(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateAutos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAutos;

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
