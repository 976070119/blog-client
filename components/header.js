import Link from 'next/link'
import react, { useState, useEffect } from 'react';
import styles from '../styles/header.module.css'
import { Input } from 'antd';

const { Search } = Input;

export default function Header(props) {

    const [loading, setLoading] = useState(false);

    const search = (val) => {
        // setLoading(true);
        // setLoading(false);
        const type = 'keywords';
        const status = true;
        props.getData({ type, val, status });
    }

    return (
        <div className={styles.header_box_wrap}>
            <div className={styles.header_box}>
                <div className={styles.header}>
                    <div className={styles.header_left}>
                        <Link href='/'>Home</Link>
                    </div>
                    <div className={styles.header_search}>
                        <Search placeholder="输入关键词搜索..." allowClear={false} onSearch={search} loading={loading} enterButton />
                    </div>

                </div>
            </div>
            <div className={styles.header_placeholder}></div>
        </div>
    )
}