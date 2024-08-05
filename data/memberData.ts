/*
    0 - Project Leads
    1 - Development
    2 - Marketing
    3 - Data Curation
    4 - Hall of Fame
*/

export interface IMember {
    name: string;
    image: string | null;
}

export type TMemberData = IMember[][]
export const memberData: TMemberData = [
    [
        // Project Leads
        {
            name: 'Rohan Reddy',
            image: null,
        },
        {
            name: 'Ujjwal Mishra',
            image: null,
        },
    ],
    [
        // Development
        {
            name: 'Aarush Roy',
            image: null,
        },
        {
            name: 'Lalit Maurya',
            image: null,
        },
        {
            name: 'Nimansh Endlay',
            image: null,
        },
        {
            name: 'Pustak Pathak',
            image: null,
        },
        {
            name: 'Rachit Kumar',
            image: null,
        },
        {
            name: 'Shivansh Kalra',
            image: null,
        },
    ],
    [
        // Marketing
        {
            name: 'Naman Katyal',
            image: null,
        },
        {
            name: 'Raghav Verma',
            image: null,
        },
    ],
    [
        // Data Curation
        {
            name: 'Abhinav Joshi',
            image: null,
        },
        {
            name: 'Arunav Singh Rawat',
            image: null,
        },
    ],
    [
        // Hall of Fame
        {
            name: 'AB Santosh',
            image: null,
        },
        {
            name: 'Akshat Sabavat',
            image: null,
        },
        {
            name: 'Amogh Maheshwari',
            image: null,
        },
        {
            name: 'Aryan Sethia',
            image: null,
        },
        {
            name: 'Gokula Dutt',
            image: null,
        },
        {
            name: 'Ojasvi Prabhat Dimri',
            image: null,
        },
        {
            name: 'Pallavi',
            image: null,
        },
        {
            name: 'Pratham Agarwal',
            image: null,
        },
        {
            name: 'Riya Srivastava',
            image: null,
        },
        {
            name: 'Rishi B',
            image: null,
        },
        {
            name: 'Toshika Shukla',
            image: null,
        },
        {
            name: 'Yathansh',
            image: null,
        },
    ],
];