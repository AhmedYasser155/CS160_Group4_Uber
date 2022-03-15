/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = {
  env: {
    MONGO_URI: "mongodb+srv://user1:1234@uberclone.znxsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  },
  nextConfig
}
