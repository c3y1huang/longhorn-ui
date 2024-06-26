import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { DropOption } from '../../components'
import { hasReadyBackingDisk } from '../../utils/status'
const confirm = Modal.confirm

function actions({ selected, deleteBackingImage, downloadBackingImage }) {
  const handleMenuClick = (event, record) => {
    event.domEvent?.stopPropagation?.()
    switch (event.key) {
      case 'delete':
        confirm({
          title: `Are you sure you want to delete backing image ${record.name}?`,
          onOk() {
            deleteBackingImage(record)
          },
        })
        break
      case 'download':
        downloadBackingImage(record)
        break
      default:
    }
  }

  const disableDownloadAction = !hasReadyBackingDisk(selected)

  const availableActions = [
    { key: 'delete', name: 'Delete' },
    { key: 'download', name: 'Download', disabled: disableDownloadAction, tooltip: disableDownloadAction ? 'Missing disk with ready state' : '' },
  ]

  return (
    <DropOption menuOptions={availableActions}
      onMenuClick={(e) => handleMenuClick(e, selected)}
    />
  )
}

actions.propTypes = {
  selected: PropTypes.object,
  deleteBackingImage: PropTypes.func,
  downloadBackingImage: PropTypes.func,
}

export default actions
