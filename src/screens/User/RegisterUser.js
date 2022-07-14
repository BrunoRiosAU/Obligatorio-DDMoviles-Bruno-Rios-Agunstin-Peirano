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

const RegisterUser = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [matricula, setMatricula] = useState('');

  const clearData = () => {
    setNombre("");
    setApellido("");
    setCedula("");
    setMatricula("");
  };

  const registerUser = () => {
    console.log("states", nombre, apellido, cedula, matricula);
    // validaciones estados
    debugger;
    if (!nombre.trim()) {
      Alert.alert("Ingrese su nombre");
      return;
    }

    if (!apellido.trim()) {
      Alert.alert("Ingrese su apellido");
      return;
    }

    if (!cedula.trim()) {
      Alert.alert("Ingrese su cedula");
      return;
    }

    if (!matricula.trim()) {
      Alert.alert("Ingrese su matricula de auto");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM autos WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM users WHERE matricula = ?`,
                [matricula],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rows.length > 0) {
                    Alert.alert("La matricula ya esta vinculada");
                  } else {
                    db.transaction((tx) => {
                      tx.executeSql(
                        `INSERT INTO users (cedula, nombre, apellido, matricula) VALUES (?, ?, ?, ?)`,
                        [cedula, nombre, apellido, matricula],
                        (tx, results) => {
                          console.log("results", results);
                          if (results.rowsAffected > 0) {
                            clearData();
                            Alert.alert(
                              "Exito",
                              "Usuario registrado!!!",
                              [
                                {
                                  text: "Ok",
                                  onPress: () => navigation.navigate("HomeUser"),
                                },
                              ],
                              { cancelable: false }
                            );
                          } else {
                            Alert.alert("Error al registrar usuario");
                          }
                        }
                      );
                    });
                  }
                });
            });
            console.log("Si")
          }
          else {
            Alert.alert("La matricula no existe");
          }
        });
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
                onChangeText={setNombre}
                style={styles.Input}
                value={nombre}
              />

              <MyInputText
                placeholder="Apellido"
                onChangeText={setApellido}
                style={styles.Input}
                value={apellido}
              />

              <MyInputText
                placeholder="1.111.111-1"
                minLength={11}
                maxLength={11}
                onChangeText={setCedula}
                style={styles.Input}
                value={cedula}
              />

              <MyInputText
                placeholder="Matricula del Auto"
                onChangeText={setMatricula}
                style={styles.Input}
                value={matricula}
              />

              <MySingleButton
                title="Guardar Usuario"
                customPress={registerUser}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

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
  Input: {
    padding: 15,
    textAlignVertical: "top",
  },
});
