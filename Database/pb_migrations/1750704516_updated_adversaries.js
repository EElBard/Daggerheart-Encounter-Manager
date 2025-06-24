/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3426200742")

  // remove field
  collection.fields.removeById("number3327364589")

  // remove field
  collection.fields.removeById("number2764509514")

  // remove field
  collection.fields.removeById("number298388669")

  // add field
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3327364589",
    "max": 0,
    "min": 0,
    "name": "atk_name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2764509514",
    "max": 0,
    "min": 0,
    "name": "atk_range",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text298388669",
    "max": 0,
    "min": 0,
    "name": "atk_dmg",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3426200742")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "number3327364589",
    "max": null,
    "min": null,
    "name": "atk_name",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "number2764509514",
    "max": null,
    "min": null,
    "name": "atk_range",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "number298388669",
    "max": null,
    "min": null,
    "name": "atk_dmg",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("text3327364589")

  // remove field
  collection.fields.removeById("text2764509514")

  // remove field
  collection.fields.removeById("text298388669")

  return app.save(collection)
})
