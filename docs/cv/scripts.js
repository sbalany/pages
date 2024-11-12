// Info items in JSON format with placeholders for the ticker in href
const infoItems = [
    {
        label: 'OI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} oi exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'Vol-BS',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volm_bs exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'GxOI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} gxoi exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'GxVol',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} gxvolm exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'ChxOI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} charmxoi exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'ChxVol',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} charmxvolm exp=1,2,{exp} flip=t rng={range}'
    },
    {
        label: 'Vol-BS (Day)',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volm_bs exp=1 flip=t rng={range}'
    },
    {
        label: '60m',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volmbs_60m exp=1 flip=t rng={range}'
    },
    {
        label: '30m',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volmbs_30m exp=1 flip=t rng={range}'
    },
    {
        label: '15m',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volmbs_15m exp=1 flip=t rng={range}'
    },
    {
        label: '5m',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volmbs_5m exp=1 flip=t rng={range}'
    }
];

const indexes = [ 'SPX', 'SPY', 'QQQ', 'IWM' ];

// Function to calculate the number of weeks till a given date
function calculateWeeksUntil(expDateStr) {
    const [month, day, year] = expDateStr.split('-').map(Number);
    const expDate = new Date(year, month - 1, day);
    const today = new Date();
    const timeDiff = expDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const weeksDiff = Math.ceil(daysDiff / 7);
    return Math.max(1, weeksDiff);
}

// Function to get today's date in 'yymmdd' format
function getDateString() {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2); // Last two digits of the year
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0'); // Pad day with leading zero
    return `${year}${month}${day}`;
}

// Function to dynamically set the href attribute
function setOrdersLink() {
    const todayTicker = 'spxw' + getDateString();
    const ordersLink = document.getElementById('ordersLink');
    const url = `https://convexvalue.com/go/tas/?q=tas cols=symbol,bid_price,ask_price,price,theo,size,value,exchange_sale_conditions,aggressor_side,spot,delta,gamma,vega,theta,volatility,time orderby=time limit=500 like=${todayTicker} filters=value>10000 side=buy`;
    ordersLink.href = url; // Set the href attribute to the dynamically generated URL
    // ordersLink.textContent = `Symbol Data for spxw${today}`; // Optionally update the text
}

// Async function to fetch the expiry date and tickers
async function fetchData() {
    try {
        // Fetch the expiry date
        const expResponse = await fetch('exp.txt');
        const expData = await expResponse.text();
        const expDateStr = expData.split('\n')[0].trim();
        const exp = calculateWeeksUntil(expDateStr);

        // Fetch the tickers
        const tickersResponse = await fetch('tickers.txt');
        const tickersData = await tickersResponse.text();
        const tickers = tickersData.split('\n').filter(ticker => ticker.trim() !== '');
        const container = document.getElementById('container');

        tickers.forEach(ticker => {
            if (!ticker || ticker.trim() === '') {
                return;
            }

            const column = document.createElement('div');
            column.classList.add('column');

            const tickerDiv = document.createElement('div');
            tickerDiv.classList.add('ticker');
            tickerDiv.textContent = ticker;

            const linksDiv = document.createElement('div');
            linksDiv.classList.add('links');

            let range = indexes.includes(ticker) ? 2 : 20;
            // Generate links dynamically from the infoItems JSON object
            infoItems.forEach((item, index) => {
                const link = document.createElement('a');
                link.href = item.href
                    .replace('{ticker}', ticker)
                    .replace('{range}', range)
                    .replace('{exp}', exp);  // Add the calculated weeks into the URL
                link.textContent = item.label;
                linksDiv.appendChild(link);

                // After every 6 buttons, append a <br> to create a line break
                if ((index + 1) % 6 === 0) {
                    lineBreak = document.createElement('br');
                    linksDiv.appendChild(lineBreak);
                    lineBreak = document.createElement('br');
                    linksDiv.appendChild(lineBreak);
                }
            });

            column.appendChild(tickerDiv);
            column.appendChild(linksDiv);
            container.appendChild(column);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the async function
fetchData();
setOrdersLink();

