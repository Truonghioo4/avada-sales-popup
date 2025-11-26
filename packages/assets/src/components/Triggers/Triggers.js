import React from 'react';
import {BlockStack, Box, Select, TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';
export default function Triggers({loading, setLoading, input, handleChangeInput}) {
  const options = [
    {label: 'All pages', value: 'all'},
    {label: 'Specific pages', value: 'specific'}
  ];
  return (
    <Box paddingInlineStart="300" paddingBlockStart="300">
      <BlockStack gap="500">
        <Select
          label={<strong>PAGES RESTRICTION</strong>}
          value={input.allowShow}
          options={options}
          onChange={handleChangeInput('allowShow')}
        />
        {input.allowShow !== 'all' && (
          <TextField
            label="Included pages"
            autoComplete="off"
            helpText="Page URLs to show the pop-up (separated by new lines)"
            placeholder={'Example: /products'}
            value={input.includedUrls}
            onChange={handleChangeInput('includedUrls')}
            multiline={5}
          />
        )}
        <TextField
          label="Excluded pages"
          autoComplete="off"
          helpText="Page URLs NOT to show the pop-up (separated by new lines)"
          placeholder={'Example: /products'}
          value={input.excludedUrls}
          onChange={handleChangeInput('excludedUrls')}
          multiline={5}
        />
      </BlockStack>
    </Box>
  );
}
Triggers.propTypes = {
  loading: PropTypes.bool,
  input: PropTypes.object,
  setInput: PropTypes.func,
  setLoading: PropTypes.func,
  handleChangeInput: PropTypes.func
};
