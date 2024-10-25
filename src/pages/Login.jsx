import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();
   const [idFuncionario, setIdFuncionario] = useState("");
   const [error, setError] = useState("");

   function onSeeDetailsClick() {
      if (idFuncionario.trim() === "") {
         setError("Id funcionário está vazio!");
         return;
      }
      const idNum = Number(idFuncionario);
      if (idNum <= 0 || isNaN(idNum)) {
         setError("Id inválido!");
         return;
      }
      navigate(`/machine?idfunc=${idNum}`);
   }

   return (
      <div className="bg-gradient-to-r from-blue-900 to-blue-600 w-screen h-screen flex justify-center items-center">
         <div className="flex flex-col items-center justify-center w-[20rem] h-[20rem] bg-white rounded-xl shadow-lg p-6 space-y-6">
            <p className="font-bold text-[2rem] text-gray-800">Login</p>
            <input
               value={idFuncionario}
               onChange={(e) => {
                  setIdFuncionario(e.target.value);
                  setError("");
               }}
               className="rounded-xl border border-gray-300 py-2 px-3 text-[1.2rem] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
               type="number"
               placeholder="Id funcionário"
            />
            {error && (
               <p className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded-xl">
                  {error}
               </p>
            )}
            <button
               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-[1.2rem] transition"
               onClick={onSeeDetailsClick}
            >
               Entrar
            </button>
         </div>
      </div>
   );
}

export default Login;
