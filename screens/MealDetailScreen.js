import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFav } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealId = props.route.params?.params.mealId;
  const availableMeals = useSelector((state) => state.meals.meals);
  const currentFav = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    // props.navigation.setParams({ mealTitle: selectedMeal.title });
    props.navigation.setParams({ toggleFav: toggleHandler });
  }, [toggleFav]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentFav });
  }, [currentFav]);

  return (
    <ScrollView>
      <View style={styles.imgContainer}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ing) => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}> {step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.route.params?.params.mealId;
  const mealTitle = navigationData.route.params?.params.mealTitle;
  const toggleFavourite = navigationData.route.params?.toggleFav;
  const isFavourite = navigationData.route.params?.params.isFav;
  const isStar = navigationData.route.params?.isFav ?? isFavourite;
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favourite"
          iconName={isStar ? "star" : "star-outline"}
          onPress={toggleFavourite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  imgContainer: {
    overflow: "hidden",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: 20,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
