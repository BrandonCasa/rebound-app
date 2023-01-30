module.exports = {
  apps: [{
    name: "rebound-express",
    script: "./src/server.js",
    watch: ["src"],
    // Delay between restart
    watch_delay: 1000,
    ignore_watch: ["node_modules", "public"],
  }]
}