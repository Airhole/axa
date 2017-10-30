'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let config = {
  NODE_ENV: '"development"'
}
const argv = JSON.parse(process.env.npm_config_argv).original
const mock = argv.find(a => a === '--mock')

if (mock) {
  config.MOCK = '"mock"'
}

module.exports = merge(prodEnv, config)
