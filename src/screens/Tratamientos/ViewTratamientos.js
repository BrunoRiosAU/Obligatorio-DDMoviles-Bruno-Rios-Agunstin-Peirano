import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import MyText from "../../components/MyText";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const ViewTratamientos = ({ navigation }) => {
  const [nombreTratamiento, setNombreTratamiento] = useState('');
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [nombreRepuesto, setNombreRepuesto] = useState('');
  const [tratamientoData, setTratamientoData] = useState(null);

  const getTratamientoData = () => {
    console.log("getTratamientoData");
    setTratamientoData({});

    if (!nombreTratamiento.trim()) {
      Alert.alert("El nombre del tratamiento es requerido");
      return;
    }
    if (!nombreInsumo.trim()) {
      Alert.alert("El nombre del insumo es requerido");
      return;
    }
    if (!nombreRepuesto.trim()) {
      Alert.alert("El nombre del repuesto es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tratamientos WHERE nombreTratamiento = ? and nombreInsumo = ? and nombreRepuesto = ?`,
        [nombreTratamiento, nombreInsumo, nombreRepuesto],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setTratamientoData(results.rows.item(0));
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
            <KeyboardAvoidingView style={styles.keyboardView}>
              <MyText text="Filtro de tratamientos" style={styles.text} />
              <MyInputText
                placeholder="Ingrese el nombre del tratamiento"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreTratamiento(text)}
              />
              <MyInputText
                placeholder="Ingrese el nombre del insumo"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreInsumo(text)}
              />
              <MyInputText
                placeholder="Ingrese el nombre del repuesto"
                style={styles.inputStyle}
                onChangeText={(text) => setNombreRepuesto(text)}
              />
              <MySingleButton title="Buscar" customPress={getTratamientoData} />
              <View style={styles.presenterView}>
                <MyText text={`Nombre del Tratamiento: ${!tratamientoData ? '' : tratamientoData.nombreTratamiento}`} style={styles.presenterText} />
                <MyText text={`Nombre del Insumo: ${!tratamientoData ? '' : tratamientoData.nombreInsumo}`} style={styles.presenterText} />
                <MyText text={`Nombre del Repuesto: ${!tratamientoData ? '' : tratamientoData.nombreRepuesto}`} style={styles.presenterText} />
                <MyText text={`Cantidad de Insumos: ${!tratamientoData ? '' : tratamientoData.cantInsumos}`} style={styles.presenterText} />
                <MyText text={`Cantidad de Repuestos: ${!tratamientoData ? '' : tratamientoData.cantRepuestos}`} style={styles.presenterText} />
                <MyText text={`Matricula del auto: ${!tratamientoData ? '' : tratamientoData.auto}`} style={styles.presenterText} />
                <MyText text={`Fecha Inicio: ${!tratamientoData ? '' : tratamientoData.fechaInicio}`} style={styles.presenterText} />
                <MyText text={`Fecha Fin: ${!tratamientoData ? '' : tratamientoData.fechaFin}`} style={styles.presenterText} />
                <MyText text={`Costo: ${!tratamientoData ? '' : tratamientoData.costo}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewTratamientos;

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
    margin: 10,
    color: "black",
  },
  presenterView: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    fontSize: 30,
  },
  presenterText: {
    fontSize: 20
  }
});