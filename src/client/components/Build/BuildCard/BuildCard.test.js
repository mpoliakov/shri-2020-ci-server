import React from 'react';
import renderer from 'react-test-renderer';

import BuildCard from './BuildCard';
import stubBuild from '@stub/build'

it(`<BuildCard/> is rendered correctly`, () => {
  const component = renderer.create(<BuildCard film={stubBuild}/>).toJSON();
  expect(component).toMatchSnapshot();
});
