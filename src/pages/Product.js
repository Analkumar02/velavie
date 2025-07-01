import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import products from "../data/product.json";
import { useImagePath } from "../context/ImagePathContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Icon } from "@iconify/react";
import FeatureIcons from "../components/FeatureIcons";
import ProductSlider from "../components/ProductSlider";
import { getCartKey } from "../utils/cartUtils";

const ProductWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin: 48px 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow-x: visible;
  @media (max-width: 1200px) {
    gap: 32px;
    margin: 32px 0;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 24px;
    margin: 24px 0;
  }
  @media (max-width: 600px) {
    gap: 12px;
    margin: 12px 0;
  }
`;
const ImageSection = styled.div`
  flex: 1 1 420px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  @media (max-width: 1024px) {
    max-width: 100vw;
    min-width: 0;
  }
  @media (max-width: 600px) {
    max-width: 100vw;
    margin: 0;
    align-items: stretch;
  }
`;
const MainImage = styled.img`
  width: 100%;
  max-height: 600px;
  max-width: 600px;
  border-radius: 15px;
  background: #fff;
  object-fit: contain;
`;
const Thumb = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  width: 100%;
  max-width: 140px;
  object-fit: contain;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  border: ${({ selected, theme }) =>
    selected ? `1px solid ${theme.colors.secondary}` : "none"};
  cursor: pointer;
  transition: opacity 0.2s, border 0.2s;
`;
const InfoSection = styled.div`
  flex: 1 1 420px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  width: 100%;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;
const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 0.5rem;
`;
const Description = styled.h4`
  color: ${({ theme }) => theme.colors.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: 0.5rem;
`;
const BenefitsList = styled.ul`
  margin: 0 0 1rem 0;
  padding: 0;
  font-size: ${({ theme }) => theme.fontSizes.body};
  li {
    margin-bottom: 0.5rem;
  }
`;
const BenefitItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
`;
const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 1.2rem 0 0.5rem 0;
`;
const QuantityBox = styled.div`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid #e9ecef;
  border-radius: 5px;
  overflow: hidden;
  width: 120px;
  height: 40px;
  box-sizing: border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const QtyBtn = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.colors.white_lite};
  color: ${({ theme }) => theme.colors.body};
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: all 0.2s ease;
  border-radius: 0;

  &:hover {
    background: #e9ecef;
    color: #212529;
  }

  &:active {
    background: #dee2e6;
  }

  svg {
    display: block;
    width: 14px;
    height: 14px;
    stroke: currentColor;
    stroke-width: 2;
  }
`;
const QuantityInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  color: #212529;
  outline: none;
  pointer-events: none;
  appearance: textfield;
  height: 100%;
  padding: 0;
  min-width: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const AddToCartBtn = styled.button`
  max-width: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    #154a6b 100%
  );
  color: #fff;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  padding: 14px 24px;
  border-radius: 5px;
  text-transform: capitalize;
  text-decoration: none;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.02em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(29, 62, 87, 0.3),
      0 4px 12px rgba(29, 62, 87, 0.2);
    background: linear-gradient(
      135deg,
      #1a4a6b 0%,
      ${({ theme }) => theme.colors.primary} 100%
    );
    color: ${({ theme }) => theme.colors.white};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 991px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;
const PaymentIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin: 1rem 0 0;
  img {
    height: auto;
    width: auto;
  }
`;
const TestimonialBox = styled.div`
  background: ${({ theme }) => theme.colors.white_lite};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  padding: 1.2rem 1.5rem;
  margin: 2rem 0 1rem 0;
  font-style: italic;
  color: ${({ theme }) => theme.colors.body};
  font-size: 1.1rem;
  span {
    display: block;
    margin-top: 0.7rem;
    font-style: normal;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    text-align: center;
    font-size: 14px;
    margin: 10px 0;
    span {
      font-size: 14px;
    }
  }
`;
const CapsuleCount = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 1.5rem 0 0.5rem 0;
  @media (max-width: 600px) {
    margin-top: 0;
  }
