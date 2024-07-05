async function unsplash(){
  const res = await fetch(`https://api.unsplash.com/search/photos?page=5&query=${process.env.UNSPLASH_QUERY}&orientation=landscape&client_id=${process.env.UNSPLASH_API}`)
  if (!res.ok){
    throw new Error('Failed to fetch mdl api');
  }
  return res.json();
}
export default unsplash
