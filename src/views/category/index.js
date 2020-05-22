import React, { useState } from 'react';
import './Category.css';
import { connect } from 'react-redux';
import { createCategory, updateCategory, deleteCategory } from 'api/category';
import { toastr } from 'react-redux-toastr';
import action from 'store/action';
function Category(props) {
  const { categories, add_category, delete_category, global_loading, update_category } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [theCategory, setTheCategory] = useState({});
  const createNewCategory = () => {
    if (name === '') {
      toastr.warning('Failed', 'Name is required');
      return;
    }
    const data = { ledgerID: 1, name, description };
    global_loading();
    createCategory(data)
      .then((res) => {
        if (res.status === 200) {
          add_category(res.data);
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
    const data = { id };
    deleteCategory(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          delete_category(id);
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
    updateCategory(data)
      .then((res) => {
        console.log(res.status === 200);
        if (res.status === 200) {
          update_category(data);
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
    <div className="main-content">
      {categories.map((category, index) => (
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

export default connect((state) => state.category, { ...action.category, ...action.globalLoading })(
  Category
);
