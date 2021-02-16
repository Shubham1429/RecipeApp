import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealList = (props) => {
  const favouriteMeals = useSelector((state) => state.meals.favouriteMeals);

  const renderDetails = (itemData) => {
    const isFav = favouriteMeals.find((meal) => meal.id === itemData.item.id);

    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate("MealDetails", {
            params: {
              mealId: itemData.item.id,
              mealTitle: itemData.item.title,
              isFav: isFav,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        style={styles.data}
        data={props.listData}
        renderItem={renderDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
  },
  data: {
    width: "100%",
    padding: 15,
  },
});

export default MealList;
