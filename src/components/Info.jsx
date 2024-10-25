import { CircleX } from "lucide-react";

function Info({ machines, machineId, closeModal }) {
   const machine = machines.find((m) => m.id === machineId);

   return (
      <>
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-700 to-blue-500 w-[36rem] h-[36rem] rounded-lg shadow-lg opacity-95 p-6">
            <div className="flex flex-col space-y-10 items-center text-white">
               <div className="w-full flex justify-between items-center font-bold text-[2rem]">
                  <button
                     className="flex justify-center items-center cursor-pointer hover:transition-transform hover:scale-125 hover:bg-blue-600 rounded-full p-2"
                     onClick={closeModal}
                  >
                     <CircleX />
                  </button>
                  <div className="flex justify-center w-full">
                     <h1>Máquina {machine ? machine.id : "Não encontrada"}</h1>
                  </div>
               </div>
               <div className="flex flex-col items-start w-full space-y-6 px-8">
                  {machine ? (
                     <>
                        <p className="text-[1.5rem] font-semibold">
                           Tipo: {machine.name}
                        </p>
                        <p className="text-[1.5rem] font-semibold">
                           Status:{" "}
                           <span className="text-white">{machine.status}</span>
                        </p>

                        <div className="flex flex-col gap-2">
                           <p className="text-[1.5rem] font-semibold">
                              Informações:
                           </p>
                           <div className="space-y-1"> 
                              {machine.infos &&
                                 machine.infos.map((info, index) => (
                                    <p
                                       key={index}
                                       className="text-[1.5rem] font-semibold"
                                    >
                                       {info.name}:{" "}
                                       <span className="text-blue-300">
                                          {info.baseValue} {info.unit}
                                       </span>
                                    </p>
                                 ))}
                           </div>
                        </div>
                        <p className="text-[1.5rem] font-semibold">
                           Id funcionário responsável: {machine.idFunc}
                        </p>
                     </>
                  ) : (
                     <p className="text-xl">Máquina não encontrada.</p>
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default Info;
