import Head from 'next/head'
import { withRouter } from 'next/router'
import react, { useEffect, useRef } from 'react'
import Header from '../components/header'
import marked from 'marked';
import styles from '../styles/detail.module.css'
import dynamic from 'next/dynamic'

const Commits = dynamic(
    () => import('../components/commits'),
    {
        ssr: false
    }
)

function Detail({ data }) {

    const line = useRef();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            //获得页面向左、向上卷动的距离
            function getScroll() {
                return {
                    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
                    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
                };
            }

            let pageHeight = document.body.scrollHeight;
            let scrollTop = getScroll().top;
            if (line && line.current) {
                line.current.style.width = scrollTop / (pageHeight - window.innerHeight) * 100 + '%';
            }

        }, false);

    }, []);



    return <div>

        <div className={styles.top_line}>
            <span className={styles.line} ref={line}></span>
        </div>
        <Head>
            <title>{data[0].title}</title>
        </Head>
        <header>
            <Header />
        </header>
        <div className={styles.article}>
            {
                data.map((item, index) => {
                    return <div key={item._id}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: marked(item.content) }}></div>
                    </div>
                })
            }

            <Commits />
        </div>
    </div>


}
export async function getServerSideProps({query}) {
    const _id = query.id;
    const res = await fetch(`http://47.100.39.25:2653/oneArticle?_id=${_id}`) //articleList
    const data = await res.json();
    return {
        props: {
            data: data.data
        }
    }
}
export default withRouter(Detail)