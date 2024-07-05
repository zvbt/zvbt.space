/** @type {import('next').NextConfig} */


const hostnames = [
    'api.lanyard.rest',
    'r2.e-z.host',
    'akali.best',
    's4.anilist.co',
    'simkl.net',
    'simkl.in',
    'i.scdn.co',
    'cdn.discordapp.com',
    'i.mydramalist.com',
    'images.unsplash.com']
    
const nextConfig = {

    images: {
        remotePatterns: hostnames.map(hostname => ({
            protocol: 'https',
            hostname
        }))
      },
};

export default nextConfig;
