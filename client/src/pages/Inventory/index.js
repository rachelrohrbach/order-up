import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/index';
import Container from 'react-bootstrap/Container';
import DropDownInput from '../../components/DropDownInput/index';
import DataTable from '../../components/DataTable';
import {
  AddButton
  // SubmitButton,
  // ViewButton,
  // CloseButton
} from '../../components/Buttons/index';
import API from '../../utils/inventoryAPI';
import InputModal from '../../components/InputModal';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [addInventory, setAddInventory] = useState({});
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  // const [showModal, setModalShow] = useState(false);
  // const [modalData, setModalData] = useState([]);
  // const handleModalClose = () => setModalShow(false);
  // const handleModalShow = () => setModalShow(true);

  useEffect(() => {
    loadInventory();
  }, []);

  function loadInventory() {
    API.getInventory()
      .then((res) => {
        const inventory = res.data.map((item) => {
          return {
            id: item._id,
            productName: item.productName,
            vendorName: item.vendorName,
            quantity: item.quantity
          };
        });
        const filteredInventory = [...inventory];
        setInventory(inventory);
        setFilteredInventory(filteredInventory);
      })

      .catch((err) => console.error(err));
  }

  function handleInputChange(event) {
    const inputText = event.target.value;
    setFilteredInventory(
      inventory.filter((item) => {
        const words = item.productName.split(' ');
        let isMatch = false;

        words.forEach((word) => {
          if (word.toLowerCase().startsWith(inputText.toLowerCase())) {
            isMatch = true;
          }
        });

        return isMatch;
      })
    );
  }
  const addToInventory = (event) => {
    const { name, value } = event.target;
    setAddInventory((addInventory) => ({ ...addInventory, [name]: value }));
    console.log(addInventory);
  };
  const newInventoryProductInput = [
    {
      name: `productName`,
      label: `Product Name`,
      text: `Required`,
      type: `text`,
      placeholder: `Enter Product Name`,
      onChange: addToInventory
    },
    {
      name: `quantity`,
      label: `Quantity`,
      text: `Required`,
      type: `number`,
      placeholder: `Enter Quantity`,
      onChange: addToInventory
    },
    {
      name: `vendorName`,
      label: `Vendor Name`,
      text: `Required`,
      type: `text`,
      placeholder: `Enter Vendor Name`,
      onChange: addToInventory
    },
    {
      name: `vendorContactName`,
      label: `Vendor Contact Name`,
      text: `Required`,
      type: `text`,
      placeholder: `Enter Vendor Contact Name`,
      onChange: addToInventory
    },
    {
      name: `vendorPhoneNumber`,
      label: `Vendor Phone Number`,
      text: `Required`,
      type: `text`,
      placeholder: `Enter Vendor Phone Number`,
      onChange: addToInventory
    },
    {
      name: `vendorEmail`,
      label: `Vendor Email Address`,
      text: `Required`,
      type: `text`,
      placeholder: `Enter Vendor Email`,
      onChange: addToInventory
    },
    {
      name: `productCost`,
      label: `Vendor Product Cost`,
      text: `Required`,
      type: `number`,
      placeholder: `Enter Vendor Product Cost`,
      onChange: addToInventory
    }
  ];
  function handleAddProductSubmit(event) {
    event.preventDefault();
    if (
      addInventory.productName &&
      addInventory.quantity &&
      addInventory.vendorName &&
      addInventory.vendorContactName &&
      addInventory.vendorPhoneNumber &&
      addInventory.vendorEmail &&
      addInventory.productCost
    ) {
      API.addInventoryItem(addInventory).then((res) => {
        console.log(`status code: ${res.status}`);
        loadInventory();
        setShowNewProductModal(false);
      });
    } else {
      alert(
        'Please fill in all fields with appropriate input to submit an employee'
      );
    }
  }
  // function handleModalData(event) {
  //   const id = event.target.id;
  //   API.getInventoryItem(id)
  //     .then((res) => {
  //       setModalData([...modalData, res.data]);
  //     })
  //     .then(handleModalShow());
  // }
  // function handleUpdate() {
  //   const item = document.querySelector('#button');
  //   const itemID = item.dataset.id;
  //   const updateValues = {
  //     quantity: document.getElementById('quantity').textContent,
  //     vendorName: document.getElementById('vendorName').textContent,
  //     vendorContactName: document.getElementById('contact').textContent,
  //     vendorPhoneNumber: document.getElementById('phone').textContent,
  //     vendorEmail: document.getElementById('email').textContent,
  //     productCost: document.getElementById('cost').textContent
  //   };
  //   API.updateInventoryItem(itemID, updateValues).then(handleModalClose);
  // }
  const inventoryHeaderArr = [
    { key: `productName`, heading: `Product Name` },
    { key: `vendorName`, heading: `Vendor Name` },
    { key: `quantity`, heading: `Quantity` }
  ];
  return (
    <div>
      <h1 className='d-flex justify-content-center display-4 text-white mt-5'>
        Inventory
      </h1>
      <Container className='mt-5 mb-3'>
        <SearchBar
          className='col-12 rounded-sm'
          placeholder='Search inventory items'
          onChange={handleInputChange}
        />
      </Container>
      <div
        className=' d-flex row justify-content-center align-items-center text-white'
        id='buttonsDiv'
      >
        <div className='m-1'>
          <DropDownInput className='d-flex justify-content-center'>
            Sort by vendor
          </DropDownInput>
        </div>
        <div className='m-1'>
          <AddButton
            onClick={() => setShowNewProductModal(!showNewProductModal)}
            aria-controls='example-collapse-text'
          />
        </div>
      </div>
      <InputModal
        show={showNewProductModal}
        cancel={() => {
          setShowNewProductModal(!showNewProductModal);
        }}
        title={`Add a new Product`}
        submit={handleAddProductSubmit}
        inputs={newInventoryProductInput}
      />
      <Container className='d-flex justify-content-center mt-5'>
        <DataTable
          headingArr={inventoryHeaderArr}
          dataArr={filteredInventory}
        />
      </Container>
    </div>
  );
}
export default Inventory;
