import React from 'react';

const Activity = () => {
  const stories = [
    { id: 1, name: 'Your Activity', image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Friend 1', image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Friend 2', image: 'https://via.placeholder.com/100' },
    { id: 4, name: 'Friend 3', image: 'https://via.placeholder.com/100' },
    { id: 5, name: 'Friend 4', image: 'https://via.placeholder.com/100' },
    { id: 6, name: 'Friend 5', image: 'https://via.placeholder.com/100' },
  ];

  return (
    <div className="stories-container">
      <div className="stories-scroll">
        {stories.map((story) => (
          <div key={story.id} className="story text-dark">
            <div className="story-image">
            </div>
            <div className="story-name text-dark">{story.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
