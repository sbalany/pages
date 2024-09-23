// Info items in JSON format with placeholders for the ticker in href
const infoItems = [
    {
        label: 'OI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} oi exp=1,2,{exp} rng=20'
    },
    {
        label: 'Vol-BS',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volm_bs exp=1,2,{exp} rng=20'
    },
    {
        label: 'GxOI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} gxoi exp=1,2,{exp} rng=20'
    },
    {
        label: 'GxVol',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} gxvolm exp=1,2,{exp} rng=20'
    },
    {
        label: 'ChxOI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} charmxoi exp=1,2,{exp} rng=20'
    },
    {
        label: 'ChxVol',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} charmxvolm exp=1,2,{exp} rng=20'
    }
];

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

            // Generate links dynamically from the infoItems JSON object
            infoItems.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href
                    .replace('{ticker}', ticker)
                    .replace('{exp}', exp);  // Add the calculated weeks into the URL
                link.textContent = item.label;
                linksDiv.appendChild(link);
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
