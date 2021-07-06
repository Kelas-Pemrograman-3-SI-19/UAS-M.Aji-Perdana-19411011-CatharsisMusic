const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.register = (data) =>
  new Promise((resolve, reject) => {
    try {
      userModel.findOne({
        userName: data.username
      }).then((user) =>{
        if (user) {
          resolve(requestResponse.gagal('Username Sudah Terdaftar'))
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash
            userModel.create(data)
              .then(() => resolve(requestResponse.sukses('Berhasil Registrasi')))
              .catch(() => reject(requestResponse.serverError))
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  })

  exports.login = (data) =>
    new Promise((resolve, reject) => {
      userModel.findOne({
        username: data.username
      }).then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            resolve(requestResponse.suksesLogin(user))
          } else {
            reject(requestResponse.gagal('Password Salah'))
          }
        } else {
          reject(requestResponse.gagal('Username Tidak terdaftar'))
        }
      })
    })

exports.getAllUser = () =>
    new Promise((resolve, reject) => {
      userModel.find({
        level: 2
      }).then(user => {
        resolve(requestResponse.suksesWithData(user))
      }).catch(() => reject(requestResponse.serverError))
    })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    try {
      userModel.findOne({
        _id: objectId(id)
      }).then(user => {
      resolve(requestResponse.suksesWithData(user))
      }).catch(() => reject(requestResponse.serverError))
    } catch {
      console.log(error)
    }
  })

exports.update = (id, data) =>
  new Promise((resolve, reject) => {
    userModel.updateOne({
      _id: objectId(id)
    }, data).then(user => {
      resolve(requestResponse.sukses('Berhasil Edit Data'))
    }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    try {
      userModel.deleteOne({
        _id: objectId(id)
    }).then(() => resolve({
        status: true,
        pesan: 'Berhasil Delete Data'
    })).catch(() => reject(requestResponse.serverError))
    } catch {
      console.log(error)
    }
  })