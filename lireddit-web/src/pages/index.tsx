import { withUrqlClient } from "next-urql";
import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <NavBar>
        <div>Hello world!</div>
      </NavBar>
      {!data ? null : data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

// ssr: true enabled server side rendering.
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
