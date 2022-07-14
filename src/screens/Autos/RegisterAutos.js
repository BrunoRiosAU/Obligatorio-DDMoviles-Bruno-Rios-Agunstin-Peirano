import React, { useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import MyInputText from "../../components/MyInputText";
import MySingleButton from "../../components/MySingleButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();


const RegisterAutos = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [color, setColor] = useState('');
  const [serialMotor, setSerialMotor] = useState('');

  const clearData = () => {
    setMatricula("");
    setMarca("");
    setColor("");
    setSerialMotor("");
  };

  const registerAutos = () => {
    console.log("states", matricula, marca, color, serialMotor);
    // validaciones estados
    debugger;
    if (!matricula.trim()) {
      Alert.alert("Ingrese la matricula");
      return;
    }

    if (!marca.trim()) {
      Alert.alert("Ingrese la marca");
      return;
    }

    if (!color.trim()) {
      Alert.alert("Ingrese el color");
      return;
    }

    if (!serialMotor.trim()) {
      Alert.alert("Ingrese el serial del motor");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO autos (matricula, marca, color, serialMotor) VALUES (?, ?, ?, ?)`,
        [matricula, marca, color, serialMotor],
        (tx, results) => {
          console.log("results", results);
          if (results.rowsAffected > 0) {
            clearData();
            Alert.alert(
              "Exito",
              "Auto registrado!!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("HomeAutos"),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert("Error al registrar el auto");
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
                placeholder="Matricula"
                onChangeText={setMatricula}
                style={styles.input}
                value={matricula}
              />

              <MyInputText
                placeholder="Marca"
                onChangeText={setMarca}
                style={styles.input}
                value={marca}
              />

              <MyInputText
                placeholder="Color"
                onChangeText={setColor}
                style={styles.input}
                value={color}
              />

              <MyInputText
                placeholder="Serial del motor"
                onChangeText={setSerialMotor}
                style={styles.input}
                value={serialMotor}
              />

              <MySingleButton
                title="Registrar Auto"
                customPress={registerAutos}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterAutos;

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
  input: {
    padding: 15,
    textAlignVertical: "top",
  },
});
