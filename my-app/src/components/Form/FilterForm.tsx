import React from 'react';
import './Form.scss';

type Props = {
  setQuery: (param: string) => void;
}

export const FilterForm: React.FC<Props> = ({ setQuery }) => {
  return (
    <div className="box">
      <div className="box__field">

        <div className="box__control">
          <input
            type="text"
            id="search-query"
            className="box__input"
            placeholder="Type search word"
            onChange={(event) => {
              const { value } = event.target;

              setQuery(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};