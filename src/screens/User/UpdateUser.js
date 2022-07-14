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

const UpdateUser = () => {
  const [cedulaSearch, setCedulaSearch] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");

  const searchUser = () => {
    console.log("searchUser");

    if (!cedulaSearch.trim()) {
      Alert.alert("La cedula es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE cedula = ?",
        [cedulaSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setNombre(results.rows.item(0).nombre);
            setApellido(results.rows.item(0).apellido);
            setMatricula(results.rows.item(0).matricula);
          } else {
            Alert.alert("Usuario no encontrado");
          }
        }
      );
    });
  };

  const updateUser = () => {
    console.log("updateUser");

    if (!nombre.trim()) {
      Alert.alert("El nombre no puede estar vacio");
      return;
    }

    if (!apellido.trim()) {
      Alert.alert("El apellido no puede estar vacio");
      return;
    }

    if (!matricula.trim()) {
      Alert.alert("La matricula no puede estar vacia");
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
                `SELECT * FROM users WHERE matricula = ? and cedula <> ?`,
                [matricula, cedulaSearch],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rows.length > 0) {
                    Alert.alert("La matricula ya esta vinculada");
                  } else {
                    db.transaction((tx) => {
                      tx.executeSql(
                        "UPDATE users SET nombre = ?, apellido = ? , matricula = ?  WHERE cedula = ?",
                        [nombre, apellido, matricula, cedulaSearch],
                        (tx, results) => {
                          if (results.rowsAffected > 0) {
                            Alert.alert("Usuario actualizado");
                          } else {
                            Alert.alert("No se pudo actualizar el usuario");
                          }
                        }
                      );
                    });
                  }
                });
            });
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardView}
            >
              <MyText text="Buscar Usuario" style={styles.text} />
              <MyInputText
                placeholder="Ingrese la Cedula"
                style={styles.inputStyle}
                onChangeText={(text) => setCedulaSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchUser} />

              <MyInputText
                placeholder="Ingrese el nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <MyInputText
                placeholder="Ingrese el apellido"
                value={apellido}
                onChangeText={(text) => setApellido(text)}
              />
              <MyInputText
                placeholder="Ingrese la matricula"
                value={matricula}
                onChangeText={(text) => setMatricula(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateUser} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;

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
