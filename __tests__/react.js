import React from 'React';
import { render, screen, waitFor } from '@testing-library/react';

import App from '../src/components/App.jsx';
import NewApplication from '../src/components/NewApplication.jsx';
import Job from '../src/components/Job.jsx';

describe('Unit testing React components', () => {
  describe('', () => {
    let text;
    const props = {
      label: 'Mega',
      text: 'Markets',
    };

    beforeAll(() => {
      text = render(<LabeledText {...props} />);
    });

    test('Renders the passed-in text with the label in bold', () => {
      expect(text.getByText('Mega:').nextSibling).toHaveTextContent('Markets');
      expect(text.getByText('Mega:')).toHaveStyle('font-weight: bold');
    });
  });
}