import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useImagePath } from "../context/ImagePathContext";
import { useNavigate } from "react-router-dom";

const SlideWrapper = styled.div`
  border-radius: 14px;
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 320px;
  max-width: 350px;
  margin: 0 auto;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08), 0 1.5px 6px rgba(0, 0, 0, 0.04);
    transform: scale(1.03);
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
  background: #fff;
`;

const ProductThumb = styled.img`
  width: 80px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  position: absolute;
  right: 0;
  bottom: -10px;
`;

const SlideTitle = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
  margin: 30px 0 12px 0;
  text-align: center;
`;

const SlideInner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BenefitSwiper = () => {
  const imagePath = useImagePath();
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      spaceBetween={24}
      slidesPerView={4}
      breakpoints={{
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
      }}
      style={{ width: "100%", padding: "16px 0" }}
    >
      <SwiperSlide
        onClick={() => {
          navigate("/product/1");
        }}
      >
        <SlideWrapper>
          <SlideInner>
            <SlideImage
              src={imagePath + "benefit1.jpg"}
              srcSet={
                imagePath +
                "benefit1.jpg 1x, " +
                imagePath +
                "benefit1@2x.jpg 2x, " +
                imagePath +
                "benefit1@3x.jpg 3x"
              }
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Gut Health"
            />
            <ProductThumb
              src={imagePath + "benefit-thumb1.png"}
              alt="Sugar Shift"
            />
          </SlideInner>
          <SlideTitle>Gut Health</SlideTitle>
        </SlideWrapper>
      </SwiperSlide>

      <SwiperSlide
        onClick={() => {
          navigate("/product/2");
        }}
      >
        <SlideWrapper>
          <SlideInner>
            <SlideImage
              src={imagePath + "benefit2.jpg"}
              srcSet={
                imagePath +
                "benefit2.jpg 1x, " +
                imagePath +
                "benefit2@2x.jpg 2x, " +
                imagePath +
                "benefit2@3x.jpg 3x"
              }
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Sleep Improvement"
            />
            <ProductThumb
              src={imagePath + "benefit-thumb2.png"}
              alt="Sleep Improvement"
            />
          </SlideInner>
          <SlideTitle>Sleep Improvement</SlideTitle>
        </SlideWrapper>
      </SwiperSlide>

      <SwiperSlide
        onClick={() => {
          navigate("/product/3");
        }}
      >
        <SlideWrapper>
          <SlideInner>
            <SlideImage
              src={imagePath + "benefit3.jpg"}
              srcSet={
                imagePath +
                "benefit3.jpg 1x, " +
                imagePath +
                "benefit3@2x.jpg 2x, " +
                imagePath +
                "benefit3@3x.jpg 3x"
              }
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Post Antibiotics"
            />
            <ProductThumb
              src={imagePath + "benefit-thumb3.png"}
              alt="Post Antibiotics"
            />
          </SlideInner>
          <SlideTitle>Post Antibiotics</SlideTitle>
        </SlideWrapper>
      </SwiperSlide>

      <SwiperSlide
        onClick={() => {
          navigate("/product/4");
        }}
      >
        <SlideWrapper>
          <SlideInner>
            <SlideImage
              src={imagePath + "benefit4.jpg"}
              srcSet={
                imagePath +
                "benefit4.jpg 1x, " +
                imagePath +
                "benefit4@2x.jpg 2x, " +
                imagePath +
                "benefit4@3x.jpg 3x"
              }
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Heart Health"
            />
            <ProductThumb
              src={imagePath + "benefit-thumb4.png"}
              alt="Heart Health"
            />
          </SlideInner>
          <SlideTitle>Heart Health</SlideTitle>
        </SlideWrapper>
      </SwiperSlide>

      <SwiperSlide
        onClick={() => {
          navigate("/product/5");
        }}
      >
        <SlideWrapper>
          <SlideInner>
            <SlideImage
              src={imagePath + "benefit5.jpg"}
              srcSet={
                imagePath +
                "benefit5.jpg 1x, " +
                imagePath +
                "benefit5@2x.jpg 2x, " +
                imagePath +
                "benefit5@3x.jpg 3x"
              }
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
              alt="Immune Health"
            />
            <ProductThumb
              src={imagePath + "benefit-thumb5.png"}
              alt="Immune Health"
            />
          </SlideInner>
          <SlideTitle>Immune Health</SlideTitle>
        </SlideWrapper>
      </SwiperSlide>
    </Swiper>
  );
};

export default BenefitSwiper;
