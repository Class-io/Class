import { Container } from 'react-bootstrap';
import Select from 'react-select';
import {programmingOptions, groupedOptions} from '../../data/data.js'

const optionsStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'grey' : 'black',
    padding: 20
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'black',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export default function SelectStudent() {
  return (
  <Container>
    <h2> What do you want to learn?</h2>
    <Select
      styles={optionsStyles}
      defaultValue={programmingOptions[1]}
      options={groupedOptions}
      formatGroupLabel={formatGroupLabel}
    />
  </Container>
);
}