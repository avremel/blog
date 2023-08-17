import { BlogLayout } from '..'

const Post = ({ meta, children }) => (
  <BlogLayout meta={meta}>{children}</BlogLayout>
)

export default Post
