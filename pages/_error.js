import { useRouter } from 'next/router'
import { Result, Button } from 'antd'

export default ({res, err, statusCode }) => {
    const router = useRouter();
    console.log(res, err, statusCode, 88888);

    return <Result
        status={statusCode}
        title={statusCode}
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary" onClick={() => { router.push('/') }}>Back Home</Button>}
    />
}

Error.getStaticProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { res, err, statusCode }
}