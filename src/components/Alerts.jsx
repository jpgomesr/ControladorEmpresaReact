import { ChevronRight } from "lucide-react";

function Alerts({ alert }) {
  return (
    <>
      <ul className="space-y-4">
        {alert &&
          alert.map((alerts) => (
            <li key={alert.id} className="flex items-center space-x-6">
              <div className="bg-yellow-300 px-3 py-2 rounded-lg w-full">
                <p className="font-bold text-[1.1rem]">{alerts.title}</p>
              </div>
              <div className="bg-yellow-300 px-3 py-2 rounded-lg flex items-center hover:transition-transform hover:scale-110 cursor-pointer">
                <button className="p-0 m-0">
                  <ChevronRight />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Alerts;
