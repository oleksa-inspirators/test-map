// subregions.js

const generateRandomKeys = () => {
    const keys = Array.from({ length: 21 }, (_, i) => i);
    const shuffledKeys = keys.sort(() => 0.5 - Math.random());
    const randomCount = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
    return shuffledKeys.slice(0, randomCount);
};

export const subregions = [
    {
        name: 'Опілля',
        villages: [
            { name: 'Деренівка', coordinates: [49.2350, 25.7530], id: generateRandomKeys() },
            { name: 'Тернопіль', coordinates: [49.5535, 25.5948], id: generateRandomKeys() },
            { name: 'Теребовля', coordinates: [49.3048, 25.7049], id: generateRandomKeys() },
            { name: 'Йосипівка', coordinates: [49.2435, 25.2628], id: generateRandomKeys() },
            { name: 'Бережани', coordinates: [49.4439, 24.9361], id: generateRandomKeys() },
            { name: 'Буданів', coordinates: [49.1634, 25.7072], id: generateRandomKeys() }, // Updated coordinates
            { name: 'Старе Село', coordinates: [49.7443, 24.3053], id: generateRandomKeys() },
            { name: 'Львів', coordinates: [49.8397, 24.0297], id: generateRandomKeys() },
        ],
    },
    {
        name: 'Гуцульщина',
        villages: [
            { name: 'Косів', coordinates: [48.3401, 25.2376], id: generateRandomKeys() },
            { name: 'Коломия', coordinates: [48.5342, 25.0589], id: generateRandomKeys() },
            { name: 'Верховина', coordinates: [48.0667, 24.5453], id: generateRandomKeys() },
            { name: 'Долинішній шепіт', coordinates: [48.0544, 24.4805], id: generateRandomKeys() },
        ],
    },
    {
        name: 'Бойківщина',
        villages: [
            { name: 'Соколе', coordinates: [48.8535, 23.6065], id: generateRandomKeys() },
            { name: 'Дрогобич', coordinates: [49.3587, 23.5007], id: generateRandomKeys() },
            { name: 'Славське', coordinates: [49.3992, 23.5250], id: generateRandomKeys() },
            { name: 'Долина', coordinates: [48.8313, 23.4876], id: generateRandomKeys() },
        ],
    },
    {
        name: 'Надсяння',
        villages: [
            { name: 'Яворів', coordinates: [49.9880, 23.4070], id: generateRandomKeys() },
            { name: 'Перемишль', coordinates: [49.7789, 22.9730], id: generateRandomKeys() },
            { name: 'Грушів', coordinates: [49.8200, 22.9031], id: generateRandomKeys() },
        ],
    },
];
