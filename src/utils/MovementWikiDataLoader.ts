import wikiData from '../../data/movement_wiki_data.json';

export interface WikiLink {
    text: string;
    href: string;
}

export interface FeaturedArticle {
    title: string;
    href: string;
}

export interface MovementWikiData {
    sidebarLinks: WikiLink[];
    featuredArticles: FeaturedArticle[];
}

export const loadWikiData = (): MovementWikiData => {
    return wikiData as MovementWikiData;
};
