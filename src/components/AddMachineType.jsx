function AddMachineType() {
  return (
    <>
      <div className="bg-gray-700 py-6 px-4 rounded-xl flex flex-col gap-3 items-center justify-center w-[30%]">
        <p className="text-white font-bold text-[1.3rem]">
          Criar tipo de máquina
        </p>
        <div className="flex flex-row gap-4">
          <input
            className="px-2 rounded-lg w-24"
            type="number"
            placeholder="Id Máquina"
          />
          <input
            className="px-2 rounded-lg w-24"
            type="number"
            placeholder="Id Funcionário"
          />
          <button className="bg-blue-800 text-white font-semibold px-3 py-1 rounded-lg">
            Adicionar Máquina
          </button>
        </div>
      </div>
    </>
  );
}

export default AddMachineType;
