export const ALL_TEAMS = 'All Teams'
const CLUB_AJAX = 'Ajax'
const CLUB_AZ = 'AZ'
const CLUB_FC = 'FC GRONINGEN'
const CLUB_FR = 'FEYENOORD'
const CLUB_HEE = 'SC HEERENVEEN'
const CLUB_SC = 'SC CAMBUUR'
const CLUB_ZWO = 'PEC ZWOLLE'

export const POSITION_ALL = 'All'
const POSITION_GK = 'GK'
const POSITION_DEF = 'DEF'
const POSITION_MID = 'MID'
const POSITION_FWD = 'FWD'

export const CLUBS = [
    {
        id: 1,
        clubName: ALL_TEAMS,
        checked: true
    },
    {
        id: 2,
        clubName: CLUB_AJAX,
        checked: false
    },
    {
        id: 3,
        clubName: CLUB_AZ,
        checked: false
    },
    {
        id: 4,
        clubName: CLUB_FC,
        checked: false
    },
    {
        id: 5,
        clubName: CLUB_FR,
        checked: false
    },
    {
        id: 6,
        clubName: CLUB_HEE,
        checked: false
    },
    {
        id: 7,
        clubName: CLUB_SC,
        checked: false
    },
    {
        id: 8,
        clubName: CLUB_ZWO,
        checked: false
    }
]

export const PLAYERS_DATA = [
    {
        id: 1,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 6.4,
        position: 'MID',
        points: 54,
        most_transferred: 2
    },
    {
        id: 2,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: 8.0,
        position: 'DEF',
        points: 41,
        most_transferred: 4
    },
    {
        id: 3,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: 2.1,
        position: 'DEF',
        points: 32,
        most_transferred: 6
    },
    {
        id: 4,
        image: 'player4.svg',
        clubImage: 'club_ajax.svg',
        clubName: CLUB_AJAX,
        name: 'N. Bannis',
        nextMatch: {
            club: 'GRO',
            vs: 'AZ'
        },
        price: 7.3,
        position: 'FWD',
        points: 31,
        most_transferred: 8
    },
    {
        id: 5,
        image: 'player5.svg',
        clubImage: 'club_zwo.svg',
        clubName: CLUB_ZWO,
        name: 'T. Tekie',
        nextMatch: {
            club: 'ZWO',
            vs: 'AJA'
        },
        price: 9.1,
        position: 'MID',
        points: 29,
        most_transferred: 1
    },
    {
        id: 6,
        image: 'player6.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'M. Nelom',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 9.1,
        position: 'FWD',
        points: 13,
        most_transferred: 3
    },
    {
        id: 7,
        image: 'player7.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'B. Nygren',
        nextMatch: {
            club: 'BAY',
            vs: 'BEN'
        },
        price: 6.7,
        position: 'MID',
        points: 12,
        most_transferred: 5
    },
    {
        id: 8,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 6.4,
        position: 'MID',
        points: 54,
        most_transferred: 7
    },
    {
        id: 9,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: 8.0,
        position: 'DEF',
        points: 41,
        most_transferred: 9
    },
    {
        id: 10,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: 2.1,
        position: 'DEF',
        points: 32,
        most_transferred: 10
    },
    {
        id: 11,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 6.4,
        position: 'MID',
        points: 54,
        most_transferred: 2
    },
    {
        id: 12,
        image: 'player2.svg',
        clubImage: 'club_sc.svg',
        clubName: CLUB_SC,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: 8.0,
        position: 'DEF',
        points: 41,
        most_transferred: 4
    },
    {
        id: 13,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: 2.1,
        position: 'DEF',
        points: 32,
        most_transferred: 6
    },
    {
        id: 14,
        image: 'player4.svg',
        clubImage: 'club_ajax.svg',
        clubName: CLUB_AJAX,
        name: 'N. Bannis',
        nextMatch: {
            club: 'GRO',
            vs: 'AZ'
        },
        price: 7.3,
        position: 'FWD',
        points: 31,
        most_transferred: 8
    },
    {
        id: 15,
        image: 'player5.svg',
        clubImage: 'club_zwo.svg',
        clubName: CLUB_ZWO,
        name: 'T. Tekie',
        nextMatch: {
            club: 'ZWO',
            vs: 'AJA'
        },
        price: 9.1,
        position: 'MID',
        points: 29,
        most_transferred: 1
    },
    {
        id: 16,
        image: 'player6.svg',
        clubImage: 'club_ajax.svg',
        clubName: CLUB_AJAX,
        name: 'M. Nelom',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 9.1,
        position: 'FWD',
        points: 13,
        most_transferred: 3
    },
    {
        id: 17,
        image: 'player7.svg',
        clubImage: 'club_sc.svg',
        clubName: CLUB_SC,
        name: 'B. Nygren',
        nextMatch: {
            club: 'BAY',
            vs: 'BEN'
        },
        price: 6.7,
        position: 'MID',
        points: 12,
        most_transferred: 5
    },
    {
        id: 18,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: 6.4,
        position: 'MID',
        points: 54,
        most_transferred: 7
    },
    {
        id: 19,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: 8.0,
        position: 'DEF',
        points: 41,
        most_transferred: 9
    },
    {
        id: 20,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: 2.1,
        position: 'DEF',
        points: 32,
        most_transferred: 10
    },
]

export const PLAYERS_POSITIONS = [
    {
        title: POSITION_ALL
    },
    {
        title: POSITION_GK
    },
    {
        title: POSITION_DEF
    },
    {
        title: POSITION_MID
    },
    {
        title: POSITION_FWD
    },
]