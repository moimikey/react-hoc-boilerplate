import React, { Component, PropTypes } from 'react'
import window from 'global/window'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { createChangeEmitter } from 'change-emitter'
export const reactHOC = BaseComponent => {
  return class ReactHOC extends Component {
    static displayName = wrapDisplayName(BaseComponent, 'ReactHOC')
    static propTypes = {
      b: PropTypes.bool,
      c: PropTypes.bool
    }
    static defaultProps = {
      b: false,
      c: false
    }
    constructor(props) {
      super(props)
      this.state = {}
      this.channel = createChangeEmitter()
    }
    componentWillMount() {
      this.subscribe(this.updateContext)
    }
    componentDidMount() {
      this.on(['keydown'], this.updateState)
      this.updateState()
    }
    componentWillUnmount() {
      this.off(['keydown'], this.updateState)
      this.b.unsubscribe(this.updateState)
    }
    componentWillReceiveProps() {
      this.updateState()
    }
    updateContext() {
      console.log('context updated', this.context)
    }
    updateState() {
      console.log('state updated', this.state)
    }
    subscribe(...args) {
      return this.channel.listen(...args)
    }
    unsubscribe() {
      return this.channel() // implicit unsubscribe
    }
    on(events, callback) {
      return events.forEach(evt => window.addEventListener(evt, callback))
    }
    off(events, callback) {
      return events.forEach(evt => window.removeEventListener(evt, callback))
    }
    render() {
      return <BaseComponent {...this.props} />
    }
  }
}

