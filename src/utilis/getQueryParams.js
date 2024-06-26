export default function getQueryParams(key, url) {
  if (!url) return '';
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
