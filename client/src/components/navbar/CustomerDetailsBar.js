import React from "react";

function CustomerDetailsBar({name, address, phoneNumber, totalAmount, totalDueAmount, handleOnPrint}) {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">{name}</div>
          <ul className="flex space-x-4">
            <li className="text-white">
              
                {address}
              
            </li>
            <li className="text-white">
                {phoneNumber}
            </li>
            <li className="text-white">
             
                {totalAmount}
              
            </li>
            <li className="text-white">
              
               {totalDueAmount}
              
            </li>
            <li>
                <button onClick={handleOnPrint} className="bg-green-700 text-white rounded px-3 py-1">Print</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default CustomerDetailsBar;
