import React, { useState, useEffect } from 'react';
import './Category.css';
import { connect } from 'react-redux';
import { createCategory, updateCategory, deleteCategory } from 'api/category';
import { toastr } from 'react-redux-toastr';
import action from 'store/action';
function Category(props) {
  const { setReGet, global_loading, ledgerId, ledger } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theCategory, setTheCategory] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (ledger && ledger.categories) {
      setCategories(ledger.categories);
    }
  }, [ledger]);

  const createNewCategory = () => {
    if (name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    const data = { ledgerId, name, description };
    global_loading();
    createCategory(data)
      .then((res) => {
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          setDescription('');

          setName('');
          toastr.success('OK', 'Create Category Successfully');
        } else {
          toastr.warning('Failed', 'Create Category Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const deleteTheCategory = (id) => {
    global_loading();
    const data = { id, ledgerId };
    deleteCategory(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          toastr.success('OK', 'Delete Category Successfully');
        } else {
          toastr.warning('Failed', 'Delete Category Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  const updateTheCategory = () => {
    if (theCategory.name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    global_loading();
    const data = theCategory;
    data.ledgerId = ledgerId;
    updateCategory(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          setReGet((reGet) => reGet + 1);
          setTheCategory({});
          toastr.success('OK', 'Update Category Successfully');
        } else {
          toastr.warning('Failed', 'Update Category Failed');
        }
        global_loading(false);
      })
      .catch((err) => {
        console.log(err);
        global_loading(false);
        toastr.error('Error', 'Error');
      });
  };

  return (
    <div style={{ height: 500, overflowY: 'scroll' }} className="main-content">
      {!!ledger &&
        categories.map((category, index) => (
          <div key={index}>
            <div>
              {category.id}
              <button
                onClick={() => {
                  deleteTheCategory(category.id);
                }}
                style={{ marginLeft: 10 }}
              >
                Delete
              </button>
            </div>
            <br />
            <div style={{ visibility: category.id === theCategory.id ? 'hidden' : 'visible' }}>
              Name: {category.name} <br />
              Description: {category.description}
              <button
                onClick={() => {
                  setTheCategory(category);
                }}
                style={{ marginLeft: 10 }}
              >
                Update
              </button>
            </div>
            <div style={{ visibility: category.id === theCategory.id ? 'visible' : 'hidden' }}>
              <input
                placeholder="Name"
                value={theCategory.name ? theCategory.name : ''}
                onChange={(e) => {
                  setTheCategory({ ...theCategory, name: e.target.value });
                }}
              />
              <input
                placeholder="Description"
                value={theCategory.description ? theCategory.description : ''}
                onChange={(e) => {
                  setTheCategory({ ...theCategory, description: e.target.value });
                }}
              />
              <button onClick={updateTheCategory} style={{ marginLeft: 10 }}>
                Save
              </button>
              <button
                onClick={() => {
                  setTheCategory({});
                }}
                style={{ marginLeft: 5 }}
              >
                Cancel
              </button>
            </div>
            <br />
          </div>
        ))}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <button onClick={createNewCategory}>Create Category</button>
    </div>
  );
}

export default connect(null, action.globalLoading)(Category);
