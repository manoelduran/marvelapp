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
};

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
};

interface User {
    id: string;
    name: string;
    isAdmin: boolean;
    password?: string;
    photoUrl: string;
    photo_path?: string;
    buttonId?: boolean;
    favorites?: Character[];
};
