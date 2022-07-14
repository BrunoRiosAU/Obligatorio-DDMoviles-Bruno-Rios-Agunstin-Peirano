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

const DeleteInsumos = ({ navigation }) => {
  const [nombreInsumo, setNombreInsumo] = useState("");

  const deleteInsumos = () => {
    console.log("deleteInsumos");
    db.transaction((tx) => {
      tx.executeSql(
        `select * from tratamientos where nombreInsumo = ?`,
        [nombreInsumo],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            Alert.alert("El Insumo esta en un tratamiento");
          } else {
            db.transaction((tx) => {
              tx.executeSql(
                `DELETE FROM insumos WHERE nombreInsumo = ?`,
                [nombreInsumo],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rowsAffected > 0) {
                    Alert.alert("Insumo eliminado");
                    navigation.navigate("HomeInsumos");
                  } else {
                    Alert.alert("El insumo no existe");
                  }
                }
              );
            });
          };
        });
    });

  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda del Inusmos" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Nombre del insumo"
                onChangeText={(text) => setNombreInsumo(text)}
              />
              <MySingleButton title="Borrar Inusmo" customPress={deleteInsumos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteInsumos;

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
