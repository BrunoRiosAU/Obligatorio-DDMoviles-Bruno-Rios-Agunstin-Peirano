import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../../components/MyButton";

import DatabaseConnection from "../../database/database-connection";
const db = DatabaseConnection.getConnection();

const HomeTratamientos = ({ navigation }) => {

  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tratamientos'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tratamientos', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tratamientos(nombreTratamiento varchar(40), nombreInsumo varchar(30) references insumos(nombreInsumo), nombreRepuesto varchar(30) references repuesos(nombreRepuesto), cantInsumos varchar(10), cantRepuestos varchar(10), auto varchar(7) references autos(matricula), fechaInicio varchar(10), fechaFin varchar(10), costo varchar(12), primary key(nombreTratamiento, nombreInsumo, nombreRepuesto))',
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
                title="Registro de Tratamientos"
                btnColor="#FFC300"
                btnIcon="plus-circle"
                customPress={() => navigation.navigate("RegisterTratamientos")}
              />

              <MyButton
                title="Actualizar Tratamientos"
                btnColor="#FF5733"
                btnIcon="update"
                customPress={() => navigation.navigate("UpdateTratamientos")}
              />

              <MyButton
                title="Ver Tratamientos"
                btnColor="#FF5733"
                btnIcon="text-search"
                customPress={() => navigation.navigate("ViewTratamientos")}
              />

              <MyButton
                title="Borrar Tratamientos"
                btnColor="#900C3F"
                btnIcon="minus-circle"
                customPress={() => navigation.navigate("DeleteTratamientos")}
              />

              <MyButton
                title="Ver todos los Tratamientos"
                btnColor="#581845"
                btnIcon="text"
                customPress={() => navigation.navigate("ViewAllTratamientos")}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeTratamientos;

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
