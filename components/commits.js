
import react, { useEffect } from 'react'
import Valine from 'valine'
import { withRouter } from 'next/router'

function Commits({ router }) {

    useEffect(() => {
        new Valine({
            el: '#vcomments',
            appId: 'wE4nJQWrMu4f5NpSlx2DCce2-9Nh9j0Va',
            appKey: 'NeaWcHyjJiyAeMd90ATMNBgk',
            placeholder: '快来评论吧~',
            avatar: 'monsterid', //''/mp/identicon/monsterid/wavatar/robohash/retro/hide
            pageSize: 5,
            path: router.asPath,
            visitor: true,
            highlight: true,
            recordIP: true,
            enableQQ: true,
            // requiredFields: ['nick','mail']
        })

    }, []);

    return (<><span id={router.asPath} className="leancloud_visitors" data-flag-title="Your Article Title">
        <em className="post-meta-item-text">阅读量 </em>
        <i className="leancloud-visitors-count">1000000</i>
    </span>
        <div id="vcomments" style={{ width: '100%', padding: '20px' }}></div>

    </>
    )
}

export default withRouter(Commits)