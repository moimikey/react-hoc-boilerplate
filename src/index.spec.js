import global from 'global'
import document from 'global/document'
import window from 'global/window'
import React from 'react'
import tap from 'tap'
import { typeov } from 'typeov'
import { shallow } from 'enzyme'
import { reactHOC } from '.'

global.window = window
global.document = document

const test = tap.test
const StubComponent = () => <div>Hello World</div>
const ComposedComponent = reactHOC(StubComponent)

test('wraps `displayName`', t => {
  const fixture = shallow(<ComposedComponent />)
  t.equal(ComposedComponent.displayName, 'ReactHOC(StubComponent)', 'when wrapped')
  t.equal(fixture.name(), 'StubComponent', 'when natural')
  t.end()
})

test('provides a `b` prop', t => {
  const fixture = shallow(<ComposedComponent />)
  t.includes(fixture.props(),  { b: false }, 'includes hoc props')
  t.equal(typeov(fixture.props().b), 'boolean', 'is an array')
  t.end()
})

test('returns the original component', t => {
  const fixture = shallow(<ComposedComponent />)
  t.equal(fixture.text(), '<StubComponent />', 'includes original component')
  t.end()
})

test('properly cascades props', t => {
  const fixture = shallow(<ComposedComponent a={true} b={true} />)
  t.includes(fixture.props(), { a: true, b: true }, 'extends original')
  t.end()
})
