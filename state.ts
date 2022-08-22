type Notif = {
    life: number,
    text: string,
}

type PopupType = "stats" | "help" | "next-game";

type State = {
    boardState: number[],
    gameID: string,
    ID: string,
    turn: number,
    notifications: Notif[],
    showPopup: boolean,
    popupType: PopupType,
    apiURL: string,
    winner: number,
}

let stateObj: State = {
    boardState: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    gameID: ' ',
    ID: '',
    turn: -2,
    notifications: [],
    showPopup: true,
    popupType: "help",
    apiURL: "http://localhost:4000",
    winner: -1,
}

export const state = reactive(stateObj);