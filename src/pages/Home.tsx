/* eslint-disable @typescript-eslint/no-explicit-any */
import Student from "../components/Student";
import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
     const [counter, setCounter] = useState<number>(0);
  const [userName, setUserName] = useState<string>("");

  function increase() {
    const newCount = counter + 1;
    setCounter(newCount);
  }

  function reset() {
    setCounter(0);
    setUserName("");
  }

  function decrease() {
    const newCount = counter - 1;
    setCounter(newCount);
  }

  function handleUserName(event : any) {
    setUserName(event.target.value);
  }

  return (
    <>
      <nav className="navbar bg-blue-500 p-4 text-white text-2xl font-bold">
        <Link className="mr-4 border-2 border-white p-2" to="/">
          Home
        </Link>
        <Link className="mr-4 border-2 border-white p-2" to="/categories">
          Categories
        </Link>
        <Link className="mr-4 border-2 border-white p-2" to="/product">
          Product
        </Link>
      </nav>
      
      <h1 className="text-4xl font-bold underline mb-5 mt-5 text-blue-500">
        Home
      </h1>

      <h1 className="mt-5">Welcome {userName} !!!</h1>

      <div>
        <h4>Login by using your username !!</h4>
        <input
          type="text"
          onChange={handleUserName}
          placeholder="Enter User Name"
        />
      </div>
      <h1>{counter}</h1>

      <button onClick={increase}>Increase Count</button>
      <br />
      <br />
      <button onClick={decrease}>Decrease Count</button>
      <br />
      <br />
      <button onClick={reset}>Reset</button>

      <Student name="Avishka" age={10} />
      <Student name="Gihan" age={23} />
    </>
  );

    }

    export default Home