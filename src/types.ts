export interface Translation {
    translation: string;
    abbreviation: string;
    lang: string;
    language: string;
    direction: string;
    encoding: string;
    distribution_lcsh: string;
    distribution_version: string;
    distribution_version_date: string;
    distribution_abbreviation: string;
    distribution_about: string;
    distribution_license: string;
    distribution_sourcetype: string;
    distribution_source: string;
    distribution_versification: string;
    distribution_history: { [key: string]: string };
    url: string;
    sha: string;
}

export interface Book {
    translation: string;
    abbreviation: string;
    lang: string;
    language: string;
    direction: string;
    encoding: string;
    nr: number;
    name: string;
    url: string;
    sha: string;
}

export interface Chapters {
    translation: string;
    abbreviation: string;
    lang: string;
    language: string;
    direction: string;
    encoding: string;
    book_nr: number;
    book_name: string;
    chapter: number;
    name: string;
    url: string;
    sha: string;
}

export interface Chapter {
    translation: string;
    abbreviation: string;
    lang: string;
    language: string;
    direction: string;
    encoding: string;
    book_nr: number;
    book_name: string;
    chapter: number;
    name: string;
    verses: Verse[];
}

export interface Verse {
    chapter: number;
    verse: number;
    name: string;
    text: string;
}
