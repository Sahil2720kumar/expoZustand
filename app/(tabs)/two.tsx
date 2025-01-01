import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Product } from "@/store/interface";
import useCartStore from "@/store/cartStore";

export default function TabTwoScreen() {
  const {
    addProduct,
    reduceProduct,
    products: cartProducts,
    items,
  } = useCartStore();

  if (cartProducts.length < 1) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>Cart Is Empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(products)}</Text> */}
      <FlatList
        data={cartProducts}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#2C2D2D",
              borderRadius: 10,
              padding: 5,
              flexDirection: "row",
            }}
          >
            <Image
              resizeMode="contain"
              style={{ width: "30%", aspectRatio: 1 }}
              source={{ uri: item.images[0] }}
            />
            <View
              style={{
                width: "50%",
                backgroundColor: "#2C2D2D",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{ color: "gray" }}
              >
                {item.description}
              </Text>
              <Text style={{ textAlign: "left" }}>price: ${item.price}</Text>
            </View>
            <View
              style={{
                width: "20%",
                backgroundColor: "#2C2D2D",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity onPress={() => reduceProduct(item)}>
                <Feather name="minus-circle" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.title}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => addProduct(item)}>
                <Feather name="plus-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
