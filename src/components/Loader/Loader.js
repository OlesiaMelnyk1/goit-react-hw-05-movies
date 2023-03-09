import React from 'react';
import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.Backdrop}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#ffffff"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};
