import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import PopUp from "../components/PopUpCards";
import Loader from "../components/Loader";
import BaseLayout from "../components/BaseLayout";

export default function Home() {
  const { REACT_APP_YOUTUBE_API_KEY } = process.env;
  const [loader, setLoader] = useState(true);
  const [videoItems, setVideoItems] = useState([]);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?key=${REACT_APP_YOUTUBE_API_KEY}&channelId=UC24MOAmQKzWK5-6DyUaa8Aw&part=snippet,id&order=date&maxResults=100`
      )
      .then((res) => {
        const videoitems = res.data.items;
        setVideoItems(videoitems);
        setLoader(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : videoItems.length > 0 ? (
        <BaseLayout>
          <div
            className={`${
              videoId ? "d-md-flex" : "d-none"
            } justify-content-center`}
          >
            <iframe
              id="youtubeLive"
              title="Youtube Live Stream"
              className="col-12 col-md-10 pb-3 px-md-3 iframe-height"
              src={videoId}
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>

          <section className="mt-md-5 row justify-content-center">
            {videoItems.map((video, id) => {
              return (
                <PopUp
                  key={id}
                  src={video.snippet.thumbnails.high.url}
                  title={video.snippet.title}
                  customClickEvent={() => {
                    window.scrollTo(0, 0);
                    setVideoId(
                      `https://www.youtube.com/embed/${video.contentDetails.videoId}`
                    );
                  }}
                />
              );
            })}
          </section>

          {/* <Marquee
            direction="left"
            speed={50}
            gradient
            gradientWidth={0}
            gradientColor={[31, 31, 31]}
          >
            {videoItems.map((videos, id) => (
              <button
                key={id}
                onClick={() => {
                  window.scrollTo(0, 0);
                  setVideoId(
                    `https://www.youtube.com/embed/${videos.contentDetails.videoId}`
                  );
                }}
              >
                <PopUp
                  src={videos.snippet.thumbnails.high.url}
                  title={videos.snippet.title}
                />
              </button>
            ))}
          </Marquee> */}
        </BaseLayout>
      ) : (
        <h1>No Data</h1>
      )}
    </>
  );
}
