import { useState, useEffect } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Modal from "../Modal/Modal";
import s from "./ImageGallery.module.css";
import imageApi from "../services";

export default function ImageGallery({ searchbar }) {
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [modaleUrl, setModaleUrl] = useState("");
  const [modaleAlt, setModaleAlt] = useState("");

  useEffect(() => {
    setData([]);
  }, [searchbar]);

  useEffect(() => {
    setStatus("pending");
    if (searchbar.trim() === "") {
      setStatus("idle");
      return;
    }

    imageApi
      .fatchImage(searchbar, page)
      .then((images) => {
        if (images.total === 0) {
          setError("No any picture");
          setStatus("rejected");
          return;
        } else {
          setData((prevState) => [...prevState, ...images.hits]);
          setStatus("resolved");
        }
      })
      .then(() => {
        if (page === 1) {
          return;
        }
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setError(error), setStatus("rejected"));
  }, [page, searchbar]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const modalOpen = (modaleUrl, modaleAlt) => {
    window.addEventListener("keydown", cleanEventListener);
    setModaleUrl(modaleUrl);
    setModaleAlt(modaleAlt);
  };
  const modalClose = () => {
    window.removeEventListener("keydown", cleanEventListener);
    setModaleUrl("");
    setModaleAlt("");
  };

  const cleanEventListener = (e) => {
    if (e.code === "Escape") {
      modalClose();
    }
  };

  if (status === "idle") {
    return <p>Enter the name of the picture</p>;
  }

  if (status === "pending") {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }

  if (status === "resolved") {
    return (
      <ul className={s.ImageGallery}>
        {data.map((image) => {
          return (
            <ImageGalleryItem
              key={image.id}
              tags={image.tags}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              modalOpen={modalOpen}
            />
          );
        })}
        <Button onClick={loadMore} />
        {modaleUrl && (
          <Modal
            largeImageURL={modaleUrl}
            alt={modaleAlt}
            onClick={modalClose}
          />
        )}
      </ul>
    );
  }
  if (status === "rejected") {
    return <p>{error}</p>;
  }
}
