
import { withRouter } from 'next/router'
import marked from 'marked';
import styles from '../../styles/detail.module.css'

export default function List(props) {
    return (<div>
        <div className={styles.article}>
            123
            {
                props.data.map((item, index) => {
                    return <div key={item._id}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: marked(item.content) }}></div>
                    </div>
                })
            }
        </div>
    </div>)
}

// 1. getServerSideProps
export async function getServerSideProps({query}) {
    const { list } = query;
    const res = await fetch(`http://47.100.39.25:2653/oneArticle?_id=${list}`) //articleList
    const data = await res.json();
    return {
        props: data
    }
}

// 2. getStaticPaths + getStaticProps

// export async function getStaticPaths() {
//     let res = await fetch('http://47.100.39.25:2653/articleList');
//     let data = await res.json();
//     let paths = data.data.map((item) => (
//         {
//             params: { list: `${item._id}` }
//         }
//     ))

//     return {
//         paths,
//         fallback: false
//     }
// }


// export async function getStaticProps(context) {

//     const { params: { list } } = context;
//     const res = await fetch(`http://47.100.39.25:2653/oneArticle?_id=${list}`) //articleList
//     const data = await res.json();
//     return {
//         props: data
//     }
// }