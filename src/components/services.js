function fatchImage(searchName, pages) {
  const key = `22386152-abae1819f5d508cdb2a741e4a`
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${pages}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(new Error(`no images on request`))
  })
}
const api = { fatchImage }
export default api
