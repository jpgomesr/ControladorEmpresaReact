function Alerts({ alert, machines, funcionario }) {
  return (
    <>
      <ul className="space-y-4">
        {alert &&
          alert
            .filter((alertItem) => {
              const machine = machines.find(
                (machine) => machine.id === alertItem.machineId
              );
              console.log("Filtered Machine: ", machine);
              return (
                machine && (machine.idFunc == funcionario || funcionario == 1)
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
                  <div className="bg-yellow-300 px-3 py-2 rounded-lg w-[70%]">
                    <p className="font-bold text-[1.1rem]">{alertItem.title}</p>
                    {machine && (
                      <p className="text-gray-700">Status: {machine.status}</p>
                    )}
                    <p className="text-gray-700 font-bold">Movivo do alerta:</p>
                    {machines.map((machine) => {
                      if (machine.id === alertItem.machineId) {
                        return machine.infos.map((info) => {
                          if (info.name == alertItem.nameVar) {
                            return (
                              <p className="text-gray-700">
                                {alertItem.nameVar}: {info.baseValue}{" "}
                                {alertItem.unit}
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
    </>
  );
}

export default Alerts;
