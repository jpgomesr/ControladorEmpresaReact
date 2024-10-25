import { ChevronDown, TrashIcon } from "lucide-react";

function Machine({
   machines,
   onDeleteMachine,
   openModal,
   funcionario,
   handleAddTurnMachine,
}) {
   return (
      <>
         {machines &&
            machines
               .filter(
                  (machine) =>
                     funcionario == "1" ||
                     machine.idFunc === parseInt(funcionario, 10)
               )
               .map((machine) => (
                  <div
                     className="flex flex-col gap-2 border-[1px] px-2 py-1 border-gray-400 shadow-2xl"
                     key={machine.id}
                  >
                     <input
                        type="checkbox"
                        name={machine.id}
                        id={machine.id}
                        value={machine.id}
                        onChange={handleAddTurnMachine}
                     ></input>
                     <label
                        htmlFor={machine.id}
                        className="w-[10rem] h-[9rem] absolute"
                     ></label>
                     <div className="w-[10rem] flex flex-col justify-center items-center h-[10rem] border-[1px] border-gray-300 shadow-lg">
                        <div className="h-full flex items-center flex-col justify-center text-center gap-2">
                           <p>Máquina {machine.id}</p>
                           <p>Status: {machine.status}</p>
                        </div>
                        <div className="flex justify-end items-end pb-2 gap-4">
                           <button className="flex btn hover:transition-transform hover:scale-125">
                              <ChevronDown
                                 onClick={() => openModal(machine.id)}
                              />
                           </button>
                           <button className="flex hover:transition-transform hover:scale-[1.15]">
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
