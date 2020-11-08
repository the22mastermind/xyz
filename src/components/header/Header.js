import React, { Fragment } from 'react';

export default function Header({ text }) {
  return (
    <Fragment>
      <h2 className="header">{text}</h2>
    </Fragment>
  );
}
