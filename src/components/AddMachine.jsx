import { useState } from "react";

function AddMachine({ onMachineAdd, machines }) {
  const [func, setFunc] = useState("");
  const [id, setId] = useState("");

  return (
    <>
      <div className="bg-gray-700 py-6 px-4 rounded-xl flex flex-col gap-3 items-center justify-center w-[30%]">
        <p className="text-white font-bold text-[1.3rem]">Criar Maquina</p>
        <div className="flex flex-row gap-4">
          <input
            className="px-2 rounded-lg w-24"
            value={id}
            onChange={(event) => setId(event.target.value)}
            type="number"
            placeholder="Id Maquina"
          />
          <input
            className="px-2 rounded-lg w-24"
            value={func}
            onChange={(event) => setFunc(event.target.value)}
            type="number"
            placeholder="Id Funcionário"
          />
          <button
            onClick={() => {
              if (!func.trim() || !id.trim()) {
                return alert("Preencha o id da maquina e do funcionário!");
              }
              const exists = machines.some((machine) => machine.id == id);
              if (exists) {
                return alert(`Maquina com id ${id} já existente!`);
              }
              onMachineAdd(id, func);
              setId("");
              setFunc("");
            }}
            className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg"
          >
            Adicionar maquina
          </button>
        </div>
      </div>
    </>
  );
}

export default AddMachine;
