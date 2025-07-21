/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2631893818")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json2960051917",
    "maxSize": 0,
    "name": "variable_dict",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2631893818")

  // remove field
  collection.fields.removeById("json2960051917")

  return app.save(collection)
})
