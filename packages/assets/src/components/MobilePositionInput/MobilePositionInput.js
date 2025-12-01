import React from 'react';
import PropTypes from 'prop-types';
import './MobilePositionInput.scss';
import {InlineStack, Labelled, Text} from '@shopify/polaris';

const defaultOptions = [
  {label: 'Top', value: 'top'},
  {label: 'Bottom', value: 'bottom'}
];
const MobilePositionInput = ({label, value, onChange, helpText, options = defaultOptions}) => {
  return (
    <Labelled label={label}>
      <InlineStack gap="300">
        {options.map((option, key) => (
          <div
            key={key}
            className={`Avada-MobilePosition ${
              value === option.value ? 'Avada-MobilePosition--selected' : ''
            }`}
            onClick={() => onChange(option.value)}
          >
            <div
              className={`Avada-MobilePosition__Input Avada-MobilePosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </InlineStack>
      <Text variant="bodyLg" as="p" tone={'subdued'}>
        {helpText}
      </Text>
    </Labelled>
  );
};

MobilePositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default MobilePositionInput;
