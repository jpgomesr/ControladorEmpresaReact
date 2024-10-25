function RepairButton({ repair, repairMachine, funcionario }) {
   return (
      <>
         {repair &&
            repair
               .filter(
                  (repairB) =>
                     funcionario == "1" ||
                     repairB.idFunc == parseInt(funcionario, 10)
               )
               .map((repairB) => (
                  <button
                     key={repairB.id}
                     onClick={() => repairMachine(repairB.id)}
                     className="bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg py-2 px-4 rounded-lg text-white font-bold transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                  >
                     Reparar Máquina {repairB.id}
                  </button>
               ))}
      </>
   );
}

export default RepairButton;
