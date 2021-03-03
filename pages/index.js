import react, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import dynamic from 'next/dynamic';
import marked from 'marked';
import Tags from '../components/tags';
import { withRouter } from 'next/router';


const Commits = dynamic(
  () => import('../components/commits'),
  {
    ssr: false
  }
)

function Home({ router, data }) {

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(false);
  const [title, setTitle] = useState('尘埃落定');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setList(data);
    const tags = data.map((item) => {
      return [...item.tags]
    })
    const newTags = Array.from(new Set(tags.flat()))
    setTags(newTags);
  }, []);

  const getSearchResult = ({ type, val, status }) => {
    // if(!val) return message.warn('请输入搜索内容');
    if(val) {
      search(type, val).then(res=>{
          setList(res.data);
          setStatus(status);
          setTitle(`包含关键字${val}的文章`);
          type === 'keywords' && highLightCode0(document.querySelectorAll('#cont'), val);
      })
  } else {
      setList(data);
      setStatus(false);
      setTitle('尘埃落定');
    }
  }

  function highLightCode0(node, keyworlds) {
    var patt = new RegExp((keyworlds), "g")
    //replace 传入函数 arguments[0] 是匹配到的内容
    // console.log(node.textContent, arguments)
    // console.log(node.textContent.indexOf(arguments[1])) //151
    Array.from(node).map((item, i) => {
      let spl = node[i].textContent.indexOf(arguments[1]);
      let textL = node[i].textContent.length;

      console.log(spl - spl, spl + (textL - spl > 0 ? textL - spl : 0))
      node[i].innerHTML = node[i].textContent.slice(spl, spl + (textL - spl > 0 ? textL - spl : 0)).replace(patt, function () {
        return "<span style='color: #f33; background: #f7e39a;'>" + arguments[0] + "</span>"
      })
    })
  }
  
  const search = async(type, val) => {
    const res = await fetch(`http://47.100.39.25:2653/search?${type}=${val}`) //articleList
    const resDate = await res.json();
    return resDate;
  }
  const search2 = async() => {
    const res = await fetch(`http://10.200.4.153:5000/api/hello`)
    const resDate = await res.json();
    return resDate;
  }
  search2().then(res => console.log(res))
  return (<div className={styles.container}>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>
      <Header getData={getSearchResult} />
    </header>
    <main className={styles.main}>
      <div className={styles.content}>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {
            list.map((item, index) => {
              return <li key={item._id}>
                <Link className={styles.title} href={{ pathname: '/detail', query: { id: item._id } }}>{item.title}</Link>
                <p id='cont' className={styles.cont} dangerouslySetInnerHTML={{ __html: marked(item.content) }}></p>
              </li>
            })
          }
        </ul>
      </div>

      {/* <div className={styles.left}>left</div> */}

      <div id='right' className={styles.right}>
        标签云
        <Tags getData={getSearchResult} data={tags}/>
      </div>

      <Commits />

    </main>
  </div>
  )
}

export default withRouter(Home)
export async function getStaticProps() {
  const res = await fetch('http://47.100.39.25:2653/articleList') //articleList
  const data = await res.json();
  return {
    props: {
      data: data.data
    }
  }
} 