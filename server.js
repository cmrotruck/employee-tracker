const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});