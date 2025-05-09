import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './CreateTopic.css';

const CreateTopic = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*');

    if (error) {
      console.error('Error fetching categories:', error);
      alert('獲取分類列表時發生錯誤');
    } else {
      setCategories(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('title')
      .insert([
        {
          title: title,
          category_id: categoryId,
          vote: 0
        }
      ]);

    setLoading(false);

    if (error) {
      console.error('Error creating topic:', error);
      alert('創建主題時發生錯誤');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="create-topic-container">
      <h1>創建新主題</h1>
      <form onSubmit={handleSubmit} className="create-topic-form">
        <div className="form-group">
          <label htmlFor="title">主題名稱</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">選擇分類</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">請選擇分類</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '創建中...' : '創建主題'}
        </button>
      </form>
    </div>
  );
};

export default CreateTopic; 