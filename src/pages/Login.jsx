import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [idFuncionario, setIdFuncionario] = useState("");

  function onSeeDetailsClick() {
    navigate(`/machine?idfunc=${idFuncionario}`);
  }

  return (
    <div className="bg-blue-950 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center w-[20rem] h-[20rem] bg-gray-500 rounded-xl space-y-8">
        <p className="font-bold text-[2rem]">Login</p>
        <input
          value={idFuncionario}
          onChange={(e) => setIdFuncionario(e.target.value)}
          className="rounded-xl py-1 px-2 text-[1.2rem]"
          type="number"
          placeholder="Id funcionário"
        />
        <button
          className="bg-white px-2 py-1 rounded-xl font-bold text-[1.2rem]"
          onClick={onSeeDetailsClick}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
