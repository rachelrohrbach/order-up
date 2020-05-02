import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/index';
import Container from 'react-bootstrap/Container';
import DropDownInput from '../../components/DropDownInput/index';
import TableComponent from '../../components/Table/index';
import { AddButton, SubmitButton } from '../../components/Buttons/index';
import Collapse from 'react-bootstrap/Collapse';
import FControl from '../../components/TextInput/FormGroup';
import API from '../../utils/menuAPI';

function Menu() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [addItem, setAddItem] = useState({});

  useEffect(() => {
    loadMenu();
  }, []);

  function loadMenu() {
    API.getMenu()
      .then((res) => {
        console.log(res);
        const menu = res.data.map((item) => {
          return {
            id: item._id,
            category: item.category,
            name: item.name,
            price: item.price,
            description: item.description,
            pairing: item.pairing,
            prepareTime: item.prepareTime,
            itemCount: item.itemCount
          };
        });
        const filteredMenu = [...menu];
        setMenu(menu);
        setFilteredMenu(filteredMenu);
      })
      .catch((err) => console.error(err));
  }

  function handleInputChange(event) {
    const inputText = event.target.value;
    setFilteredMenu(
      menu.filter((item) => {
        const words = item.name.split(' ');
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
  function updateItemState(newItem) {
    setAddItem({
      ...addItem,
      ...newItem
    });
  }
  function handleAddItemSubmit(event) {
    event.preventDefault();
    if (
      addItem.category &&
      addItem.name &&
      addItem.price &&
      addItem.description &&
      addItem.pairing &&
      addItem.prepareTime &&
      addItem.itemCount
    ) {
      API.addMenuItem(addItem).then(loadMenu());
      setOpen(!open);
      var p = document.createElement('p');
      p.innerHTML = 'Item successfully added';
      document.getElementById('buttonsDiv').appendChild(p);
    } else {
      var p = document.createElement('p');
      p.innerHTML =
        'Please fill all fields with appropriate input to submit menu item';
      document.getElementById('buttonsDiv').appendChild(p);
    }
  }

  return (
    <div>
      <h1 className='d-flex justify-content-center display-4 text-white mt-5'>
        Menu
      </h1>
      <Container className='mb-3 mt-5'>
        <SearchBar
          placeholder='Search employees'
          className='col-12 rounded-sm'
          onChange={handleInputChange}
        />
      </Container>
      <div id='buttonsDiv' className='d-flex row justify-content-center'>
        <div className='m-1'>
          <DropDownInput className='d-flex justify-content-center'>
            Sort by category
          </DropDownInput>
        </div>
        <div className='m-1'>
          <AddButton
            onClick={() => setOpen(!open)}
            aria-controls='example-collapse-text'
            aria-expanded={open}
          />
        </div>
      </div>
      <div className='d-flex justify-content-center mt-5'>
        <Collapse in={open}>
          <div className='w-50'>
            <FControl
              onChange={(event) => {
                updateItemState({ category: event.target.value });
              }}
              placeholder='Food or Beverage'
              className='m-2'
            />
            <FControl
              onChange={(event) => {
                updateItemState({ name: event.target.value });
              }}
              placeholder='Item Name'
              className='m-2'
            />
            <FControl
              onChange={(event) => {
                updateItemState({ price: event.target.value });
              }}
              placeholder='Item Price'
              className='m-2'
            />
            <FControl
              onChange={(event) => {
                updateItemState({ description: event.target.value });
              }}
              placeholder='Item Description'
              className='m-2'
            />
            <FControl
              onChange={(event) => {
                updateItemState({ pairing: event.target.value });
              }}
              placeholder='Item Pairings'
              className='m-2'
            />
            <FControl
              onChange={(event) => {
                updateItemState({ prepareTime: event.target.value });
              }}
              placeholder='Item Prepare Time'
              className='m-2'
            />

            <div className='d-flex justify-content-center mt-5'>
              <SubmitButton
                onClick={handleAddItemSubmit}
                className='d-flex align-self-center'
              />
            </div>
          </div>
        </Collapse>
      </div>
      <Container className='d-flex justify-content-center mt-5'>
        <TableComponent className='text-white'>
          <thead>
            <TableComponent.TR>
              <TableComponent.TH>Item</TableComponent.TH>
              <TableComponent.TH>Category</TableComponent.TH>
              <TableComponent.TH>Price</TableComponent.TH>
              <TableComponent.TH>Item Pairing</TableComponent.TH>
              <TableComponent.TH>Prep Time</TableComponent.TH>
              <TableComponent.TH>Item Count</TableComponent.TH>
            </TableComponent.TR>
          </thead>
          <tbody>
            {filteredMenu.map((item) => (
              <TableComponent.TR key={item.id}>
                <TableComponent.TD>{item.name}</TableComponent.TD>
                <TableComponent.TD>{item.category}</TableComponent.TD>
                <TableComponent.TD>{item.price}</TableComponent.TD>
                <TableComponent.TD>{item.pairing}</TableComponent.TD>
                <TableComponent.TD>{item.prepareTime}</TableComponent.TD>
                <TableComponent.TD>{item.itemCount}</TableComponent.TD>
              </TableComponent.TR>
            ))}
          </tbody>
        </TableComponent>
      </Container>
    </div>
  );
}
export default Menu;
