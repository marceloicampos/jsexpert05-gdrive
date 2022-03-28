import Busboy from 'busboy'

export default class UploadHandler {
    constructor({ io, socketId }) {
        //apagar
    }
    onFile(fieldname, file, filename) {
        //apagar
    }
    registerEvents(headers, onFinish) {
        const busboy = new Busboy({ headers })

        busboy.onFile('file', this.onFile.bind(this))
        busboy.on('finish', onFinish)

        return busboy
    }
}
