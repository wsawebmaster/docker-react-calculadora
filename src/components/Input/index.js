import { InputContainer } from "./styles";

const Input = ({ value, display }) => {
  return (
    <InputContainer>
      <input disabled value={display ?? value} />
    </InputContainer>
  );
};

export default Input;
