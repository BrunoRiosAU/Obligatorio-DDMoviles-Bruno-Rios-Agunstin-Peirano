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

const DeleteRepuestos = ({ navigation }) => {
  const [nombreRepuesto, setNombreRepuesto] = useState("");

  const deleteRepuestos = () => {
    console.log("deleteRepuestos");
    db.transaction((tx) => {
      tx.executeSql(
        `select * from tratamientos where nombreRepuesto = ?`,
        [nombreRepuesto],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            Alert.alert("El Repuesto esta en un tratamiento");
          } else {
            console.log("deleteRepuestos");
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE FROM repuestos WHERE nombreRepuesto = ?`,
                [nombreRepuesto],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rowsAffected > 0) {
                    Alert.alert("Repuesto eliminado");
                    navigation.navigate("HomeRepuestos");
                  } else {
                    Alert.alert("El repuesto no existe");
                  }
                }
              );
            });
          };
        });
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda del Repuestos" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre del repuesto"
                onChangeText={(text) => setNombreRepuesto(text)}
              />
              <MySingleButton title="Borrar Repuesto" customPress={deleteRepuestos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteRepuestos;

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
