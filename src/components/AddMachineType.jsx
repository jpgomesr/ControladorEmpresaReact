import { useState } from "react";
import { Trash2Icon } from "lucide-react";

function AddMachineType({ onAddMachineTypes }) {
  const [nameVar, setNameVar] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [typeInfos, setTypeInfos] = useState([]);
  const [nameType, setNameType] = useState("");

  const handleAddVariable = () => {
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (!isNaN(min) && !isNaN(max) && min < max) {
      const baseValue = Math.round((min + max) / 2);
      const newVariable = {
        name: nameVar,
        min,
        max,
        unit: unitValue,
        baseValue,
      };

      setTypeInfos((prev) => [...prev, newVariable]);
      setNameVar("");
      setMinValue("");
      setMaxValue("");
      setUnitValue("");
    } else {
      alert("Valores inválidos!");
    }
  };

  const handleRemoveVariable = (index) => {
    setTypeInfos(typeInfos.filter((_, i) => i !== index));
  };

  const createMachineType = () => {
    if (nameType && typeInfos.length > 0) {
      const newMachineType = { name: nameType, variables: typeInfos };
      onAddMachineTypes(newMachineType);
      setNameType("");
      setTypeInfos([]);
    } else {
      alert("Nome da máquina ou variáveis inválidos!");
    }
  };

  return (
    <div className="bg-gray-700 py-6 px-4 rounded-xl flex flex-col gap-3 items-center justify-center w-[40%] h-[19rem]">
      <p className="text-white font-bold text-[1.3rem]">
        Criar tipo de máquina
      </p>
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row gap-2">
          <input
            className="px-2 rounded-lg w-[8rem]"
            type="string"
            placeholder="Nome Variável"
            value={nameVar}
            onChange={(e) => setNameVar(e.target.value)}
          />
          <input
            className="px-2 rounded-lg w-[3.8rem]"
            type="number"
            placeholder="Min"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />
          <input
            className="px-2 rounded-lg w-[3.8rem]"
            type="number"
            placeholder="Max"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />
          <input
            className="px-2 rounded-lg w-[3.8rem]"
            type="text"
            placeholder="Un."
            value={unitValue}
            onChange={(e) => setUnitValue(e.target.value)}
          />
          <button
            className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg"
            onClick={handleAddVariable}
          >
            Adicionar Variável
          </button>
        </div>
        <div className="w-full overflow-x-auto h-[5rem]">
          <ul className="w-full flex flex-col gap-2 px-2 pt-1">
            {typeInfos.map((info, index) => (
              <li
                key={index}
                className="w-full text-white font-semibold flex-row flex justify-between space-x-2"
              >
                <p className="bg-slate-800 px-4 py-1 rounded-xl max-w-[90%] flex-nowrap">
                  Nome: {info.name} | Min: {info.min} | Max: {info.max} | Un. de
                  medida: {info.unit}
                </p>
                <button
                  className="bg-slate-800 px-2 py-1 rounded-xl hover:transition-transform hover:scale-110"
                  onClick={() => handleRemoveVariable(index)}
                >
                  <Trash2Icon />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <input
          className="px-2 rounded-lg w-26"
          type="text"
          placeholder="Tipo da Máquina"
          value={nameType}
          onChange={(e) => setNameType(e.target.value)}
        />
        <button
          className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg"
          onClick={createMachineType}
        >
          Adicionar Tipo de Maquina
        </button>
      </div>
    </div>
  );
}

export default AddMachineType;
