function RepairButton({ repair, repairMachine }) {
  if (!Array.isArray(repair)) {
    return <div>Repair is not an array</div>;
  }

  return (
    <>
      {repair.map((repairB) => (
        <button
          onClick={() => repairMachine(repairB.id)}
          className="shadow-lg bg-blue-500 py-1 px-2 rounded-lg text-white font-bold hover:scale-110 hover:transition-transform"
        >
          Reparar Maquina {repairB.nome}
        </button>
      ))}
    </>
  );
}

export default RepairButton;
