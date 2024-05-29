module.exports = {
  apps: [
    {
      name: "ru-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
    },
    {
      name: "ru-cron",
      cron_restart: "0 0 * * *",
      script: "app.js",
    },
  ],

  deploy: {
    production: {
      user: "mbalkhaev",
      host: "84.201.142.142",
      ref: "origin/main",
      repo: "git@github.com:balkhaev/rushupdate.git",
      path: "/home/mbalkhaev/sites/rushupdate",
      // "pre-deploy-local": "sh ./bin/copy-envs.sh",
      "post-deploy": "sh ./bin/post-deploy.sh",
      "post-setup": "",
    },
  },
}
