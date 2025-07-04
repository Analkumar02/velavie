import React, { useEffect } from "react";
import styled from "styled-components";
import Container from "../components/Container";
import { useImagePath } from "../context/ImagePathContext";

const ConfirmArea = styled.div`
  padding: 80px 0;
  background: #fff;
  @media (max-width: 991px) {
    padding: 40px 0;
  }
`;
const TitleArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
  h2 {
    color: ${({ theme }) => theme.colors.secondary};
    margin: 0;
    span {
      font-weight: 400;
      color: ${({ theme }) => theme.colors.secondary};
      margin-left: 10px;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    h2 {
      text-align: center;
      span {
        display: block;
      }
    }
  }
`;
const BtnBlue = styled.a`
  max-width: 250px;
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
  border-radius: 12px;
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
    border-radius: 10px;
  }
`;
const MessageBox = styled.div`
  margin-bottom: 30px;
  h5 {
    margin: 0 0 6px 0;
  }
`;
const OrderDetailsBox = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 24px;
  }
`;
const ShippingDetails = styled.div`
  width: 70%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const OrderTotal = styled.div`
  width: 30%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 40px;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 20px 0;
  }
`;
const InfoBlock = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 18px;
  .label {
    color: ${({ theme }) => theme.colors.gray};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    margin-top: 18px;
    margin-bottom: 2px;
    display: block;
  }
  .value {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    margin-bottom: 2px;
    display: block;
  }
  a.value {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;
const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fff;
  padding: 18px 18px 18px 0;
  margin-bottom: 18px;
`;
const ProductImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: #fff;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  object-fit: contain;
`;
const ProductDetails = styled.div`
  flex: 1;
  .qty {
    font-size: 1rem;
    margin-bottom: 2px;
  }
  .name {
    font-weight: 600;
    margin-bottom: 2px;
  }
  .price {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    margin-bottom: 2px;
  }
`;
const DeliveryDetails = styled.div`
  min-width: 180px;
  .label {
    color: ${({ theme }) => theme.colors.gray};
    margin-bottom: 2px;
  }
  .value {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }
`;
const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 30px 0 20px 0;
`;
const FeedbackSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;
const FeedbackText = styled.div`
  flex: 1;
  .title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 6px;
  }
  .desc {
    color: #888;
    font-size: 1rem;
    margin-bottom: 0;
  }
`;
const OrderTotalBox = styled.div`
  background: ${({ theme }) => theme.colors.green_bg};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.01);
`;
const OrderTotalTitle = styled.h4`
  margin-bottom: 18px;
`;
const OrderTotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  span:last-child {
    font-weight: 600;
  }
`;
const OrderTotalDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.green_border};
  margin: 18px 0 16px 0;
`;
const OrderTotalFinal = styled(OrderTotalRow)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 18px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 14px;
    text-transform: capitalize;
  }
  h5 {
    text-transform: capitalize;
  }
  ul {
    list-style: disc;
    padding-left: 20px;
    li {
      list-style: disc;
      margin-bottom: 5px;
      font-size: 14px;
    }
  }
  @media (max-width: 991px) {
    gap: 7px;
  }
`;
const DownloadBtn = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  img {
    max-width: 170px;
    &:hover {
      transform: scale(1.1);
    }
  }
  @media (max-width: 991px) {
    img {
      max-width: 100px;
    }
  }
`;

