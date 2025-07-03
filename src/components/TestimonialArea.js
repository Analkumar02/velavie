import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const TestimonialSlider = styled.div`
  margin-top: 50px;
  @media (max-width: 991px) {
    margin-top: 30px;
  }
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`;

const TestimonialSlide = styled.div`
  max-width: 770px;
  min-width: 514px;
  flex-shrink: 0;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 15px;
  margin-right: 15px;
  @media (max-width: 767px) {
    max-width: 600px;
    min-width: 350px;
  }
`;

const UserImg = styled.img`
  max-width: 100%;
  border-radius: 30px;
  height: 100%;
`;

const TestimonialBox = styled.div`
  background-color: ${({ theme }) => theme.colors.green_bg};
  padding: 20px;
  border-radius: 30px;
  min-width: 514px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 767px) {
    min-width: 350px;
  }
`;

const BoxHeader = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const StarsList = styled.div`
  display: flex;
`;

const BoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span {
    display: flex;
    align-items: center;
    gap: 5px;
    color: ${({ theme }) => theme.colors.secondary};
    font: 14px;
  }
`;

const ProductThumb = styled.div`
  max-width: 80px;
  max-height: 80px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

function TestimonialArea({ testimonials, imagePath }) {
  const trackRef = React.useRef(null);
  const [slideWidth, setSlideWidth] = React.useState(0);
  const [trackWidth, setTrackWidth] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[0];
    if (!slide) return;
    setSlideWidth(slide.offsetWidth);
    setTrackWidth(track.scrollWidth / 2); // since we duplicate
  }, [testimonials]);

  React.useEffect(() => {
    let animationId;
    let pos = 0;
    const speed = 0.5; // px per frame, adjust for slower/faster
    function animate() {
      pos += speed;
      if (pos >= trackWidth) pos = 0;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-pos}px)`;
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [trackWidth]);

  // Duplicate slides for seamless loop
  const slides = [...testimonials, ...testimonials];

  return (
    <TestimonialSlider>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          width: slides.length * (slideWidth || 400),
          transition: "none",
        }}
      >
        {slides.map((t, i) => (
          <TestimonialSlide key={i}>
            <UserImg
              src={t.userImg}
              srcSet={t.userImgSet}
              alt="User Image"
              loading="lazy"
            />
            <TestimonialBox>
              <BoxHeader>
                <Icon
                  icon="fa:quote-left"
                  width="59.1"
                  height="50"
                  style={{ color: "#AFAFAFaa" }}
                />
                <StarsList>
                  {[...Array(5)].map((_, idx) => (
                    <Icon
                      key={idx}
                      icon="material-symbols:star"
                      width="20"
                      height="19"
                      style={{ color: "#FFD700" }}
                    />
                  ))}
                </StarsList>
                <p>{t.text}</p>
              </BoxHeader>
              <BoxFooter>
                <UserInfo>
                  <h5>{t.name}</h5>
                  <span>
                    <Icon
                      icon="lets-icons:check-fill"
                      width="18"
                      height="18"
                      style={{ color: "#60983E" }}
                    />
                    Verified Buyer
                  </span>
                </UserInfo>
                <ProductThumb onClick={() => navigate(t.productLink)}>
                  <img
                    src={t.productThumb}
                    alt="Sugar Shift product"
                    loading="lazy"
                  />
                </ProductThumb>
              </BoxFooter>
            </TestimonialBox>
          </TestimonialSlide>
        ))}
      </div>
    </TestimonialSlider>
  );
}

export default TestimonialArea;
