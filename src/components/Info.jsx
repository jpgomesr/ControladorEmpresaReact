import { CircleX } from "lucide-react";

function Info({ machines, machineId, closeModal }) {
  const machine = machines.find((m) => m.id === machineId);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-[36rem] h-[36rem] rounded-lg opacity-90"></div>
      <div className="w-[36rem] h-[36rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 placeholder-opacity-100">
        <div className="flex flex-col space-y-16 items-center pt-6 text-white opacity-100">
          <div className="w-full px-8 flex justify-between items-center font-bold text-[2rem]">
            <button className="flex justify-center items-center cursor-pointer">
              <CircleX onClick={closeModal} />
            </button>
            <div className="flex justify-center w-full">
              <h1>Maquina {machine ? machine.id : "Não encontrada"}</h1>
            </div>
          </div>
          <div className="flex flex-col items-start w-full ml-[12rem] space-y-16">
            {machine ? (
              <>
                <p className="text-[1.2rem] font-semibold">
                  Status: {machine.status}
                </p>
                <p className="text-[1.2rem] font-semibold">
                  Temperatura: {machine.temp}
                </p>
                <p className="text-[1.2rem] font-semibold">
                  Umidade: {machine.humy}
                </p>
              </>
            ) : (
              <p>Máquina não encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Info;
