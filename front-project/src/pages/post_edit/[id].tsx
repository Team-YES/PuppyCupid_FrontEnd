import EditPost from "@/components/EditPost";
import PrivateRoute from "@/components/PrivateRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const PostEdit = () => {
  return (
    <BlacklistRoute>
      <PrivateRoute>
        <EditPost />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default PostEdit;
