import { Link, Stack, Box, Text, Heading, Flex, Button } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import React, { useState } from "react";
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  console.log(variables);
  if (!fetching && !data) {
    return <div>Query failed!</div>;
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>LiReddit</Heading>

        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />

      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.posts.map((p) => (
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              flex="1"
              rounded="md"
              key={p.id}
            >
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

// ssr: true enabled server side rendering.
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
