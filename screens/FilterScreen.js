import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        // trackColor={{
        //   true: Platform.OS === "ios" ? Colors.primaryColor : "#ccc",
        // }}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FilterScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const [isGlutenFree, setIsGluten] = useState(false);
  const [isLactoseFree, setIsLactose] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVeg] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      veg: isVegetarian,
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({
      save: saveFilters,
    });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/ Restrictions</Text>
      <FilterSwitch
        label="Gluten-Free"
        state={isGlutenFree}
        onChange={(newValue) => setIsGluten(newValue)}
      />
      <FilterSwitch
        label="Lactose-Free"
        state={isLactoseFree}
        onChange={(newValue) => setIsLactose(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={(newValue) => setIsVeg(newValue)}
      />
    </View>
  );
};

FilterScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Filter Meals",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="save-outline"
          onPress={() => navData.route.params.save()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    margin: 20,
    textAlign: "center",
    fontSize: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default FilterScreen;
