import { useState, useEffect } from "react";
import "./App.css";
import Machine from "./components/Machine";
import RepairButton from "./components/RepairButton";
import Alerts from "./components/Alerts";
import AddMachine from "./components/AddMachine";
import Info from "./components/Info";
import { v4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const idFunc = parseInt(query.get("idfunc"), 10);

  const [machines, setMachines] = useState(() => {
    const storedMachines = localStorage.getItem("machines");
    return storedMachines ? JSON.parse(storedMachines) : [];
  });

  const [repair, setRepair] = useState(() => {
    const storedRepair = localStorage.getItem("repair");
    return storedRepair ? JSON.parse(storedRepair) : [];
  });

  useEffect(() => {
    localStorage.setItem("machines", JSON.stringify(machines));
  }, [machines]);

  useEffect(() => {
    localStorage.setItem("repair", JSON.stringify(repair));
  }, [repair]);

  useEffect(() => {
    const storedMachines = localStorage.getItem("machines");
    if (storedMachines) {
      setMachines(JSON.parse(storedMachines));
    } else {
      setMachines([]);
    }
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      const storedData = localStorage.getItem("repair");
      if (storedData) {
        const data = JSON.parse(storedData);
        setRepair(data);
      } else {
        setRepair([]);
      }
    }
    fetchTasks();
  }, []);

  const [alert, setAlert] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [alertedMachines, setAlertedMachines] = useState(new Set());

  function onMachineAdd(id, func) {
    const newMachine = {
      id: id,
      idFunc: parseInt(func),
      temp: 50,
      humy: 50,
      status: "Desligada",
    };
    const newButton = {
      id: id,
      idFunc: func,
    };

    setMachines((prev) => {
      const updatedMachines = [...prev, newMachine];
      return updatedMachines.sort((a, b) => a.id - b.id);
    });

    setRepair((prev) => {
      const updatedRepairs = [...prev, newButton];
      return updatedRepairs.sort((a, b) => a.id - b.id);
    });
  }

  function onDeleteMachine(machineId) {
    if (machines && machines.some((machine) => machine.id === machineId)) {
      setMachines((prev) => prev.filter((machine) => machine.id !== machineId));
    }
    if (repair && repair.some((repairB) => repairB.id === machineId)) {
      setRepair((prev) => prev.filter((repairB) => repairB.id !== machineId));
    }
    setAlert((prev) => prev.filter((alert) => alert.machineId !== machineId));
  }

  function generateRandomTempAndHumy(machineId) {
    setMachines((prevMachines) =>
      prevMachines.map((machine) => {
        if (
          (machine.id === machineId && machine.status === "Ligada") ||
          machine.status === "Atenção"
        ) {
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
          if (newTemp > 90 || newHumy > 90) {
            newStatus = "Danificada";
            alertSender(
              `Máquina ${machine.id}`,
              "Máquina danificada!",
              machine.id
            );
          } else if (newTemp > 70 || newHumy > 70) {
            newStatus = "Atenção";
            alertSender(
              `Máquina ${machine.id}`,
              "Atenção necessária!",
              machine.id
            );
          } else {
            newStatus = "Ligada";
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
      prevMachines.map((machine) => {
        return machine.idFunc === idFunc || idFunc == 1
          ? { ...machine, status: "Ligada" }
          : machine;
      })
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
          setAlertedMachines((prev) => {
            const newSet = new Set(prev);
            newSet.delete(machineId);
            return newSet;
          });
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

  function closeModal() {
    const elemento = document.getElementById("modal");
    elemento.style.display = "none";
  }

  function alertSender(title, description, machineId) {
    console.log("Alert sent for machine:", machineId);
    if (!alertedMachines.has(machineId)) {
      const newAlert = { id: v4(), title, description, machineId };
      setAlert((prevAlerts) => {
        if (prevAlerts.length >= 10) {
          return [...prevAlerts.slice(1), newAlert];
        }
        return [...prevAlerts, newAlert];
      });
      setAlertedMachines((prev) => new Set(prev).add(machineId));
    }
  }

  return (
    <>
      <header className="bg-gray-600 flex items-center justify-between py-6 px-8">
        <button className="text-white">
          <ChevronLeftIcon onClick={() => navigate(-1)} />
        </button>
        <div className="w-full flex justify-center">
          <p className="text-white font-bold text-3xl">
            Gerenciador de Maquinas
          </p>
        </div>
      </header>
      <div className="w-full flex justify-center mt-4">
        <AddMachine
          machines={machines}
          onMachineAdd={onMachineAdd}
          idFunc={idFunc}
        />
      </div>
      <div className="w-full justify-center flex items-center flex-col space-y-8 mt-6">
        <div className="w-[40%] flex flex-wrap gap-8 justify-center">
          <Machine
            machines={machines}
            onDeleteMachine={onDeleteMachine}
            turnOnMachine={turnOnMachine}
            turnOffMachine={turnOffMachine}
            openModal={openModal}
            funcionario={idFunc}
          />
        </div>
      </div>
      <div
        datatype="modal"
        id="modal"
        className="hidden fixed top-[50%] left-[50%]"
      >
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
            onClick={turnOffMachine}
            className="bg-red-500 px-2 py-1 font-bold rounded-lg hover:transition-transform hover:scale-110 shadow-lg"
          >
            Desligar Maquinas
          </button>
        </div>
        <div className="w-[40%] flex flex-col justify-center">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <RepairButton
              repair={repair}
              repairMachine={repairMachine}
              funcionario={idFunc}
            />
          </div>
        </div>
      </div>
      <footer className="flex flex-row w-full py-6 justify-center items-center">
        <div className="flex flex-col w-[50%] py-3 px-1">
          <Alerts alert={alert} machines={machines} funcionario={idFunc} />
        </div>
      </footer>
    </>
  );
}

export default App;
