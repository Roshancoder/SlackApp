const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const { WebClient } = require('@slack/web-api');

const app = express();
const port = process.env.PORT || 3000;
const web = new WebClient(process.env.SLACK_APP_TOKEN);

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/', async (req, res) => {
  try {
    const { text, channel_id } = req.body;
    console.log('i am running');
    console.log(text, channel_id);
    if (channel_id === process.env.SLACK_CHANNEL_1_ID) {
      const upperCaseText = text.toUpperCase();
      await web.chat.postMessage({
        text: upperCaseText,
        channel: process.env.SLACK_CHANNEL_2_ID
      });
      
      res.send('Message forwarded successfully!');
    } else {
      res.send('This command is only available in Channel 1.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
