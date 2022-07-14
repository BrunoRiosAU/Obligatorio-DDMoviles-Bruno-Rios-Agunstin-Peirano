import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/MyButton";



import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeUsers = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS users(cedula varchar(11) primary key, nombre varchar(30), apellido varchar(30), matricula varchar(7), foreign key(matricula) references autos(matricula))',
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
                title="Registro de Usuarios"
                btnColor="#FFC300"
                btnIcon="plus-circle"
                customPress={() => navigation.navigate("RegisterUser")}
              />

              <MyButton
                title="Actualizar Usuario"
                btnColor="#FF5733"
                btnIcon="update"
                customPress={() => navigation.navigate("UpdateUser")}
              />

              <MyButton
                title="Ver Usuario"
                btnColor="#C70039"
                btnIcon="text-search"
                customPress={() => navigation.navigate("ViewUser")}
              />

              <MyButton
                title="Borrar Usuario"
                btnColor="#900C3F"
                btnIcon="minus-circle"
                customPress={() => navigation.navigate("DeleteUser")}
              />

              <MyButton
                title="Ver todos los Usuarios"
                btnColor="#581845"
                btnIcon="text"
                customPress={() => navigation.navigate("ViewAllUsers")}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeUsers;

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
