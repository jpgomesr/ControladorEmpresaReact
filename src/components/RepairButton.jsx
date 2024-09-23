function RepairButton({ repair, repairMachine, funcionario }) {
  return (
    <>
      {repair &&
        repair
          .filter(
            (repairB) =>
              funcionario == "1" || repairB.idFunc === parseInt(funcionario, 10)
          )
          .map((repairB) => (
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
