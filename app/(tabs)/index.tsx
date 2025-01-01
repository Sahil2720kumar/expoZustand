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


export default function TabOneScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const {addProduct,reduceProduct,products:cartProducts,items}=useCartStore()

  useEffect(() => {
    const fetchProductsData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const response = await res.json();
        setProducts(response.products);
        setError(null);
      } catch (err) {
        setError(err.message);
      }

      setIsLoading(false);
    };

    fetchProductsData();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  if (error) {
    return (
      <View
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.title}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(products)}</Text> */}
      <FlatList
        data={products}
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
                justifyContent:"center",
                alignItems:"flex-start"
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
              <Text style={{textAlign:"left"}}>price: ${item.price}</Text>
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
              <TouchableOpacity onPress={()=>reduceProduct(item)}>
                <Feather name="minus-circle" size={24} color="white" />
              </TouchableOpacity>
 
              <TouchableOpacity onPress={()=>addProduct(item)}>
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
