import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const MealScreen = (props) => {
  const catId = props.route.params?.params.categoryId;

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryId.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>Meals Got Filtered Out!!</DefaultText>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

MealScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.route.params?.params.categoryId;
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealScreen;
