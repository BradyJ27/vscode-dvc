import React from 'react'
import { BatchSelectionProp, RowContent } from './Row'
import styles from '../styles.module.scss'
import { RowProp } from '../../../util/interfaces'

export const NestedRow: React.FC<RowProp & BatchSelectionProp> = ({
  row,
  contextMenuDisabled,
  projectHasCheckpoints,
  hasRunningExperiment,
  batchRowSelection
}) => {
  return (
    <RowContent
      row={row}
      className={styles.nestedRow}
      contextMenuDisabled={contextMenuDisabled}
      projectHasCheckpoints={projectHasCheckpoints}
      hasRunningExperiment={hasRunningExperiment}
      batchRowSelection={batchRowSelection}
    />
  )
}