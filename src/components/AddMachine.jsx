import { useState } from "react";

function AddMachine({ onMachineAdd, machines, idFunc }) {
  const [func, setFunc] = useState("");
  const [id, setId] = useState("");

  const handleAddMachine = () => {
    if (!func.trim() || !id.trim()) {
      return alert("Preencha o id da máquina e do funcionário!");
    }

    if (func <= 0 || id <= 0) {
      return alert("Valores inválidos!");
    }

    const exists = machines.some((machine) => machine.id === parseInt(id, 10));
    if (exists) {
      return alert(`Máquina com id ${id} já existente!`);
    }

    const parsedId = parseInt(id, 10);
    const parsedIdFunc = parseInt(func, 10);

    if (parsedIdFunc === parseInt(idFunc, 10) || parseInt(idFunc, 10) === 1) {
      onMachineAdd(parsedId, func);
      setId("");
      setFunc("");
    } else {
      return alert("Só pode adicionar máquinas para seu usuário!");
    }
  };

  return (
    <div className="bg-gray-700 py-6 px-4 rounded-xl flex flex-col gap-3 items-center justify-center w-[30%]">
      <p className="text-white font-bold text-[1.3rem]">Criar Máquina</p>
      <div className="flex flex-row gap-4">
        <input
          className="px-2 rounded-lg w-24"
          value={id}
          onChange={(event) => setId(event.target.value)}
          type="number"
          placeholder="Id Máquina"
        />
        <input
          className="px-2 rounded-lg w-24"
          value={func}
          onChange={(event) => setFunc(event.target.value)}
          type="number"
          placeholder="Id Funcionário"
        />
        <button
          onClick={handleAddMachine}
          className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg"
        >
          Adicionar Máquina
        </button>
      </div>
    </div>
  );
}

export default AddMachine;
