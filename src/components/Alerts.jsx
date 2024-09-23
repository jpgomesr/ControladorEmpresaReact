import { ChevronRight } from "lucide-react";

function Alerts({ alert }) {
  return (
    <>
      <ul className="space-y-4">
        {alert &&
          alert.map((alerts) => (
            <li
              key={alert.id}
              className="flex items-center space-x-6 justify-center"
            >
              <div className="bg-yellow-300 px-3 py-2 rounded-lg w-[70%]">
                <p className="font-bold text-[1.1rem]">{alerts.title}</p>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}

export default Alerts;
