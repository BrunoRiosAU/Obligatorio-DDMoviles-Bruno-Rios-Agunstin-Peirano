import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeInsumos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='insumos'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS insumos', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS insumos(nombreInsumo varchar(30) primary key, cantidad varchar(10))',
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
                title="Registro de Inusmos"
                btnColor="#FFC300"
                btnIcon="plus-circle"
                customPress={() => navigation.navigate("RegisterInsumos")}
              />

              <MyButton
                title="Actualizar Inusmos"
                btnColor="#FF5733"
                btnIcon="update"
                customPress={() => navigation.navigate("UpdateInsumos")}
              />

              <MyButton
                title="Ver Inusmos"
                btnColor="#C70039"
                btnIcon="text-search"
                customPress={() => navigation.navigate("ViewInsumos")}
              />

              <MyButton
                title="Borrar Insumos"
                btnColor="#900C3F"
                btnIcon="minus-circle"
                customPress={() => navigation.navigate("DeleteInsumos")}
              />

              <MyButton
                title="Ver todos los Insumos"
                btnColor="#581845"
                btnIcon="text"
                customPress={() => navigation.navigate("ViewAllInsumos")}
              />

            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeInsumos;

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
