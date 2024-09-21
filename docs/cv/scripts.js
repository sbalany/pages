// Info items in JSON format with placeholders for the ticker in href
const infoItems = [
    {
        label: 'Joy - OI',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} oi exp=1,2,5 rng=30'
    },
    {
        label: 'Joy - Vol-BS',
        href: 'https://convexvalue.com/go/joy/?q=joy {ticker} volm_bs exp=1,2,5 rng=30'
    }
];

// Fetch the tickers from tickers.txt and generate columns
fetch('tickers.txt')
    .then(response => response.text())
    .then(data => {
        const tickers = data.split('\n').filter(ticker => ticker.trim() !== '');
        const container = document.getElementById('container');

        tickers.forEach(ticker => {
            // Check if ticker is valid, if not, skip this iteration
            if (!ticker || ticker.trim() === '') {
                return;  // Equivalent to 'continue' in a loop
            }

            // Create a column div
            const column = document.createElement('div');
            column.classList.add('column');

            // Create the ticker div
            const tickerDiv = document.createElement('div');
            tickerDiv.classList.add('ticker');
            tickerDiv.textContent = ticker;

            // Create the links div
            const linksDiv = document.createElement('div');
            linksDiv.classList.add('links');

            // Generate links dynamically from the infoItems JSON object
            infoItems.forEach(item => {
                const link = document.createElement('a');
                link.href = item.href.replace('{ticker}', ticker); // Replace placeholder with ticker
                link.textContent = item.label;
                linksDiv.appendChild(link);
            });

            // Append ticker and links div to the column
            column.appendChild(tickerDiv);
            column.appendChild(linksDiv);

            // Append column to the container
            container.appendChild(column);
        });
    })
    .catch(error => console.error('Error fetching tickers:', error));

