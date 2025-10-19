import React, { useState } from 'react';

function CategoriesManager() {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Burgers', icon: '🍔', itemCount: 8 },
    { id: 2, name: 'Pizzas', icon: '🍕', itemCount: 6 },
    { id: 3, name: 'Wraps', icon: '🌯', itemCount: 5 },
    { id: 4, name: 'Drinks', icon: '🥤', itemCount: 5 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', icon: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...cat, ...formData } : cat
      ));
    } else {
      setCategories([...categories, { ...formData, id: Date.now(), itemCount: 0 }]);
    }
    
    resetForm();
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, icon: category.icon });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure? This will affect all items in this category.')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', icon: '' });
    setEditingCategory(null);
    setShowModal(false);
  };

  return (
    <div className="categories-manager">
      <div className="manager-header">
        <h1>Categories Manager</h1>
        <button onClick={() => setShowModal(true)} className="add-btn">
          + Add Category
        </button>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.itemCount} items</p>
            <div className="category-actions">
              <button onClick={() => handleEdit(category)} className="edit-btn">Edit</button>
              <button onClick={() => handleDelete(category.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content small" onClick={(e) => e.stopPropagation()}>
            <h2>{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Icon (Emoji)</label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🍔"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" onClick={resetForm} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesManager;
