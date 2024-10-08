declare module 'weatherCode.json' {
    interface weatherMatchData {
        icon: string;        // 天気のアイコン (例: "100.svg")
        iconNight: string;   // 夜の天気のアイコン (例: "500.svg")
        code: string;        // 天気のコード (例: "100")
        descriptionJP: string;  // 日本語の天気の説明 (例: "晴")
        descriptionEN: string;  // 英語の天気の説明 (例: "CLEAR")
    }
    interface weatherMatchId {
        [key: number]: weatherMatchData
    }
    declare const weatherMatchId: weatherMatchId;
    export = weatherMatchId;
}
