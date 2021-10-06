module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recomended",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "indent": [
            "error",
            2,
            { "switchCase": 1 }
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-unsed-vars": [
            "error",
            {
                "vars": "all",
                "args": "none"
            } 
        ],
        "no-console": [
            "off"
        ]
    }
};
