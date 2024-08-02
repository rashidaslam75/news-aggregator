import { Source } from "./Source";

export interface NewsApiArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Source;
    title: string;
    url: string;
    urlToImage: string;
}
export interface GuardianArticle {
    webTitle: string;
    webPublicationDate: string;
    webUrl: string;
   
}
export interface NyTimeArticle {
    abstract: string;
    pub_date: string;
    web_url: string;
    source:string;
    lead_paragraph:string;
}

export type Article= GuardianArticle & NewsApiArticle & NyTimeArticle;

