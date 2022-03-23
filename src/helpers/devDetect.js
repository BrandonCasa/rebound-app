const development = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export default function isDev() {
  return development;
}
