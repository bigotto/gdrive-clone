import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from '../../src/routes.js'

describe('#FileHelper', () => {
  
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct formact', async () => {
      const statMock = {
        dev: 66309,
        mode: 33204,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 3017407,
        size: 859775,
        blocks: 1680,
        atimeMs: 1630966516507.3965,
        mtimeMs: 1630966516343.3994,
        ctimeMs: 1630966516347.3994,
        birthtimeMs: 1630966516343.3994,
        atime: '2021-09-06T22:15:16.507Z',
        mtime: '2021-09-06T22:15:16.343Z',
        ctime: '2021-09-06T22:15:16.347Z',
        birthtime: '2021-09-06T22:15:16.343Z'
      }
      const mockUser = 'bigotto'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
      .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)
      
      const result = await FileHelper.getFileStatus("/tmp")
      const expectedResult = [
        {
          size: "860 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]
      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult) 
    })
  })
})
