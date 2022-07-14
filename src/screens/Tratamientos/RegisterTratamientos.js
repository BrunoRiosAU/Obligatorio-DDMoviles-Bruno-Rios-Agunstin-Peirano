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

const RegisterTratamiento = ({ navigation }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState('');
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [nombreRepuesto, setNombreRepuesto] = useState('');
  const [cantInsumos, setCantInsumos] = useState('');
  const [cantRepuestos, setCantRepuestos] = useState('');
  const [auto, setAuto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [costo, setCosto] = useState('');


  const clearData = () => {
    setNombreTratamiento("");
    setNombreInsumo("");
    setNombreRepuesto("");
    setCantInsumos("");
    setCantRepuestos("");
    setAuto("");
    setFechaInicio("");
    setFechaFin("");
    setCosto("");
  };

  const registerTratamiento = () => {
    console.log("states", nombreTratamiento, nombreInsumo, nombreRepuesto, auto, fechaInicio, fechaFin, costo);
    // validaciones estados
    debugger;
    if (!nombreTratamiento.trim()) {
      Alert.alert("Ingrese el nombre del tratamiento");
      return;
    }

    if (!nombreInsumo.trim()) {
      Alert.alert("Ingrese el nombre del insumo");
      return;
    }

    if (!nombreRepuesto.trim()) {
      Alert.alert("Ingrese el nombre del repuesto");
      return;
    }
    if (!cantInsumos.trim()) {
      Alert.alert("Ingrese la cantidad de insumos");
      return;
    }

    if (!cantRepuestos.trim()) {
      Alert.alert("Ingrese la cantidad de repuestos");
      return;
    }

    if (!auto.trim()) {
      Alert.alert("Ingrese su matricula de auto");
      return;
    }

    if (!fechaInicio.trim()) {
      Alert.alert("Ingrese la fecha de inicio");
      return;
    }

    if (!fechaFin.trim()) {
      Alert.alert("Ingrese la fecha de fin");
      return;
    }

    if (!costo.trim()) {
      Alert.alert("Ingrese el costo");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM insumos WHERE nombreInsumo = ?`,
        [nombreInsumo],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM repuestos WHERE nombreRepuesto = ?`,
                [nombreRepuesto],
                (tx, results) => {
                  console.log("results", results);
                  if (results.rows.length > 0) {
                    db.transaction((tx) => {
                      tx.executeSql(
                        `SELECT * FROM autos WHERE matricula = ?`,
                        [auto],
                        (tx, results) => {
                          console.log("results", results);
                          if (results.rows.length > 0) {
                            db.transaction((tx) => {
                              tx.executeSql(
                                `INSERT INTO tratamientos (nombreTratamiento, nombreInsumo, nombreRepuesto, cantInsumos, cantRepuestos, auto, fechaInicio, fechaFin, costo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                [nombreTratamiento, nombreInsumo, nombreRepuesto, cantInsumos, cantRepuestos, auto, fechaInicio, fechaFin, costo],
                                (tx, results) => {
                                  console.log("results", results);
                                  if (results.rowsAffected > 0) {
                                    clearData();
                                    Alert.alert(
                                      "Exito",
                                      "Tratamiento registrado!!!",
                                      [
                                        {
                                          text: "Ok",
                                          onPress: () => navigation.navigate("HomeTratamientos"),
                                        },
                                      ],
                                      { cancelable: false }
                                    );
                                  } else {
                                    Alert.alert("Error al registrar el tratamiento");
                                  }
                                }
                              );
                            });
                          } else {
                            Alert.alert("El vehiculo no existe");
                          }
                        }
                      );
                    });
                  } else {
                    Alert.alert("El repuesto no existe");
                  }
                }
              );
            });
          } else {
            Alert.alert("El insumo no existe");
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
                placeholder="Nombre del Tratamiento"
                onChangeText={setNombreTratamiento}
                style={styles.Input}
                value={nombreTratamiento}
              />

              <MyInputText
                placeholder="Nombre del Insumo"
                onChangeText={setNombreInsumo}
                style={styles.Input}
                value={nombreInsumo}
              />

              <MyInputText
                placeholder="Nombre del Repuesto"
                onChangeText={setNombreRepuesto}
                style={styles.Input}
                value={nombreRepuesto}
              />

              <MyInputText
                placeholder="Cantidad de Insumos"
                onChangeText={setCantInsumos}
                style={styles.Input}
                value={cantInsumos}
              />

              <MyInputText
                placeholder="Cantidad de Repuestos"
                onChangeText={setCantRepuestos}
                style={styles.Input}
                value={cantRepuestos}
              />

              <MyInputText
                placeholder="Matricula del Auto"
                onChangeText={setAuto}
                style={styles.Input}
                value={auto}
              />

              <MyInputText
                placeholder="Fecha inicio"
                onChangeText={setFechaInicio}
                style={styles.Input}
                value={fechaInicio}
              />

              <MyInputText
                placeholder="Fecha fin"
                onChangeText={setFechaFin}
                style={styles.Input}
                value={fechaFin}
              />

              <MyInputText
                placeholder="Costo"
                onChangeText={setCosto}
                style={styles.Input}
                value={costo}
              />

              <MySingleButton
                title="Guardar Tratamiento"
                customPress={registerTratamiento}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterTratamiento;

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
