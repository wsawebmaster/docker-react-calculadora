import { ButtonContainer } from "./styles";

const Button = ({ label, onClick, active }) => {
  return (
    <ButtonContainer
      onClick={onClick}
      type="button"
      className={active ? "key-active" : ""}
    >
      {label}
    </ButtonContainer>
  );
};

export default Button;
