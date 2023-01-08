export default function fetchImage(value, page = 1) {
  const apiUrl = 'https://pixabay.com/api/';
  const apiKey = '31213831-079e96808e6f65bd38889e682';

  return fetch(`${apiUrl}?key=${apiKey}&q=${value}&image_type=photo&orientation=horizontal&
    safesearch=true&page=${page}&per_page=12`);
}
