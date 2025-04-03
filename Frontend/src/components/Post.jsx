import React, { useState, useEffect } from "react";
import axios from "axios";
import  Activity  from "../components/Activity";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [activeButtons, setActiveButtons] = useState({});
  const [sharePost, setSharePost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleButtonColor = (postId, buttonType) => {
    setActiveButtons((prevState) => {
      const current = prevState[postId] || {};

      if (buttonType === "like" && current.dislike) {
        return {
          ...prevState,
          [postId]: { like: true, dislike: false },
        };
      }

      if (buttonType === "dislike" && current.like) {
        return {
          ...prevState,
          [postId]: { like: false, dislike: true },
        };
      }

      return {
        ...prevState,
        [postId]: {
          ...current,
          [buttonType]: !current[buttonType],
        },
      };
    });
  };

  const handleComment = (postId) => {
    if (newComment[postId]) {
      setComments({
        ...comments,
        [postId]: [
          ...(comments[postId] || []),
          { text: newComment[postId], user: "Current User" }, // Replace with actual logged-in user
        ],
      });
      setNewComment({ ...newComment, [postId]: "" });
    }
  };

  const openShareModal = (post) => {
    setSharePost(post);
  };

  const closeShareModal = () => {
    setSharePost(null);
  };

  return (
    <div className="container">
      <Activity />
      {posts.map((post) => (
        <div className="card mb-3" key={post._id}>
          <div className="card-body">
            <p className="text-primary">
              <strong>{post.user?.username || "Anonymous"}</strong>
            </p>
              <p className="text-muted">
              Posted on {new Date(post.createdAt).toLocaleString()}
            </p>
            <h5>{post.title}</h5>
            <p>{post.description}</p>
            {post.photo && (
              <img src={post.photo} alt="An image" className="img-fluid mb-3" />
            )}
          
            <div className="d-flex justify-content-start gap-3 mt-3">
              <button
                onClick={() => toggleButtonColor(post._id, "like")}
                className="btn"
                style={{
                  backgroundColor:
                    activeButtons[post._id]?.like ? "skyblue" : "",
                }}
              >
                Like
              </button>
              <button
                onClick={() => toggleButtonColor(post._id, "dislike")}
                className="btn"
                style={{
                  backgroundColor:
                    activeButtons[post._id]?.dislike ? "skyblue" : "",
                }}
              >
                Dislike
              </button>
              <button
                onClick={() => openShareModal(post)}
                className="btn"
                style={{
                  backgroundColor:
                    activeButtons[post._id]?.share ? "aqua" : "",
                }}
              >
                Share
              </button>
              <button
                onClick={() => toggleButtonColor(post._id, "comment")}
                className="btn"
                style={{
                  backgroundColor:
                    activeButtons[post._id]?.comment ? "aqua" : "",
                }}
              >
                Comment
              </button>
            </div>
            {activeButtons[post._id]?.comment && (
              <div className="mt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write a comment..."
                  value={newComment[post._id] || ""}
                  onChange={(e) =>
                    setNewComment({ ...newComment, [post._id]: e.target.value })
                  }
                />
                <button
                  onClick={() => handleComment(post._id)}
                  className="btn btn-outline-primary mt-2"
                >
                  Add Comment
                </button>
                <div className="mt-3">
                  {comments[post._id] &&
                    comments[post._id].map((comment, index) => (
                      <p key={index} className="text-muted mb-1">
                        <strong>{comment.user}:</strong> {comment.text}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {sharePost && (
        <div
          className="modal show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeShareModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>Share this post:</p>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `${sharePost.title}\n${sharePost.description}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success me-2"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `${sharePost.title}\n${sharePost.description}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info me-2"
                >
                  Twitter
                </a>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeShareModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
