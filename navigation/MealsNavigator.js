// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";
import React from "react";
import { Platform, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import CategoryScreen from "../screens/CategoryScreen";
import MealScreen from "../screens/MealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/Colors";
import FavouriteScreen from "../screens/FavouriteScreen";
import FilterScreen from "../screens/FilterScreen";

const defaultStackSettings = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const Stack = createStackNavigator();
const TabIos = createBottomTabNavigator();
const TabAndroid = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Categories"
        component={CategoryScreen}
        options={CategoryScreen.navigationOptions}
      />
      <Stack.Screen
        name="Meals"
        component={MealScreen}
        options={MealScreen.navigationOptions}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailScreen}
        options={MealDetailScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const FiltersNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Filters"
        component={FilterScreen}
        options={FilterScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const FavNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultStackSettings}>
      <Stack.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={FavouriteScreen.navigationOptions}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailScreen}
        options={MealDetailScreen.navigationOptions}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  if (Platform.OS === "android") {
    return (
      <TabAndroid.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Meals") {
              iconName = focused ? "restaurant" : "restaurant-outline";
            } else if (route.name === "Favourites") {
              iconName = focused ? "star" : "star-outline";
            }
            return <Ionicons name={iconName} size={22} color={color} />;
          },
        })}
        activeColor={Colors.accentColor}
        barStyle={{ backgroundColor: "#f2f2f2" }}
        sceneAnimationEnabled={true}
      >
        <TabAndroid.Screen
          name="Meals"
          component={MealsNavigator}
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>MEALS!!</Text>
            ),
          }}
        />
        <TabAndroid.Screen
          name="Favourites"
          component={FavNavigator}
          options={{
            tabBarLabel: (
              <Text style={{ fontFamily: "open-sans-bold" }}>FAVOURITES!!</Text>
            ),
          }}
        />
      </TabAndroid.Navigator>
    );
  }

  return (
    <TabIos.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Meals") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Favourites") {
            iconName = focused ? "star" : "star-outline";
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: { fontFamily: "open-sans-bold" },
      }}
    >
      <TabIos.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarLabel: "MEALS!!",
        }}
      />
      <TabIos.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarLabel: "FAVOURITES!!",
        }}
      />
    </TabIos.Navigator>
  );
};

const MainNavigator = gestureHandlerRootHOC(() => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: Colors.accentColor,
          labelStyle: { fontFamily: "open-sans-bold" },
        }}
        drawerStyle={{ paddingVertical: 40, backgroundColor: "#f2f2f2" }}
        minSwipeDistance={10}
      >
        <Drawer.Screen
          name="MealsFav"
          component={TabNavigator}
          options={{ drawerLabel: "Meals" }}
        />
        <Drawer.Screen name="Filters" component={FiltersNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
});

export default MainNavigator;
