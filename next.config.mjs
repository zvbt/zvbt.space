/** @type {import('next').NextConfig} */


const hostnames = [
    'r2.e-z.host',
    's4.anilist.co',
    'i.scdn.co',
    'cdn.discordapp.com',
    'i.mydramalist.com',
    'images.unsplash.com',
    'ddragon.leagueoflegends.com']
    
const nextConfig = {

    images: {
        remotePatterns: hostnames.map(hostname => ({
            protocol: 'https',
            hostname
        }))
      },
};

export default nextConfig;
