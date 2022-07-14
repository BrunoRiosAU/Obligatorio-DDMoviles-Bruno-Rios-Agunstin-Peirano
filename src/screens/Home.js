import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from "react-native";
import MyButton from "../components/MyButton";

const Home = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <View style={styles.generalView}>
            <ScrollView>
              <MyButton
                title="Gestion de Vehiculos"
                btnColor="#DAF7A6"
                btnIcon="car"
                customPress={() => navigation.navigate("HomeAutos")}
              />

              <MyButton
                title="Gestion de Usuarios"
                btnColor="#FFC300"
                btnIcon="account"
                customPress={() => navigation.navigate("HomeUser")}
              />

              <MyButton
                title="Gestion de Repuestos"
                btnColor="#FF5733"
                btnIcon="bolt"
                customPress={() => navigation.navigate("HomeRepuestos")}
              />

              <MyButton
                title="Gestion de Insumos"
                btnColor="#C70039"
                btnIcon="oil"
                customPress={() => navigation.navigate("HomeInsumos")}
              />
              <MyButton
                title="Gestion de Tratamientos"
                btnColor="#900C3F"
                btnIcon="car-cog"
                customPress={() => navigation.navigate("HomeTratamientos")}
              />
              <MyButton
                title="Ver Reparaciones"
                btnColor="#581845"
                btnIcon="tools"
                customPress={() => navigation.navigate("VerReparaciones")}
              />


            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

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
