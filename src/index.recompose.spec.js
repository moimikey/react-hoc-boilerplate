import global from 'global'
import document from 'global/document'
import window from 'global/window'
import React from 'react'
import tap from 'tap'
import withProps from 'recompose/withProps'
import { typeov } from 'typeov'
import { mount, shallow, render } from 'enzyme'
import { reactHOC } from './index.recompose'

global.window = window
global.document = document

const test = tap.test
const StubComponent = withProps({ a: true, b: true })('div')
const ComposedComponent = reactHOC(StubComponent)
