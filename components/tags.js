import react, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import styles from '../styles/tags.module.css';

function Tags(props) {

    function searchTags(val) {
        console.log(props)
        const type = 'tags';
        const status = true;
        props.getData({ type, val: val.target.innerHTML, status });
    }

    return (
        <div className={styles.tags}>
            {
                props.data.map((i, j) => <span className={styles.tag} onClick={searchTags} key={j}>{i}</span> )
            }
        </div>
    )
}
export default Tags;