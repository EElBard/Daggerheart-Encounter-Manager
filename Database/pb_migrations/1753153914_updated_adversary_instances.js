/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_951486298")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "number4132151136",
    "max": null,
    "min": null,
    "name": "current_hp",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "number1977297346",
    "max": null,
    "min": null,
    "name": "current_stress",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_951486298")

  // remove field
  collection.fields.removeById("number4132151136")

  // remove field
  collection.fields.removeById("number1977297346")

  return app.save(collection)
})
