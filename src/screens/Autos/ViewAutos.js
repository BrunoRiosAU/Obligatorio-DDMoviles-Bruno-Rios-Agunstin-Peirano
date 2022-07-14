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

const ViewAutos = ({ navigation }) => {
  const [matricula, setMatricula] = useState("");
  const [autoData, setAutoData] = useState(null);


  const getAutoData = () => {
    console.log("getAutoData");
    setAutoData({});

    if (!matricula.trim()) {
      Alert.alert("La matricula es requerida");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM autos WHERE matricula = ?`,
        [matricula],
        (tx, results) => {
          console.log("results", results);

          if (results.rows.length > 0) {
            setAutoData(results.rows.item(0));
          } else {
            Alert.alert("El auto no existe");
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
              <MyText text="Filtro de autos" style={styles.text} />
              <MyInputText
                style={styles.inputStyle}
                placeholder="Matricula"
                onChangeText={(text) => setMatricula(text)}
              />
              <MySingleButton title="Buscar" customPress={getAutoData} />
              <View style={styles.presenterView}>
                <MyText text={`Matricula: ${!autoData ? '' : autoData.matricula}`} style={styles.presenterText} />
                <MyText text={`Marca: ${!autoData ? '' : autoData.marca}`} style={styles.presenterText} />
                <MyText text={`Color: ${!autoData ? '' : autoData.color}`} style={styles.presenterText} />
                <MyText text={`Serial del motor: ${!autoData ? '' : autoData.serialMotor}`} style={styles.presenterText} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAutos;

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
