import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  modalOpen,
}) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        modalOpen(largeImageURL, tags);
      }}
    >
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
}