`;
const PurchaseOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $subscribeExpanded }) =>
    $subscribeExpanded ? "1.2rem" : "0.5rem"};
  max-width: 550px;
  width: 100%;
`;
const PurchaseOptionBox = styled.div`
  border: 1.5px solid #d1d5db;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 0.5rem;
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: ${({ $active }) => ($active ? "1.25rem" : "0")};
  position: relative;
  box-shadow: ${({ $active }) => ($active ? "0 0 0 2px #60983E33" : "none")};
  transition: box-shadow 0.2s, border 0.2s,
    margin-bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    gap 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "#d1d5db"};
  margin-bottom: ${({ $active }) => ($active ? "0.5rem" : "0px")};
  @media (max-width: 767px) {
    padding: 0.8rem 0.7rem 0.8rem 0.7rem;
    border-radius: 7px;
    gap: ${({ $active }) => ($active ? "0.7rem" : "0")};
  }
`;
const SaveTagBox = styled.span`
  position: absolute;
  top: -13px;
  right: 15px;
  z-index: 2;
  background: ${({ theme }) => theme.colors.white};
  padding: 0 5px;
  span {
    background: ${({ theme }) => theme.colors.secondary};
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
    padding: 0.2em 0.7em;
  }
`;
const PurchaseOptionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;
const PurchaseOptionTitle = styled.div`
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.body};
`;
const PurchaseOptionPriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0.2rem 0 0.5rem 0;
`;
const PurchaseOptionOldPrice = styled.span`
  text-decoration: line-through;
  color: #b0b0b0;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;
const PurchaseOptionPrice = styled.span`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.body};
`;
const PurchaseRadioCircle = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.body};
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
  position: relative;
  background: #fff;
  flex-shrink: 0;
  transition: border 0.2s;
  &::after {
    content: "";
    display: ${({ $active }) => ($active ? "block" : "none")};
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.body};
    border-radius: 50%;
    position: absolute;
    top: 4px;
    left: 4px;
  }
`;
const PurchaseOptionCollapse = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "expanded",
})`
  max-height: ${({ expanded }) => (expanded ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  pointer-events: ${({ expanded }) => (expanded ? "auto" : "none")};
`;
const OptionBenefits = styled.ul`
  margin: 0.5rem 0 1.5rem 0;
  padding: 0;
  list-style: none;
  li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: ${({ theme }) => theme.colors.body};
    font-size: 14px;
    margin-bottom: 10px;
    svg,
    .iconify {
      min-width: 22px;
      min-height: 22px;
      width: 22px;
      height: 22px;
      display: inline-block;
      flex-shrink: 0;
    }
  }
`;
const DeliveryRow = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.body};
`;
const DeliveryOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.body};
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  @media (max-width: 767px) {
    justify-content: space-between;
    gap: 5px;
  }
`;
const DeliveryOptionBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "selected",
})`
  background: ${({ selected, theme }) =>
    selected ? theme.colors.secondary : "#e5e7eb"};
  color: ${({ selected, theme }) => (selected ? "#fff" : theme.colors.body)};
  font-family: ${({ theme }) => theme.fonts.body};
  border: none;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 0.7em 2.2em 0.4em 2.2em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  max-width: 100%;
  box-sizing: border-box;
  &:hover {
    color: ${({ selected }) => (selected ? "#fff" : "#353535")};
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: ${({ selected }) => (selected ? "#fff" : "#353535")};
    &:hover {
      color: ${({ selected }) => (selected ? "#fff" : "#353535")};
    }
  }
  @media (max-width: 767px) {
    padding: 0.7em 1.2em 0.4em 1.2em;
    gap: 5px;
    font-size: 14px;
    min-width: 100px;
    max-width: 100%;
    justify-content: space-between;
    span {
      font-size: 12px;
    }
  }
