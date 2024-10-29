import { useState, useEffect } from "react";

function MachineSearch({ handleSearchMachines }) {
   const [searchValue, setSearchValue] = useState("");

   useEffect(() => {
      handleSearchMachines(searchValue);
   }, [searchValue, handleSearchMachines]);

   return (
      <div className="flex gap-4">
         <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Id da máquina desejada"
            className="px-3 rounded-lg w-[15rem] py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
      </div>
   );
}

export default MachineSearch;
