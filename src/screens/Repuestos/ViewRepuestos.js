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

const ViewRepuestos = ({ navigation }) => {
  const [nombreRepuesto, setNombreRepuesto] = useState("");
  const [repuestoData, setRepuestoData] = useState(null);

  const getRepuestoData = () => {
    console.log("getRepuestoData");
    setRepuestoData({});

    if (!nombreRepuesto.trim()) {
      Alert.alert("El nombre es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM repuestos WHERE nombreRepuesto = ?`,
        [nombreRepuesto],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setRepuestoData(results.rows.item(0));
          } else {
            Alert.alert("El repuesto no existe");
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
              <MyText text="Filtro de repuesto" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Repuesto"
                onChangeText={(text) => setNombreRepuesto(text)}
              />
              <MySingleButton title="Buscar" customPress={getRepuestoData} />
              <View style={styles.presenterView}>
                <MyText text={`Nombre del Repuesto: ${!repuestoData ? '' : repuestoData.nombreRepuesto}`} style={styles.presenterText} />
                <MyText text={`Cantidad: ${!repuestoData ? '' : repuestoData.cantidad}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewRepuestos;

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