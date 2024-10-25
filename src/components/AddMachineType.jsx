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
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 py-6 rounded-xl flex flex-col items-center justify-center w-[40rem] h-[19rem] shadow-lg">
         <p className="text-white font-bold text-[1.5rem]">
            Criar tipo de máquina
         </p>
         <div className="flex flex-col gap-4 items-center w-full px-4">
            <div className="flex flex-row gap-2">
               <input
                  className="px-3 rounded-lg w-[8rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Nome Variável"
                  value={nameVar}
                  onChange={(e) => setNameVar(e.target.value)}
               />
               <input
                  className="px-3 rounded-lg w-[3.8rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Min"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
               />
               <input
                  className="px-3 rounded-lg w-[3.8rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Max"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
               />
               <input
                  className="px-3 rounded-lg w-[3.8rem] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Un."
                  value={unitValue}
                  onChange={(e) => setUnitValue(e.target.value)}
               />
               <button
                  className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition hover:bg-green-500"
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
                        className="w-full text-white font-semibold flex justify-between items-center"
                     >
                        <p className="bg-slate-800 px-4 py-1 rounded-xl max-w-[90%] flex-nowrap">
                           Nome: {info.name} | Min: {info.min} | Max: {info.max}{" "}
                           | Un. de medida: {info.unit}
                        </p>
                        <button
                           className="bg-red-600 px-2 py-1 rounded-lg transition hover:bg-red-500"
                           onClick={() => handleRemoveVariable(index)}
                        >
                           <Trash2Icon />
                        </button>
                     </li>
                  ))}
               </ul>
            </div>

            <div className="flex flex-row gap-2">
               <input
                  className="px-3 rounded-lg w-26 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Tipo da Máquina"
                  value={nameType}
                  onChange={(e) => setNameType(e.target.value)}
               />
               <button
                  className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition hover:bg-green-500"
                  onClick={createMachineType}
               >
                  Adicionar Tipo de Máquina
               </button>
            </div>
         </div>
      </div>
   );
}

export default AddMachineType;
