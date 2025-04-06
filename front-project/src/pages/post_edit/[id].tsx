import EditPost from "@/components/EditPost";
import PrivateRoute from "@/components/PrivateRoute";

const PostEdit = () => {
  return (
    <PrivateRoute>
      <EditPost />
    </PrivateRoute>
  );
};

export default PostEdit;
