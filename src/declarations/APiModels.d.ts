interface Character {
    id: number,
    name: string,
    description: string,
    modified: Date,
    resourceURI: string,
    urls: [
        {
            type: string,
            url: string
        }
    ],
    thumbnail: {
        path: string,
        extension: string
    },
}

interface Characters {
    code: number,
    status: string,
    copyright: string,
    attributionText: string,
    attributionHTML: string,
    data: {
        offset: number,
        limit: number,
        total: number,
        count: number,
        results: Character[]
    }
}
