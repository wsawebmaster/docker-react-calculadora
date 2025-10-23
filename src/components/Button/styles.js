import styled from "styled-components";

export const ButtonContainer = styled.button`
  padding: 20px;
  border: none;
  border-radius: 12px;
  background-color: #2d2d30;
  color: #f3f3f3;
  font-size: 24px;
  font-weight: 700;
  flex: 1;
  margin: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background 0.2s, color 0.2s;

  &:hover {
    background-color: #3a3a3d;
    color: #fff;
    opacity: 1;
  }

  &.key-active {
    background-color: #3a3a3d;
    color: #fff;
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) inset;
  }
`;
