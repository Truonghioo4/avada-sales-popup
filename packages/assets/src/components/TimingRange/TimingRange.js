import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';

export default function TimingRange({label, helpText, value, onChange, suffixText}) {
  return (
    <RangeSlider
      label={label}
      helpText={helpText}
      value={value}
      onChange={onChange}
      suffix={
        <div style={{maxWidth: '100px'}}>
          <TextField
            autoSize
            inputMode={'numeric'}
            value={value}
            onChange={onChange}
            maxLength={3}
            suffix={suffixText}
          />
        </div>
      }
    />
  );
}
TimingRange.propTypes = {
  label: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  suffixText: PropTypes.string
};
