export function isSchedulingFailure(volume) {
  // volume.conditions.scheduled.status may be equal to 'Unknown' or 'True' or 'False', only 'False' value is scheduling failure
  // volume.conditions may be empty object({})
  return volume.conditions && volume.conditions.scheduled && volume.conditions.scheduled.status.toLowerCase() === 'false'
}

export function genAttachHostModalProps(volumes, hosts, visible, dispatch) {
  return {
    items: volumes,
    visible,
    hosts,
    onOk(selectedHost, urls) {
      dispatch({
        type: 'volume/attach',
        payload: {
          host: selectedHost,
          url: urls[0],
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'volume/hideAttachHostModal',
      })
    },
  }
}

export function getEngineUpgradeModalProps(volumes, engineImages, visible, dispatch) {
  return {
    items: volumes,
    visible,
    engineImages,
    onOk(image, urls) {
      dispatch({
        type: 'volume/engineUpgrade',
        payload: {
          image,
          url: urls[0],
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'volume/hideEngineUpgradeModal',
      })
    },
  }
}
