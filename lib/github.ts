const username = process.env.GITHUB_USER;

async function githubapi(){
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    if (!res.ok){
      throw new Error('Failed to fetch github api');
    }
    return res.json();
  }
export default githubapi 

