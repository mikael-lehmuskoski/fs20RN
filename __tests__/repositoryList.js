/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../src/components/RepositoryList';
import { compactinator9000 } from '../src/components/RepositoryItem/compactinator9000';
import helpers from '../testHelpers';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const { getByTestId } = render(<RepositoryListContainer repositories={helpers.repositories} />);
    
      helpers.repositories.edges.map(edge => {
        Object.keys(edge.node).map(key => { 
          if (key === "id" || key === "ownerAvatarUrl") return null;
          if (key === "forksCount" || key === "stargazersCount") {
            expect(getByTestId(`${edge.node.id}_${key}`)).toHaveTextContent(compactinator9000(edge.node[key]));
          } else {
            expect(getByTestId(`${edge.node.id}_${key}`)).toHaveTextContent(edge.node[key]);
          }
        });
      });
    });
  });
});