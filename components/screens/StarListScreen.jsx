import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { getAllCats } from "../../firebaseUtils/cat";
import { db } from "../../firebaseUtils/firebase-setup";
import { getCurrentUserEmail } from "../../firebaseUtils/firestore";
import { getUserLikeCats } from "../../firebaseUtils/user";
import { CatCard } from "../cards/CatCard";
import { FilterButtons } from "../pressable/FilterButtons";
import { TitleText } from "../texts/TitleText";
import CatInformation from "./CatInformation";

function MainScreen({ route, navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [data, setData] = useState([]);

  /* subscribe user likes to display liked cats - start */
  useEffect(() => {
    const unSubscribe =
      onSnapshot(doc(db, 'Users', getCurrentUserEmail()),
        (snapshot) => {
          const likeCats = snapshot.data().likeCats;
          getAllCats().then((catsSnapshots) => {
            setData(
              catsSnapshots.docs.map((entry) => {
                const birthday = new Date(entry.data().Birthday);
                const now = new Date();
                const age =
                  now.getMonth() -
                  birthday.getMonth() +
                  12 * (now.getFullYear() - birthday.getFullYear());
                return {
                  id: entry.id,
                  name: entry.data().Breed,
                  sex: entry.data().Gender,
                  price: entry.data().Price,
                  month: age,
                  photo: entry.data().Picture,
                  cattery: entry.data().Cattery,
                  uploadTime: entry.data().UploadTime,
                };
              }).filter(entry =>
                likeCats.includes(entry.id))
            );
          })
        });

    return () => unSubscribe();
  }, [])
  /* subscribe user likes to display liked cats - end */


  const onFilterChange = (value) => {
    let dataCopy = data;
    if (value === 0) {
      setData(dataCopy.sort((d1, d2) => d2.uploadTime - d1.uploadTime));
    } else {
      Alert.alert("Feature for this button is coming soon~", "See you next time!", [
        { text: "Sad" },
        { text: "Wait for you" },
      ]);
      setData(dataCopy.sort((d1, d2) => d1.price - d2.price));
    }
    setSelectedIndex(value);
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 12 }}>
        <View>
          <TitleText>Collections</TitleText>
        </View>
      </View>

      <FilterButtons
        selectedIndex={selectedIndex}
        setSelectedIndex={onFilterChange}
        buttons={["Cats", "Catteries"]}
      />
      <View style={{ padding: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item, index }) => <CatCard cat={item} navigation={navigation} />}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      </View>
    </View>)
}

export default function StarListScreen({ route, navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="CatInformation" component={CatInformation} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 55,
    marginBottom: 200,
  },
})