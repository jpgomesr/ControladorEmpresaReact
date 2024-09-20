import { ChevronDown, TrashIcon } from "lucide-react";

function Machine({ machines, onDeleteMachine }) {
  return (
    <>
      {machines &&
        machines.map((machine) => (
          <div
            key={machine.machineId}
            className="w-[10rem] flex flex-col justify-center items-center h-[10rem] border-[1px] border-gray-300 shadow-lg"
          >
            <div className="h-full flex items center flex-col justify-center text-center gap-2">
              <p>Maquina {machine.nome}</p>
              <p>{machine.status}</p>
            </div>
            <div className="flex justify-end items-end pb-2 gap-4">
              <button className="flex">
                <ChevronDown />
              </button>
              <button className="flex">
                <TrashIcon onClick={() => onDeleteMachine(machine.id)} />
              </button>
            </div>
          </div>
        ))}
    </>
  );
}

export default Machine;
