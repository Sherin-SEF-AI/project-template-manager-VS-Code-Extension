const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from {{projectName}}!');
});

app.get('/about', (req, res) => {
  res.json({
    name: '{{projectName}}',
    author: '{{author}}',
    email: '{{email}}',
    created: '{{date}}',
    year: '{{year}}'
  });
});

app.listen(port, () => {
  console.log(`{{projectName}} server running on port ${port}`);
  console.log(`Created by {{author}} ({{email}}) in {{year}}`);
}); 