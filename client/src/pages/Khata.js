import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "..";
import CustomerList from "../components/CustomerList";
import { useNavigate } from "react-router-dom";

function Khata() {
    const navigation  = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const [customerList, setCustomerList] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [id, setId] = useState("");

  //handle for create entry on db
  const handleOnNewCustomer = async (e) => {
    e.preventDefault();

    console.log(name, address, phoneNumber);

    try {
      const data = await axios.post(
        `${server}/sell/newbuyer`,
        {
          name,
          address,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //update customer
  const updateCustomer = async (id) => {
    alert(id);

    //find the customer id
    const foundCustomer = customerList.find((customer) => customer._id === id);

    if (foundCustomer) {
      console.log("Customer found:", foundCustomer);
      setName(foundCustomer.name);
      setAddress(foundCustomer.address);
      setPhoneNumber(foundCustomer.phoneNumber);
      setIsUpdate(true);
      setId(id);
    } else {
      console.log("Customer not found");
    }
  };

  //final update customer details
  const handleOnUpdateCustomer = async () => {
    try {
      await axios.put(
        `${server}/sell/${id}`,
        {
          name,
          address,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("data added successfully!");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  //delete customer
  const deleteCustomer = async (id) => {
    try {
        const {data}=  await axios.delete(`${server}/sell/${id}`,{
            withCredentials:true
          })
    
          alert(data.message)
          setRefresh(prev=>!prev)   
        } catch (error) {
          console.log(error)
        }
  };


  //add customer item
  const addOrderHandle =(id)=>{
    alert(id)

    //transport the id 
    localStorage.setItem('id', id);
   
    //navigation to add item page
    navigation("/order")
  }

  //show all the customer
  useEffect(() => {
    axios
      .get(`${server}/sell/allbuyer`, {
        withCredentials: true,
      })
      .then((res) => {
        setCustomerList(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  console.log(customerList);

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            {!isUpdate ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOnNewCustomer}
              >
                Create
              </button>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOnUpdateCustomer}
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>

      {/* //customer list */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2">
          {customerList.map((i, index) => (
            <div key={index._id}>
              <CustomerList
                name={i.name}
                address={i.address}
                phoneNumber={i.phoneNumber}
                totalAmount={i.totalAmount}
                dueAmount={i.totalDueAmount}
                isPaymentDone={i.isPaymentDone}
                updateCustomer={updateCustomer}
                deleteCustomer={deleteCustomer}
                addOrderHandle={addOrderHandle}
                id={i._id}
                key={i._id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Khata;
