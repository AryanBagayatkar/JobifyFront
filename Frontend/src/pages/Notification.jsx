import React from 'react'

const Notification = () => {
  const notifications = [
    {
      id: 1,
      username: "Suchita Hatmode",
      description: "Liked your post",
    },
    {
      id: 2,
      username: "Jane Smith",
      description: "Commented on your photo",
    },
    {
      id: 3,
      username: "Emily Johnson",
      description: "Shared your post",
    },
    {
      id: 4,
      username: "Michael Brown",
      description: "Followed you",
    },
    {
      id: 5,
      username: "Sarah Wilson",
      description: "Mentioned you in a comment",
    },
    {
      id: 6,
      username: "David Lee",
      description: "Reacted to your post",
    },
    {
      id: 7,
      username: "Sophia Davis",
      description: "Sent you a message",
    },
    {
      id: 8,
      username: "James Martinez",
      description: "Liked your comment",
    },
  ];
  return (
    <div className="container mt-5">
      <div className="list-group">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="list-group-item d-flex align-items-center bg-light text-dark mb-2 rounded border-dark"
          >
            <div>
              <h5 className="mb-1">{notification.username}</h5>
              <p className="mb-0 text-muted">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification
