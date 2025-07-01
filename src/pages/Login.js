import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../components/Container";
import { Icon } from "@iconify/react";

const PageWrapper = styled.div`
  padding: 4rem 0;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const AuthContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eaeaea;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "#22465d" : "transparent")};
  color: ${(props) => (props.$active ? "#22465d" : "#777")};
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#22465d" : "#333")};
  }
`;

const FormContainer = styled.div`
  padding: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0.75rem;
  top: ${(props) => (props.$focused || props.$hasValue ? "-0.5rem" : "50%")};
  transform: translateY(
    ${(props) => (props.$focused || props.$hasValue ? "0" : "-50%")}
  );
  background-color: #fff;
  padding: 0 0.25rem;
  font-size: ${(props) =>
    props.$focused || props.$hasValue ? "0.75rem" : "0.9rem"};
  color: ${(props) => (props.$focused ? "#22465d" : "#777")};
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => (props.$focused ? "#22465d" : "#ddd")};
  border-radius: 4px;
  font-size: 1rem;
  transition: border 0.2s ease;
  outline: none;

  &:focus {
    border-color: #22465d;
  }
`;

const SubmitButton = styled.button`
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
  margin-top: 1rem;

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

const ForgotPassword = styled.div`
  text-align: right;
  margin-top: 0.5rem;

  a {
    color: #22465d;
    font-size: 0.9rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #e1e1e1;
  }

  span {
    padding: 0 10px;
    color: #777;
    font-size: 0.9rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9f9f9;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  color: #777;
  text-align: center;
  margin-top: 1.5rem;
`;

const BackToStore = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  color: #22465d;
  font-size: 0.9rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// This page is intentionally left blank. All login/signup logic has been removed for guest-only mode.
export default function Login() {
  return null;
}
