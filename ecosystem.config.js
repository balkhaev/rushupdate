module.exports = {
  apps: [
    {
      name: "bbc-frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: "max",
      env: {
        NODE_ENV: "production",
        PORT: 8000,
      },
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
