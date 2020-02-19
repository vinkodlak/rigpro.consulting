import React from 'react'
import PropTypes from 'prop-types'
import { OurWorkflowPageTemplate } from '../../templates/our-workflow-page'

const OurWorkflowPagePreview = ({ entry, widgetFor }) => (
  <OurWorkflowPageTemplate
    title={entry.getIn(['data', 'title'])}
    workflows={widgetFor('workflows')}
  />
)

OurWorkflowPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default OurWorkflowPagePreview
