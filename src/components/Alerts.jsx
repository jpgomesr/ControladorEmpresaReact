function Alerts({ alert, machines, funcionario }) {
   return (
      <ul className="space-y-4">
         {alert &&
            alert
               .filter((alertItem) => {
                  const machine = machines.find(
                     (machine) => machine.id === alertItem.machineId
                  );
                  return (
                     machine &&
                     (machine.idFunc === funcionario || funcionario === 1)
                  );
               })
               .map((alertItem) => {
                  const machine = machines.find(
                     (machine) => machine.id === alertItem.machineId
                  );
                  return (
                     <li
                        key={alertItem.id}
                        className="flex items-center space-x-6 justify-center"
                     >
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg px-4 py-3 rounded-lg w-[70%]">
                           <p className="font-bold text-lg text-gray-800">
                              {alertItem.title}
                           </p>
                           {machine && (
                              <p className="text-gray-600">
                                 Status:{" "}
                                 <span
                                    className={
                                       machine.status === "Ativo"
                                          ? "text-green-600"
                                          : "text-red-600"
                                    }
                                 >
                                    {machine.status}
                                 </span>
                              </p>
                           )}
                           <p className="text-gray-600 font-semibold">
                              Motivo do alerta:
                           </p>
                           {machines.map((machine) => {
                              if (machine.id === alertItem.machineId) {
                                 return machine.infos.map((info) => {
                                    if (info.name === alertItem.nameVar) {
                                       return (
                                          <p className="text-gray-600">
                                             {alertItem.nameVar}:{" "}
                                             {info.baseValue} {alertItem.unit}
                                          </p>
                                       );
                                    }
                                 });
                              }
                           })}
                        </div>
                     </li>
                  );
               })}
      </ul>
   );
}

export default Alerts;
