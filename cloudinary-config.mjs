import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'dypg1icpd',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
