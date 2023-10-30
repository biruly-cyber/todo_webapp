import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "..";
import OrderList from "../components/OrderList";
import AddItems from "../components/items/AddItems";
import CustomerDetailsBar from "../components/navbar/CustomerDetailsBar";

function Order() {
  const [itemsList, setItemsList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQty, setItemQty] = useState(0);
  const [itemUnit, setItemUnit] = useState("");

  const [itemId, setItemId] = useState("");
  const [isUpdate, setIsUpdate] = useState("");

  const [refresh, setRefresh] = useState(false);

  const [customerDetails, setCustomerDetails] = useState([]);
  const [cusTotalAmount, setCusTotalAmount] = useState([]);

  // Retrieve the ID from local storage
  const id = localStorage.getItem("id");

  //add items
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(itemName, itemPrice, itemQty, itemUnit);

    try {
      const data = await axios.post(
        `${server}/item/${id}`,
        {
          itemName,
          itemPrice,
          itemQty,
          itemUnit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setRefresh(true);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id) => {
    // Update logic using the ID
    console.log("Update ID:", id);
    //find the customer id
    const foundItem = itemsList.find((item) => item._id === id);

    if (foundItem) {
      console.log("Customer found:", foundItem);
      setItemName(foundItem.itemName);
      setItemPrice(foundItem.itemPrice);
      setItemQty(foundItem.itemQty);
      setItemUnit(foundItem.itemUnit);
      setIsUpdate(true);
      setItemId(id);
    } else {
      console.log("Customer not found");
    }
  };

  //hsndle on finale update
  const handleOnUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${server}/item/${itemId}`,
        {
          itemName,
          itemPrice,
          itemQty,
          itemUnit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("data update successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("Delete ID:", id);

    try {
      const { data } = await axios.delete(`${server}/item/${id}`, {
        withCredentials: true,
      });

      alert(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = () => {
    const printContent = itemsList.map((item, index)=> (
        `<tr>
          <td>${index+1}</td>
          <td>${item.itemName}</td>
          <td>${item.itemPrice}</td>
          <td>${item.itemQty}</td>
          <td>${item.itemTotalAmt}</td>
        </tr>`
      ));
      const itemsToPrint = printContent.join('');
  
      const printWindow = window.open('', '_blank');
      printWindow.document.write(
        `<html>
          <head>
            <title>Print Item List</title>
            <style>
            body {
                display: bloack;
                justify-content: center;
                // align-items: center;
                height: 100vh;
                margin: 0;
              }
              
              table {
                margin: auto;
              }
              
              h1 {
                text-align: center;
              }
              .table-header th {
                border-bottom: 1px solid black;
                padding: 5px 20px 5px 20px;
              }
              .table-content {
                text-align:center;
              }
              
            </style>
          </head>
          <body>
            <h1>Item List</h1>
            <table >
              <thead class="table-header">
                <tr>
                  <th>S.no</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody class="table-content">
                ${itemsToPrint}
              </tbody>
            </table>
            <hr/>
          </body>
        </html>`
      );
      printWindow.document.close();
      printWindow.print();
    // Join the items in the itemList array into a string
    // const itemsToPrint = itemsList.map(
    //   (item) =>
    //     ` Name: ${item.itemName}, Price: ${item.itemPrice}, Quantity: ${item.itemQty}, Amount: ${item.itemTotalAmt}`
    // );
    // console.log(itemsToPrint);

    // const printWindow = window.open("", "_blank");
    // printWindow.document.write(
    //     `<html>
    //       <head>
    //         <title>Print Item List</title>
    //       </head>
    //       <body>
    //         <h1>Item List</h1>
    //         <ol>
                
    //           ${itemsToPrint.map(item => `<li>${item}</li>`).join('')}
    //         </ol>
    //       </body>
    //     </html>`
    //   );
    // printWindow.document.close();
    // printWindow.print();

  };

  //load the data of customer
  useEffect(() => {
    axios
      .get(`${server}/item/all/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setItemsList(res.data.items);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  //load customer details
  useEffect(() => {
    axios
      .get(`${server}/sell/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCustomerDetails(res.data.customer);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(customerDetails.name);

  //total order sum
  const totalOrderSum = itemsList.reduce(
    (total, item) => total + item.itemTotalAmt,
    0
  );

  return (
    <div>
      {/* customer navbar  */}

      <CustomerDetailsBar
        name={customerDetails.name}
        address={customerDetails.address}
        phoneNumber={customerDetails.phoneNumber}
        totalAmount={totalOrderSum}
        totalDueAmount={customerDetails.totalDueAmount}
        handleOnPrint={handlePrint}
      />

      {/* customer navbar end */}

      {/* add items  */}
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="item"
            >
              Item Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="item"
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemPrice"
            >
              Item Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="itemPrice"
              type="number"
              placeholder="Enter item price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemQty"
            >
              Item Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="itemQty"
              type="number"
              placeholder="Enter item quantity"
              value={itemQty}
              onChange={(e) => setItemQty(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="itemUnit"
            >
              Item Unit
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="itemUnit"
              type="text"
              placeholder="Enter item unit"
              value={itemUnit}
              onChange={(e) => setItemUnit(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            {!isUpdate ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Item
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOnUpdateItem}
              >
                Update Item
              </button>
            )}
          </div>
        </form>
      </div>
      {/* //end add items  */}

      {/* // show the item list and  */}
      <div className="flex justify-center items-center h-screen">
        {itemsList.map((i, index) => (
          <div key={index._id}>
            <OrderList
              itemName={i.itemName}
              itemPrice={i.itemPrice}
              itemQty={i.itemQty}
              itemTotalAmt={i.itemTotalAmt}
              updateItemDetails={handleUpdate}
              deleteItemDetails={handleDelete}
              id={i._id}
              key={i._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
