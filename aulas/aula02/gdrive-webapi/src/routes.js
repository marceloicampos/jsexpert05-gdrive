import { logger } from './logger.js'
import FileHelper from './fileHelper.js'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadFolder = resolve(__dirname, '../', 'downloads')

export default class Routes {
  io
  constructor(downloadsFolder = defaultDownloadFolder) {
    this.downloadsFolder = downloadsFolder
    this.fileHelper = FileHelper
  }

  setSocketInstance(io) {
    this.io = io
  }

  async defaultRoute(request, response) {
    response.end('hello world')
  }

  async options(request, response) {
    response.writeHead(204)
    response.end()
  }

  async post(request, response) {
    logger.info('post OK')
    response.end()
  }

  async get(request, response) {
    const files = await this.fileHelper.getFilesStatus(this.downloadsFolder)
    // const result = await FileHelper.getFilesStatus(this.downloadsFolder)
    // logger.info('get OK')
    response.writeHead(200)
    response.end(JSON.stringify(files))
  }

  handler(request, response) {
    response.setHeader('Access-Control-Allow-Origin', '*')
    const chosen = this[request.method.toLowerCase()] || this.defaultRoute
    // response.end('hello world')
    return chosen.apply(this, [request, response])
  }
}
