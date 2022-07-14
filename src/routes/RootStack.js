import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// vamos a importar los componentes que vamoar a crear
import Home from "../screens/Home";

import HomeUser from "../screens/User/HomeUser";
import RegisterUser from "../screens/User/RegisterUser";
import UpdateUser from "../screens/User/UpdateUser";
import ViewAllUsers from "../screens/User/ViewAllUsers";
import ViewUser from "../screens/User/ViewUser";
import DeleteUser from "../screens/User/DeleteUser";

import HomeAutos from "../screens/Autos/HomeAutos";
import RegisterAutos from "../screens/Autos/RegisterAutos";
import UpdateAutos from "../screens/Autos/UpdateAutos"
import ViewAllAutos from "../screens/Autos/ViewAllAutos";
import ViewAutos from "../screens/Autos/ViewAutos";
import DeleteAutos from "../screens/Autos/DeleteAutos";

import HomeRepuestos from "../screens/Repuestos/HomeRepuestos";
import RegisterRepuestos from "../screens/Repuestos/RegisterRepuestos";
import UpdateRepuestos from "../screens/Repuestos/UpdateRepuestos";
import ViewAllRepuestos from "../screens/Repuestos/ViewAllRepuestos";
import ViewRepuestos from "../screens/Repuestos/ViewRepuestos";
import DeleteRepuestos from "../screens/Repuestos/DeleteRepuestos";

import HomeInsumos from "../screens/Insumos/HomeInsumos";
import RegisterInsumos from "../screens/Insumos/RegisterInsumos";
import UpdateInsumos from "../screens/Insumos/UpdateInsumos";
import ViewAllInsumos from "../screens/Insumos/ViewAllInsumos";
import ViewInsumos from "../screens/Insumos/ViewInsumos";
import DeleteInsumos from "../screens/Insumos/DeleteInsumos";

import HomeTratamientos from "../screens/Tratamientos/HomeTratamientos";
import RegisterTratamientos from "../screens/Tratamientos/RegisterTratamientos";
import UpdateTratamientos from "../screens/Tratamientos/UpdateTratamientos";
import ViewAllTratamientos from "../screens/Tratamientos/ViewAllTratamientos";
import ViewTratamientos from "../screens/Tratamientos/ViewTratamientos";
import DeleteTratamientos from "../screens/Tratamientos/DeleteTratamientos";

import VerReparaciones from "../screens/VerReparaciones"
// crear componente de rutas
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Inicio",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="HomeUser"
          component={HomeUser}
          options={{
            title: "Inicio Usuarios",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{
            title: "Registrar Usuarios",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: "Modificar Usuarios",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllUsers"
          component={ViewAllUsers}
          options={{
            title: "Ver todos los Usuarios",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{
            title: "Ver Usuario",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{
            title: "Borrar Usuarios",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="HomeAutos"
          component={HomeAutos}
          options={{
            title: "Inicio Autos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterAutos"
          component={RegisterAutos}
          options={{
            title: "Registrar Autos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateAutos"
          component={UpdateAutos}
          options={{
            title: "Modificar Autos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllAutos"
          component={ViewAllAutos}
          options={{
            title: "Ver todos los Autos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAutos"
          component={ViewAutos}
          options={{
            title: "Ver Auto",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteAutos"
          component={DeleteAutos}
          options={{
            title: "Borrar Autos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="HomeRepuestos"
          component={HomeRepuestos}
          options={{
            title: "Inicio Repuestos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterRepuestos"
          component={RegisterRepuestos}
          options={{
            title: "Registrar Repuestos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateRepuestos"
          component={UpdateRepuestos}
          options={{
            title: "Modificar Repuestos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllRepuestos"
          component={ViewAllRepuestos}
          options={{
            title: "Ver todos los Repuestos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewRepuestos"
          component={ViewRepuestos}
          options={{
            title: "Ver Repuesto",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteRepuestos"
          component={DeleteRepuestos}
          options={{
            title: "Borrar Repuestos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Stack.Screen
          name="HomeInsumos"
          component={HomeInsumos}
          options={{
            title: "Inicio Insumos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterInsumos"
          component={RegisterInsumos}
          options={{
            title: "Registrar Insumos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateInsumos"
          component={UpdateInsumos}
          options={{
            title: "Modificar Insumos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllInsumos"
          component={ViewAllInsumos}
          options={{
            title: "Ver todos los Insumos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewInsumos"
          component={ViewInsumos}
          options={{
            title: "Ver Insumo",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteInsumos"
          component={DeleteInsumos}
          options={{
            title: "Borrar Insumos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

<Stack.Screen
          name="HomeTratamientos"
          component={HomeTratamientos}
          options={{
            title: "Inicio Tratamientos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="RegisterTratamientos"
          component={RegisterTratamientos}
          options={{
            title: "Registrar Tratamientos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateTratamientos"
          component={UpdateTratamientos}
          options={{
            title: "Modificar Tratamientos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewAllTratamientos"
          component={ViewAllTratamientos}
          options={{
            title: "Ver todos los Tratamientos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="ViewTratamientos"
          component={ViewTratamientos}
          options={{
            title: "Ver Tratamiento",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DeleteTratamientos"
          component={DeleteTratamientos}
          options={{
            title: "Borrar Tratamientos",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="VerReparaciones"
          component={VerReparaciones}
          options={{
            title: "Ver Reparaciones",
            headerStyle: {
              backgroundColor: "#1C2833",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
