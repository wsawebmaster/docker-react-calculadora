import Input from "./components/Input";
import Button from "./components/Button";

import { Container, Content, Row } from "./styles";
import { useState, useEffect } from "react";

const App = () => {
  const [currentNumber, setCurrentNumber] = useState("0");
  const [firstNumber, setFirstNumber] = useState("0");
  const [operation, setOperation] = useState("");
  const [displayValue, setDisplayValue] = useState(null);

  const [activeKey, setActiveKey] = useState(null);

  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const handleOnClear = () => {
    setCurrentNumber("0");
    setFirstNumber("0");
    setOperation("");
    setDisplayValue(null);
    setWaitingForNewNumber(false);
  };

  const handleAddNumber = (num) => {
    setDisplayValue(null);

    if (waitingForNewNumber) {
      // iniciar novo número — se o usuário começar com decimal, use 0.
      if (num === "," || num === ".") {
        setCurrentNumber("0.");
      } else {
        setCurrentNumber(String(num));
      }
      setWaitingForNewNumber(false);
      return;
    }
    // Normalizar vírgula para ponto internamente
    const input = num === "," ? "." : num;

    // Evitar múltiplos pontos decimais
    if (input === "." && currentNumber.includes(".")) return;

    // Se currentNumber é '0' e input não é '.', substitui 0
    if (currentNumber === "0" && input !== ".") {
      setCurrentNumber(String(input));
      return;
    }

    setCurrentNumber((prev) => `${prev === "0" ? "" : prev}${input}`);
  };

  // Alternar sinal do número atual
  const handleToggleSign = () => {
    setDisplayValue(null);
    if (!currentNumber || currentNumber === "0") return;
    if (currentNumber.startsWith("-")) {
      setCurrentNumber(currentNumber.slice(1));
    } else {
      setCurrentNumber("-" + currentNumber);
    }
  };

  const calculate = (a, b, op) => {
    const x = Number(a);
    const y = Number(b);
    switch (op) {
      case "+":
        return x + y;
      case "-":
        return x - y;
      case "x":
        return x * y;
      case "/":
        return x / y;
      default:
        return y;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      const flash = (label) => {
        setActiveKey(label);
        setTimeout(() => setActiveKey(null), 120);
      };

      if (/^[0-9]$/.test(key) || key.startsWith("Numpad")) {
        const digit = key.startsWith("Numpad")
          ? key.replace("Numpad", "")
          : key;
        flash(digit);
        handleAddNumber(digit);
        return;
      }

      if (key === "+" || key === "-" || key === "*" || key === "/") {
        const op = key === "*" ? "x" : key;
        flash(op);
        handleOperator(op);
        return;
      }

      if (key === "Enter" || key === "=") {
        flash("=");
        handleEquals();
        return;
      }

      if (key === "%") {
        flash("%");
        handlePercNumbers();
        return;
      }

      if (key === "." || key === ",") {
        flash(",");
        handleAddNumber(",");
        return;
      }

      if (key === "Backspace" || key === "Escape") {
        flash("C");
        handleOnClear();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentNumber, firstNumber, operation, waitingForNewNumber]);

  const handleOperator = (op) => {
    setDisplayValue(null);

    if (operation !== "" && !waitingForNewNumber && currentNumber !== "0") {
      const left = firstNumber === "0" ? currentNumber : firstNumber;
      const result = calculate(left, currentNumber, operation);
      setFirstNumber(String(result));
      setCurrentNumber(String(result));
      setOperation(op);

      setWaitingForNewNumber(true);
      return;
    }

    if (firstNumber === "0") {
      setFirstNumber(String(currentNumber));
      setOperation(op);
      setWaitingForNewNumber(true);
      return;
    }

    setOperation(op);
  };

  const handlePercNumbers = () => {
    if (firstNumber === "0") {
      // Ex: 50 -> 0.5
      const percentValue = Number(currentNumber) / 100;
      setCurrentNumber(String(percentValue));
      setDisplayValue(String(Number(currentNumber)) + "%");
      return;
    }

    const percentOfFirst = (Number(firstNumber) * Number(currentNumber)) / 100;
    setCurrentNumber(String(percentOfFirst));
    setDisplayValue(String(percentOfFirst));
  };
  const handleEquals = () => {
    if (firstNumber !== "0" && operation !== "" && currentNumber !== "0") {
      if (operation === "%") {
        const percentOfFirst =
          (Number(firstNumber) * Number(currentNumber)) / 100;
        setCurrentNumber(String(percentOfFirst));
        setFirstNumber("0");
        setOperation("");
        setDisplayValue(null);
        return;
      }

      const result = calculate(firstNumber, currentNumber, operation);
      setCurrentNumber(String(result));
      setFirstNumber("0");
      setOperation("");
      setDisplayValue(null);
    }
  };

  return (
    <Container>
      <Content>
        <Input value={currentNumber} display={displayValue} />
        <Row>
          <Button
            label="%"
            onClick={handlePercNumbers}
            active={activeKey === "%"}
          />
          <Button
            label="CE"
            onClick={handleOnClear}
            active={activeKey === "CE" || activeKey === "C"}
          />
          <Button
            label="C"
            onClick={handleOnClear}
            active={activeKey === "C"}
          />
          <Button
            label="÷"
            onClick={() => handleOperator("/")}
            active={activeKey === "/"}
          />
        </Row>
        <Row>
          <Button
            label="7"
            onClick={() => handleAddNumber("7")}
            active={activeKey === "7"}
          />
          <Button
            label="8"
            onClick={() => handleAddNumber("8")}
            active={activeKey === "8"}
          />
          <Button
            label="9"
            onClick={() => handleAddNumber("9")}
            active={activeKey === "9"}
          />
          <Button
            label="x"
            onClick={() => handleOperator("x")}
            active={activeKey === "x"}
          />
        </Row>
        <Row>
          <Button
            label="4"
            onClick={() => handleAddNumber("4")}
            active={activeKey === "4"}
          />
          <Button
            label="5"
            onClick={() => handleAddNumber("5")}
            active={activeKey === "5"}
          />
          <Button
            label="6"
            onClick={() => handleAddNumber("6")}
            active={activeKey === "6"}
          />
          <Button
            label="-"
            onClick={() => handleOperator("-")}
            active={activeKey === "-"}
          />
        </Row>
        <Row>
          <Button
            label="1"
            onClick={() => handleAddNumber("1")}
            active={activeKey === "1"}
          />
          <Button
            label="2"
            onClick={() => handleAddNumber("2")}
            active={activeKey === "2"}
          />
          <Button
            label="3"
            onClick={() => handleAddNumber("3")}
            active={activeKey === "3"}
          />
          <Button
            label="+"
            onClick={() => handleOperator("+")}
            active={activeKey === "+"}
          />
        </Row>
        <Row>
          <Button
            label="+/-"
            onClick={handleToggleSign}
            active={activeKey === "+/-"}
          />
          <Button
            label="0"
            onClick={() => handleAddNumber("0")}
            active={activeKey === "0"}
          />
          <Button
            label=","
            onClick={() => handleAddNumber(",")}
            active={activeKey === ","}
          />
          <Button label="=" onClick={handleEquals} active={activeKey === "="} />
        </Row>
      </Content>
    </Container>
  );
};

export default App;
