// App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopicCard from './components/Card';
import Navigation from './components/Navigation';
import CreateTopic from './components/CreateTopic';
import { supabase } from './client';
import './App.css';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [votedTopics, setVotedTopics] = useState(() => {
    const saved = localStorage.getItem('votedTopics');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('votedTopics', JSON.stringify(votedTopics));
  }, [votedTopics]);

  const fetchData = async () => {
    const { data: categoriesData, error: catErr } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });

    if (catErr) {
      console.error('Category fetch error:', catErr);
      setLoading(false);
      return;
    }

    const { data: topicsData, error: topicErr } = await supabase
      .from('title')
      .select('*')
      .order('id', { ascending: true });

    if (topicErr) {
      console.error('Topic fetch error:', topicErr);
      setLoading(false);
      return;
    }

    const categoriesWithTopics = categoriesData.map((cat) => ({
      ...cat,
      topics: topicsData
        .filter((t) => t.category_id === cat.id)
        .sort((a, b) => a.id - b.id)
    }));

    setCategories(categoriesWithTopics);
    setLoading(false);
  };

  const handleVote = async (topicId, currentVote) => {
    if (votedTopics.includes(topicId)) {
      alert('您已經為這個主題投過票了！');
      return;
    }

    const { error } = await supabase
      .from('title')
      .update({ vote: currentVote + 1 })
      .eq('id', topicId);

    if (error) {
      console.error('Vote error:', error);
      alert('投票時發生錯誤');
    } else {
      setVotedTopics([...votedTopics, topicId]);
      fetchData();
    }
  };

  if (loading) return <div className="loading-container">Loading...</div>;

  return (
    <div className="content-container">
      <h1 className="page-title">請投票！想了解哪些蛤蜊影片主題？</h1>
      <p className="page-description"></p>
      {categories.map((category) => (
        <div key={category.id} className="category-section">
          <h2 className="category-title">{category.title}</h2>
          <div className="topics-grid">
            {category.topics.map((topic) => (
              <TopicCard 
                key={topic.id} 
                topic={topic} 
                onVote={handleVote}
                hasVoted={votedTopics.includes(topic.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-topic" element={<CreateTopic />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;