/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2657486364")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_951486298",
    "hidden": false,
    "id": "relation1019645906",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "adversaries",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2657486364")

  // remove field
  collection.fields.removeById("relation1019645906")

  return app.save(collection)
})