`;

const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.gray};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  @media (max-width: 767px) {
    font-size: 14px;
    gap: 1px;
  }
`;
const StarIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
const ReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 1.15rem;
  margin-left: 0.2em;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`;
const Divider = styled.span`
  margin: 0 0.2em;
  color: #b0b0b0;
  font-size: 1.1rem;
`;
const SwiperWrapper = styled.div`
  width: 100%;
  &.main-image-swiper {
    .swiper {
      min-height: 320px;
      width: 100%;
    }
    .swiper-slide {
      display: flex !important;
      align-items: center;
      justify-content: center;
      min-height: 320px;
      min-width: 320px;
      background: transparent;
    }
  }
  .swiper-wrapper {
    padding: 0 !important;
  }
`;

const CheckoutInfoBox = styled.div`
  border: none;
  border-radius: 8px;
  background: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 0.8rem 0.7rem;
    max-width: 100%;
  }
`;
const CheckoutInfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  font-size: 1.25rem;
  color: #222;
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 14px;
    gap: 5px;
    svg {
      height: 20px;
    }
  }
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #60983e;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  animation: spin 0.7s linear infinite;
  margin: auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const QuantityBoxOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const AddToCartBtnWrapper = styled.div`
  position: relative;
  width: 170px;
  max-width: 170px;
`;

// Styled components for the suggestion section
const SuggestionSection = styled.section`
  margin: 0 0 0 0;
  width: 100%;
`;

const SuggestionDescription = styled.p`
  margin: 0 auto 24px;
  font-size: 14px;
  line-height: 1.7;
`;
const FaqArea = styled.div`
  padding: 80px 0;
  position: relative;
  background: linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%);
  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;
const FaqImage = styled.img`
  max-width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  z-index: 0;
  @media (min-width: 992px) {
    display: block;
  }
`;
const FaqTitle = styled.h2`
  text-transform: capitalize;
  text-align: center;
  margin-bottom: 40px;
  @media (max-width: 767px) {
    margin-bottom: 24px;
  }
`;
const FaqContent = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const FaqProductImg = styled.img`
  max-width: 550px;
  height: auto;
  width: 100%;
  border-radius: 10px;
  z-index: 2;
`;
const FaqBox = styled.div`
  max-width: 700px;
`;

// FAQ styled components (no css on h4 or p)
const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_lite};
  overflow: hidden;
`;
const FaqHeader = styled.h4`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 0;
  padding: 22px 0 22px 0;
  color: ${({ theme }) => theme.colors.body};
  background: transparent;
  user-select: none;
  transition: background 0.2s;
`;
const FaqIcon = styled.span`
  display: flex;
  align-items: center;
  margin-left: 16px;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  svg {
    font-size: 1.5em;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    color: ${({ theme }) => theme.colors.body};
  }
`;
const FaqBody = styled.div`
  height: ${({ expanded, $height }) => (expanded ? `${$height}px` : "0")};
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transition: height 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  overflow: hidden;
  padding: 0;
`;
const FaqBodyContent = styled.div`
  transition: padding-bottom 0.3s;
  p {
    padding-bottom: ${({ expanded }) => (expanded ? "18px" : "0")};
  }
