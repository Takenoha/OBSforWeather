// 東京(130000)の予報を取得
let url: string = "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json";

interface WeatherResponse {
    publishingOffice: string;
    reportDatetime: string;
    timeSeries: {
        areas: {
            area: {
                name: string;
            };
            weathers: string[];
            weatherCodes: string[];
        }[];
    }[];
}

fetch(url)
    .then((response: Response) => response.json())
    .then((weather: WeatherResponse[]) => {
        console.log(weather);

        // 特定の地域(今回は東京)だけ選択して変数に詰め直す
        let area = weather[0].timeSeries[0].areas[0];
        console.log(area); 

        // 発表者と報告日時の情報を画面に書き出す
        document.getElementById("publishingOffice")!.lastElementChild!.textContent = weather[0].publishingOffice;
        document.getElementById("reportDatetime")!.lastElementChild!.textContent = weather[0].reportDatetime;

        // 特定地域の情報を画面に書き出す
        document.getElementById("targetArea")!.lastElementChild!.textContent = area.area.name;
        document.getElementById("targetArea")!.appendChild(document.createTextNode(area.area.name));
        document.getElementById("today")!.lastElementChild!.textContent = area.weathers[0];
        document.getElementById("tomorrow")!.lastElementChild!.textContent = area.weathers[1];
        document.getElementById("dayAfterTomorrow")!.lastElementChild!.textContent = area.weathers[2];
        document.getElementById("weatherCodes")!.lastElementChild!.textContent = area.weatherCodes.join(', ');

        const weatherCodes: string[] = weather[0].timeSeries[0].areas[0].weatherCodes; 

        const imgElement = document.createElement('img');
        imgElement.alt = 'Weather Image';
       imgElement.style.width = '100px';  // 任意のサイズ
       imgElement.style.height = '100px'; // 任意のサイズ
        const imageContainer = document.getElementById('weatherImage');
        if (imageContainer) {
           imageContainer.appendChild(imgElement); // 画像要素を挿入
        }
        let currentIndex = 0;

        // 画像を一定時間ごとに切り替える関数
        function changeImage() {
            if (currentIndex >= weatherCodes.length) {
                currentIndex = 0; // インデックスをリセット
            }
            const weatherCode = weatherCodes[currentIndex];
            const imageUrl: string = `https://www.jma.go.jp/bosai/forecast/img/${weatherCode}.svg`;
            imgElement.src = imageUrl; // 画像を更新
            currentIndex++;
        }

        // 初回の画像表示
        changeImage();

        // 5秒ごとに画像を切り替える (5000ミリ秒 = 5秒)
        setInterval(changeImage, 5000);
    })
    .catch(error => console.error('Error fetching weather data:', error));