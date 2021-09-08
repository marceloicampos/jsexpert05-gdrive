import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import fileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {
  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 14,
        mode: 33279,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 512,
        ino: 14636698789102446,
        size: 14,
        blocks: 0,
        atimeMs: 1631063747106.7222,
        mtimeMs: 1631060678347.4666,
        ctimeMs: 1631060678347.4666,
        birthtimeMs: 1631060678347.4666,
        atime: '2021-09-08T01:15:47.107Z',
        mtime: '2021-09-08T00:24:38.347Z',
        ctime: '2021-09-08T00:24:38.347Z',
        birthtime: '2021-09-08T00:24:38.347Z'
      }

      const mockUser = 'marceloicampos'
      process.env.USER = mockUser

      const filename = 'notes.txt'

      jest
        .spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)

      const result = await fileHelper.getFilesStatus('/tmp')

      const expectedResult = [
        {
          size: '14 B', // o size deve retorna uma string com bytes, KB, MB, GB, TB
          lastModified: statMock.birthtime, // o birthtime deve ser considerado com um string
          owner: mockUser, // o owner será uma string única, pois não teremos função de login
          file: filename // o file retorna também uma string com o nome e extensão do arquivo
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})
