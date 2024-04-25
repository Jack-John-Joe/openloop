const WebSocket = require('ws');
const fs = require('fs');
const yaml = require('js-yaml');

const wss = new WebSocket.Server({ port: 9000 });

const xmlFilePath = 'data.xml';
const yamlFilePath = 'messages.yaml';

function appendToYAML(message) {
    const timestamp = new Date().toISOString();
    const data = { timestamp, message };

    try {
        const yamlData = yaml.safeLoad(fs.readFileSync(yamlFilePath, 'utf8')) || [];
        yamlData.push(data);
        fs.writeFileSync(yamlFilePath, yaml.safeDump(yamlData));
    } catch (error) {
        console.error('Error', error);
    }
}

wss.on('connection', function connection(ws) {
    console.log('player exists now');

    fs.readFile(xmlFilePath, 'utf8', (err, xmlData) => {
        if (err) {
            console.error('Error', err);
            return;
        }
        ws.send(xmlData);
    });

    fs.readFile(yamlFilePath, 'utf8', (err, yamlData) => {
        if (err) {
            console.error('bro even forgot the yaml ahaahahahh', err);
            return;
        }
        ws.send(yamlData);
    });

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        if (message.startsWith('<?xml') && message.endsWith('</root>')) {
            fs.writeFile(xmlFilePath, message, (err) => {
                if (err) {
                    console.error('did you forget to make xml file', err);
                }
            });
        } else {
            appendToYAML(message);
        }

        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
        console.log('User was Removed from Existence');
    });

    ws.send('placeholder');
});

console.log('server is running on ws://localhost:9000');
