import React from 'react'
import PropTypes from 'prop-types'
import { OurWorkflowPageTemplate } from '../../templates/workflow-page'

const OurWorkflowPagePreview = ({ entry, widgetsFor }) => {
  const widgets = widgetsFor('workflows').map(workflow => {
    return {
      title: workflow.getIn(['data', 'title']),
      description: workflow.getIn(['data', 'description']),
      body: workflow.getIn(['data', 'body']),
      image: workflow.getIn(['data', 'image'])
    }
  })
  
  return (
    <OurWorkflowPageTemplate
      title={entry.getIn(['data', 'title'])}
      workflows={widgets}
    />
  )
}

OurWorkflowPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetsFor: PropTypes.func,
}

export default OurWorkflowPagePreview
