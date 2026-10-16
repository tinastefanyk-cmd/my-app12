import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { categories as categoryData, products as productData } from './data';

type Category = {
  id: string;
  name: string;
  image: string;
};

type Product = {
  id: string;
  categoryId: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

const categories: Category[] = categoryData;
const products: Product[] = productData;

export default function Oppgave8() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  const selectedProducts = products.filter(
    (product) => product.categoryId === selectedCategory
  );

  const addToCart = (product: Product) => {
    setCart((currentCart) => [...currentCart, product]);
    Alert.alert('Handlekurv', `${product.name} er lagt i handlekurven!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aktivitetshuset</Text>
        <Text style={styles.subtitle}>Handlekurv: {cart.length} varer</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {selectedCategory === null ? (
          <>
            <Text style={styles.sectionTitle}>Velg en kategori</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(category.id)}
                accessibilityRole="button"
                accessibilityLabel={`Vis ${category.name}`}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <Text style={styles.cardTitle}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCategory(null)}
              accessibilityRole="button"
            >
              <Text style={styles.backButtonText}>‹ Alle kategorier</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>
              {categories.find((category) => category.id === selectedCategory)?.name}
            </Text>
            {selectedProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <View style={styles.productInfo}>
                  <Text style={styles.cardTitle}>{product.name}</Text>
                  <Text style={styles.description}>{product.description}</Text>
                  <Text style={styles.price}>{product.price} kr</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(product)}
                    accessibilityRole="button"
                    accessibilityLabel={`Legg ${product.name} i handlekurven`}
                  >
                    <Text style={styles.addButtonText}>Legg i handlekurven</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d6d7da',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#17202a',
  },
  subtitle: {
    marginTop: 4,
    color: '#59636e',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginBottom: 14,
    fontSize: 20,
    fontWeight: '600',
    color: '#17202a',
  },
  categoryCard: {
    overflow: 'hidden',
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  categoryImage: {
    width: '100%',
    height: 170,
    backgroundColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#17202a',
  },
  productCard: {
    overflow: 'hidden',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#e5e7eb',
  },
  productInfo: {
    padding: 14,
  },
  description: {
    marginTop: 6,
    color: '#59636e',
    lineHeight: 20,
  },
  price: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#17202a',
  },
  addButton: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#18794e',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
    paddingVertical: 4,
  },
  backButtonText: {
    color: '#18794e',
    fontSize: 16,
    fontWeight: '600',
  },
});
