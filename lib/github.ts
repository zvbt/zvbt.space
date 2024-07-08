const username = process.env.GITHUB_USER;
const token = process.env.GITHUB_TOKEN;

async function githubapi() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub API');
  }

  return res.json();
}

export default githubapi;
