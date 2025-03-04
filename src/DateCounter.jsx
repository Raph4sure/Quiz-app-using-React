import { useState } from "react";

export default function DateCounter() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    const date = new Date("march 17 2021");
    date.setDate(date.getDate() + count);

    const increament = function () {
        setCount((count) => count + step);
    };

    const decreament = function () {
        setCount((count) => count - step);
    };

    const defineStep = function (e) {
        setStep(Number(e.target.value));
    };

    const defineCount = function (e) {
        setCount(Number(e.target.value));
    };

    const reset = function () {
        setCount(0);
        setStep(1);
    };

    return (
        <div className="start">
            <h1>DateCounter</h1>
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={decreament}>-</button>
                <input type="number" value={count} onChange={defineCount} />
                <button onClick={increament}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <button onClick={reset}>Reset</button>
        </div>
    );
}
