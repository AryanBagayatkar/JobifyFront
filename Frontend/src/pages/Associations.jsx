import React, { useState, useEffect } from "react";
import { PersonCircle } from "react-bootstrap-icons";

const Associations = () => {
  const users = [
    { id: 1, name: "Aryan Bagayatkar", profession: "Software Engineer" },
    { id: 2, name: "Jane Smith", profession: "Product Manager" },
    { id: 3, name: "Emily Johnson", profession: "UI/UX Designer" },
    { id: 4, name: "Michael Brown", profession: "Data Scientist" },
    { id: 5, name: "Sarah Davis", profession: "Marketing Specialist" },
    { id: 6, name: "James Wilson", profession: "Business Analyst" },
    { id: 7, name: "Laura Martinez", profession: "Web Developer" },
    { id: 8, name: "David Anderson", profession: "DevOps Engineer" },
  ];

  const [connectedUsers, setConnectedUsers] = useState([]);

  // Load connected users from localStorage on component mount
  useEffect(() => {
    const storedConnections = localStorage.getItem("connectedUsers");
    if (storedConnections) {
      setConnectedUsers(JSON.parse(storedConnections));
    }
  }, []);

  // Save connected users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("connectedUsers", JSON.stringify(connectedUsers));
  }, [connectedUsers]);

  const handleConnect = (user) => {
    if (!connectedUsers.some((u) => u.id === user.id)) {
      setConnectedUsers((prev) => [...prev, user]);
    }
  };

  const handleUnfollow = (userId) => {
    setConnectedUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="container mt-5 agh">
      {/* User Cards */}
      <div className="row g-4">
        {users.map((user) => {
          const isConnected = connectedUsers.some((u) => u.id === user.id);
          return (
            <div key={user.id} className="col-md-3">
              <div className="card bg-light text-dark text-center shadow-sm h-100 rounded-50">
                <div className="card-body">
                  <PersonCircle size={70} />
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text text-muted">{user.profession}</p>
                  <button
                    className={`btn ${isConnected ? "btn-secondary" : "btn-primary"}`}
                    disabled={isConnected}
                    onClick={() => handleConnect(user)}
                  >
                    {isConnected ? "Connected" : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connected Friends List */}
      {connectedUsers.length > 0 && (
        <div className="mt-5">
          <h2 className="text-dark">Connected Friends</h2>
          <ul className="list-group mt-3">
            {connectedUsers.map((user) => (
              <li
                key={user.id}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light"
              >
                <span>
                  <PersonCircle size={30} className="me-2" />
                  {user.name} ({user.profession})
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleUnfollow(user.id)}
                >
                  Unfollow
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Associations;
