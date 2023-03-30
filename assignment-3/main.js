/* DOM manipulation */
const lightBox = document.querySelector('.lightbox');
const imagesList = document.querySelector('.images');
const loadMoreBtn = document.querySelector('.load-more');
const searchInput = document.querySelector('.search-box input');
const closeLightboxBtn = document.querySelector('.uil-times');
const downloadImageBtn = document.querySelector('.uil-import');

/* constants */
const apiKey = 'oOIJvbxdiYmdoTnDAqV6kDobZVZnAWjpH8VflU2m61bo6rcekoyuiLC7';
const perPage = 15;

let currentPage = 1;
let searchText = null;

/* when a image is clicked a lightbox will appear on the screen */
const showLightbox = (name, imgUrl) => {
  lightBox.querySelector('img').src = imgUrl;
  lightBox.querySelector('span').innerHTML = name;
  downloadImageBtn.setAttribute('data-img', imgUrl);
  lightBox.classList.add('show');
  document.body.style.overflow = 'hidden';
};

/* close overlay and the lightbox modal */
const closeOverlayAndLightbox = () => {
  lightBox.classList.remove('show');
  document.body.style.overflow = 'auto';
};

/* download the selected image */
const downloadImage = (imgUrl) => {
  fetch(imgUrl)
    .then((res) => res.blob())
    .then((file) => {
      //   console.log(file);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => console.log('Failed to download!'));
};

/* generating images dynamically */
const generateHTML = (photos) => {
  photos
    .map(
      (img) =>
        /* making a list of all fetched images and injecting into the DOM */
        (imagesList.innerHTML += `<li onclick="showLightbox('${img.photographer}', '${img.src.original}')" class="card">
          <img src="${img.src.original}" alt="${img.photographer}" />
          <div class="details">
            <div class="photographer">
              <i class="uil uil-camera"></i>
              <span>${img.photographer}</span>
            </div>
            <button onclick="downloadImage('${img.src.original}');event.stopPropagation();">
              <i class="uil uil-import"></i>
            </button>
          </div>
        </li>`)
    )
    .join('');
};

/* fethcing images from the api */
const fetchImages = (url) => {
  loadMoreBtn.innerHTML = 'Loading...';
  loadMoreBtn.classList.add('disabled');

  fetch(url, {
    headers: { Authorization: apiKey },
  })
    .then((res) => res.json())
    .then(({ photos }) => {
      //   console.log(photos);
      generateHTML(photos);
      loadMoreBtn.innerHTML = 'Load More';
      loadMoreBtn.classList.remove('disabled');
    })
    .catch((err) => console.log('Error: ', err.message));
};

fetchImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`
);

/* event listener for loading more images */
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  let url = `https://api.pexels.com/v1/curated?page=${currentPage}per_page=${perPage}`;
  url = searchText
    ? `https://api.pexels.com/v1/search?query=${searchText}&page=${currentPage}&per_page=${perPage}`
    : url;

  fetchImages(url);
});

searchInput.addEventListener('keyup', (e) => {
  // if user searches with empty text
  if (e.target.value === '') {
    return (searchText = null);
  }

  /* if Enter key is pressed, the current page will be updated with images typed in a search box */
  if (e.key === 'Enter') {
    currentPage = 1;
    searchText = e.target.value;
    imagesList.innerHTML = '';
    fetchImages(
      `https://api.pexels.com/v1/search?query=${searchText}&page=${currentPage}&per_page=${perPage}`
    );
  }
});

/* close lightbox when overlay is clicked */
lightBox.addEventListener('click', closeOverlayAndLightbox);

/* close lightbox when close button is clicked */
closeLightboxBtn.addEventListener('click', closeOverlayAndLightbox);

/* when lighbox download button is clicked */
downloadImageBtn.addEventListener('click', (e) =>
  downloadImage(e.target.dataset.img)
);
