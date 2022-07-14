import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyInputText from '../../components/MyInputText'
import MySingleButton from "../../components/MySingleButton";
import MyText from "../../components/MyText";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const DeleteTratamientos = ({ navigation }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState("");
  const [nombreInsumo, setNombreInsumo] = useState("");
  const [nombreRepuesto, setNombreRepuesto] = useState("");

  const deleteTratamientos = () => {
    console.log("deleteTratamientos");
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tratamientos WHERE nombreTratamiento = ? and nombreInsumo = ? and nombreRepuesto = ?`,
        [nombreTratamiento, nombreInsumo, nombreRepuesto],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            Alert.alert("Tratamiento eliminado");
            navigation.navigate("HomeTratamientos");
          } else {
            Alert.alert("El tratamiento no existe");
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
            <MyText text="Busqueda del tratamiento" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre del tratamiento"
                onChangeText={(text) => setNombreTratamiento(text)}
              />
              <MyInputText
                placeholder="Nombre del insumo"
                onChangeText={(text) => setNombreInsumo(text)}
              />
              <MyInputText
                placeholder="Nombre del repuesto"
                onChangeText={(text) => setNombreRepuesto(text)}
              />
              <MySingleButton title="Borrar Tratamiento" customPress={deleteTratamientos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteTratamientos;

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
  inputStyle: {
    padding: 15,
  },
  text: {
    padding: 10,
    marginLeft: 25,
    color: "black",
  },
});
