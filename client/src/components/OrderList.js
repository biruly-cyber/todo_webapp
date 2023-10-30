import React from 'react'

function OrderList({itemName, itemQty, itemPrice, itemUnit, itemTotalAmt, id, updateItemDetails,deleteItemDetails}) {
    
  return (
    <div>
         <div className="bg-white p-4 mb-4 rounded-md shadow-md flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{itemName}</h3>
          <p className="text-sm text-gray-600">{itemPrice}</p>
          <p className="text-sm text-gray-600">{itemQty}</p>
          <p className="text-sm text-gray-600">{itemUnit}</p>
          <p className="text-sm text-gray-600">{itemTotalAmt}</p>
        </div>
        <div>
          <button
            onClick={() => updateItemDetails(id)}
            className="bg-blue-500 text-white font-semibold py-1 px-3 mr-2 rounded-md focus:outline-none"
          >
            update
          </button>
          {/* onClick={() => deleteTask(index)} */}
          <button
            onClick={() => deleteItemDetails(id)}
            className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderList