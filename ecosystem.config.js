module.exports = {
  apps: [{
    name: 'nodejsloadtest',
    script: './server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-34-209-17-82.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/aws-tutorial.pem',
      ref: 'origin/master',
      repo: 'git@github.com:toastman/nodejsloadtest.git',
      path: '/home/ubuntu/nodejsloadtest',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}