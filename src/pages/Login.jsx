import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  function onSeeDetailsClick(fun) {
    const query = new URLSearchParams();
    navigate(`/idfunc?idfunc=${fun}`);
  }

  const [employees, setEmployees] = useState([
    {
      id: 1,
      nome: "João",
    },
  ]);

  return (
    <>
      <button onClick={() => onSeeDetailsClick("1")}>teste</button>
    </>
  );
}

export default Login;
