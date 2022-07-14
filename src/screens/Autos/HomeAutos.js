import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeAutos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='autos'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS autos', []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS autos(matricula varchar(7) primary key, marca VARCHAR(50), color VARCHAR(40), serialMotor VARCHAR(100) unique)",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Registro de Autos"
                btnColor="#FFC300"
                btnIcon="plus-circle"
                customPress={() => navigation.navigate("RegisterAutos")}
              />

              <MyButton
                title="Actualizar Autos"
                btnColor="#FF5733"
                btnIcon="update"
                customPress={() => navigation.navigate("UpdateAutos")}
              />

              <MyButton
                title="Ver Autos"
                btnColor="#C70039"
                btnIcon="text-search"
                customPress={() => navigation.navigate("ViewAutos")}
              />

              <MyButton
                title="Borrar Autos"
                btnColor="#900C3F"
                btnIcon="minus-circle"
                customPress={() => navigation.navigate("DeleteAutos")}
              />

              <MyButton
                title="Ver todos los Autos"
                btnColor="#581845"
                btnIcon="text"
                customPress={() => navigation.navigate("ViewAllAutos")}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAutos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  generalView: {
    flex: 1,
    justifyContent: "center",
  },
});
