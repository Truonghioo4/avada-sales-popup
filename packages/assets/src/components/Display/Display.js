import React from 'react';
import {BlockStack, Box, Text, Checkbox, InlineGrid} from '@shopify/polaris';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import TimingRange from '@assets/components/TimingRange/TimingRange';
import PropTypes from 'prop-types';

export default function Display({input, handleChangeInput}) {
  return (
    <BlockStack gap="500">
      <Box paddingInlineStart="300" paddingBlockStart="300">
        <BlockStack gap="300">
          <Text as={'h3'} fontWeight="bold">
            APPEARANCE
          </Text>
          <DesktopPositionInput
            label="Desktop Position"
            value={input.position}
            onChange={handleChangeInput('position')}
            helpText="The display position of the pop on your website"
          />
          <Checkbox
            label="Hide time ago"
            checked={input.hideTimeAgo}
            onChange={handleChangeInput('hideTimeAgo')}
          />
          <Checkbox
            label="Truncate content text"
            helpText="If your product name is longer for one line, it will be truncated to 'Product na...'"
            checked={input.truncateProductName}
            onChange={handleChangeInput('truncateProductName')}
          />
        </BlockStack>
      </Box>
      <Box paddingInlineStart="300" paddingBlockStart="100">
        <Text as={'h3'} fontWeight="bold">
          TIMING
        </Text>
        <InlineGrid columns={['oneHalf', 'oneHalf']} gap="300">
          <TimingRange
            label="Display duration"
            helpText="How long each pop will display on your page."
            value={input.displayDuration || 1}
            onChange={handleChangeInput('displayDuration')}
            suffixText="second(s)"
          />
          <TimingRange
            label="Time before the first pop"
            helpText="The delay time before the first notification."
            value={input.firstDelay || 1}
            onChange={handleChangeInput('firstDelay')}
            suffixText="second(s)"
          />
          <TimingRange
            label="Gap time between two pops"
            helpText="The time interval between two popup notifications."
            value={input.popsInterval || 1}
            onChange={handleChangeInput('popsInterval')}
            suffixText="second(s)"
          />
          <TimingRange
            label="Maximum of popups"
            helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80"
            value={input.maxPopsDisplay || 1}
            onChange={handleChangeInput('maxPopsDisplay')}
            suffixText="pops(s)"
          />
        </InlineGrid>
      </Box>
    </BlockStack>
  );
}
Display.propTypes = {
  loading: PropTypes.bool,
  input: PropTypes.object,
  setInput: PropTypes.func,
  setLoading: PropTypes.func,
  handleChangeInput: PropTypes.func
};
