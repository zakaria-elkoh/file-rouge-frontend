import IPost from "../../../interfaces/IPost";
import ProfilePostsList from "../../../modules/posts/components/ProfilePostsList";

type ProfilePagePostsProps = {
  posts: IPost[];
  isLoading: boolean;
};

const ProfilePagePosts = ({ posts, isLoading }: ProfilePagePostsProps) => {
  return (
    <div className="mt-10 pb-10 bg-white pt-10 ">
      <h1 className="text-3xl font-bold text-center mb-5">Posts</h1>
      {posts.length === 0 && !isLoading && (
        <h1 className="text-2xl font-light text-center mt-20">
          No posts to show
        </h1>
      )}
      <ul className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3  gap-5">
        <ProfilePostsList posts={posts} isLoading={isLoading} />
      </ul>
    </div>
  );
};

export default ProfilePagePosts;
