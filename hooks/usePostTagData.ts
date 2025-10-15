
import { getSortedPosts, getAllTags } from '@/lib/posts'
import type { Post } from '@/types/post'

const usePostTagData = async (): Promise<{ allTags: string[]; posts: Post[]; finalRecommendedPosts: Post[] }> => {

    // Reason: Fetch posts on server side for better performance and SEO
    const posts = await getSortedPosts()
    const allTags = await getAllTags()

    // Reason: Get top 3 featured or most recent posts for recommendations
    const recommendedPosts = posts.filter((post) => post.featured).slice(0, 3)
    const finalRecommendedPosts =
        recommendedPosts.length >= 3
            ? recommendedPosts
            : [...recommendedPosts, ...posts.slice(0, 3 - recommendedPosts.length)]

    return { allTags, posts, finalRecommendedPosts };
};

export default usePostTagData;