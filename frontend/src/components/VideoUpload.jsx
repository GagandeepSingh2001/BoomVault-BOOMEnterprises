import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IoWallet } from "react-icons/io5";

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [wallet, setWallet] = useState(500); // Default ₹500
  const [purchasedVideos, setPurchasedVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

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
      {/* Component Visible only if logged in */}
      {authToken && (
        <div id="uploads" className="relative">
          <div className="text-6xl opacity-50 uppercase font-bold flex justify-center my-5 pointer-events-none">uploaded videos</div>
          {/* Wallet */}
          <div
            title="Available Balance"
            className="fixed top-2 left-2 bg-black/50 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex gap-1 font-bold items-center text-nowrap"
          >
            <IoWallet /> ₹{wallet}
          </div>

          {/* Unified Feed */}
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

                {/* Short form video */}
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

                {/* Long-Form Video */}
                {video.type === "long" && video.url && (
                  <>
                    {/* thumbnail */}
                      <img className="rounded" src="https://i.ytimg.com/vi/eWnZVUXMq8k/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCKdhqYalqlZcdZ71co8VP2_zRtiQ"></img>
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
              </div>
            ))}

            {/* Load More Button */}
            {visibleCount < videos.length && (
              <button
                onClick={loadMore}
                className="mx-auto bg-black/40 text-black font-bold px-4 py-2 rounded-full duration-200 shadow-md hover:bg-black/50">
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