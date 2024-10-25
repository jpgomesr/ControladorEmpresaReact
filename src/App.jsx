import { useState, useEffect } from "react";
import "./App.css";
import Machine from "./components/Machine";
import RepairButton from "./components/RepairButton";
import Alerts from "./components/Alerts";
import AddMachine from "./components/AddMachine";
import AddMachineType from "./components/AddMachineType";
import Info from "./components/Info";
import { v4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

function App() {
   const navigate = useNavigate();
   const location = useLocation();
   const query = new URLSearchParams(location.search);
   const idFunc = parseInt(query.get("idfunc"), 10);

   // Singleton

   const [machines, setMachines] = useState(() => {
      const storedMachines = localStorage.getItem("machines");
      try {
         return storedMachines ? JSON.parse(storedMachines) : [];
      } catch (e) {
         console.error("Error parsing machines:", e);
         return [];
      }
   });

   const [repair, setRepair] = useState(() => {
      const storedRepair = localStorage.getItem("repair");
      try {
         return storedRepair ? JSON.parse(storedRepair) : [];
      } catch (e) {
         console.error("Error parsing repair:", e);
         return [];
      }
   });

   const [machineTypes, setMachineTypes] = useState(() => {
      const storedMachineTypes = localStorage.getItem("machineTypes");
      try {
         return storedMachineTypes ? JSON.parse(storedMachineTypes) : [];
      } catch (e) {
         console.error("Error parsing repair:", e);
         return [];
      }
   });

   useEffect(() => {
      localStorage.setItem("machines", JSON.stringify(machines));
   }, [machines]);

   useEffect(() => {
      localStorage.setItem("repair", JSON.stringify(repair));
   }, [repair]);

   useEffect(() => {
      localStorage.setItem("machineTypes", JSON.stringify(machineTypes));
   }, [machineTypes]);

   useEffect(() => {
      async function fetchTasks() {
         const storedData = localStorage.getItem("machines");
         if (storedData) {
            const data = JSON.parse(storedData);
            setMachines(data);
         } else {
            setMachines([]);
         }
      }
      fetchTasks();
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

   useEffect(() => {
      async function fetchTasks() {
         const storedData = localStorage.getItem("machineTypes");
         if (storedData) {
            const data = JSON.parse(storedData);
            setMachineTypes(data);
         } else {
            setMachineTypes([]);
         }
      }
      fetchTasks();
   }, []);

   const [alert, setAlert] = useState([]);
   const [selectedMachineId, setSelectedMachineId] = useState(null);
   const [alertedMachines, setAlertedMachines] = useState(new Set());
   const [isModalAddMachineTypeVisible, setIsModalAddMachineTypeVisible] =
      useState(false);
   const [isModalAddMachineVisible, setModalAddMachineVisible] =
      useState(false);
   const [selectedMachines, setSelectedMachines] = useState([]);

   // Factory

   function onMachineAdd(id, func, name, type) {
      const newMachine = {
         id: id,
         idFunc: parseInt(func),
         name: name,
         status: "Desligada",
         infos: type.variables,
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
         setMachines((prev) =>
            prev.filter((machine) => machine.id !== machineId)
         );
      }
      if (repair && repair.some((repairB) => repairB.id === machineId)) {
         setRepair((prev) =>
            prev.filter((repairB) => repairB.id !== machineId)
         );
      }
      setAlert((prev) => prev.filter((alert) => alert.machineId !== machineId));
   }

   function generateRandomInfos(machineId) {
      setMachines((prevMachines) =>
         prevMachines.map((machine) => {
            if (
               (machine.id === machineId && machine.status === "Ligada") ||
               machine.status === "Atenção"
            ) {
               let newStatus = machine.status;

               const newInfos = machine.infos.map((info) => {
                  const maxDifference = 5;
                  const previousValue = info.baseValue;

                  const adjustedValue = Math.max(
                     info.min,
                     Math.min(
                        info.max,
                        previousValue +
                           (Math.random() > 0.5
                              ? Math.floor(Math.random() * (maxDifference + 1))
                              : -Math.floor(
                                   Math.random() * (maxDifference + 1)
                                ))
                     )
                  );

                  const updatedInfo = {
                     ...info,
                     baseValue: adjustedValue,
                  };

                  if (adjustedValue <= info.min) {
                     newStatus = "Danificada";
                     alertSender(
                        `Máquina ${machine.id}`,
                        "Máquina danificada: valor muito baixo!",
                        machine.id,
                        info.baseValue,
                        info.unit,
                        info.name
                     );
                  } else if (adjustedValue <= info.min * 1.1) {
                     newStatus = "Atenção";
                     alertSender(
                        `Máquina ${machine.id}`,
                        "Atenção necessária: valor próximo ao mínimo!",
                        machine.id,
                        info.baseValue,
                        info.unit,
                        info.name
                     );
                  } else if (adjustedValue >= info.max) {
                     newStatus = "Danificada";
                     alertSender(
                        `Máquina ${machine.id}`,
                        "Máquina danificada: valor muito alto!",
                        machine.id,
                        info.baseValue,
                        info.unit,
                        info.name
                     );
                  } else if (adjustedValue >= info.max * 0.9) {
                     newStatus = "Atenção";
                     alertSender(
                        `Máquina ${machine.id}`,
                        "Atenção necessária: valor próximo ao máximo!",
                        machine.id,
                        info.baseValue,
                        info.unit,
                        info.name
                     );
                  }

                  return updatedInfo;
               });

               return {
                  ...machine,
                  infos: newInfos,
                  status: newStatus,
               };
            }
            return machine;
         })
      );
   }

   // Command

   function turnOnMachine() {
      setMachines((prevSelectedMachines) =>
         prevSelectedMachines.map((machine) => {
            if (
               selectedMachines.some((element) => machine.id == element) &&
               machine.status !== "Danificada"
            ) {
               return { ...machine, status: "Ligada" };
            }
            return machine;
         })
      );
   }

   function turnOffMachine() {
      setMachines((prevSelectedMachines) =>
         prevSelectedMachines.map((machine) => {
            if (
               selectedMachines.some((element) => machine.id == element) &&
               machine.status !== "Danificada"
            ) {
               return { ...machine, status: "Desligada" };
            }
            return machine;
         })
      );
   }

   function repairMachine(machineId) {
      setMachines((prevMachines) =>
         prevMachines.map((machine) => {
            if (machine.id === machineId && machine.status === "Danificada") {
               setAlert((prevAlerts) =>
                  prevAlerts.filter((alert) => alert.machineId !== machineId)
               );

               setAlertedMachines((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(machineId);
                  return newSet;
               });

               const updatedInfos = machine.infos.map((info) => {
                  const averageValue = Math.round((info.min + info.max) / 2);
                  return {
                     ...info,
                     baseValue: averageValue,
                  };
               });

               return {
                  ...machine,
                  status: "Ligada",
                  infos: updatedInfos,
               };
            }
            return machine;
         })
      );
   }

   useEffect(() => {
      const intervalIds = machines
         .map((machine) => {
            if (machine.status === "Ligada" || machine.status === "Atenção") {
               const intervalId = setInterval(() => {
                  generateRandomInfos(machine.id);
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

   function openModalAddMachineType() {
      if (!isModalAddMachineVisible) {
         setIsModalAddMachineTypeVisible(true);
      }
   }

   function closeModalAddMachineType() {
      setIsModalAddMachineTypeVisible(false);
   }

   function openModalAddMachine() {
      if (!isModalAddMachineTypeVisible) {
         setModalAddMachineVisible(true);
      }
   }

   function closeModalAddMachine() {
      setModalAddMachineVisible(false);
   }

   function alertSender(title, description, machineId, info, unit, name) {
      if (!alertedMachines.has(machineId)) {
         const newAlert = {
            id: v4(),
            title,
            description,
            machineId,
            info: info,
            unit: unit,
            nameVar: name,
         };
         setAlert((prevAlerts) => {
            if (prevAlerts.length >= 10) {
               return [...prevAlerts.slice(1), newAlert];
            }
            return [...prevAlerts, newAlert];
         });
         setAlertedMachines((prev) => new Set(prev).add(machineId));
      }
   }

   function clearAlerts() {
      setAlert([]);
      setAlertedMachines(new Set());
   }

   const handleAddMachineTypes = (newMachineTypes) => {
      setMachineTypes((prev) => [...prev, newMachineTypes]);
   };

   const onDeleteMachineType = (typeToDelete) => {
      setMachineTypes((prevTypes) =>
         prevTypes.filter((type) => type.name !== typeToDelete)
      );
   };

   const handleAddTurnMachine = (e) => {
      const newSelected = e.target.value;

      setSelectedMachines((prevSelectedMachines) => {
         if (prevSelectedMachines.includes(newSelected)) {
            return prevSelectedMachines.filter(
               (element) => element !== newSelected
            );
         } else {
            return [...prevSelectedMachines, newSelected];
         }
      });

      console.log(selectedMachines);
   };

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
         <div className="w-full flex flex-row items-center mt-8 justify-center">
            <div className="flex flex-row gap-8">
               <button
                  className="px-2 py-1 bg-blue-500 font-bold rounded-lg text-white"
                  onClick={openModalAddMachineType}
               >
                  Criar tipo de máquina
               </button>
               <button
                  className="px-2 py-1 bg-blue-500 font-bold rounded-lg text-white"
                  onClick={openModalAddMachine}
               >
                  Criar máquina
               </button>
            </div>
            {isModalAddMachineTypeVisible && (
               <div
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[43rem] z-50 bg-white shadow-xl p-6 rounded-lg"
                  datatype="modal"
                  id="modalAddMachineType"
               >
                  <div className="w-full flex flex-col gap-2">
                     <AddMachineType
                        onAddMachineTypes={handleAddMachineTypes}
                     />
                     <div className="w-full flex align-center justify-center">
                        <button
                           className="text-center bg-red-500 font-bold px-2 py-1 rounded-lg"
                           onClick={closeModalAddMachineType}
                        >
                           Fechar
                        </button>
                     </div>
                  </div>
               </div>
            )}
            {isModalAddMachineVisible && (
               <div
                  className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[43rem] z-50 bg-white shadow-xl p-6 rounded-lg"
                  datatype="modal"
                  id="modalAddMachine"
               >
                  <div className="w-full flex flex-col gap-2">
                     <AddMachine
                        machines={machines}
                        onMachineAdd={onMachineAdd}
                        idFunc={idFunc}
                        machineTypes={machineTypes}
                        onDeleteMachineType={onDeleteMachineType}
                     />
                     <div className="w-full flex align-center justify-center">
                        <button
                           className="text-center bg-red-500 font-bold px-2 py-1 rounded-lg"
                           onClick={closeModalAddMachine}
                        >
                           Fechar
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
         <div className="w-full justify-center flex items-center flex-col space-y-8 mt-6">
            <div className="w-[60%] flex flex-wrap gap-8 justify-center">
               <Machine
                  machines={machines}
                  onDeleteMachine={onDeleteMachine}
                  turnOnMachine={turnOnMachine}
                  turnOffMachine={turnOffMachine}
                  openModal={openModal}
                  funcionario={idFunc}
                  handleAddTurnMachine={handleAddTurnMachine}
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
            {machines.length > 0 && (
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
            )}
            <div className="w-[60%] flex flex-col justify-center">
               <div className="flex flex-wrap justify-center items-center gap-6">
                  <RepairButton
                     repair={repair}
                     repairMachine={repairMachine}
                     funcionario={idFunc}
                  />
               </div>
            </div>
            {alert.length > 0 && (
               <div className="w-[40%] flex flex-col items-center">
                  <button
                     onClick={clearAlerts}
                     className="bg-red-700 text-white font-bold py-2 px-4 rounded-xl text-[1.1rem]"
                  >
                     Limpar Alertas
                  </button>
               </div>
            )}
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