function ThankYou() {
  const imagePath = useImagePath();
  let orderData = {};
  try {
    const raw = localStorage.getItem("orderData");
    orderData = raw ? JSON.parse(raw) : {};
  } catch (e) {
    orderData = {};
  }
  const orderNumber = orderData?.orderNumber || Math.floor(Math.random() * 1e9);
  const shipping = orderData?.formData || {};
  const shippingMethod = orderData?.shippingMethod || "";
  const orderDate = orderData?.orderDate
    ? new Date(orderData.orderDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";
  const getCardInfo = () => {
    const cardNumber = shipping.cardNumber || "";
    if (!cardNumber || cardNumber.length < 4) return null;
    let type = "Card";
    let logo = null;
    if (cardNumber.startsWith("2222")) {
      type = "Visa";
      logo = `${imagePath}visa.png`;
    }
    return {
      last4: cardNumber.slice(-4),
      type,
      logo,
    };
  };
  const deliveryEstimate = (() => {
    if (!orderDate) return "";
    const orderDateObj = orderData?.orderDate
      ? new Date(orderData.orderDate)
      : new Date();
    const now = orderData?.orderDate
      ? new Date(orderData.orderDate)
      : new Date();
    const orderHour = now.getHours();
    if (shippingMethod === "Standard Ground") {
      orderDateObj.setDate(orderDateObj.getDate() + 7);
      return orderDateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });
    } else if (
      shippingMethod === "2nd Day Air (Orders placed before 1pm PST)" ||
      shippingMethod === "twoDayAir"
    ) {
      if (orderHour < 13) {
        orderDateObj.setDate(orderDateObj.getDate() + 2);
      } else {
        orderDateObj.setDate(orderDateObj.getDate() + 3);
      }
      return orderDateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });
    } else if (
      shippingMethod === "Next Day (Orders placed before 1pm PST)" ||
      shippingMethod === "nextDay"
    ) {
      if (orderHour < 13) {
        orderDateObj.setDate(orderDateObj.getDate() + 1);
      } else {
        orderDateObj.setDate(orderDateObj.getDate() + 2);
      }
      return orderDateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        weekday: "long",
      });
    }
    return "";
  })();

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.removeItem("cartItems_guest");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("orderData");
    localStorage.removeItem("checkoutInProgress");
    localStorage.removeItem("cartCount_guest");
    localStorage.removeItem("cartCount");
    localStorage.removeItem("checkoutFormData");
    localStorage.removeItem("subscriptionUpgraded");
    localStorage.removeItem("subscriptionSavings");
    sessionStorage.removeItem("cartItems");
    sessionStorage.removeItem("checkoutInProgress");
    window.dispatchEvent(
      new CustomEvent("cartCountUpdate", { detail: { cartCount: 0 } })
    );
  }, []);

  return (
    <ConfirmArea>
      <Container>
        <TitleArea>
          <h2>
            Thanks for your order
            <span>#{orderNumber}</span>
          </h2>
          <BtnBlue href="">Track Order</BtnBlue>
        </TitleArea>
        <MessageBox>
          <h5>Hi {shipping.firstName || ""}</h5>
          <p>We are delighted that you have found something you like!</p>
        </MessageBox>
        <OrderDetailsBox>
          <ShippingDetails>
            <InfoGrid>
              <InfoBlock>
                <span className="label">Shipping Address</span>
                <span className="value">
                  {shipping.firstName} {shipping.lastName}
                </span>
                <span className="value">{shipping.address1}</span>
                <span className="value">
                  {shipping.city}, {shipping.state} {shipping.zipCode},{" "}
                  {shipping.country}
                </span>
                <span className="value">{shipping.phone}</span>
                <span className="label">Sold by</span>
                <a
                  className="value"
                  href="https://velavie.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Velavie.com
                </a>
                <span className="label">Email Address</span>
                <a className="value" href={`mailto:${shipping.email}`}>
                  {shipping.email}
                </a>
                <span className="label">Delivery Method</span>
                <span className="value">
                  {shippingMethod === "Standard Ground"
                    ? "FedEx Ground"
                    : shippingMethod}
                </span>
              </InfoBlock>
              <InfoBlock>
                <span className="label">Billing Address</span>
                <span className="value">Same as shipping</span>
                <span className="value">{shipping.phone}</span>
                <span className="label">Order Date</span>
                <span className="value">{orderDate}</span>
                <span className="label">Payment Type</span>
                {shipping.paymentMethod === "creditCard" && getCardInfo() ? (
                  <span
                    className="value"
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {getCardInfo().logo && (
                      <img
                        src={getCardInfo().logo}
                        alt={getCardInfo().type}
                        style={{ width: 28, height: 18, objectFit: "contain" }}
                        loading="lazy"
                      />
                    )}
                    {getCardInfo().type} ** {getCardInfo().last4}
                  </span>
                ) : (
                  <span className="value">
                    {shipping.paymentMethod === "cashOnDelivery"
                      ? "Cash on delivery"
                      : shipping.paymentMethod || "-"}
                  </span>
                )}
              </InfoBlock>
            </InfoGrid>
            <Divider />
            {orderData.cartItems &&
              orderData.cartItems.map((item, idx) => (
                <ProductRow key={idx}>
                  <ProductImg
                    src={`${imagePath}${item.thumbnail}`}
                    alt={item.productName}
                    loading="lazy"
                  />
                  <ProductDetails>
                    <div className="name">{item.productName}</div>
                    <div className="qty">Qty: {item.quantity}</div>
                    <div className="price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </ProductDetails>
                  <DeliveryDetails>
                    <div className="label">Delivery Method</div>
                    <div className="value">
                      {shippingMethod === "Standard Ground"
                        ? "FedEx Ground"
                        : shippingMethod}
                    </div>
                    <div className="label">Arrives</div>
                    <div className="value">{deliveryEstimate}</div>
                  </DeliveryDetails>
                </ProductRow>
              ))}
            <Divider />
            <FeedbackSection>
              <FeedbackText>
                <div className="title">Tell us what you think.</div>
                <div className="desc">
                  Take our two minutes survey to tell us about your experience
                </div>
              </FeedbackText>
              <div
                style={{
                  maxWidth: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #1e415f 0%, #154a6b 100%)",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "14px 24px",
                  borderRadius: "12px",
                  textTransform: "capitalize",
                  textDecoration: "none",
                  border: "none",
                  letterSpacing: "0.02em",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                Feedback
              </div>
            </FeedbackSection>
            <Divider />
          </ShippingDetails>
          <OrderTotal>
            <OrderTotalBox>
              <OrderTotalTitle>Order Total</OrderTotalTitle>
              <OrderTotalRow>
                <span>
                  Subtotal (
                  {orderData.cartItems
                    ? orderData.cartItems.reduce(
                        (sum, item) => sum + (item.quantity || 0),
                        0
                      )
                    : 0}{" "}
                  items)
                </span>
                <span>
                  ${orderData.subtotal ? orderData.subtotal.toFixed(2) : "0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalRow>
                <span>Shipping</span>
                <span>
                  {orderData.shipping === 0
                    ? "FREE"
                    : orderData.shipping
                    ? `$${orderData.shipping.toFixed(2)}`
                    : "$0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalRow>
                <span>TAX</span>
                <span>
                  ${orderData.tax ? orderData.tax.toFixed(2) : "0.00"}
                </span>
              </OrderTotalRow>
              <OrderTotalDivider />
              <OrderTotalFinal>
                <span>Total</span>
                <span>
                  ${orderData.total ? orderData.total.toFixed(2) : "0.00"}
                </span>
              </OrderTotalFinal>
            </OrderTotalBox>
            <ContentBox>
              <p>Unlock True Wellness</p>
              <h5>download the Velavie app</h5>
              <ul>
                <li>Unlock wellness with app-exclusive offers.</li>
                <li>Get early access to new formulas.</li>
                <li>Stay informed. Stay empowered.</li>
              </ul>
              <DownloadBtn>
                <img
                  src={`${imagePath}playstore.png`}
                  alt="Playstore"
                  loading="lazy"
                />
                <img
                  src={`${imagePath}appstore.png`}
                  alt="Appstore"
                  loading="lazy"
                />
              </DownloadBtn>
            </ContentBox>
          </OrderTotal>
        </OrderDetailsBox>
      </Container>
    </ConfirmArea>
  );
}

export default ThankYou;
