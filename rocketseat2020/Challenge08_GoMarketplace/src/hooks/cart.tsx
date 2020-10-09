import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

// interface CartSummary {
//   quantity: number;
//   value: number;
// }

interface CartContext {
  products: Product[];
  // summary: CartSummary;
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [summary, setSummary] = useState<CartSummary>({
  //   quantity: 0,
  //   value: 0,
  // });

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const productsInStorage = await AsyncStorage.getItem(
        '@GoMarketplace:cart',
      );
      if (productsInStorage) {
        const cart: Product[] = JSON.parse(productsInStorage);
        setProducts(cart);
        // const value = cart.reduce<CartSummary>(
        //   (acc, pdt) => {
        //     acc.quantity += pdt.quantity;
        //     acc.value += pdt.quantity * pdt.price;
        //     return acc;
        //   },
        //   {
        //     quantity: 0,
        //     value: 0,
        //   },
        // );

        // setSummary(value);
      }
    }

    loadProducts();
  }, []);

  const increment = useCallback(
    async id => {
      const newCart = products.map(pdt => {
        if (pdt.id === id) {
          // const { value, quantity } = summary;
          // setSummary({
          //   value: value + pdt.price,
          //   quantity: quantity + 1,
          // });

          return { ...pdt, quantity: pdt.quantity + 1 };
        }
        return pdt;
      });

      setProducts(newCart);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(newCart),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newCart = products.map(pdt => {
        if (pdt.id === id && pdt.quantity > 1) {
          // const { value, quantity } = summary;
          // setSummary({
          //   value: value - pdt.price,
          //   quantity: quantity - 1,
          // });
          return { ...pdt, quantity: pdt.quantity - 1 };
        }
        return pdt;
      });

      setProducts(newCart);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(newCart),
      );
    },
    [products],
  );

  const addToCart = useCallback(
    async product => {
      const productExists = products.find(pdt => pdt.id === product.id);

      const newCart = productExists
        ? products.map(pdt =>
            pdt.id === product.id
              ? { ...pdt, quantity: pdt.quantity + 1 }
              : pdt,
          )
        : [...products, { ...product, quantity: 1 }];

      setProducts(newCart);
      // const { value, quantity } = summary;
      // setSummary({
      //   value: value + product.price,
      //   quantity: quantity + 1,
      // });

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(newCart),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