`;

const Product = () => {
  const { id } = useParams();
  const imagePath = useImagePath();
  const product = products.find((p) => String(p.id) === String(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState("subscribe");
  const [selectedDelivery, setSelectedDelivery] = useState(0);
  const [loadingQty, setLoadingQty] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [faqHeights, setFaqHeights] = useState([]);
  const faqRefs = useRef([]);
  const swiperRef = useRef(null);

  // Ensure refs array is always correct length
  useEffect(() => {
    if (product.faq) {
      faqRefs.current = Array(product.faq.length)
        .fill()
        .map((_, i) => faqRefs.current[i] || React.createRef());
    }
  }, [product.faq]);

  // Update heights when FAQ open state or FAQ data changes
  useEffect(() => {
    setFaqHeights(faqRefs.current.map((ref) => ref.current?.scrollHeight || 0));
  }, [faqOpen, product.faq]);

  const handleSlideChange = useCallback((swiper) => {
    setSelectedImage(swiper.activeIndex);
  }, []);

  const handleThumbnailClick = useCallback((index) => {
    setSelectedImage(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }, []);

  useEffect(() => {
    const syncQuantityFromCart = () => {
      const cartKey = getCartKey();
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      let isSubscription = option === "subscribe";
      let deliveryOption = null;
      if (isSubscription) {
        deliveryOption =
          product.pricing.subscribeAndSave.deliveryOptions[selectedDelivery];
      }
      const cartItem = existingCart.find(
        (item) =>
          item.id === product.id &&
          !!item.isSubscription === !!isSubscription &&
          (item.deliveryOption || null) === (deliveryOption || null)
      );
      if (cartItem) {
        setQuantity(cartItem.quantity);
      } else {
        setQuantity(1);
      }
    };
    syncQuantityFromCart();
    window.addEventListener("cartUpdate", syncQuantityFromCart);
    return () => window.removeEventListener("cartUpdate", syncQuantityFromCart);
  }, [
    product.id,
    option,
    selectedDelivery,
    product.pricing?.subscribeAndSave?.deliveryOptions,
  ]);

  if (!product) {
    return (
      <Container>
        <div style={{ padding: "3rem", textAlign: "center" }}>
          Product not found.
        </div>
      </Container>
    );
  }

  const images = (
    product.slideshowImages ||
    product.images || [product.thumbnail]
  ).filter((img) => !img.includes("@2x") && !img.includes("@3x"));

  const handleQuantityChange = (newQty) => {
    setLoadingQty(true);
    setTimeout(() => {
      setQuantity(newQty);
      const cartKey = getCartKey();
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      let deliveryFrequency;
      if (option === "subscribe") {
        deliveryFrequency =
          product.pricing.subscribeAndSave.deliveryOptions[selectedDelivery];
      } else {
        deliveryFrequency = null;
      }
      const existingItemIndex = existingCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.subscriptionType === option &&
          item.deliveryFrequency === deliveryFrequency
      );
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity = newQty;
        localStorage.setItem(cartKey, JSON.stringify(existingCart));
        const event = new CustomEvent("cartUpdate", {
          detail: {
            cartItems: existingCart,
            count: existingCart.reduce(
              (total, item) => total + item.quantity,
              0
            ),
          },
        });
        window.dispatchEvent(event);
        const cartCountEvent = new CustomEvent("cartCountUpdate", {
          detail: {
            cartCount: existingCart.reduce(
              (total, item) => total + item.quantity,
              0
            ),
          },
        });
        window.dispatchEvent(cartCountEvent);
      }
      setLoadingQty(false);
    }, 350);
  };

  const handleAddToCart = () => {
    setLoadingCart(true);
    setLoadingQty(false);
    setTimeout(() => {
      const cartKey = getCartKey();
      const existingCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      let deliveryFrequency;
      if (option === "subscribe") {
        deliveryFrequency =
          product.pricing.subscribeAndSave.deliveryOptions[selectedDelivery];
      } else {
        deliveryFrequency = null;
      }
      const cartItem = {
        id: product.id,
        productName: product.productName,
        thumbnail: product.thumbnail,
        price:
          option === "subscribe"
            ? product.pricing.subscribeAndSave.discountedPrice
            : product.pricing.oneTimePurchase.price,
        originalPrice:
          option === "subscribe" ? product.pricing.oneTimePurchase.price : null,
        quantity: quantity,
        subscriptionType: option,
        deliveryFrequency: deliveryFrequency,
        isSubscription: option === "subscribe",
        deliveryOption: option === "subscribe" ? deliveryFrequency : null,
      };
      const existingItemIndex = existingCart.findIndex(
        (item) =>
          item.id === product.id &&
          !!item.isSubscription === !!cartItem.isSubscription &&
          (item.deliveryOption || null) === (cartItem.deliveryOption || null)
      );
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        existingCart.push(cartItem);
      }
      localStorage.setItem(cartKey, JSON.stringify(existingCart));
      const event = new CustomEvent("cartUpdate", {
        detail: {
          cartItems: existingCart,
          count: existingCart.reduce((total, item) => total + item.quantity, 0),
        },
      });
      window.dispatchEvent(event);
      const cartCountEvent = new CustomEvent("cartCountUpdate", {
        detail: {
          cartCount: existingCart.reduce(
            (total, item) => total + item.quantity,
            0
          ),
        },
      });
      window.dispatchEvent(cartCountEvent);
      window.dispatchEvent(new CustomEvent("cartOpen"));
      const updatedIndex = existingCart.findIndex(
        (item) =>
          item.id === product.id &&
          !!item.isSubscription === !!cartItem.isSubscription &&
          (item.deliveryOption || null) === (cartItem.deliveryOption || null)
      );
      if (updatedIndex !== -1) {
        setQuantity(existingCart[updatedIndex].quantity);
      }
      setLoadingCart(false);
    }, 600);
  };

  const getImageSrc = (img) => {
    if (!imagePath) return img;
    return imagePath.endsWith("/") ? imagePath + img : imagePath + "/" + img;
  };

  const getImageSrcSet = (img) => {
    if (!img) return undefined;
    const base = img.replace(/(@2x|@3x)?(\.[a-zA-Z]+)$/, "");
    const ext = img.match(/\.[a-zA-Z]+$/)?.[0] || "";
    const src1x = getImageSrc(base + ext);
    const src2x = getImageSrc(base + "@2x" + ext);
    const src3x = getImageSrc(base + "@3x" + ext);
    return `${src1x} 1x, ${src2x} 2x, ${src3x} 3x`;
  };

  return (
    <>
      <Container>
        <ProductWrapper>
          <ImageSection>
            <SwiperWrapper className="main-image-swiper">
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                style={{
                  width: "100%",
                  borderRadius: 18,
                  display: "flex",
                  alignContent: "center",
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
                freeMode={true}
                modules={[FreeMode]}
                grabCursor={true}
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <MainImage
                      src={getImageSrc(img)}
                      srcSet={getImageSrcSet(img)}
                      sizes="(max-width: 600px) 100vw, 600px"
                      alt={product.productName}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrapper>
            <SwiperWrapper>
              <Swiper
                spaceBetween={10}
                slidesPerView={4}
                style={{ marginTop: 10, maxWidth: 700, width: "100%" }}
                freeMode={true}
                modules={[FreeMode]}
                grabCursor={true}
              >
                {images.slice(0, 5).map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Thumb
                      src={getImageSrc(img)}
                      srcSet={getImageSrcSet(img)}
                      sizes="(max-width: 600px) 100vw, 140px"
                      alt={product.productName + " thumb"}
                      selected={selectedImage === idx}
                      onClick={() => handleThumbnailClick(idx)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperWrapper>
            {window.innerWidth > 1024 && (
              <>
                <TestimonialBox>
                  “{product.testimonial?.quote}”
                  <span>
                    - {product.testimonial?.author},{" "}
                    {product.testimonial?.designation}
                  </span>
                </TestimonialBox>
                <SuggestionSection>
                  <SuggestionDescription>
                    {product["details-description"]}
                  </SuggestionDescription>
                </SuggestionSection>
              </>
            )}
          </ImageSection>
          <InfoSection>
            <ReviewRow>
              <StarIcon icon="mdi:star" />
              <StarIcon icon="mdi:star" />
              <StarIcon icon="mdi:star" />
              <StarIcon icon="mdi:star" />
              <StarIcon icon="mdi:star-half-full" />
              <ReviewCount>{product.reviewCount} Reviews</ReviewCount>
              <Divider>|</Divider>
              <span>50,000+ happy customers</span>
            </ReviewRow>
            <Title>{product.productName}</Title>
            <Description>{product.description}</Description>
            <BenefitsList>
              {product.benefits &&
                product.benefits.map((b, i) => (
                  <BenefitItem key={i}>
                    <Icon
                      icon="hugeicons:tick-double-01"
                      width={24}
                      height={24}
                      style={{ color: "#60983E", minWidth: 24 }}
                    />
                    {b}
                  </BenefitItem>
                ))}
            </BenefitsList>
            <CapsuleCount>{product.capsuleCount} CAPSULE COUNT</CapsuleCount>
            <PurchaseOptionsWrapper $subscribeExpanded={option === "subscribe"}>
              <PurchaseOptionBox $active={option === "subscribe"}>
                <PurchaseOptionHeader onClick={() => setOption("subscribe")}>
                  <PurchaseRadioCircle $active={option === "subscribe"} />
                  <PurchaseOptionTitle>
                    Subscribe & save
                    <PurchaseOptionPriceRow>
                      <PurchaseOptionOldPrice>
                        ${product.pricing.oneTimePurchase.price.toFixed(2)}
                      </PurchaseOptionOldPrice>
                      <PurchaseOptionPrice>
                        $
                        {product.pricing.subscribeAndSave.discountedPrice.toFixed(
                          2
                        )}
                      </PurchaseOptionPrice>
                    </PurchaseOptionPriceRow>
                  </PurchaseOptionTitle>
                  <SaveTagBox>
                    <span>
                      Save {product.pricing.subscribeAndSave.savePercent}%
                    </span>
                  </SaveTagBox>
                </PurchaseOptionHeader>
                <PurchaseOptionCollapse expanded={option === "subscribe"}>
                  <OptionBenefits>
                    {product.pricing.subscribeAndSave.benefits.map((b, i) => (
                      <li key={i}>
                        <Icon
                          icon="material-symbols:check-circle"
                          width="24"
                          height="24"
                          style={{ color: "#60983E" }}
                        />
                        {b}
                      </li>
                    ))}
                  </OptionBenefits>
                  <DeliveryRow>Deliver every:</DeliveryRow>
                  <DeliveryOptions>
                    {product.pricing.subscribeAndSave.deliveryOptions.map(
                      (d, i) => (
                        <DeliveryOptionBtn
                          key={d}
                          selected={selectedDelivery === i}
                          onClick={() => setSelectedDelivery(i)}
                          type="button"
                        >
                          {d}
                          <span>save 20%</span>
                        </DeliveryOptionBtn>
                      )
                    )}
                  </DeliveryOptions>
                </PurchaseOptionCollapse>
              </PurchaseOptionBox>
              <PurchaseOptionBox $active={option === "onetime"}>
                <PurchaseOptionHeader onClick={() => setOption("onetime")}>
                  <PurchaseRadioCircle $active={option === "onetime"} />
                  <PurchaseOptionTitle>
                    One-time
                    <PurchaseOptionPriceRow>
                      <PurchaseOptionPrice>
                        ${product.pricing.oneTimePurchase.price.toFixed(2)}
                      </PurchaseOptionPrice>
                    </PurchaseOptionPriceRow>
                  </PurchaseOptionTitle>
                </PurchaseOptionHeader>
              </PurchaseOptionBox>
            </PurchaseOptionsWrapper>
            <QuantityRow>
              <div style={{ position: "relative", width: 120, height: 40 }}>
                <QuantityBox>
                  <QtyBtn
                    onClick={() =>
                      !loadingQty &&
                      handleQuantityChange(Math.max(1, quantity - 1))
                    }
                    aria-label="Decrease"
                    disabled={loadingQty || quantity <= 1 || loadingCart}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <line
                        x1="6"
                        y1="12"
                        x2="18"
                        y2="12"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                  </QtyBtn>
                  <QuantityInput
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const val = Math.max(1, parseInt(e.target.value) || 1);
                      if (!loadingQty) handleQuantityChange(val);
                    }}
                    aria-label="Quantity"
                    disabled={loadingQty || loadingCart}
                  />
                  <QtyBtn
                    onClick={() =>
                      !loadingQty && handleQuantityChange(quantity + 1)
                    }
                    aria-label="Increase"
                    disabled={loadingQty || loadingCart}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14m7-7H5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </QtyBtn>
                </QuantityBox>
                {loadingQty && (
                  <QuantityBoxOverlay>
                    <Spinner />
                  </QuantityBoxOverlay>
                )}
              </div>
              <AddToCartBtnWrapper>
                <AddToCartBtn
                  onClick={handleAddToCart}
                  disabled={loadingCart}
                  aria-label="Add to cart"
                >
                  {loadingCart ? <Spinner /> : "Add to cart"}
                </AddToCartBtn>
              </AddToCartBtnWrapper>
            </QuantityRow>
            <PaymentIcons>
              <img
                src={`${imagePath}payment.png`}
                srcSet={`${imagePath}payment@2x.png 2x, ${imagePath}payment@3x.png 3x`}
                alt="Payment methods"
              />
            </PaymentIcons>
            <CheckoutInfoBox>
              <CheckoutInfoRow>
                <Icon
                  icon="mdi:truck"
                  style={{ fontSize: 28, marginRight: 12, color: "#353535" }}
                />
                <span>Shipping rates calculated at checkout</span>
              </CheckoutInfoRow>
              <CheckoutInfoRow>
                <Icon
                  icon="mdi:shield-check"
                  style={{ fontSize: 28, marginRight: 12, color: "#353535" }}
                />
                <span>Guaranteed safe checkout</span>
              </CheckoutInfoRow>
            </CheckoutInfoBox>
            {window.innerWidth <= 1024 && (
              <TestimonialBox>
                “{product.testimonial?.quote}”
                <span>
                  - {product.testimonial?.author},{" "}
                  {product.testimonial?.designation}
                </span>
              </TestimonialBox>
            )}
          </InfoSection>
        </ProductWrapper>
      </Container>
      <FeatureIcons />
      <FaqArea>
        <FaqImage
          src={`${imagePath}faq-img.svg`}
          alt="FAQ Background"
          loading="lazy"
        />
        <Container>
          <FaqTitle>How Sugar Shift Works</FaqTitle>
          <FaqContent>
            <FaqProductImg
              src={`${imagePath}${product.slideshowImages[3]}`}
              srcSet={
                product.slideshowImages.length >= 6
                  ? `
                              ${imagePath}${product.slideshowImages[3]} 1x,
                              ${imagePath}${product.slideshowImages[4]} 2x,
                              ${imagePath}${product.slideshowImages[5]} 3x
                            `
                  : product.slideshowImages.length === 5
                  ? `
                              ${imagePath}${product.slideshowImages[3]} 1x,
                              ${imagePath}${product.slideshowImages[4]} 2x
                            `
                  : `${imagePath}${product.slideshowImages[3]} 1x`
              }
              alt={`${product.productName} - Alternative view`}
              loading="lazy"
            />
            <FaqBox>
              {(product.faq || []).map((faq, idx) => (
                <FaqItem key={idx}>
                  <FaqHeader
                    onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                    aria-expanded={faqOpen === idx}
                  >
                    {faq.question}
                    <FaqIcon
                      style={{
                        transform:
                          faqOpen === idx ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      <Icon icon={faqOpen === idx ? "mdi:minus" : "mdi:plus"} />
                    </FaqIcon>
                  </FaqHeader>
                  <FaqBody
                    expanded={faqOpen === idx}
                    $height={faqOpen === idx ? faqHeights[idx] || 0 : 0}
                  >
                    {/* Always render FaqBodyContent and attach ref correctly */}
                    <FaqBodyContent
                      expanded={faqOpen === idx}
                      ref={faqRefs.current[idx]}
                    >
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </FaqBodyContent>
                  </FaqBody>
                </FaqItem>
              ))}
            </FaqBox>
          </FaqContent>
        </Container>
      </FaqArea>
      <ProductSlider excludeId={product.id} />
    </>
  );
};

export default Product;
