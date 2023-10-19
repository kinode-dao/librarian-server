/* eslint-disable import/no-extraneous-dependencies */
import { ArticleRecord } from "./server";
// import { Embedder } from "./embeddings";
import { Index } from "@pinecone-database/pinecone";

export async function recommend(query: string, index: Index<ArticleRecord>) {
  // const embedder = new Embedder();
  // await embedder.init("Xenova/all-MiniLM-L6-v2");
  // const queryEmbedding = await embedder.embed(query);

  // const recommendationsRaw = await index.query({
  //   vector: queryEmbedding.values,
  //   includeMetadata: true,
  //   includeValues: true,
  //   topK: 10
  // });

  // return recommendationsRaw?.matches?.slice(0, 10).forEach((result: any) => {
  //   const { title, article, publication, section } = result.metadata;
  //   return { title, article, publication, section };
  // });;
  return { foo: query }
}