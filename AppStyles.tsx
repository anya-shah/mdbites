import React from "react";
import { StyleSheet } from "react-native";

export const COLOR_PRIMARY = "#0984e3";
export const COLOR_ACCENT = "#dfe6e9";
export const COLOR_LIGHT = "#dfe6e9";
export const COLOR_DARK = "#2d3436";
export const COLOR_BACKGROUND = "#ffffff";

export const BLUE_PRIMARY = "#79DFFF";

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 20,
  },
  body: {
    fontSize: 14,
  },

  fullScreenBlue: {
    backgroundColor: BLUE_PRIMARY,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openingText: {
    flexDirection: "row",
    // justifyContent: "center",
    // marginTop: "50%",
    // alignContent: "center",
    // textAlignVertical: "center",
  },
  openingMD: {
    fontSize: 32,
    color: "white",
    // justifyContent: "center",
  },
  openingBites: {
    fontSize: 32,
    color: "black",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    textAlign: "center",
  },
});
