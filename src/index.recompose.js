// https://github.com/acdlite/recompose/blob/master/docs/API.md
import React, { PropTypes as T } from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import setPropTypes from 'recompose/setPropTypes'
import mapProps from 'recompose/mapProps'
import wrapDisplayName from 'recompose/wrapDisplayName'
export const reactHOC = compose(
  mapProps(({ ...rest }) => ({
    ...rest,
    c: true,
    d: true
  })),
  setPropTypes({
    c: T.bool,
    d: T.bool
  }),
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value)
    }
  })
)
