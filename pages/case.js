import Link from 'next/link';


export default function Case(props) {
    let {data: {data}} = props;

    return <div>

        <div>
            {
                data.map((item) => {
                    return (
                        <Link href='/case/[list]' as={`/case/${item._id}`} key={item._id}>
                            <a>{item.title}</a>
                        </Link>
                    )
                })
            }
            <style jsx>{`
                a {
                    display: block
                }
            `}</style>
        </div>
    </div>
}

export async function getStaticProps() {
    let res = await fetch('http://47.100.39.25:2653/articleList');
    const data = await res.json();

    return {
        props: {
            data
        }
    }
}