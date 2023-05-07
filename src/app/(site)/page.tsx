import Drawer from "@/components/drawer";
import { UserType } from "@/types/user";
import getQueryClient from "@/react-query/getQueryClient";
import Hydrate from "@/react-query/hydrate.client";
import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/react-query/hooks/useCurrentUser";

const Home = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["current-user"], fetchCurrentUser);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Drawer />
    </Hydrate>
  );
};

export default Home;
