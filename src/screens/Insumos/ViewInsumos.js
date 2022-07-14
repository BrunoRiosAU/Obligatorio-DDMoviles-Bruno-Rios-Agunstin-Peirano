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

const ViewInsumos = ({ navigation }) => {
  const [nombreInsumo, setNombreInsumo] = useState("");
  const [insumoData, setInsumoData] = useState(null);

  const getInsumoData = () => {
    console.log("getInsumoData");
    setInsumoData({});

    if (!nombreInsumo.trim()) {
      Alert.alert("El nombre es requerido");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM insumos WHERE nombreInsumo = ?`,
        [nombreInsumo],
        (tx, results) => {
          console.log("results", results);
          if (results.rows.length > 0) {
            setInsumoData(results.rows.item(0));
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
              <MyText text="Filtro de insumos" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Nombre del insumo"
                onChangeText={(text) => setNombreInsumo(text)}
              />
              <MySingleButton title="Buscar" customPress={getInsumoData} />
              <View style={styles.presenterView}>
                <MyText text={`Nombre del Insumo: ${!insumoData ? '' : insumoData.nombreInsumo}`} style={styles.presenterText} />
                <MyText text={`Cantidad: ${!insumoData ? '' : insumoData.cantidad}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewInsumos;

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
