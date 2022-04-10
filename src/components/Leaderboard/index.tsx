import { InferGetStaticPropsType } from 'next'

type Post = {
    author: string
    content: string
}

export const getStaticProps = async () => {
    console.log("getStaticProps")

    const res = await fetch('https://.../posts')
    const posts: Post[] = await res.json()

    return {
        props: {
            posts,
        },
    }
}

function Leaderboard({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    // will resolve posts to type Post[]
    return (<h1>dfgf</h1>)
}

export default Leaderboard