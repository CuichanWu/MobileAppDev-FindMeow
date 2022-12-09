import { Foundation } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Callout, Marker } from "react-native-maps";
import {
  getCattery,
  userLikeACat,
  userUnLikeACat,
} from "../../firebaseUtils/user";
import { CatCard_map } from "../cards/CatCard_map";
import { Colors } from "../styles/Colors";
import { FontFamily } from "../styles/FontFamily";

export function CatteryMarker({
  catsData,
  navigation,
  showCatList,
  setShowCatList,
  flatListRef,
  flatListMovingLock,
}) {
  const { height, width } = useWindowDimensions();
  const [cattery, setCattery] = useState(null);
  const [likeCats, setLikeCats] = useState([]);

  useEffect(() => {
    if (catsData.cattery) {
      getCattery(catsData.cattery).then((cattery) => setCattery(cattery));
    }
  }, [catsData]);

  const onClickLikeButton = () => {
    if (!likeCats.includes(catsData.id)) {
      userLikeACat(catsData.id);
    } else {
      userUnLikeACat(catsData.id);
    }
  };

  const HelperText = (cat) => {
    const catNumber = cat.catteryDoc.cats.length;

    if (catNumber === 1) {
      return "1 cat";
    } else {
      return catNumber + " cats";
    }
  };

  const markerOnPress = async (event) => {
    try {
      const idString = event._targetInst._debugOwner.memoizedProps.indentifier;
      const id = parseInt(idString, 10);
      if (!isNaN(id)) {
        // await new Promise((resolve) => setTimeout(resolve, 500));

        if (flatListRef.current) {
          flatListMovingLock.current = true;
          console.debug(`scroll to index ${id}`);
          flatListRef.current.scrollToIndex({ index: id, animated: true });
          await new Promise((resolve) => setTimeout(resolve, 300));
          flatListMovingLock.current = false;
        } else {
          console.log("flatListRef.current is null");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      {catsData.map((cat, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: cat.geoLocation.lat,
              longitude: cat.geoLocation.lng,
            }}
            onPress={markerOnPress}
            indentifier={`${index}`}
          >
            <Foundation name="marker" size={40} color={Colors.orangeText} />

            <Pressable onPress={markerOnPress}>
              <View
                style={{
                  backgroundColor: "white",
                  opacity: "50%",
                  borderRadius: 12,
                  padding: 4,
                  paddingHorizontal: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: FontFamily.medium,
                    color: Colors.reminderText,
                  }}
                >
                  {HelperText(cat)}
                </Text>
              </View>
            </Pressable>
          </Marker>
        );
      })}

      {showCatList === false ? (
        <View style={{ width: width + 20, alignItems: "center" }}>
          <View
            style={{
              height: 110,
              backgroundColor: "transparent",
              position: "absolute",
              top: height - 211,
              left: 30,
            }}
          >
            <FlatList
              data={catsData}
              renderItem={({ item }) => (
                <CatCard_map cat={item} navigation={navigation} />
              )}
              horizontal
            />
          </View>
        </View>
      ) : (
        <View />
      )}

      <View style={{}}></View>
    </View>
  );
}
