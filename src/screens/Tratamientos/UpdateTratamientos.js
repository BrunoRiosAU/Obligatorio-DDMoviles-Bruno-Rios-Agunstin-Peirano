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

const UpdateTratamientos = () => {
  const [nombreTratamientoSearch, setNombreTratamientoSearch] = useState('');
  const [nombreInsumoSearch, setNombreInsumoSearch] = useState('');
  const [nombreRepuestoSearch, setNombreRepuestoSearch] = useState('');
  const [cantInsumos, setCantInsumos] = useState('');
  const [cantRepuestos, setCantRepuestos] = useState('');
  const [auto, setAuto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [costo, setCosto] = useState('');

  const searchTratamientos = () => {
    console.log("searchAutos");

    if (!nombreTratamientoSearch.trim()) {
      Alert.alert("El nombre del tratamiento es requerido");
      return;
    }
    if (!nombreInsumoSearch.trim()) {
      Alert.alert("El nombre del insumo es requerido");
      return;
    }
    if (!nombreRepuestoSearch.trim()) {
      Alert.alert("El nombre del repuesto es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM tratamientos WHERE nombreTratamiento = ? and nombreInsumo = ? and nombreRepuesto = ?",
        [nombreTratamientoSearch, nombreInsumoSearch, nombreRepuestoSearch],
        (tx, results) => {
          if (results.rows.length > 0) {
            setCantInsumos(results.rows.item(0).cantInsumos);
            setCantRepuestos(results.rows.item(0).cantRepuestos);
            setAuto(results.rows.item(0).auto);
            setFechaInicio(results.rows.item(0).fechaInicio);
            setFechaFin(results.rows.item(0).fechaFin);
            setCosto(results.rows.item(0).costo);
          } else {
            Alert.alert("Tratamiento no encontrado");
          }
        }
      );
    });
  };

  const updateTratamientos = () => {
    console.log("updateTratamientos");

    if (!cantInsumos.trim()) {
      Alert.alert("La cantidad de insumos es requerida");
      return;
    }
    if (!cantRepuestos.trim()) {
      Alert.alert("La cantidad de repuestos es requerida");
      return;
    }
    if (!auto.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }
    if (!fechaInicio.trim()) {
      Alert.alert("La fecha de inicio es requerida");
      return;
    }
    if (!fechaFin.trim()) {
      Alert.alert("La fecha de fin es requerida");
      return;
    }
    if (!costo.trim()) {
      Alert.alert("El costo es requerido");
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM insumos WHERE nombreInsumo = ?`,
        [nombreInsumoSearch],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            db.transaction((tx) => {
              tx.executeSql(
                `SELECT * FROM repuestos WHERE nombreRepuesto = ?`,
                [nombreRepuestoSearch],
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
                                "UPDATE tratamientos SET cantInsumos = ?, cantRepuestos = ?, auto = ?, fechaInicio = ?, fechaFin = ?, costo = ? where nombreTratamiento = ? and nombreInsumo = ? and nombreRepuesto = ?",
                                [cantInsumos, cantRepuestos, auto, fechaInicio, fechaFin, costo, nombreTratamientoSearch, nombreInsumoSearch, nombreRepuestoSearch],
                                (tx, results) => {
                                  if (results.rowsAffected > 0) {
                                    Alert.alert("Tratamiento actualizado");
                                  } else {
                                    Alert.alert("No se pudo actualizar el tratamiento");
                                  }
                                }
                              );
                            });
                          } else {
                            Alert.alert("El auto no existe");
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
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={styles.keyboardView}
            >
              <MyText text="Buscar Tratamientos" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el nombre del tratamiento"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreTratamientoSearch(text)}
              />
              <MyInputText
                placeholder="Ingrese el nombre del insumo"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreInsumoSearch(text)}
              />
              <MyInputText
                placeholder="Ingrese el nombre del repuesto"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreRepuestoSearch(text)}
              />
              <MySingleButton title="Buscar" customPress={searchTratamientos} />

              <MyInputText
                placeholder="Ingrese la cantidad de insumos"
                value={cantInsumos}
                onChangeText={(text) => setCantInsumos(text)}
              />

              <MyInputText
                placeholder="Ingrese la cantidad de repuestos"
                value={cantRepuestos}
                onChangeText={(text) => setCantRepuestos(text)}
              />

              <MyInputText
                placeholder="Ingrese la matricula del Auto"
                value={auto}
                onChangeText={(text) => setAuto(text)}
              />

              <MyInputText
                placeholder="Ingrese la fecha de inicio"
                value={fechaInicio}
                onChangeText={(text) => setFechaInicio(text)}
              />

              <MyInputText
                placeholder="Ingrese la fecha de fin"
                value={fechaFin}
                onChangeText={(text) => setFechaFin(text)}
              />

              <MyInputText
                placeholder="Ingrese el costo"
                value={costo}
                onChangeText={(text) => setCosto(text)}
              />

              <MySingleButton title="Actualizar" customPress={updateTratamientos} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateTratamientos;

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