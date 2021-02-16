import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";

import DefaultText from "../components/DefaultText";

const MealItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableCmp style={styles.item} onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.bgImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.mealRow, ...styles.mealBody }}>
            <DefaultText>{props.duration}m</DefaultText>
            <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    overflow: "hidden",
    height: 200,
    width: "100%",
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    marginVertical: 10,
  },
  item: {
    flex: 1,
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "80%",
  },
  mealBody: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
    height: "20%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});

export default MealItem;
