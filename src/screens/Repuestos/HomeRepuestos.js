import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeRepuestos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='repuestos'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS repuestos', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS repuestos(nombreRepuesto varchar(30) primary key, cantidad varchar(10))',
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
                title="Registro de Repuestos"
                btnColor="#FFC300"
                btnIcon="plus-circle"
                customPress={() => navigation.navigate("RegisterRepuestos")}
              />

              <MyButton
                title="Actualizar Repuestos"
                btnColor="#FF5733"
                btnIcon="update"
                customPress={() => navigation.navigate("UpdateRepuestos")}
              />

              <MyButton
                title="Ver Repuestos"
                btnColor="#C70039"
                btnIcon="text-search"
                customPress={() => navigation.navigate("ViewRepuestos")}
              />

              <MyButton
                title="Borrar Repuestos"
                btnColor="#900C3F"
                btnIcon="minus-circle"
                customPress={() => navigation.navigate("DeleteRepuestos")}
              />

              <MyButton
                title="Ver todos los Repuestos"
                btnColor="#581845"
                btnIcon="text"
                customPress={() => navigation.navigate("ViewAllRepuestos")}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeRepuestos;

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
