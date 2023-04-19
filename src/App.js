import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';
import './App.css';

function App() {
  const [output, setInput ] = useState("399,981");
  const [ theme, setTheme ] = useState(() => {
    const savedMode = localStorage.getItem('theme');
    return savedMode !== null ? JSON.parse(savedMode) : 1;
  });
  
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

    const lastChar = output[output.length - 1]; 

    const resetInput = (num, symbol) => {
      if ((lastChar === '+' || lastChar === '-' || lastChar === 'x' || lastChar === '.' || lastChar === '/') && (symbol === '+' || symbol === '-' || symbol === 'x' || symbol === '.' || symbol === '/')) {
        return;
      }else if((output === "399.981" || output === "0") && symbol === ""){
        setInput(num.toString());
      }else if(symbol === ""){
        setInput(output.toString() + num.toString());
      }else if(symbol !== ""){
        setInput(output.toString() + symbol.toString());
      }
    }

    const calcul = () => {
      const expression = output.replace(/x/g, "*").replace(/,/g, ".");
      const numDecimals = expression.split('.')[1]?.length || 0;
      const result = math.evaluate(expression);
      setInput(parseFloat(result.toFixed(numDecimals)).toString());
    }

    const del = () => {
        if(output.length === 1){
          setInput("0");
        }else {
          setInput(output.slice(0, -1))
        }
    }

    const switchTheme = () => {
      if(theme !== 3){
        setTheme(theme + 1); 
      }else {
        setTheme(1);
      }
    }

  return (
    <div className={theme === 1 ? "App blue-background" : theme === 2 ? "App nd-theme-back" : theme === 3 ? "App third-theme-back" : "App"}>
      <div className="wrapper">
        <div className="top">
          <h1>calc</h1>
          <div className={theme === 1 ? "theme-change-wrapper f-theme" : theme === 2 ? "theme-change-wrapper s-theme" : theme === 3 ? "theme-change-wrapper t-theme" : null}>
            <div className="label">
              <p>1</p>
              <p>2</p>
              <p>3</p>
            </div>
            <div className="title-switcher">
              <p className="title">theme</p>
            <div className={theme === 1 ? "switcher calculator-back" : theme === 2 ? " switcher nd-calculator-back center" : theme === 3 ? "switcher third-screen-back right" : null}>
              <div className={theme === 1 ? "round red-orange" : theme === 2 ? "round orange" : theme === 3 ? "round cyan" : "round"} onClick={() => switchTheme()}></div>
            </div>
            </div>

          </div>
        </div>
        <div className={theme === 1 ? "calculator-result result-back" : theme === 2 ? "calculator-result nd-screen-back" : theme === 3 ? "calculator-result third-screen-back" : null}>
          <h1 className={output.length >= 16 && output.length < 22 ? "minus" : output.length >= 22 && output.length < 27 ? "minus-t" : output.length >= 27 ? "overflow" : "output"}>{output}</h1>
        </div>
        <div className={theme === 1 ? "calculator calculator-back" : theme === 2 ? "calculator nd-calculator-back" : theme === 3 ? "calculator third-screen-back" : null}>
          <div className={theme === 1 ? "all-cases cases" : theme === 2 ? "all-cases nd-cases" : theme === 3 ? "all-cases third-cases" : null}>
          <div className="case" onClick={() => resetInput(7, "")}>7</div>
            <div className="case" onClick={() => resetInput(8, "")}>8</div>
            <div className="case" onClick={() => resetInput(9, "")}>9</div>
            <div className="del" onClick={() => del()}>Del</div>
            <div className="case" onClick={() => resetInput(4, "")}>4</div>
            <div className="case" onClick={() => resetInput(5, "")}>5</div>
            <div className="case" onClick={() => resetInput(6, "")}>6</div>
            <div className="case" onClick={() => resetInput(0, "+")}>+</div>
            <div className="case" onClick={() => resetInput(1, "")}>1</div>
            <div className="case" onClick={() => resetInput(2, "")}>2</div>
            <div className="case" onClick={() => resetInput(3, "")}>3</div>
            <div className="case" onClick={() => resetInput(0, "-")}>-</div>
            <div className="case" onClick={() => resetInput(0, ".")}>.</div>
            <div className="case" onClick={() => resetInput(0, "")}>0</div>
            <div className="case" onClick={() => resetInput(0, "/")}>/</div>
            <div className="case lower" onClick={() => resetInput(0, "x")}>x</div>
          </div>
          <div className={theme === 1 ? "reset-equal f-reset-equal" : theme === 2 ? "reset-equal s-reset-equal" : theme === 3 ? "reset-equal t-reset-equal" : null}>
            <div className="reset" onClick={() => setInput("0")}>Reset</div>
            <div className="equal" onClick={() => calcul()}>=</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
