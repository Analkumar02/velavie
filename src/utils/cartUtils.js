export const updateCartWithDelay = async (
  updatedCartItems,
  setIsLoading,
  setLoadingMessage,
  message = "Updating cart..."
) => {
  setIsLoading(true);
  setLoadingMessage(message);

  try {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 1500)
    );

    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(updatedCartItems));
    sessionStorage.setItem(cartKey, JSON.stringify(updatedCartItems));

    const newCartCount = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const countKey = cartKey.replace("cartItems", "cartCount");
    localStorage.setItem(countKey, newCartCount.toString());

    window.dispatchEvent(
      new CustomEvent("localStorageChange", {
        detail: {
          key: cartKey,
          newValue: JSON.stringify(updatedCartItems),
        },
      })
    );

    window.dispatchEvent(
      new CustomEvent("cartCountUpdate", {
        detail: {
          cartCount: newCartCount,
        },
      })
    );

    setLoadingMessage("Cart updated successfully!");
    await new Promise((resolve) => setTimeout(resolve, 500));

    return updatedCartItems;
  } catch (error) {
    console.error("Error updating cart:", error);
    setLoadingMessage("Error updating cart. Please try again.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    throw error;
  } finally {
    setIsLoading(false);
    setLoadingMessage("");
  }
};

export const getCartItems = () => {
  try {
    const cartKey = getCartKey();
    const sessionCart = sessionStorage.getItem(cartKey);
    if (sessionCart) {
      return JSON.parse(sessionCart);
    }

    const localCart = localStorage.getItem(cartKey);
    if (localCart) {
      return JSON.parse(localCart);
    }

    return [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
    return [];
  }
};

export const getCartCount = () => {
  try {
    const cartKey = getCartKey();
    const countKey = cartKey.replace("cartItems", "cartCount");
    const count = localStorage.getItem(countKey);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
};

export const calculateCartTotals = (cartItems, couponApplied = false) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const oneTimePurchaseTotal = cartItems
    .filter((item) => !item.isSubscription && !item.isDemoProduct)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discountAmount = couponApplied ? oneTimePurchaseTotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discountAmount;

  const shipping = discountedSubtotal >= 75 ? 0 : 8.99;
  const tax = discountedSubtotal * 0.08;
  const total = discountedSubtotal + shipping + tax;

  return {
    subtotal,
    discountAmount,
    discountedSubtotal,
    shipping,
    tax,
    total,
  };
};

export const findItemInCart = (cartItems, productId) => {
  return cartItems.find((item) => item.id === productId) || null;
};

export const createCartItem = (product, quantity = 1, options = {}) => {
  return {
    id: product.id,
    productName: product.productName,
    count: product.count || `${product.capsuleCount}CT`,
    price: options.isSubscription
      ? product.pricing?.subscribeAndSave?.discountedPrice || product.price
      : product.pricing?.oneTimePurchase?.price || product.price,
    originalPrice: options.isSubscription
      ? product.pricing?.oneTimePurchase?.price
      : null,
    quantity,
    thumbnail: product.thumbnail,
    isSubscription: !!options.isSubscription,
    isDemoProduct: !!options.isDemoProduct,
    deliveryOption: options.deliveryOption || null,
    ...options,
  };
};

export function getCartKey() {
  return "cartItems_guest";
}

export function setCartItems(key, items) {
  sessionStorage.setItem(key, JSON.stringify(items));
  localStorage.setItem(key, JSON.stringify(items));
}

export function calculateDiscount(cartItems) {
  return cartItems
    .filter((item) => !item.isSubscription)
    .reduce((sum, item) => sum + (item.discount || 0), 0);
}
