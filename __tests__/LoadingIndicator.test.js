import React from 'react';
import LoadingIndicator from '../app/components/LoadingIndicator';

import renderer from 'react-test-renderer';

describe('LoadingIndicator component', () => {
    test('LoadingIndicator component renders correctly', () => {
        const tree = renderer.create(<LoadingIndicator />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});