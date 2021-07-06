const musikModel = require('../model/Musik')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertMusik = (data) =>
  new Promise((resolve, reject) => {
    musikModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Lagu')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllMusik = () =>
  new Promise((resolve, reject) => {
    musikModel.find({})
     .then(musik => resolve(requestResponse.suksesWithData(musik)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    musikModel.findOne({
      _id: objectId(id)
    }).then(musik => resolve(requestResponse.suksesWithData(musik)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    musikModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Data'))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    musikModel.findOne({
      _id: objectId(id)
    }).then(musik => {
      musikModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(musik.image)
        resolve(requestResponse.sukses('Berhasil Delete Musik'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })