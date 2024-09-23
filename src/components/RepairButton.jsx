function RepairButton({ repair, repairMachine }) {
  return (
    <>
      {repair.map((repairB) => (
        <button
          onClick={() => repairMachine(repairB.id)}
          className="shadow-lg bg-blue-500 py-1 px-2 rounded-lg text-white font-bold hover:scale-110 hover:transition-transform"
        >
          Reparar Maquina {repairB.id}
        </button>
      ))}
    </>
  );
}

export default RepairButton;
