
import { createData } from './data.js';

const DATA_SIZE = 25;
const pictures = createData(DATA_SIZE);

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

for (const {id, url, likes, comments} of pictures) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');
  const pictureLikesElement = pictureElement.querySelector('.picture__likes');
  const pictureCommentsElement = pictureElement.querySelector('.picture__comments');

  pictureElement.href = `#${id}`;
  pictureImgElement.src = url;
  pictureLikesElement.textContent = likes;
  pictureCommentsElement.textContent = comments.length;

}


// id: 21, url: 'photos/21.jpg', description: 'Qui fugiat nulla nisi exercitation mollit exercita…Quis incididunt enim officia qui reprehenderit.\r\n', likes: 186, comments: Array(1)}
