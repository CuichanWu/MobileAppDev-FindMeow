import { AntDesign } from "@expo/vector-icons";
import { Input } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/Colors";
import { FontSizes } from "../styles/FontSizes";
import { FontFamily } from "../styles/FontFamily";

export function SearchBar({ text, setText }) {
  return (
    <View style={styles.container}>
      <Input
        value={text}
        onChangeText={(value) => setText(value)}
        leftIcon={<AntDesign name="search1" color={Colors.black} size={16} />}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        placeholder="Search"
        style={styles.inputBarStyle}
        inputStyle={styles.inputStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  leftIconContainerStyle: {
    paddingRight: 8,
  },
  inputBarStyle: {
    height: 60,
  },
  inputStyle: {
    fontSize: FontSizes.subSubTitle,
    fontFamily: FontFamily.normal,
    color: Colors.grayText,
    // top: 2,
  },
});
