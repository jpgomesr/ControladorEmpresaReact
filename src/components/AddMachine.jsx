import { useState } from "react";

function AddMachine({
  onMachineAdd,
  machines,
  idFunc,
  machineTypes,
  onDeleteMachineType,
}) {
  const [func, setFunc] = useState("");
  const [id, setId] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleAddMachine = () => {
    let nameT = "";

    if (!func.trim() || !id.trim() || !selectedType) {
      return alert(
        "Preencha o id da máquina, do funcionário e selecione o tipo!"
      );
    }

    const realType = (selectedType) => {
      const foundType = machineTypes.find(
        (element) => selectedType === element.name
      );
      if (!foundType) {
        alert("Tipo de máquina não encontrado!");
        return null;
      }
      nameT = foundType.name;
      return foundType;
    };

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
      const machineType = realType(selectedType);
      if (!machineType) {
        return;
      }
      onMachineAdd(parsedId, func, nameT, machineType);
      setId("");
      setFunc("");
      setSelectedType("");
    } else {
      return alert("Só pode adicionar máquinas para seu usuário!");
    }
  };

  const handleDeleteType = () => {
    if (!selectedType) {
      return alert("Selecione um tipo para deletar!");
    }
    onDeleteMachineType(selectedType);
    setSelectedType("");
  };

  return (
    <div className="bg-gray-700 py-6 px-4 rounded-xl flex flex-col gap-3 items-center justify-center w-[40%] h-[19rem]">
      <p className="text-white font-bold text-[1.3rem]">Criar Máquina</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center justify-center">
          <input
            className="px-2 rounded-lg w-[6.88rem] py-2"
            value={id}
            onChange={(event) => setId(event.target.value)}
            type="number"
            placeholder="Id Máquina"
          />
          <input
            className="px-2 rounded-lg w-[6.88rem] py-2"
            value={func}
            onChange={(event) => setFunc(event.target.value)}
            type="number"
            placeholder="Id Funcionário"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="machineType" className="text-white font-bold">
            Tipos de Máquina
          </label>
          <div className="flex flex-row gap-4">
            <select
              name="machineTypes"
              id="types"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="px-2 py-1 rounded-lg"
            >
              <option value="" disabled>
                Selecione um tipo
              </option>
              {machineTypes.map((machine, index) => (
                <option key={index} value={machine.name}>
                  {machine.name}
                </option>
              ))}
            </select>
            <button
              className="flex items-center justify-center bg-red-500 px-2 py-1 rounded-xl font-bold"
              onClick={handleDeleteType}
            >
              Deletar tipo
            </button>
          </div>
        </div>
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
