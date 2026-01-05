import React from "react";

import NewsDetail from "@/modules/news/NewsDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  return <NewsDetail id={Number(id)} />;
};

export default Page;
