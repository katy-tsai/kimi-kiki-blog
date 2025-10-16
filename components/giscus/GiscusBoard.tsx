"use client"
import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from '@/hooks/useTheme';
interface GiscusProps {
    slug: string
}
const GiscusBoard: React.FC<GiscusProps> = ({ slug }) => {
    let { theme } = useTheme()
    return (
        <section className="post-comments">
            <h3 className="post-comments__title">💬 留言討論</h3>
            <p className="post-comments__description">
                使用 GitHub 帳號登入後即可留言
                <Giscus
                    id={`comments${slug}`}
                    key={`comments${slug}_${theme}`}
                    repo="katy-tsai/kimi-kiki-blog"
                    repoId="R_kgDOQCGfTQ"
                    category="General"
                    categoryId="DIC_kwDOQCGfTc4Cwtjr"
                    mapping="title"
                    reactionsEnabled="0"
                    emitMetadata="1"
                    inputPosition="bottom"
                    theme={theme}
                    lang="zh-TW"
                    loading="lazy"

                />
            </p>
        </section>
    );
};

export default GiscusBoard;