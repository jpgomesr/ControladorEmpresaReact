import { useState, useEffect } from "react";
import "./App.css";
import Machine from "./components/Machine";
import RepairButton from "./components/RepairButton";
import Alerts from "./components/Alerts";
import AddMachine from "./components/AddMachine";
import Info from "./components/Info";

function App() {
  const [machines, setMachines] = useState([
    {
      id: 1,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
    {
      id: 2,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
    {
      id: 3,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
    {
      id: 4,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
    {
      id: 5,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
    {
      id: 6,
      idFunc: 1,
      temp: 50,
      humy: 50,
      status: "Desligada",
    },
  ]);
  const [repair, setRepair] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
  ]);
  const [alert, setAlert] = useState([
    {
      id: 1,
      title: "Teste",
      description: "teste",
    },
  ]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  function onMachineAdd(id, func) {
    const newMachine = {
      id: id,
      idFunc: func,
      temp: 50,
      humy: 50,
      status: "Desligada",
    };
    const newButton = {
      id: id,
    };
    setMachines([...machines, newMachine]);
    setRepair([...repair, newButton]);
  }

  function onDeleteMachine(machineId) {
    if (machines.some((machine) => machine.id === machineId)) {
      setMachines(machines.filter((machine) => machine.id !== machineId));
    }
    if (repair.some((repairB) => repairB.id === machineId)) {
      setRepair(repair.filter((repairB) => repairB.id !== machineId));
    }
  }

  function generateRandomTempAndHumy(machineId) {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => {
        if (machine.id === machineId && machine.status === "Ligada") {
          const variation = 10;

          const newTemp = Math.max(
            0,
            Math.min(
              100,
              machine.temp +
                Math.floor(Math.random() * (variation * 2 + 1)) -
                variation
            )
          );
          const newHumy = Math.max(
            0,
            Math.min(
              100,
              machine.humy +
                Math.floor(Math.random() * (variation * 2 + 1)) -
                variation
            )
          );

          let newStatus = machine.status;
          if (newTemp > 80 || newHumy > 90) {
            newStatus = "Danificada";
          } else if (newTemp > 70 || newHumy > 70) {
            newStatus = "Atenção";
          }

          return {
            ...machine,
            temp: newTemp,
            humy: newHumy,
            status: newStatus,
          };
        }
        return machine;
      })
    );
  }

  function turnOnMachine() {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => ({
        ...machine,
        status: "Ligada",
      }))
    );
  }

  function turnOffMachine() {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => ({
        ...machine,
        status: "Desligada",
        temp: 50,
        humy: 50,
      }))
    );
  }

  function repairMachine(machineId) {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => {
        if (machine.id === machineId && machine.status === "Danificada") {
          return {
            ...machine,
            status: "Ligada",
            temp: 50,
            humy: 50,
          };
        }
        return machine;
      })
    );
  }

  useEffect(() => {
    console.log(machines);
    const intervalIds = machines
      .map((machine) => {
        if (machine.status === "Ligada" || machine.status === "Atenção") {
          const intervalId = setInterval(() => {
            generateRandomTempAndHumy(machine.id);
          }, 1000);
          return { id: machine.id, intervalId };
        }
        return null;
      })
      .filter(Boolean);

    return () => {
      intervalIds.forEach(({ intervalId }) => {
        clearInterval(intervalId);
      });
    };
  }, [machines]);

  function openModal(machineId) {
    setSelectedMachineId(machineId);
    const elemento = document.getElementById("modal");
    elemento.style.display = "flex";
  }

  function closeModal(machineId) {
    const elemento = document.getElementById("modal");
    elemento.style.display = "none";
  }

  return (
    <>
      <header className="bg-gray-600 flex items-center justify-center py-6">
        <p className="text-white font-bold text-3xl">Gerenciador de Maquinas</p>
      </header>
      <div className="w-full flex justify-center mt-4">
        <AddMachine machines={machines} onMachineAdd={onMachineAdd} />
      </div>
      <div className="w-full justify-center flex items-center flex-col space-y-8 mt-6">
        <div className="w-[40%] flex flex-wrap gap-8 justify-center">
          <Machine
            machines={machines}
            onDeleteMachine={onDeleteMachine}
            turnOnMachine={turnOnMachine}
            turnOffMachine={turnOffMachine}
            openModal={openModal}
          />
        </div>
      </div>
      <div datatype="modal" id="modal" className="hidden">
        <Info
          machines={machines}
          machineId={selectedMachineId}
          closeModal={closeModal}
        />
      </div>
      <div className="w-full justify-center flex items-center flex-col space-y-8 mt-6">
        <div className="space-x-4">
          <button
            onClick={turnOnMachine}
            className="bg-green-500 px-2 py-1 font-bold rounded-lg hover:transition-transform hover:scale-110 shadow-lg"
          >
            Iniciar Maquinas
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              turnOffMachine();
            }}
            className="bg-red-500 px-2 py-1 font-bold rounded-lg hover:transition-transform hover:scale-110 shadow-lg"
          >
            Desligar Maquinas
          </button>
        </div>
        <div className="w-[40%] flex flex-col justify-center">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <RepairButton repair={repair} repairMachine={repairMachine} />
          </div>
        </div>
      </div>
      <footer className="flex flex-row w-full py-6 justify-center items-center">
        <div className="flex flex-col w-[50%] py-3 px-1 space-y-2">
          <Alerts alert={alert} />
        </div>
      </footer>
    </>
  );
}

export default App;
