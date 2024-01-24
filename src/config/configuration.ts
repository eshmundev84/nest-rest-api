export const configuration = () => ({
  appName: process.env.APP_NAME,
  appVersion: process.env.APP_VERSION,
  appPort: parseInt(process.env.APP_PORT) | 3005,
  uploadLocation: process.env.UPLOAD_LOCATION,
  publicLocation: process.env.PUBLIC_LOCATION,
  dbURI: process.env.MONGODB_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpires: parseInt(process.env.JWT_EXPIRATION),
});
