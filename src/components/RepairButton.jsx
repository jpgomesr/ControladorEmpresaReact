function RepairButton({ repair, repairMachine, funcionario, searchValue }) {
   const filteredMachinesButton = repair.filter((repairItem) => {
      const isFuncionarioMatch =
         funcionario === 1 || repairItem.idFunc == parseInt(funcionario, 10);
      const isSearchMatch =
         !searchValue || repairItem.id.toString() === searchValue;

      return isFuncionarioMatch && isSearchMatch;
   });

   return (
      <>
         {filteredMachinesButton.map((repairItem) => (
            <button
               key={repairItem.id}
               onClick={() => repairMachine(repairItem.id)}
               className="bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg py-2 px-4 rounded-lg text-white font-bold transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
               Reparar Máquina {repairItem.id}
            </button>
         ))}
      </>
   );
}

export default RepairButton;
