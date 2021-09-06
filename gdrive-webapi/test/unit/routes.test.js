import { describe, test, expect, jest } from '@jest/globals'
import Routes from '../../src/routes.js'

describe('#Routes test suite', () => {
  const defaultParameters = {
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
    values: () => Object.values(defaultParameters)
  }
  describe('#setSocketInstance', () => {
    test('setSocket should store io instance', () => {
      const routes = new Routes()
      const ioObj = {
        to: (id) => ioObj,
        emit: (event, message) => {}
      }
      routes.setSocketInstance(ioObj)
      expect(routes.io).toStrictEqual(ioObj)
    })
  })

  describe('#handler', () => {

    test('given an inexistent route it should choose default route', async() => {
      const routes = new Routes();
      const params = { ...defaultParameters }
      params.request.method = 'inexistent'
      await routes.handler(...params.values())
      expect(params.response.end).toHaveBeenCalledWith('Hello')
    })

    test('it should set any request with CORS enable', async () => {
      const routes = new Routes();
      const params = { ...defaultParameters }
      params.request.method = 'inexistent'
      await routes.handler(...params.values())
      expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
    })

    test('given method OPTIONS it should choose options route',async () => {
      const routes = new Routes();
      const params = { ...defaultParameters }
      params.request.method = 'OPTIONS'
      await routes.handler(...params.values())
      expect(params.response.writeHead).toHaveBeenCalledWith(204)
      expect(params.response.end).toHaveBeenCalled()
    })

    test('given method POST it should choose post route', async () => {
      const routes = new Routes();
      const params = { ...defaultParameters }
      params.request.method = 'POST'
      jest.spyOn(routes, routes.post.name).mockResolvedValue()
      await routes.handler(...params.values())
      expect(routes.post).toHaveBeenCalled()
    })

    test('given method GET it should choose get route', async () => {
      const routes = new Routes();
      const params = { ...defaultParameters }
      params.request.method = 'GET'
      jest.spyOn(routes, routes.get.name).mockResolvedValue()
      await routes.handler(...params.values())
      expect(routes.get).toHaveBeenCalled()
    })

  })

  describe('#get', () => {
    test('given method GET it should list all files downloaded', async () => {
      const routes = new Routes()
      const params = { ...defaultParameters }

      const fileStatusesMock = [
        {
          size: "860 kB",
          lastModified: '2021-09-06T22:15:16.343Z',
          owner: 'bigotto',
          file: 'file.txt'
        }
      ]
      jest.spyOn(routes.fileHelper, routes.fileHelper.getFileStatus.name)
        .mockResolvedValue(fileStatusesMock)

        params.request.method = 'GET'
        await routes.handler(...params.values())
        expect(params.response.writeHead).toHaveBeenCalledWith(200)
        expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(fileStatusesMock))
    })

  })

})