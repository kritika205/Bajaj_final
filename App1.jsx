import React, { useState } from 'react';
import axios from 'axios';
import './App1.css';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleJsonInputChange = (e) => {
        setJsonData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonData);
            const res = await axios.post('localhost/3001/bfhl', parsedData);
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        setSelectedOptions(
            selectedOptions.includes(value)
                ? selectedOptions.filter((item) => item !== value)
                : [...selectedOptions, value]
        );
    };

    return (
        <div className="App">
            <h1>Bajaj Finserv Health Challenge</h1>
            <textarea
                value={jsonData}
                onChange={handleJsonInputChange}
                placeholder='Enter JSON here'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Alphabets"
                        onChange={handleOptionChange}
                    />
                    Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Numbers"
                        onChange={handleOptionChange}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Highest lowercase alphabet"
                        onChange={handleOptionChange}
                    />
                    Highest lowercase alphabet
                </label>
            </div>
            <div>
                {response && (
                    <div>
                        {selectedOptions.includes('Alphabets') && (
                            <div>
                                <h2>Alphabets</h2>
                                <p>{response.alphabets.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('Numbers') && (
                            <div>
                                <h2>Numbers</h2>
                                <p>{response.numbers.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('Highest lowercase alphabet') && (
                            <div>
                                <h2>Highest lowercase alphabet</h2>
                                <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
