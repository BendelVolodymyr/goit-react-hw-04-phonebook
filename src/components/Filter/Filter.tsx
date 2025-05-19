import { FilterProps } from 'type/Filter';
import styled from './Filter.module.scss';

const Filter: React.FC<FilterProps> = ({ title, onChange, value }) => {
  return (
    <label className={styled.filter}>
      {title !== undefined && <h3>{title}</h3>}
      <input
        type="text"
        name="filter"
        value={value}
        placeholder="search"
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
