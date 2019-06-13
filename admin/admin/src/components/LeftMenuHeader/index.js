/**
*
* LeftMenuHeader
*
*/

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

function LeftMenuHeader() {
  return (
    <div className={styles.leftMenuHeader}>
<Link to="/" className={styles.leftMenuHeaderLink}>
<span className={styles.projectName}>Quiz Admin Panel</span>
  </Link>
  </div>
);
}

export default LeftMenuHeader;
