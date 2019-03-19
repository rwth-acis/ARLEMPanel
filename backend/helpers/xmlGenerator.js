const xmlBuilder = require('xmlbuilder')
module.exports = (workplace, type) => {
  if (type === 'workplace') {
    var xml = xmlBuilder.create('workplace', {version: '1.0', encoding: 'UTF-8', standalone: true},
      {pubID: null, sysID: null},
      {
        skipNullNodes: true,
        skipNullAttributes: true,
        headless: false,
        ignoreDecorators: false,
        separateArrayItems: false,
        noDoubleEncoding: false,
        stringify: {}}).att('id', workplace.id).att('name', workplace.name)

    if (workplace.tangibles) {
      const tangibles = xml.ele('tangibles')
      if (workplace.tangibles.persons) {
        const persons = tangibles.ele('persons')
        for (var person of workplace.tangibles.persons) {
          persons.ele('person')
            .att('id', person.id)
            .att('name', person.name)
            .att('twitter', person.twitter)
            .att('mbox', person.mbox)
            .att('detectable', person.detectableId)
            .att('persona', person.persona)
            .up()
        }
        persons.up()
      }

      if (workplace.tangibles.places) {
        const places = tangibles.ele('places')
        for (var place of workplace.tangibles.places) {
          places.ele('place')
            .att('id', place.id)
            .att('name', place.name)
            .att('detectable', place.detectableId)
            .att('type', place.type)
            .up()
        }
        places.up()
      }

      if (workplace.tangibles.things) {
        const things = tangibles.ele('things')
        for (var thing of workplace.tangibles.things) {
          let tmpThing = things.ele('thing')
            .att('id', thing.id)
            .att('name', thing.name)
            .att('urn', thing.urn)
            .att('detectable', thing.detectableId)
          if (thing.pois) {
            let pois = tmpThing.ele('pois')
            for (var poi of thing.pois) {
              pois.ele('poi')
                .att('id', poi.id)
                .att('x-offset', poi.x)
                .att('y-offset', poi.y)
                .att('z-offset', poi.z)
                .up()
            }
            pois.up()
          }
          tmpThing.up()
        }
        things.up()
      }
      tangibles.up()
    }

    if (workplace.sensors) {
      const sensors = xml.ele('sensors')
      if (workplace.sensors) {
        for (var sensor of workplace.sensors) {
          sensors.ele('sensor')
            .att('id', sensor.id)
            .att('name', sensor.name)
            .att('url', sensor.url)
            .att('type', sensor.type)
            .att('username', sensor.username)
            .att('password', sensor.password)
            .up()
        }
        sensors.up()
      }
    }

    if (workplace.configurables) {
      const configurables = xml.ele('configurables')
      if (workplace.configurables.apps) {
        const apps = configurables.ele('apps')
        for (let app of workplace.configurables.apps) {
          apps.ele('app')
            .att('id', app.id)
            .att('name', app.name)
            .att('type', app.type)
            .att('manifest', app.manifest)
            .up()
        }
        apps.up()
      }

      if (workplace.configurables.devices) {
        const devices = configurables.ele('devices')
        for (let device of workplace.tangibles.places) {
          devices.ele('device')
            .att('id', device.id)
            .att('name', device.name)
            .att('type', device.type)
            .att('owner', device.author.name)
            .up()
        }
        devices.up()
      }
      configurables.up()
    }

    if (workplace.triggers) {
      const triggers = xml.ele('triggers')
      if (workplace.triggers.detectables) {
        const detectables = triggers.ele('detectables')
        for (let detectable of workplace.triggers.detectables) {
          detectables.ele('app')
            .att('id', detectable.id)
            .att('sensor', detectable.sensor.name)
            .att('type', detectable.type)
            .att('url', detectable.url)
            .up()
        }
        detectables.up()
      }

      if (workplace.triggers.predicates) {
        const predicates = triggers.ele('predicates')
        for (let predicate of workplace.triggers.predicates) {
          predicates.ele('primitive')
            .att('id', predicate.id)
            .att('name', predicate.name)
            .att('symbol', predicate.symbol)
            .att('size', predicate.size)
            .att('option', predicate.option)
            .att('url', predicate.url)
            .up()
        }
        predicates.up()
      }

      if (workplace.triggers.warnings) {
        const predicates = triggers.ele('warnings')
        for (let predicate of workplace.triggers.warnings) {
          predicates.ele('primitive')
            .att('id', predicate.id)
            .att('name', predicate.name)
            .att('symbol', predicate.symbol)
            .att('size', predicate.size)
            .att('option', predicate.option)
            .att('url', predicate.url)
            .up()
        }
        predicates.up()
      }

      if (workplace.triggers.hazards) {
        const predicates = triggers.ele('hazards')
        for (let predicate of workplace.triggers.hazards) {
          predicates.ele('primitive')
            .att('id', predicate.id)
            .att('name', predicate.name)
            .att('symbol', predicate.symbol)
            .att('size', predicate.size)
            .att('option', predicate.option)
            .att('url', predicate.url)
            .up()
        }
        predicates.up()
      }

      triggers.up()
    }

    if (workplace.activities) {
      const activities = xml.ele('activities')
      for (let activity of workplace.activities) {
        const activityML = activities.ele('activity')
          .att('id', activity.id)
          .att('name', activity.name)
          .att('language', activity.language)
          // .att('description', activity.description)
          .att('start', activity.start)

        if (activity.actions) {
          for (let action of activity.actions) {
            const actionML = activityML.ele('action')
              .att('id', action.id)
              .att('viewport', action.viewport !== null ? action.viewport.name : null)
              .att('device', action.device !== null ? action.device.name : null)
              .att('location', action.place !== null ? action.place.name : null)
              .att('predicate', action.primitive !== null ? action.primitive.name : null)

            if (action.actionTriggers) {
              var triggerList = {enter: null, exit: null, triggers: null}
              for (let trigger of action.actionTriggers) {
                if (trigger && trigger.entity) {
                  if (trigger.mode === 'enter' || trigger.mode === 'exit') {
                    if (triggerList[trigger.mode] === null) {
                      triggerList[trigger.mode] = actionML.ele(trigger.mode)
                    }
                    triggerList[trigger.mode].ele(trigger.operation)
                      .att('id', trigger.entity !== null ? trigger.entity.id : null)
                      .att('type', trigger.entityType)
                      .att('predicate', trigger.primitive !== null ? trigger.primitive.name : null)
                      .att('poi', trigger.poi !== null ? trigger.poi.name : null)
                      .att('url', trigger.entity !== null ? trigger.entity.url : null)
                      .att('text', trigger.entity !== null ? (trigger.entity.url === null ? trigger.entity.name : null) : null)
                      .att('option', trigger.option)
                      .att('value', trigger.value)
                      .up()
                  } else {
                    if (triggerList['triggers'] === null) {
                      triggerList.triggers = actionML.ele('triggers')
                    }
                    triggerList.triggers.ele('trigger')
                      .att('id', trigger.entity !== null ? trigger.entity.id : null)
                      .att('type', trigger.entityType)
                      .att('mode', trigger.mode)
                      .att('predicate', trigger.primitive !== null ? trigger.primitive.name : null)
                      .att('poi', trigger.poi !== null ? trigger.poi.name : null)
                      .att('url', trigger.entity !== null ? trigger.entity.url : null)
                      .att('text', trigger.entity !== null ? (trigger.entity.url === null ? trigger.entity.name : null) : null)
                      .att('option', trigger.option)
                      .att('value', trigger.value)
                  }
                }
              }
            }

            const instructionEle = actionML.ele('instruction')
            instructionEle.ele('title', action.instructionTitle).up()
            instructionEle.ele('description', action.instructionDescription).up()

            actionML.up()
          }
        }
        activityML.up()
      }
      activities.up()
    }
    return xml
  } else if(type === 'activity') {
    var activityML = xmlBuilder.create('activity', {version: '1.0', encoding: 'UTF-8', standalone: true},
      {pubID: null, sysID: null},
      {
        skipNullNodes: true,
        skipNullAttributes: true,
        headless: false,
        ignoreDecorators: false,
        separateArrayItems: false,
        noDoubleEncoding: false,
        stringify: {}})
        .att('id', workplace.id)
        .att('name', workplace.name)
        .att('language', workplace.language)
        // .att('description', workplace.description)
        .att('start', workplace.start)

    if (workplace.actions) {
      for (let action of workplace.actions) {
        const actionML = activityML.ele('action')
          .att('id', action.id !== null ? action.id : null)
          .att('name', action.name !== null ? action.name : null)
          .att('viewport', action.viewport !== null ? action.viewport.name : null)
          .att('device', action.device !== null ? action.device.name : null)
          .att('location', action.place !== null ? action.place.name : null)
          .att('predicate', action.primitive !== null ? action.primitive.name : null)

        if (action.actionTriggers) {
          var triggerList = {enter: null, exit: null, triggers: null}
          for (let trigger of action.actionTriggers) {
            if (trigger.mode === 'enter' || trigger.mode === 'exit') {
              if (triggerList[trigger.mode] === null) {
                triggerList[trigger.mode] = actionML.ele(trigger.mode)
              }
              triggerList[trigger.mode].ele(trigger.operation)
                .att('id', trigger.entity !== null ? trigger.entity.id : null)
                .att('type', trigger.entityType)
                .att('predicate', trigger.primitive !== null ? trigger.primitive.name : null)
                .att('poi', trigger.poi !== null ? trigger.poi.name : null)
                .att('url', trigger.entity !== null ? trigger.entity.url : null)
                .att('text', trigger.entity !== null ? (trigger.entity.url === null ? trigger.entity.name : null) : null)
                .att('option', trigger.option)
                .att('value', trigger.value)
                .up()
            } else {
              if (triggerList['triggers'] === null) {
                triggerList.triggers = actionML.ele('triggers')
              }
              triggerList.triggers.ele('trigger')
                .att('id', trigger.entity && trigger.entity.id)
                .att('type', trigger.entityType)
                .att('mode', trigger.mode !== null ? trigger.mode : null)
                .att('predicate', trigger.primitive !== null ? trigger.primitive.name : null)
                .att('poi', trigger.poi !== null ? trigger.poi.name : null)
                .att('url', trigger.entity && trigger.entity.url !== null ? trigger.entity.url : null)
                .att('text', trigger.entity && trigger.entity !== null ? (trigger.entity.url === null ? trigger.entity.name : null) : null)
                .att('option', trigger.option)
                .att('module', trigger.modular && trigger.modular.id !== null ? trigger.modular.name : null)
                .att('value', trigger.value)
            }
          }
        }

        const instructionEle = actionML.ele('instruction')
        instructionEle.ele('title', action.instructionTitle).up()
        instructionEle.ele('description', action.instructionDescription).up()

        actionML.up()
      }
    }
    return activityML
  }

}
