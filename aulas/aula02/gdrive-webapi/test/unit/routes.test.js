import { describe, test, expect, jest } from '@jest/globals'
import Routes from './../../src/routes.js'

describe('#Routes test suite', () => {
    const defaultParams = {
        request: {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: '',
            body: {}
        },
        response: {
            setHeader: jest.fn(),
            writeHead: jest.fn(),
            end: jest.fn()
        },
        values: () => Object.values(defaultParams)
    }

    describe('#setSocketInstance', () => {
        test('setSocket should store io instance', () => {
            const routes = new Routes()
            const ioObj = {
                to: id => ioObj,
                emit: (event, message) => {}
            }

            routes.setSocketInstance(ioObj)
            expect(routes.io).toStrictEqual(ioObj)
        })
    })

    describe('#handler', () => {
        test('given an inexistent route it should choose default route', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'inexistent'
            await routes.handler(...params.values())
            expect(params.response.end).toHaveBeenCalledWith('hello world')
        })

        test('it should set any request with CORS enabled', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'inexistent'
            await routes.handler(...params.values())
            expect(params.response.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                '*'
            )
        })

        test('given method OPTIONS it should choose options route', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'OPTIONS'
            await routes.handler(...params.values())
            expect(params.response.writeHead).toHaveBeenCalledWith(204)
            expect(params.response.end).toHaveBeenCalledWith()
        })

        test('given method POST it should choose post route', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'POST'
            jest.spyOn(routes, routes.post.name).mockResolvedValue()
            await routes.handler(...params.values())
            // expect(params.response.end).toHaveBeenCalledWith('hello world')
            // expect(params.response.end).toHaveBeenCalledWith()
            expect(routes.post).toHaveBeenCalled()
        })

        test('given method GET it should choose get route', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            params.request.method = 'GET'
            jest.spyOn(routes, routes.get.name).mockResolvedValue()
            await routes.handler(...params.values())
            // expect(params.response.end).toHaveBeenCalledWith('hello world')
            // expect(params.response.end).toHaveBeenCalledWith()
            expect(routes.get).toHaveBeenCalled()
        })
    })

    describe('#get', () => {
        test('given method GET it should list all files downloaded', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }
            const fileStatusesMock = [
                {
                    size: '14 B', // o size deve retorna uma string com bytes, KB, MB, GB, TB
                    lastModified: '2021-09-08T00:24:38.347Z', // o birthtime deve ser considerado com um string
                    owner: 'marceloicampos', // o owner será uma string única, pois não teremos função de login
                    file: 'notes.txt' // o file retorna também uma string com o nome e extensão do arquivo
                }
            ]
            jest.spyOn(
                routes.fileHelper,
                routes.fileHelper.getFilesStatus.name
            ).mockResolvedValue(fileStatusesMock)

            params.request.method = 'GET'
            await routes.handler(...params.values())

            expect(params.response.writeHead).toHaveBeenCalledWith(200)
            expect(params.response.end).toHaveBeenCalledWith(
                JSON.stringify(fileStatusesMock)
            )
        })
    })
})

/* describe('#testando 1,2,3', () => {
  test('#test teste OK ', () => {
    expect(true).toBeTruthy()
  })
}) */
