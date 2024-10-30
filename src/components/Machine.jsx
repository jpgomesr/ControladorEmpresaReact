import { ChevronDown, TrashIcon } from "lucide-react";

function Machine({
   machines,
   onDeleteMachine,
   openModal,
   funcionario,
   handleAddTurnMachine,
   searchValue,
   selectedMachines,
}) {
   const filteredMachines = machines.filter((machine) => {
      const isFuncionarioMatch =
         funcionario == 1 || machine.idFunc === parseInt(funcionario, 10);
      const isSearchMatch =
         !searchValue || machine.id.toString() === searchValue;

      return isFuncionarioMatch && isSearchMatch;
   });

   return (
      <>
         {filteredMachines.map((machine) => (
            <div
               className="flex flex-col gap-2 border rounded-lg p-3 border-gray-400 shadow-lg transition-transform hover:shadow-xl w-[12rem] h-[12rem] relative"
               key={machine.id}
            >
               <input
                  type="checkbox"
                  name={machine.id}
                  id={machine.id}
                  value={machine.id}
                  checked={selectedMachines.includes(machine.id.toString())}
                  onChange={handleAddTurnMachine}
                  className="absolute top-2 left-2"
               />
               <div className="flex flex-col justify-center items-center border border-gray-300 shadow-md rounded-lg bg-white h-full p-2">
                  <p className="text-lg font-semibold">Máquina {machine.id}</p>
                  <p className="text-md text-gray-700">
                     Status: {machine.status}
                  </p>
                  <div className="flex justify-center items-center gap-4 mt-2">
                     <button className="text-blue-500 hover:scale-110 transition-transform">
                        <ChevronDown onClick={() => openModal(machine.id)} />
                     </button>
                     <button className="text-red-500 hover:scale-110 transition-transform">
                        <TrashIcon
                           onClick={() => onDeleteMachine(machine.id)}
                        />
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </>
   );
}

export default Machine;
