import express from 'express';
import { Index, Pinecone } from "@pinecone-database/pinecone";
import { recommend } from './recommend';
// import { Embedder } from "./embeddings";
import dotenv from 'dotenv';

export type ArticleRecord = {
  index: number,
  title: string;
  article: string;
  publication: string;
  url: string;
  author: string;
  section: string;
}

const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} environment variable not set`);
  }
  return value;
};

dotenv.config();

try {
  const app = express();
  const port = 3000; // Choose your desired port

  const indexName = getEnv("PINECONE_INDEX");
  const pinecone = new Pinecone();

  app.get('/recommend/:query', async (req, res) => {
    const { query } = req.params;
    try {
      const description = await pinecone.describeIndex(indexName);
      if (!description.status?.ready) {
        throw `Index not ready, description was ${JSON.stringify(description)}`
      }
    } catch (e) {
      console.log('An error occurred. Run "npm run index" to load data into the index before querying.');
      throw e;
    }
    
    const index: Index<ArticleRecord> = pinecone.index<ArticleRecord>(indexName).namespace('default');
  //   const embedder = new Embedder();
  //   await embedder.init("Xenova/all-MiniLM-L6-v2");

    let recs = await recommend(query, index)
    res.send(recs);
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (e) {
  console.error(e);
}