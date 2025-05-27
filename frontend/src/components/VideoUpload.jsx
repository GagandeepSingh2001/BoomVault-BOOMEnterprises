import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoWallet } from "react-icons/io5";

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [wallet, setWallet] = useState(500); 
  const [purchasedVideos, setPurchasedVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [comments, setComments] = useState({});
  const [newCommentText, setNewCommentText] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/videos");
        const data = await res.json();
        const sorted = data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setVideos(sorted);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const storedComments = localStorage.getItem("videoComments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  const [username] = useState(localStorage.getItem("username"));//getting username from local storage

  const handleCommentSubmit = (videoId) => {
    const text = newCommentText[videoId]?.trim();
    if (!text) return;

    const newComment = {
      username: username || "Anonymous",
      text,
      date: new Date().toISOString(),
    };

    const updatedComments = {
      ...comments,
      [videoId]: [newComment, ...(comments[videoId] || [])],
    };

    setComments(updatedComments);
    setNewCommentText((prev) => ({ ...prev, [videoId]: "" }));
    localStorage.setItem("videoComments", JSON.stringify(updatedComments));
  };

  const handlePurchase = (videoId, price) => {
    if (wallet < price) {
      toast.error("Oops ! Insufficient wallet balance :(");
      return;
    }

    setWallet((prev) => prev - price);
    setPurchasedVideos((prev) => [...prev, videoId]);
    toast.success("Yayy ! Purchase successful !");
  };

  const [authToken] = useState(localStorage.getItem("authToken"));

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <>
      {authToken && (
        <div id="uploads" className="relative">
          <div className="text-6xl opacity-50 uppercase font-bold flex justify-center my-5 pointer-events-none">
            uploaded videos
          </div>
          <div
            title="Available Balance"
            className="fixed top-2 left-2 bg-black/50 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex gap-1 font-bold items-center text-nowrap">
            <IoWallet /> ₹{wallet}
          </div>

          <div className="max-w-2xl mx-auto mt-10 rounded-2xl m-10 p-6 flex flex-col gap-10">
            {videos.slice(0, visibleCount).map((video) => (
              <div
                key={video._id}
                className="bg-black bg-opacity-70 text-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {video.description}
                </p>

                {video.type === "short" && video.filePath && (
                  <video
                    src={`http://localhost:5000/uploads/${video.filePath.replace(
                      /\\/g,
                      "/"
                    )}`}
                    controls
                    autoPlay
                    playsInline
                    muted
                    loop
                    className="w-full rounded"
                  />
                )}

                {video.type === "long" && video.url && (
                  <>
                    <img
                      className="rounded"
                      src="https://i.ytimg.com/vi/eWnZVUXMq8k/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCKdhqYalqlZcdZ71co8VP2_zRtiQ"
                    />
                    {video.price > 0 &&
                    !purchasedVideos.includes(video._id) ? (
                      <button
                        onClick={() =>
                          handlePurchase(video._id, video.price)
                        }
                        className="mt-2 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 font-semibold"
                      >
                        Purchase for ₹{video.price}
                      </button>
                    ) : (
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline mt-2 inline-block"
                      >
                        Watch Long-Form Video
                      </a>
                    )}
                  </>
                )}

                {video.type === "long" && video.price > 0 && (
                  <p className="mt-2 text-green-400 font-semibold">
                    Price: ₹{video.price}
                  </p>
                )}

                <p className="text-xs mt-2 text-gray-500">
                  Uploaded At:{" "}
                  {video.updatedAt
                    ? new Date(video.updatedAt).toLocaleString()
                    : "Unknown"}
                </p>

                {/* Comment Section */}
                <div className="mt-4 border-t border-gray-600 pt-4">
                  <h4 className="text-white font-semibold mb-2">Comments</h4>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {(comments[video._id] || []).map((c, i) => (
                      <div
                        key={i}
                        className="bg-white/5 p-2 rounded text-sm text-white"
                      >
                        <p className="font-semibold">{c.username}</p>
                        <p>{c.text}</p>
                        <p className="text-gray-400 text-xs">
                          {new Date(c.date).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newCommentText[video._id] || ""}
                      onChange={(e) =>
                        setNewCommentText((prev) => ({
                          ...prev,
                          [video._id]: e.target.value,
                        }))
                      }
                      className="flex-1 px-3 py-2 rounded bg-white/10 text-white placeholder-gray-400 border border-gray-500"
                    />
                    <button
                      onClick={() => handleCommentSubmit(video._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {visibleCount < videos.length && (
              <button
                onClick={loadMore}
                className="mx-auto bg-black/40 text-black font-bold px-4 py-2 rounded-full duration-200 shadow-md hover:bg-black/50"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoUpload;