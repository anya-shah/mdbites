import { StyleSheet } from "react-native";
import { AppStyles } from "../../../../AppStyles";

export const styles = StyleSheet.create({
  ...AppStyles,
  emptyText: {
    color: "grey",
    padding: 25,
    alignSelf: "center",
    lineHeight: 18,
  },
  snackbar: {
    marginBottom: 50
  },
});
