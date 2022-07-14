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

const DeleteAutos = ({ navigation }) => {
  const [matricula, setMatricula] = useState("");

  const deleteAutos = () => {
    console.log("deleteAutos");
    db.transaction((tx) => {
      tx.executeSql(
        `select * from users where matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            Alert.alert("El vehiculo tiene usuario");
          } else {
            db.transaction((tx) => {
              tx.executeSql(
                `select * from tratamientos where auto = ?`,
                [matricula],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rows.length > 0) {
                    Alert.alert("El vehiculo esta en un tratamiento");
                  } else {
                    db.transaction((tx) => {
                      tx.executeSql(
                        `DELETE FROM autos WHERE matricula = ?`,
                        [matricula],
                        (tx, results) => {
                          console.log("results", results);
                          if (results.rowsAffected > 0) {
                            Alert.alert("Auto eliminado");
                            navigation.navigate("HomeAutos");
                          } else {
                            Alert.alert("El auto no existe");
                          }
                        })
                    });
                  }
                });
            });
          }
        })
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView>
            <MyText text="Busqueda del auto" style={styles.text} />
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyInputText
                placeholder="Matricula del auto"
                onChangeText={(text) => setMatricula(text)}
              />
              <MySingleButton title="Borrar Autos" customPress={deleteAutos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteAutos;

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
