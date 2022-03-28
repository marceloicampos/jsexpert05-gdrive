import { describe, test, expect, jest } from '@jest/globals'
import UploadHandler from './../../src/UploadHandler.js'
import TestUtil from '../_util/testUtil.js'

describe('#UploadHandler test suite', () => {
    const ioObj = {
        to: id => ioObj,
        emit: (event, message) => {}
    }

    describe('#registerEvent', () => {
        test('should call OnFile and onFinish on Busboy instance', () => {
            const uploadHandler = new UploadHandler({
                io: ioObj,
                socketId: '01'
            })
            jest.spyOn(
                uploadHandler,
                uploadHandler.onFile.name
            ).mockResolvedValue()

            const headers = {
                'content-type': 'multipart/form-data; boundary='
            }
            const fn = jest.fn()

            const busboyInstance = uploadHandler.registerEvents(headers, fn)

            const readable = TestUtil.generateReadableStream([
                'chunk',
                'of',
                'data'
            ])
            busboyInstance.emit('file', 'fieldname')
            // readable.on('data', msg => console.log('msg', msg))

            expect(uploadHandler.onFile).toHaveBeenCalled()

            expect(fn).toHaveBeenCalled()
        })
    })
})
