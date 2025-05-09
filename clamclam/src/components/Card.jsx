// components/Card.jsx
import './Card.css';

const TopicCard = ({ topic, onVote, hasVoted }) => {
  return (
    <div className="topic-card">
      <div className="topic-content">
        <h3 className="topic-title">{topic.title}</h3>
        <div className="vote-section">
          <span className="vote-count">{topic.vote} 票</span>
          <button
            className={`vote-button ${hasVoted ? 'voted' : ''}`}
            onClick={() => onVote(topic.id, topic.vote)}
            disabled={hasVoted}
          >
            {hasVoted ? '已投票' : '投票'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
  