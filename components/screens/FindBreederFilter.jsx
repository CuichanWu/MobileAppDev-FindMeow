import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Colors } from "../styles/Colors";
import { OrangeText } from "../texts/OrangeText";
import { ALL_BREEDS } from "../listContents/allBreeds";
import { ALL_STATES } from "../listContents/allStates";

const FindBreederFilter = ({
  states: {
    selectedBreed,
    setSelectedBreed,
    selectedState,
    setSelectedState,
    selectedCatNum,
    setSelectedCatNum,

    resetAllFilters,
    refRBSheet,
  },
}) => {
  const [breedLocal, setBreedLocal] = useState(selectedBreed);
  const [stateLocal, setStateLocal] = useState(selectedState);
  const [catNumLocal, setCatNumLocal] = useState(selectedCatNum);

  const breed = [{ key: "All", value: "All" }, ...ALL_BREEDS];

  const state = [{ key: "All", value: "All" }, ...ALL_STATES];

  const catNum = [
    { key: "All", value: "All" },
    { key: "Yes", value: "Yes" },
    { key: "No", value: "No" },
  ];

  const resetHandler = () => {
    setSelectedBreed(selectedBreed);
    setSelectedState(selectedState);
    setSelectedCatNum(selectedCatNum);
    resetAllFilters();
  };

  const applyHandler = () => {
    setSelectedBreed(breedLocal);
    setSelectedState(stateLocal);
    setSelectedCatNum(catNumLocal);

    // Alert.alert(
    //   "Feature for this button is coming soon~",
    //   "See you next time!",
    //   [{ text: "Sad" }, { text: "Wait for you" }]
    // );
    refRBSheet.current.close();
  };

  return (
    <ScrollView style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter</Text>

      <Text style={styles.reminderText}>
        Arrange Based On The Following Choices
      </Text>

      <OrangeText>Breed</OrangeText>
      <SelectList
        setSelected={(val) => setBreedLocal(val)}
        data={breed}
        save="value"
        defaultOption={{ key: selectedBreed, value: selectedBreed }}
      />

      <OrangeText>Location</OrangeText>
      <SelectList
        setSelected={(val) => setStateLocal(val)}
        data={state}
        save="value"
        defaultOption={{ key: selectedState, value: selectedState }}
      />

      <OrangeText>Has Avaliable Kitten</OrangeText>
      <SelectList
        setSelected={(val) => setCatNumLocal(val)}
        data={catNum}
        save="value"
        defaultOption={{ key: selectedCatNum, value: selectedCatNum }}
        search={false}
      />

      <View style={styles.submitButtonContainer}>
        <Pressable onPress={resetHandler} style={styles.submitButton}>
          <Text style={styles.submitText}>Reset</Text>
        </Pressable>

        <Pressable onPress={applyHandler} style={styles.submitButton}>
          <Text style={styles.submitText}>Apply</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginHorizontal: 15,
  },
  filterText: {
    fontFamily: "PoppinsBold",
    fontSize: 26,
    textAlign: "left",
    color: "#F59156",
    marginTop: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
  button: {
    margin: 10,
    marginTop: 100,
    width: 100,
    alignSelf: "flex-end",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "left",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
  checkbox: {
    flexDirection: "row",
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  },
  reminderText: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
    textAlign: "left",
    marginLeft: 5,
    color: "#ADADAD",
  },
  submitButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 40,
    paddingBottom: 10,
  },
  submitButton: {
    backgroundColor: Colors.orangeText,
    padding: 8,
    borderRadius: 25,
    height: 40,
    width: 150,
  },
  submitText: {
    fontFamily: "PoppinsSemiBold",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

export default FindBreederFilter;
