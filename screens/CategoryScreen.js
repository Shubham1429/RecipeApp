import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { CATEGORIES } from "../data/dummy-data";
import GridTile from "../components/GridTile";
import HeaderButton from "../components/HeaderButton";

const CategoryScreen = (props) => {
  const renderGrid = (itemData) => {
    return (
      <GridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate("Meals", {
            params: {
              categoryId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  return <FlatList data={CATEGORIES} renderItem={renderGrid} numColumns={2} />;
};

CategoryScreen.navigationOptions = (navData) => {
  return {
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryScreen;
