import React from "react";

function CustomerList({
  name,
  address,
  phoneNumber,
  totalAmount,
  dueAmount,
  isPaymentDone,
  updateCustomer,
  deleteCustomer,
  id,
  addOrderHandle
}) {
  return (
    <div onClick={() =>addOrderHandle(id)}>
      <div className="bg-white p-4 mb-4 rounded-md shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-sm text-gray-600">{phoneNumber}</p>
          <p className="text-sm text-gray-600">{totalAmount}</p>
          <p className="text-sm text-gray-600">{dueAmount}</p>
          {isPaymentDone ? <p>PayementDone</p> : <p>payment pending</p>}
        </div>
        <div>
          <button
            onClick={() => updateCustomer(id)}
            className="bg-blue-500 text-white font-semibold py-1 px-3 mr-2 rounded-md focus:outline-none"
          >
            update
          </button>
          {/* onClick={() => deleteTask(index)} */}
          <button
            onClick={() => deleteCustomer(id)}
            className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
