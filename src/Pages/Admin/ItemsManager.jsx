import React, { useState, useEffect } from 'react';
import { menuData } from '../../data/menuData';

function ItemsManager() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'burgers',
    description: '',
    image: '',
    available: true,
    tags: []
  });

  useEffect(() => {
    // Load all items from menuData
    const allItems = Object.values(menuData).flat();
    setItems(allItems);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...formData, id: item.id } : item
      ));
    } else {
      // Add new item
      const newItem = {
        ...formData,
        id: Date.now(),
        rating: 4.5,
        price: parseFloat(formData.price)
      };
      setItems([...items, newItem]);
    }
    
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'burgers',
      description: '',
      image: '',
      available: true,
      tags: []
    });
    setEditingItem(null);
    setShowModal(false);
  };

  return (
    <div className="items-manager">
      <div className="manager-header">
        <h1>Items Manager</h1>
        <button onClick={() => setShowModal(true)} className="add-btn">
          + Add New Item
        </button>
      </div>

      <div className="items-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} className="item-thumb" />
                </td>
                <td>{item.name}</td>
                <td>{item.category || 'N/A'}</td>
                <td>₹{item.price}</td>
                <td>
                  <button 
                    className={`toggle-btn ${item.available !== false ? 'active' : 'inactive'}`}
                    onClick={() => toggleAvailability(item.id)}
                  >
                    {item.available !== false ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option value="burgers">Burgers</option>
                    <option value="pizzas">Pizzas</option>
                    <option value="wraps">Wraps</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="image-preview" />
                )}
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                  />
                  Available
                </label>
              </div>

              <div className="modal-actions">
                <button type="submit" className="save-btn">
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={resetForm} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsManager;
